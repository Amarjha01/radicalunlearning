import { EducatorUserModel , LearnerUserModel ,  WithdrawelRequestModel , WalletTransactionModel, AdminModel} from "../models/user.js";
import jwt from 'jsonwebtoken'

import Stripe from 'stripe';
import { sendEmail } from "../utils/emailSender.js";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// get all educator data
export  const getAllEducatorData = async (req, resp) => {

    try {
        const allEducatorData = await EducatorUserModel.find().select('name email subrole role country Approved createdAt');
        // console.log('All Educator Data:', allEducatorData);
        resp.status(200).json({
            message : ' all educator data is here!',
            data : allEducatorData,
            success : true,
            error : false
        })
        
    } catch (error) {
        console.log('error:', error);
        resp.status(500).json({
            message: 'someting went wrong',
            error : error,
            success : false,
            error : true
        })
    }
};
// get all learner data
export  const getAllLearnerData = async (req, resp) => {

    try {

        const allEducatorData = await LearnerUserModel.find().select('name email subrole role country createdAt');
        resp.status(200).json({
            message : ' all learner data is here!',
            data : allEducatorData,
            success : true,
            error : false
        })
        
    } catch (error) {
        console.log('error:', error);
        resp.status(500).json({
            message: 'someting went wrong',
            error : error,
            success : false,
            error : true
        })
    }
};
// delete user
export const deleteUser = async (req , resp) =>{
    try {
        const {role , email} = req.query;
         console.log(role, email)
        let user = ''
        if(role === "educator"){
             user = await EducatorUserModel.deleteOne({email})
             console.log("ok")
        }else {
             user = await LearnerUserModel.deleteOne({email})
        }

        resp.status(200).json({
            message: 'Deleted successfull',
            data : user,
            error : false,
            success : true

        })
    } catch (error) {
        resp.status(500).json({
            message : 'something went wrong',
            error : error,
            success : false,
            error : true
        })
    }
}
// suspend/unsuspend user
export const suspendUser = async (req, resp) => {
  try {
    const { role, _id } = req.body;

    let userModel;
    let userType;

    if (role?.toUpperCase() === "EDUCATOR") {
      userModel = EducatorUserModel;
      userType = "Educator";
    } else {
      userModel = LearnerUserModel;
      userType = "Learner";
    }

    // Find the user first
    const user = await userModel.findById(_id);
    if (!user) {
      return resp.status(404).json({
        message: `${userType} not found`,
        success: false
      });
    }

    // Toggle suspension status
    const newStatus = user.suspended === 'YES' ? 'NO' : 'YES';

    const updatedUser = await userModel.findOneAndUpdate(
      { _id },
      { suspended: newStatus },
      { new: true }
    );

    // console.log(`${newStatus === 'YES' ? 'Suspended' : 'Unsuspended'} user: `, updatedUser);

    return resp.status(200).json({
      message: `${userType} ${newStatus === 'YES' ? 'suspended' : 'unsuspended'} successfully`,
      user: updatedUser,
      success: true
    });

  } catch (error) {
    console.error("Suspend error:", error);
    return resp.status(500).json({
      message: 'Something went wrong',
      error: error.message || error,
      success: false
    });
  }
};


 
// Approve educator
export const approveEducator = async (req, res) => {
  try {
    const { email } = req.body;
    const ipAddress = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
    const educator = await EducatorUserModel.findOne({ email });

    if (!educator) {
      return res.status(404).json({
        message: "Educator not found",
        success: false,
        error: true,
      });
    }

    let stripeAccountId;

    // if (educator.serviceType === "Paid" && !educator.stripeAccountId) {
    //   // 1. Create Stripe Connect Custom Account
    //   const account = await stripe.accounts.create({
    //     type: "custom",
    //     country: educator.country,
    //     email: educator.email,
    //     business_type: "individual",
    //     individual: {
    //       first_name: educator.name.split(" ")[0] || educator.name,
    //       last_name: educator.name.split(" ")[1] || "LastName",
    //       email: educator.email,
    //       phone: educator.phone,
    //       dob: {
    //         day: educator.dob?.day,
    //         month: educator.dob?.month,
    //         year: educator.dob?.year,
    //       },
    //       address: {
    //         line1: educator.address?.line1,
    //         city: educator.address?.city,
    //         postal_code: educator.address?.postal_code,
    //         country: educator.address?.country,
    //       },
    //     },
    //     capabilities: {
    //       transfers: { requested: true },
    //     },
    //     tos_acceptance: {
    //       date: Math.floor(Date.now() / 1000),
    //       ip: ipAddress,
    //     },
    //   });

    //   // console.log("✅ Stripe account created:", account.id);
    //   stripeAccountId = account.id;

    //   // 2. Create Bank Token
    //   const bankToken = await stripe.tokens.create({
    //     bank_account: {
    //       country: "GB",
    //       currency: "GBP",
    //       account_holder_name: educator.name,
    //       account_holder_type: "individual",
    //       routing_number: educator.ifscCode,
    //       account_number: educator.bankAccount,
    //     },
    //   });

    //   // console.log("✅ Bank token created:", bankToken.id);

    //   // 3. Attach external bank account
    //   await stripe.accounts.createExternalAccount(account.id, {
    //     external_account: bankToken.id,
    //   });

    //   // 4. Save Stripe account ID
    //   educator.stripeAccountId = account.id;
    //   await educator.save();
    // } else {
    //   stripeAccountId = educator.stripeAccountId;
    // }
// -----------------------------------------------------------------------
    // 5. Create Stripe onboarding link
    // const accountLink = await stripe.accountLinks.create({
    //   account: stripeAccountId,
    //   refresh_url: "https://yourdomain.com/stripe/refresh", // Replace with real route
    //   return_url: "https://yourdomain.com/dashboard",       // Replace with real route
    //   type: "account_onboarding",
    // });

    // console.log("✅ Onboarding link created:", accountLink.url);

    // 6. Mark educator as approved
    educator.Approved = true;
    await educator.save();

    // 7. Send modern email with the onboarding link
  const subject = "Welcome to Our Educator Platform!";

const html = `
<div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #2c3e50; background-color: #faf3dd; padding: 20px; margin: 0;">
    <div style="max-width: 800px; margin: 0 auto; background: linear-gradient(135deg, #faf3dd 0%, #ffffff 100%); border-radius: 20px; box-shadow: 0 20px 40px rgba(0,0,0,0.1); overflow: hidden;">
        
        <!-- Header Section -->
        <div style="background: linear-gradient(135deg, #f2c078 0%, #b4c0b2 100%); padding: 40px 30px; text-align: center;">
            <div style="font-size: 48px; margin-bottom: 16px; display: block;">🎉</div>
            <h1 style="font-size: 28px; font-weight: 700; color: #2c3e50; margin: 0 0 12px 0; text-shadow: 0 2px 4px rgba(0,0,0,0.1);">Welcome ${educator.name}!</h1>
            <p style="font-size: 16px; color: #34495e; opacity: 0.9; font-weight: 400; margin: 0;">You're now part of our educator community</p>
        </div>
        
        <!-- Content Section -->
        <div style="padding: 40px 30px; background: #ffffff;">
            <p style="font-size: 16px; color: #2c3e50; margin-bottom: 32px; line-height: 1.7; margin-top: 0;">
                Congratulations! You've been approved as an educator on our platform. 
                We're thrilled to have you join our community of passionate educators who are making a difference in learning.
            </p>
            
            <p style="font-size: 16px; color: #2c3e50; margin: 30px 0; text-align: center; font-weight: 500;">
                🚀 We're excited to see the amazing session you'll provide!
            </p>
            
            <!-- Signature -->
            <div style="margin-top: 40px; padding-top: 20px; border-top: 2px solid #faf3dd; text-align: center;">
                <p style="font-size: 16px; color: #2c3e50; font-weight: 600; margin: 0;">– The Education Platform Team</p>
            </div>
        </div>
        
        <!-- Footer -->
        <div style="background: linear-gradient(135deg, #b4c0b2 0%, #f2c078 100%); padding: 20px 30px; text-align: center;">
            <p style="font-size: 12px; color: #2c3e50; opacity: 0.8; margin: 0;">
                This email was sent to ${educator.email} | Education Platform © 2025
            </p>
        </div>
    </div>
</div>
`;

await sendEmail(educator.email, subject, html);

    res.status(200).json({
      message: "Educator approved and onboarding link sent",
      success: true,
      error: false,
    });
  } catch (error) {
    console.error("❌ Error approving educator:", error);
    res.status(500).json({
      message: `Error while approving educator: ${error.message}`,
      success: false,
      error: true,
    });
  }
};




