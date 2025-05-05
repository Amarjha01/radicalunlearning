import { EducatorUserModel , LearnerUserModel ,  WithdrawelRequestModel} from "../models/user.js";

import jwt from 'jsonwebtoken'
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
// suspend user
export const suspendUser = async (req , resp) =>{
    try {
        const { role , email} = req.body;
        if(role === "EDUCATOR"){
            const educatorData = await EducatorUserModel.findOneAndUpdate({email} , {suspended : 'YES'} , {new : true});
            console.log("suspended user : ", educatorData)
        }else {
            const learnerData = await LearnerUserModel.findOneAndUpdate({email} , {suspended : 'YES'} , {new : true});
            console.log("suspended user : ", learnerData)
        }
    } catch (error) {
        resp.status(500).json({
            message : 'something went wrong',
            error : error,
            success : false,
            error : true
        })
    }
}
 
// Approve educator
export const approveEducator = async (req, res) =>{
    try {
        const {email} = req.body;
        console.log(email)
        await EducatorUserModel.updateOne({email},{Approved:true})
        res.status(200).json({
            message: 'Approved',
            success:true,
            error:false
        })
    } catch (error) {
        res.status(500).json({
            message:'error while approving educator',
            success:false,
            error:true
        })
    }
}

export const getEducatorDataDetails = async(req, res) =>{
    try {
        const {email , _id} = req.body;
        console.log(email,_id)
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
  