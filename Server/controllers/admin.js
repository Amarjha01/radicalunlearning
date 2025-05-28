import { EducatorUserModel , LearnerUserModel ,  WithdrawelRequestModel} from "../models/user.js";
import jwt from 'jsonwebtoken'

import Stripe from 'stripe';
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
  const ipAddress = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    const educator = await EducatorUserModel.findOne({ email });

    if (!educator) {
      return res.status(404).json({
        message: 'Educator not found',
        success: false,
        error: true,
      });
    }
if(educator.serviceType === "Paid"){
    // If Stripe account doesn't exist, create one
// 1. Create the Custom Connect account
const account = await stripe.accounts.create({
  type: 'custom',
  country: educator.country ,
  email: educator.email,
  business_type: 'individual',
  individual: {
    first_name: educator.name.split(' ')[0] || educator.name,
    last_name: educator.name.split(' ')[1] || 'LastName',
    email: educator.email,
    phone: educator.phone,
    dob: {
      day: educator.dob?.day,
      month: educator.dob?.month,
      year: educator.dob?.year,
    },
    address: {
      line1: educator.address?.line1,
      city: educator.address?.city,
      postal_code: educator.address?.postal_code,
      country: educator.address?.country ,
    },
  },
  capabilities: {
    transfers: { requested: true },
  },
  tos_acceptance: {
    date: Math.floor(Date.now() / 1000),
    ip: ipAddress, // Make sure you capture IP from request
  },
});

// 2. Create a bank token for the educator's UK account
const bankToken = await stripe.tokens.create({
  bank_account: {
    country: 'GB',
    currency: 'GBP',
    account_holder_name: educator.name,
    account_holder_type: 'individual',
    routing_number: educator.ifscCode, // e.g., '108800'
    account_number: educator.bankAccount, // e.g., '00012345'
  },
});

// 3. Attach the external bank account to the custom Stripe account
await stripe.accounts.createExternalAccount(account.id, {
  external_account: bankToken.id,
});

// 4. Save the account ID in your DB (optional but highly recommended)
educator.stripeAccountId = account.id;
await educator.save();
}


    // ✅ Mark educator as approved
    educator.Approved = true;
    await educator.save();

    res.status(200).json({
      message: 'Educator approved and Stripe account created',
      success: true,
      error: false,
    });
  } catch (error) {
    res.status(500).json({
      message: `Error while approving educator: ${error}`,
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
    const { requestId, action } = req.body; // action = "approve" or "reject"
  
    const request = await WithdrawelRequestModel.findById(requestId);
    if (!request || request.status !== 'pending') {
      return res.status(404).json({ message: 'Request not found or already processed' });
    }
  
    const educator = await EducatorUserModel.findById(request.educator);
    if (!educator) {
      return res.status(404).json({ message: 'Educator not found' });
    }
  
    if (action === 'approve') {
      // Debit wallet
      if (educator.wallet < request.amount) {
        return res.status(400).json({ message: 'Wallet balance is insufficient' });
      }
  
      educator.wallet -= request.amount;
      await educator.save();
  
      await WalletTransactionModel.create({
        educator: educator._id,
        type: 'debit',
        reason: 'withdrawal',
        amount: request.amount
      });
  
      request.status = 'paid';
      request.processedAt = new Date();
      await request.save();
  
      // Later, you can integrate actual payment API like Razorpay/PayPal here
  
      return res.json({ message: 'Withdrawal approved and processed' });
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
      .populate('educator', 'name email payoutMethod');
      
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