export const getEducatorDataDetails = async(req, res) =>{
    try {
        const {email , _id} = req.body;
        console.log("educ",email,_id)
        const response = await EducatorUserModel.findOne({email:email});
        console.log(response)
        res.status(200).json({
            message:`fetched user details successfully for this email ${email} `,
            data:response,
            success:true,
            error:false
        })
    } catch (error) {
        res.status(500).json({
            message:"failed to fetch data",
            error:true,
            success:false
        })
    }
}
export const getlearnerDataDetails = async(req, res) =>{
    try {
        const {email , _id} = req.body;
        console.log("learner : ",email,_id)
        const response = await LearnerUserModel.findOne({email:email});
        console.log(response)
        res.status(200).json({
            message:`fetched user details successfully for this email ${email} `,
            data:response,
            success:true,
            error:false
        })
    } catch (error) {
        res.status(500).json({
            message:"failed to fetch data",
            error:true,
            success:false
        })
    }
}

// processWithdrawRequest
export async function processWithdrawRequest(req, res) {
  const { requestId, action } = req.body;

  const request = await WithdrawelRequestModel.findById(requestId).populate('educator', 'stripeAccountId');
  console.log('processWithdrawRequest', request );
  console.log('amount', request.amount );
  
  if (!request || request.status !== 'pending') {
    return res.status(404).json({ message: 'Request not found or already processed' });
  }

  const educator = await EducatorUserModel.findById(request.educator);
  if (!educator) {
    return res.status(404).json({ message: 'Educator not found' });
  }

  if (action === 'approve') {
    if (educator.wallet < request.amount) {
      return res.status(400).json({ message: 'Wallet balance is insufficient' });
    }

    try {
      // 💸 Stripe Payout
      const balance = await stripe.balance.retrieve();
console.log(balance);

      const transfer = await stripe.transfers.create({
        amount: Math.round(request.amount * 100), 
        currency: 'GBP',
        destination: educator.stripeAccountId, 
        description: `Payout for withdrawal request ${request._id}`,
      });

      // Update wallet and DB
      educator.wallet -= request.amount;
      await educator.save();

      await WalletTransactionModel.create({
        educator: educator._id,
        type: 'debit',
        reason: 'withdrawal',
        amount: request.amount,
        stripeTransferId: transfer.id // optional: save Stripe transfer ID
      });

      request.status = 'paid';
      request.processedAt = new Date();
      await request.save();

      return res.json({ message: 'Withdrawal approved and payout completed via Stripe' });
    } catch (error) {
      console.error('Stripe payout error:', error);
      return res.status(500).json({ message: 'Payout failed', error: error.message });
    }
  } else {
    request.status = 'rejected';
    await request.save();
    return res.json({ message: 'Withdrawal rejected' });
  }
}
  
