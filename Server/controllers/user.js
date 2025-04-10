import {LearnerUserModel , EducatorUserModel , AdminModel} from '../models/user.js';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

// LearnerUserController-registration
export async function registerLearnerController(request,response){
    try {
        const  { name, email, role , country , language , dob, subjects , whatToLearn ,  needExpert , needCoach , bio , password , terms1 , terms2 , terms3  } = request.body
        console.log('request.body:', request.body)
        if(!name || !email || !password){
            return response.status(400).json({
                message : "provide email, name, password",
                error : true,
                success : false
            })
        }

        const user = await LearnerUserModel.findOne({ email })

        if(user){
            return response.json({
                message : "Already register email",
                error : true,
                success : false
            })
        }

        const salt = await bcryptjs.genSalt(10)
        const hashPassword = await bcryptjs.hash(password,salt)

        const payload = {
            name,
            email,
            role , country , language , dob , subjects,  whatToLearn , needExpert , needCoach , bio, terms1 , terms2 , terms3, 
            password : hashPassword
        }

        const newUser = new LearnerUserModel(payload)
        const save = await newUser.save()

        // const VerifyEmailUrl = `${process.env.FRONTEND_URL}/verify-email?code=${save?._id}`

        // const verifyEmail = await sendEmail({
        //     sendTo : email,
        //     subject : "Verify email from Grocery Store",
        //     html : verifyEmailTemplate({
        //         name,
        //         url : VerifyEmailUrl
        //     })
        // })

        return response.json({
            message : "User register successfully",
            error : false,
            success : true,
            data : save
        })

    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}

// needExpertUserController-registration

export async function registerEducatorController(request, response) {
    try {
      const {
        name,
        email,
        password,
        role,
        country,
        language,
        bio,
        experience,
        subjects,
        serviceType,
        payoutMethod,
        upiId,
        bankAccount,
        ifscCode,
        paypalEmail,
        documents,
        terms1,
        terms2,
        terms3,
        terms4,
        terms5,
      } = request.body;
  
      console.log("request.body:", request.body);
  
      // Basic required fields check
      if (!name || !email || !password) {
        return response.status(400).json({
          message: "Please provide name, email, and password",
          error: true,
          success: false,
        });
      }
  
      // Email format validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return response.status(400).json({
          message: "Invalid email format",
          error: true,
          success: false,
        });
      }
  
      // Password length validation
      if (password.length < 8) {
        return response.status(400).json({
          message: "Password must be at least 8 characters long",
          error: true,
          success: false,
        });
      }
  
      // Terms agreement check
      if (!terms1 || !terms2 || !terms3 || !terms4 || !terms5) {
        return response.status(400).json({
          message: "Please accept all terms and conditions",
          error: true,
          success: false,
        });
      }
  
      // Check payout method fields
      if (payoutMethod === "upi" && !upiId) {
        return response.status(400).json({
          message: "UPI ID is required",
          error: true,
          success: false,
        });
      }
  
      if (payoutMethod === "bank" && (!bankAccount || !ifscCode)) {
        return response.status(400).json({
          message: "Bank account and IFSC code are required",
          error: true,
          success: false,
        });
      }
  
      if (payoutMethod === "paypal" && !paypalEmail) {
        return response.status(400).json({
          message: "PayPal email is required",
          error: true,
          success: false,
        });
      }
  
      const normalizedEmail = email.toLowerCase();
      const existingUser = await EducatorUserModel.findOne({ email: normalizedEmail });
  
      if (existingUser) {
        return response.status(400).json({
          message: "Email already registered",
          error: true,
          success: false,
        });
      }
  
      // Hash password
      const salt = await bcryptjs.genSalt(10);
      const hashPassword = await bcryptjs.hash(password, salt);
  
      // Construct user payload
      const payload = {
        name,
        email: normalizedEmail,
        password: hashPassword,
        role,
        country,
        language,
        bio,
        experience,
        subjects,
        serviceType,
        payoutMethod,
        upiId,
        bankAccount,
        ifscCode,
        paypalEmail,
        documents,
        terms1,
        terms2,
        terms3,
        terms4,
        terms5,
      };
  
      // Save user
      const newUser = new EducatorUserModel(payload);
      const savedUser = await newUser.save();
  
      // Remove password from response
      const { password: _, ...userWithoutPassword } = savedUser.toObject();
  
      return response.json({
        message: "User registered successfully",
        error: false,
        success: true,
        data: userWithoutPassword,
      });
  
    } catch (error) {
      return response.status(500).json({
        message: error.message || "Something went wrong",
        error: true,
        success: false,
      });
    }
  }
  


