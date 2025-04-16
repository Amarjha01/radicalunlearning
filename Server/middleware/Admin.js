import { AdminModel } from "../models/user.js";

export const admin = async(request,response,next)=>{
    try {
       const  userId = request?.body?._id || request?.query?._id

       const user = await AdminModel.findById(userId);
       if(!user){
            return response.status(400).json({
                message : "Permission denial only Admin has permision",
                error : true,
                success : false
            })
       }

       next()

    } catch (error) {
        return response.status(500).json({
            message : "Permission denial",
            error : true,
            success : false
        })
    }
}