//   view  withdrawel requests
export async function getWithdrawelRequests(req, res) {
    try {
      const pendingRequests = await WithdrawelRequestModel.find({ status: 'pending' })
      .populate('educator', 'name email payoutMethod ');
      
      res.status(200).json(pendingRequests);
    } catch (error) {
      console.error('Error fetching pending withdrawal requests:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  export async function  markAsPaid(req , res) {
    try {
      const {RequestID} = req.body;
      const markaspaid = await WithdrawelRequestModel.findOneAndUpdate({RequestID},  {status : "Paid"})
      res.status(200).json({
        message:"paid successfully",
        status: true,
        error:false
      })
        if (!updatedRequest) {
      return res.status(404).json({
        message: "Withdrawal request not found",
        status: false,
        error: true
      });
    }
    } catch (error) {
       console.error("Error in markAsPaid:", error);
    res.status(500).json({
      message: "Internal Server Error",
      status: false,
      error: true
    });
      
    }
  }

  export async function  markAsRejected(req , res) {
    try {
      const {RequestID} = req.body;
      const markaspaid = await WithdrawelRequestModel.findOneAndUpdate({RequestID},  {status : "rejected"})
      res.status(200).json({
        message:"rejected successfully",
        status: true,
        error:false
      })
        if (!updatedRequest) {
      return res.status(404).json({
        message: "Withdrawal request not found",
        status: false,
        error: true
      });
    }
    } catch (error) {
       console.error("Error in markAseRjected:", error);
    res.status(500).json({
      message: "Internal Server Error",
      status: false,
      error: true
    });
      
    }
  }
  
export async function initiate(params) {
  
}

// fetching revenue data
export async function getRevenueData(req, res) {
  try {
    const token = req.cookies.accessToken;

    if (!token) {
      return res.status(401).json({
        message: "Unauthorized",
        error: true,
        success: false,
      });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return res.status(401).json({
        message: "Invalid or expired token",
        error: true,
        success: false,
      });
    }

    // Get year from query params (default to current year)
    const requestedYear = parseInt(req.query.year) || new Date().getFullYear();

    // Fetch admin data
    const admin = await AdminModel.findById(decoded.id).select("revenue revenueByYear");

    if (!admin) {
      return res.status(404).json({
        message: "Admin not found",
        error: true,
        success: false,
      });
    }

    let revenueData = [];
    let availableYears = [];

    // Check if new structure exists
    if (admin.revenueByYear && admin.revenueByYear.length > 0) {
      // Get available years
      availableYears = admin. revenueByYear.map(item => item.year).sort((a, b) => b - a);
      
      // Find data for requested year
      const yearData = admin.revenueByYear.find(item => item.year === requestedYear);
      revenueData = yearData ? yearData.months : [];
    } else if (admin.revenue && admin.revenue.length > 0) {
      // Fallback to legacy structure (assume current year)
      revenueData = admin.revenue;
      availableYears = [new Date().getFullYear()];
    }

    // Calculate total revenue for the year
    const totalRevenue = revenueData.reduce((sum, item) => sum + (item.revenue || 0), 0);
    
    // Get current month revenue
    const currentMonth = new Date().toLocaleString('default', { month: 'short' });
    const currentMonthData = revenueData. find(item => item.month === currentMonth);
    const monthlyRevenue = currentMonthData ? currentMonthData.revenue :  0;

    return res.status(200).json({
      message: "Revenue data fetched successfully",
      data: {
        revenueChart: revenueData || [],
        totalRevenue,
        monthlyRevenue,
        currentYear: requestedYear,
        availableYears,
      },
      error: false,
      success: true,
    });
  } catch (error) {
    console.error("Error fetching revenue data:", error);
    return res.status(500).json({
      message: "Internal server error",
      error: true,
      success:  false,
    });
  }
}