export async function registerAdminController(request,response){
    try {
        const  { name, email , password , role  } = request.body
        console.log('request.body:', request.body)
        if(!name || !email || !password){
            return response.status(400).json({
                message : "provide email, name, password",
                error : true,
                success : false
            })
        }

        const user = await AdminModel.findOne({ email })

        if(user){
            return response.json({
                message : "Already register email",
                error : true,
                success : false
            })
        }

        const salt = await bcryptjs.genSalt(10)
        const hashPassword = await bcryptjs.hash(password,salt)

        const payload = {
            name,
            email,
            role ,
            password : hashPassword
        }

        const newUser = new AdminModel(payload)
        const save = await newUser.save()

        // const VerifyEmailUrl = `${process.env.FRONTEND_URL}/verify-email?code=${save?._id}`

        // const verifyEmail = await sendEmail({
        //     sendTo : email,
        //     subject : "Verify email from Grocery Store",
        //     html : verifyEmailTemplate({
        //         name,
        //         url : VerifyEmailUrl
        //     })
        // })

        return response.json({
            message : "User register successfully",
            error : false,
            success : true,
            data : save
        })

    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}

// loginController-For-All

export async function signin(request, response) {
    try {
        const { email, password } = request.body;
        const role = request.body.role?.toUpperCase();

        
        if (!role || !email || !password) {
            return response.status(400).json({
                message: "Please provide role, email, and password",
                error: true,
                success: false
            });
        }

        let user;
        if (role === "LEARNER") {
            user = await LearnerUserModel.findOne({ email });
        } else if (role === "EDUCATOR") {
            user = await EducatorUserModel.findOne({ email });
        } else if (role === "ADMIN") {
            user = await AdminModel.findOne({ email });
        } else {
            return response.status(400).json({
                message: "Invalid role",
                error: true,
                success: false
            });
        }

        if (!user) {
            return response.status(404).json({
                message: "No user found",
                error: true,
                success: false
            });
        }

        const checkPassword = await bcryptjs.compare(password, user.password);

        if (!checkPassword) {
            return response.status(401).json({
                message: "Invalid password",
                error: true,
                success: false
            });
        }

        const accessToken = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
            expiresIn: "8h"
        });
        const refreshToken = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
            expiresIn: "7d"
        });

        const cookiesOption = {
            httpOnly: true,
            sameSite: 'Strict',
            secure: process.env.NODE_ENV === "production"
        };

        response.cookie("accessToken", accessToken, cookiesOption);
        response.cookie("refreshToken", refreshToken, cookiesOption);

        return response.status(200).json({
            message: `Login successful as ${user.role}`,
            success: true,
            accessToken,
            refreshToken,
            userData: {
                "_id": user._id,
                "Name": user.name,
                "Email": user.email,
                "Role": user.role,
                "Country":user.country,
                "Native Language":user.nativeLanguage,
                "whatToLearn": user.whatToLearn,
                "needExpert": user.needExpert,
                "needCoach": user.needCoach,
                "bio": user.bio,
                "CreatedAt": user.createdAt,
            }
        });   

    } catch (error) {
        console.error("Signin error:", error);
        return response.status(500).json({
            message: "Internal Server Error",
            error: error.message,
            success: false
        });
    }
}

export async function updateUserDetails(request,response){
    try {
        const id = request.id 
        const { name, email, mobile, role, password } = request.body 

        let hashPassword = ""

        if(password){
            const salt = await bcryptjs.genSalt(10)
            hashPassword = await bcryptjs.hash(password,salt)
        }

        if(role === 'LEARNER'){
            const updateUser = await LearnerUserModel.updateOne({ _id : id},{
                ...(name && { name : name }),
                ...(email && { email : email }),
                ...(mobile && { mobile : mobile }),
                ...(password && { password : hashPassword })
            })
        } else if(role === 'EDUCATOR'){
            const updateUser = await EducatorUserModel.updateOne({ _id : userId},{
                ...(name && { name : name }),
                ...(email && { email : email }),
                ...(mobile && { mobile : mobile }),
                ...(password && { password : hashPassword })
            })
        }
      

        return response.json({
            message : "Updated successfully",
            error : false,
            success : true,
            data : updateUser
        })


    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}