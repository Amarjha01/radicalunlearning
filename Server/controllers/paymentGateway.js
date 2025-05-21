import {
    LearnerUserModel,
    EducatorUserModel,
    AdminModel,
    SessionModel,
    PaymentRecord,
    WalletTransactionModel,
    
  } from "../models/user.js";
  import jwt from "jsonwebtoken";
  import Stripe from 'stripe';
  import { createZoomMeeting } from '../utils/createZoomMeeting.js'; 
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function createCheckoutSession(req , res) {
  const { learnerName, amount, educatorId, topic } = req.body;
  const token = req.cookies.accessToken;

  if (!token) {
    return res.status(401).json({ message: 'access token is missing' });
  }

  const decode = jwt.verify(token , process.env.JWT_SECRET);
  const { id: learnerId } = decode;

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card', 'link', 'paypal', 'klarna', 'alipay'],
      line_items: [
        {
          price_data: {
            currency: 'GBP',
            product_data: {
              name: `Session Booking Fee - ${learnerName}`,
            },
            unit_amount: amount,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.SUCCESS_BASE_URL}/schedule?sessionId={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.SUCCESS_BASE_URL}/cancel`,
      metadata: {
        learnerName,
        learnerId,
        educatorId,
        amount: amount.toString(),
        topic,
      },
    });

    res.json({ sessionId: session.id });
  } catch (error) {
    console.error('Stripe session creation error:', error);
    res.status(500).json({ error: 'Failed to create Stripe session' });
  }
}


export async function handleStripeWebhook(req, res) {
  console.log('webhook call');
  
  if (req.method !== 'POST') {
    return res.status(405).send('Method Not Allowed');
  }

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      req.headers['stripe-signature'],
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error('Webhook Error:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const metadata = session.metadata;
  
    const { learnerId, educatorId, topic} = metadata;
  
    await PaymentRecord.create({
      stripeSessionId: session.id,
      learnerId,
      educatorId,
      topic,
      amountPaid: parseInt(session.amount_total), 
    });
    
  }
  

  res.status(200).json({ received: true });
}


export async function finalizeSessionAfterPayment(req, res) {
  const { sessionId, scheduledAt } = req.body;
console.log('sessionId:', sessionId);

  try {
    const record = await PaymentRecord.findOne({ stripeSessionId: sessionId });
console.log(record);

    if (!record) {
      return res.status(404).json({ message: "Payment record not found" });
    }

    // ✅ Create actual Zoom meeting
    const zoomData = await createZoomMeeting({
      topic: record.topic,
      scheduledAt
    });

    // ✅ Save session in DB
    const session = await SessionModel.create({
      topic: record.topic,
      learnerId: record.learnerId,
      educatorId: record.educatorId,
      scheduledAt: new Date(scheduledAt),
      zoomMeetingId: zoomData.zoomMeetingId,
      zoomJoinUrl: zoomData.zoomJoinUrl,
      zoomStartUrl: zoomData.zoomStartUrl,
      status: 'scheduled',
    });

const amountToCredit = record.amountPaid; 

await EducatorUserModel.findByIdAndUpdate(record.educatorId, {
  $inc: { wallet: amountToCredit }
});

    
    await WalletTransactionModel.create({
      educator: record.educatorId,
      type: 'credit',
      reason: 'session',
      amount: amountToCredit,
    });
    
    // ✅ Clean up temp payment record
    await PaymentRecord.deleteOne({ _id: record._id });

    // Get current month short name (e.g., "May")
const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const currentMonth = monthNames[new Date().getMonth()];

// Credit revenue to Admin
const platformRevenue = Math.floor(record.amountPaid); // Example: platform gets 100%

const admin = await AdminModel.findOne(); // get first admin (adjust if multi-admin)

if (admin) {
  const existingMonth = admin.revenue.find(r => r.month === currentMonth);

  if (existingMonth) {
    existingMonth.revenue += platformRevenue;
  } else {
    admin.revenue.push({ month: currentMonth, revenue: platformRevenue });
  }

  await admin.save();
}

    res.status(200).json({ message: "Session scheduled", session });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to schedule session" });
  }
}


export const createConnectedAccount = async (educator) => {
  const account = await stripe.accounts.create({
    type: 'custom',
    country: educator.country || 'GB', 
    email: educator.email,
    business_type: 'individual',
    capabilities: {
      transfers: { requested: true },
    },
  });

  return account.id;
};

export const payoutToEducator = async (req, res) => {
  try {
    const { educatorId, amount } = req.body;
    const educator = await EducatorUserModel.findById(educatorId);

    if (!educator) {
      return res.status(404).json({ message: 'Educator not found' });
    }

    if (!educator.stripeAccountId) {
      return res.status(400).json({ message: 'Educator has no Stripe account' });
    }

    const payoutAmount = Math.floor(Number(amount) * 100);
    if (!payoutAmount || payoutAmount < 100) {
      return res.status(400).json({ message: 'Invalid payout amount' });
    }

    if (educator.wallet < amount) {
      return res.status(400).json({ message: 'Insufficient wallet balance' });
    }

    // Transfer from platform to educator Stripe account
    const transfer = await stripe.transfers.create({
      amount: payoutAmount,
      currency: educator.currency || 'gbp',
      destination: educator.stripeAccountId,
      description: 'Educator Payout',
    });

    educator.wallet -= amount;
    await educator.save();

    // Optional: save transfer info to your own DB

    res.status(200).json({ success: true, transfer });
  } catch (err) {
    console.error('Stripe payout error:', err);
    res.status(500).json({ message: 'Payout failed' });
  }
};

