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
            currency: 'inr',
            product_data: {
              name: `Session Booking Fee - ${learnerName}`,
            },
            unit_amount: amount * 100,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: 'http://localhost:5173/schedule?sessionId={CHECKOUT_SESSION_ID}',
      cancel_url: 'http://localhost:5173/cancel',
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
console.log(sessionId);

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

const amountToCredit = record.amountPaid; // ✅ Trusted from Stripe

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

    res.status(200).json({ message: "Session scheduled", session });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to schedule session" });
  }
}


