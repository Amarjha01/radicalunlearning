import { EducatorUserModel , LearnerUserModel} from "../models/user.js";

// get all educator data
export  const getAllEducatorData = async (req, resp) => {

    try {
        const allEducatorData = await EducatorUserModel.find();
        console.log('All Educator Data:', allEducatorData);
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

        const allEducatorData = await LearnerUserModel.find();
        console.log('All Educator Data:', allEducatorData);
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
// delete user
export const deleteUser = async (req , resp) =>{
    try {
        const {role , email} = req.body;

        let user = ''
        if(role === "EDUCATOR"){
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