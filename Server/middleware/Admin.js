import { AdminModel } from "../models/user.js";
import jwt from 'jsonwebtoken'
export const admin = async(request,response,next)=>{
    try {
    
    const token = request.cookies.accessToken;
    if(!token){
        return response.status(401).json({message:'please login'})
    }
    const {id} = jwt.verify(token , process.env.JWT_SECRET)
    console.log(id);
    
       const user = await AdminModel.findById(id);
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