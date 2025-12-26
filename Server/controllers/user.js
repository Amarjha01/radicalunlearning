import {
  LearnerUserModel,
  EducatorUserModel,
  AdminModel,
  SessionModel,
  WithdrawelRequestModel
} from "../models/user.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { sendEmail } from "../utils/emailSender.js";


// --------------------------User-registration-------------------------------------------

export async function registerLearnerController(request, response) {
  try {
    const {
      name,
      email,
      role,
      roleType,
      country,
      language,
      dob,
      subjects,
      whatToLearn,
      needExpert,
      needCoach,
      bio,
      password,
      terms1,
      terms2,
      terms3,
    } = request.body;
    console.log("request.body:", request.body);
    if (!name || !email || !password) {
      return response.status(400).json({
        message: "provide email, name, password",
        error: true,
        success: false,
      });
    }

    const user = await LearnerUserModel.findOne({ email });

    if (user) {
      return response.json({
        message: "Already register email",
        error: true,
        success: false,
      });
    }

    const salt = await bcryptjs.genSalt(10);
    const hashPassword = await bcryptjs.hash(password, salt);

    const payload = {
      name,
      email,
      role,
      roleType,
      country,
      language,
      dob,
      subjects,
      whatToLearn,
      needExpert,
      needCoach,
      bio,
      terms1,
      terms2,
      terms3,
      password: hashPassword,
    };

    const newUser = new LearnerUserModel(payload);
    const save = await newUser.save();

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
      message: "User register successfully",
      error: false,
      success: true,
      data: save,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

export async function registerEducatorController(request, response) { try { const { name, email, password, role, subrole, country, language, phone, dob, address, bio, experience, subjects, serviceType, sessionfee,  documentUrl, videoUrl, profileUrl, terms1, terms2, terms3, terms4, terms5, } = request.body;

// console.log("Received payload:", request.body);

if (!name || !email || !password || !role || !subrole || !country || !language || !bio || !serviceType) {
  return response.status(400).json({
    message: "Missing required fields",
    error: true,
    success: false,
  });
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
if (!emailRegex.test(email)) {
  return response.status(400).json({
    message: "Invalid email format",
    error: true,
    success: false,
  });
}

if (password.length < 8) {
  return response.status(400).json({
    message: "Password must be at least 8 characters",
    error: true,
    success: false,
  });
}

if (!terms1 || !terms2 || !terms3 || !terms4 || !terms5) {
  return response.status(400).json({
    message: "Please accept all terms and conditions",
    error: true,
    success: false,
  });
}

// if (payoutMethod === "upi" && !upiId) {
//   return response.status(400).json({
//     message: "UPI ID is required",
//     error: true,
//     success: false,
//   });
// }

// if (payoutMethod === "bank" && (!bankAccount || !ifscCode)) {
//   return response.status(400).json({
//     message: "Bank account and IFSC code are required",
//     error: true,
//     success: false,
//   });
// }

// if (payoutMethod === "paypal" && !paypalEmail) {
//   return response.status(400).json({
//     message: "PayPal email is required",
//     error: true,
//     success: false,
//   });
// }

// if (payoutMethod === "other" && !otherPayout) {
//   return response.status(400).json({
//     message: "Other payout method details are required",
//     error: true,
//     success: false,
//   });
// }

const normalizedEmail = email.toLowerCase();
const existingUser = await EducatorUserModel.findOne({ email: normalizedEmail });
if (existingUser) {
  return response.status(400).json({
    message: "Email already registered",
    error: true,
    success: false,
  });
}

const salt = await bcryptjs.genSalt(10);
const hashPassword = await bcryptjs.hash(password, salt);

const newUser = new EducatorUserModel({
  name,
  email: normalizedEmail,
  password: hashPassword,
  role,
  subrole,
  country,
  language,
  phone,
  dob,
  address,
  bio,
  experience,
  subjects,
  serviceType,
  sessionfee,
  // payoutMethod,
  // upiId,
  // bankAccount,
  // ifscCode,
  // paypalEmail,
  // otherPayout,
  documentUrl,
  videoUrl,
  profileUrl,
  terms1,
  terms2,
  terms3,
  terms4,
  terms5,
});

const savedUser = await newUser.save();
const { password: _, ...userWithoutPassword } = savedUser.toObject();
const subject = "Welcome to Our Educator Platform!";
const html = `
<div style="margin: 0; padding: 0; display: flex; align-items: center; justify-content: center;  background: linear-gradient(135deg, #f2c078 0%, #b4c0b2 100%); font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif; min-height: 100vh;">
     <div style="padding: 40px 20px; display: flex; align-items: center; justify-content: center; min-height: 100vh;">
    <div style="max-width: 800px; width: 100%; background: rgba(255, 255, 255, 0.98); backdrop-filter: blur(15px); border-radius: 24px; box-shadow: 0 30px 60px rgba(0, 0, 0, 0.15), 0 10px 30px rgba(242, 192, 120, 0.1); overflow: hidden; position: relative; border: 1px solid rgba(255, 255, 255, 0.2);">

      <!-- Decorative top border -->
      <div style="height: 4px; background: linear-gradient(90deg, #f2c078 0%, #b4c0b2 50%, #f2c078 100%);"></div>

      <!-- Header -->
      <div style="background: linear-gradient(135deg, #f2c078 0%, #b4c0b2 100%); padding: 30px 40px 70px; text-align: center; position: relative; overflow: hidden;">
        <!-- Decorative SVG background -->
        <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: url('data:image/svg+xml,<svg xmlns=&quot;http://www.w3.org/2000/svg&quot; viewBox=&quot;0 0 100 100&quot;><defs><pattern id=&quot;grain&quot; width=&quot;100&quot; height=&quot;100&quot; patternUnits=&quot;userSpaceOnUse&quot;><circle cx=&quot;20&quot; cy=&quot;20&quot; r=&quot;1.5&quot; fill=&quot;%23ffffff&quot; opacity=&quot;0.1&quot;/><circle cx=&quot;80&quot; cy=&quot;30&quot; r=&quot;1&quot; fill=&quot;%23ffffff&quot; opacity=&quot;0.08&quot;/><circle cx=&quot;60&quot; cy=&quot;70&quot; r=&quot;0.8&quot; fill=&quot;%23ffffff&quot; opacity=&quot;0.06&quot;/><circle cx=&quot;30&quot; cy=&quot;80&quot; r=&quot;1.2&quot; fill=&quot;%23ffffff&quot; opacity=&quot;0.09&quot;/></pattern></defs><rect width=&quot;100&quot; height=&quot;100&quot; fill=&quot;url(%23grain)&quot;/></svg>');"></div>
        <div style="position: absolute; top: 20px; left: 20px; width: 60px; height: 60px; background: rgba(255, 255, 255, 0.1); border-radius: 50%; backdrop-filter: blur(10px);"></div>
        <div style="position: absolute; top: 40px; right: 30px; width: 40px; height: 40px; background: rgba(255, 255, 255, 0.08); border-radius: 50%; backdrop-filter: blur(8px);"></div>
        <div style="position: absolute; bottom: 30px; left: 50px; width: 20px; height: 20px; background: rgba(255, 255, 255, 0.12); border-radius: 50%;"></div>

        <div style="position: relative; z-index: 1;">
          <div style="width: 90px; height: 90px; background: rgba(255, 255, 255, 0.25); border-radius: 50%; margin: 0 auto 24px; display: flex; align-items: center; justify-content: center; backdrop-filter: blur(15px); border: 3px solid rgba(255, 255, 255, 0.3); box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);">
            <span style="font-size: 36px;">🎓</span>
          </div>
          <h1 style="color: #2c3e50; font-size: 32px; font-weight: 800; margin: 0;">Welcome to Our Platform!</h1>
          <p style="color: #34495e; font-size: 18px; margin-top: 16px;">Your educator journey begins here</p>
        </div>
      </div>

      <!-- Main Content -->
      <div style="padding: 30px 20px; margin-top: -25px; position: relative; z-index: 2; background: #ffffff;">
        <div style="background: linear-gradient(135deg, #faf3dd 0%, #ffffff 100%); border-radius: 20px; padding: 25px; box-shadow: 0 15px 40px rgba(0, 0, 0, 0.08), 0 5px 15px rgba(242, 192, 120, 0.1); margin-bottom: 36px; border: 1px solid rgba(242, 192, 120, 0.1); position: relative; overflow: hidden;">
          <div style="position: relative; z-index: 1;">
            <h2 style="color: #2c3e50; font-size: 26px; font-weight: 700; display: flex; align-items: center; gap: 16px;">
              <span style="background: linear-gradient(135deg, #f2c078, #b4c0b2); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">🎉</span>
              Congratulations, ${name}!
            </h2>
            <p style="color: #4a5568; font-size: 17px; margin-top: 20px;">
              You have successfully signed up as an educator on our platform. We're absolutely thrilled to have you join our community of passionate educators who are making a real difference in the world of learning!
            </p>

            <!-- What's Next -->
            <div style="background: #f8f9fa; border-left: 5px solid #f2c078; padding: 20px; border-radius: 16px; margin: 28px 0;">
              <h3 style="color: #2c3e50; font-size: 20px; font-weight: 700; display: flex; align-items: center; gap: 12px;">
                <span style="background: linear-gradient(135deg, #f2c078, #b4c0b2); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">⏳</span>
                What's Next?
              </h3>
              <p style="color: #4a5568; font-size: 16px; margin-top: 16px;">
                Our team is currently reviewing your documents and verifying your credentials with the utmost care. This process typically takes 1–2 business days to ensure the highest quality standards.
              </p>
              <p style="color: #4a5568; font-size: 16px;">
                Once approved, you'll receive an email and can begin teaching right away.
              </p>
            </div>

            <!-- Pro Tip -->
            <div style="background: rgba(242, 192, 120, 0.08); border-radius: 16px; padding: 24px; margin: 28px 0;">
              <p style="color: #4a5568; font-size: 15px;">
                <span style="font-size: 20px; margin-right: 10px;">💡</span>
                <strong>Pro tip:</strong> While you wait, explore our educator resources and community guidelines in your welcome packet.
              </p>
            </div>
          </div>
        </div>

        <!-- Buttons -->
        <div style="text-align: center;">
          <a href="https://radical-unlearning.com/dashboard/educator" style="display: inline-block; background: linear-gradient(135deg, #f2c078 0%, #b4c0b2 100%); color: #2c3e50; text-decoration: none; padding: 18px 36px; border-radius: 50px; font-weight: 700; font-size: 16px; margin: 0 10px 12px; text-transform: uppercase;">Visit Dashboard</a>
          <a href="https://radical-unlearning.com/dashboard/educator" style="display: inline-block; background: #ffffff; color: #2c3e50; text-decoration: none; padding: 18px 36px; border-radius: 50px; font-weight: 700; font-size: 16px; border: 2px solid #f2c078; margin: 0 10px 12px; text-transform: uppercase;">Download Resources</a>
        </div>
      </div>

      <!-- Footer -->
      <div style="background: linear-gradient(135deg, #faf3dd 0%, #f8f9fa 100%); padding: 40px; border-top: 1px solid rgba(242, 192, 120, 0.2); text-align: center;">
        <p style="color: #4a5568; font-size: 16px;">Need help? We're here for you!</p>
        <div style="display: flex; justify-content: center; gap: 32px; flex-wrap: wrap;">
          <a href="#" style="color: #2c3e50; text-decoration: none;">📧 Support Center</a>
          <a href="https://radical-unlearning.com/dashboard/educator" style="color: #2c3e50; text-decoration: none;">💬 Live Chat</a>
          <a href="https://radical-unlearning.com/dashboard/educator" style="color: #2c3e50; text-decoration: none;">📚 Help Docs</a>
        </div>
        <hr style="margin: 32px auto; width: 60%; border: none; height: 2px; background: linear-gradient(90deg, transparent 0%, #f2c078 50%, transparent 100%); opacity: 0.3;" />
        <p style="color: #4a5568; font-size: 16px;">
          Best regards,<br />
          <strong style="color: #2c3e50;">Radical Unlearning Team</strong>
        </p>
        <p style="color: #7a8799; font-size: 13px;">
          © 2025 Radical Unlearning. All rights reserved. <br />
          <a href="https://radical-unlearning.com/dashboard/educator" style="color: #7a8799;">Unsubscribe</a> |
          <a href="https://radical-unlearning.com/dashboard/educator" style="color: #7a8799;">Privacy Policy</a>
        </p>
      </div>
    </div>
  </div>
</div>
`;

await sendEmail(normalizedEmail, subject, html);
return response.status(201).json({
  message: "User registered successfully",
  success: true,
  error: false,
  data: userWithoutPassword,
});



} catch (error) { console.error("Registration error:", error); return response.status(500).json({ message: error.message || "Internal server error", error: true, success: false, }); } }

export async function registerAdminController(request, response) {
  try {
    const { name, email, password, role } = request.body;
    console.log("request.body:", request.body);
    if (!name || !email || !password) {
      return response.status(400).json({
        message: "provide email, name, password",
        error: true,
        success: false,
      });
    }

    const user = await AdminModel.findOne({ email });

    if (user) {
      return response.json({
        message: "Already register email",
        error: true,
        success: false,
      });
    }

    const salt = await bcryptjs.genSalt(10);
    const hashPassword = await bcryptjs.hash(password, salt);

    const payload = {
      name,
      email,
      role,
      password: hashPassword,
    };

    const newUser = new AdminModel(payload);
    const save = await newUser.save();

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
      message: "User register successfully",
      error: false,
      success: true,
      data: save,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}


// -----------------------Controller-For-All---------------------------------------------

export async function signin(request, response) {
  try {
    const { email, password } = request.body;
    const role = request.body.role?.toUpperCase();
    console.log("signin data:", role, password, email);

    if (!role || !email || !password) {
      return response.status(400).json({
        message: "Please provide role, email, and password",
        error: true,
        success: false,
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
        success: false,
      });
    }

    console.log(user);
    

    if (!user) {
      return response.status(404).json({
        message: "No user found",
        error: true,
        success: false,
      });
    }

    if(user?.Approved === false || user?.Approved === "false"){
  return response.status(403).json({
    message: "Your account is not approved yet",
    error: true,
    success: false,
  });
}
    if(user?.suspended === "YES" || user?.suspended === true){
  return response.status(403).json({
    message: "Your account is suspended",
    error: true,
    success: false,
  });
}

    const checkPassword = await bcryptjs.compare(password, user.password);

    if (!checkPassword) {
      return response.status(401).json({
        message: "Invalid password",
        error: true,
        success: false,
      });
    }

    const accessToken = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );
    const refreshToken = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    const cookiesOption = {
      httpOnly: true,
      sameSite: "Lax",
      secure: false,
    };

    response.cookie("accessToken", accessToken, cookiesOption);
    response.cookie("refreshToken", refreshToken, cookiesOption);
    console.log("current user logd in :", user);
    const data = {
      name: user.name,
    };
    return response.status(200).json({
      message: `Login successful as ${user.role}`,
      success: true,
      accessToken,
      refreshToken,

      userData: {
        user: {
          name: user.name,
          email: user.email,
          role: user.role,
          subrole: user.subrole,
          country: user.country,
          language: user.language,
          bio: user.bio,
          experience: user.experience,
          subjects: user.subjects,
          serviceType: user.serviceType,
          sessionfee: user.sessionfee, 
          payoutMethod: user.payoutMethod,
          upiID: user.upiId,
          Approved: user.Approved,
          theme: user.theme,
          wallet: user.wallet,
          avatar: user.avatar,
          revenue: user.revenue,
          _id: user._id,
        },
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Signin error:", error);
    return response.status(500).json({
      message: "Internal Server Error",
      error: error.message,
      success: false,
    });
  }
}

export async function updateUserDetails(req, res) {
  try {
    const token = req.cookies.accessToken;

    if (!token) {
      return res.status(401).json({ message: "Missing access token", error: true, success: false });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      if (err.name === "TokenExpiredError") {
        return res.status(401).json({ message: "Access token expired, please login again", error: true, success: false });
      }
      return res.status(403).json({ message: "Invalid token", error: true, success: false });
    }

    const userId = decoded.id;
    const role = decoded.role.toUpperCase();

    let updateUser;

    if (role === "LEARNER") {
      const { name, email, country, language, bio, avatar } = req.body;
      
      updateUser = await LearnerUserModel.updateOne(
        { _id: userId },
        {
          ...(name && { name }),
          ...(email && { email }),
          ...(country && { country }),
          ...(language && { language }),
          ...(bio && { bio }),
          ...(avatar && { avatar }),
        },
        { new: true }
      );
    } else if (role === "EDUCATOR") {
      const { name, bio, experience, avatar, subrole, language, serviceType, sessionfee } = req.body;

      updateUser = await EducatorUserModel.updateOne(
        { _id: userId },
        {
          ...(name && { name }),
          ...(bio && { bio }),
          ...(experience && { experience }),
          ...(avatar && { avatar }),
          ...(subrole && { subrole }),
          ...(language && { language }),
          ...(serviceType && { serviceType }),
          ...(sessionfee && { sessionfee: Number(sessionfee) }),
        },
        { new: true }
      );
      if (sessionfee) {
        await SessionModel.updateMany(
          { educatorId: userId }, 
          { $set: { sessionfee: Number(sessionfee) } },
        );
      }
    }

    return res.status(200).json({
      message: "Updated successfully",
      error: false,
      success: true,
      data: updateUser,
    });
  } catch (error) {
    console.error("Error updating user:", error);
    return res.status(500).json({
      message: "Internal server error",
      error: true,
      success: false,
    });
  }
}
// Update Password Function 
export async function updatePassword(req, res) {
  try {
    const token = req.cookies.accessToken;

    if (!token) {
      return res.status(401).json({ 
        message: "Unauthorized - No token provided", 
        error: true, 
        success: false 
      });
    }

    // Verify JWT token
    let decoded;
    try {
      decoded = jwt. verify(token, process.env. JWT_SECRET);
    } catch (err) {
      if (err.name === "TokenExpiredError") {
        return res.status(401).json({ 
          message: "Access token expired, please login again", 
          error: true, 
          success: false 
        });
      }
      return res. status(403).json({ 
        message: "Invalid token", 
        error: true, 
        success: false 
      });
    }

    const userId = decoded.id;
    const role = decoded.role?. toUpperCase();
    const { currentPassword, newPassword } = req. body;

    // Validation
    if (!currentPassword || ! newPassword) {
      return res.status(400).json({ 
        message: "Current password and new password are required", 
        error: true, 
        success: false 
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ 
        message: "New password must be at least 6 characters", 
        error: true, 
        success: false 
      });
    }

    // Find user based on role
    let user;
    if (role === "LEARNER") {
      user = await LearnerUserModel.findById(userId);
    } else if (role === "EDUCATOR") {
      user = await EducatorUserModel.findById(userId);
    } else if (role === "ADMIN") {
      user = await AdminModel. findById(userId);
    } else {
      return res.status(400).json({ 
        message: "Invalid role", 
        error: true, 
        success: false 
      });
    }

    if (!user) {
      return res.status(404).json({ 
        message: "User not found", 
        error: true, 
        success: false 
      });
    }

    // Verify current password
    const isPasswordValid = await bcryptjs.compare(currentPassword, user.password);
    
    if (!isPasswordValid) {
      return res.status(400).json({ 
        message: "Current password is incorrect", 
        error: true, 
        success: false 
      });
    }

    // Hash new password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs. hash(newPassword, salt);

    // Update password
    user.password = hashedPassword;
    await user.save();

    return res.status(200).json({ 
      message: "Password updated successfully", 
      error: false, 
      success:  true 
    });

  } catch (error) {
    console.error("Password update error:", error);
    return res.status(500).json({ 
      message: "Internal server error", 
      error: error.message, 
      success: false 
    });
  }
}

// SELF-DELETE FUNCTION
export async function deleteAccount(req, res) {
  try {
    const token = req.cookies.accessToken;

    if (!token) {
      return res.status(401).json({ 
        message: "Unauthorized - No token provided", 
        error: true, 
        success: false 
      });
    }

    // Verify JWT token
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      if (err.name === "TokenExpiredError") {
        return res.status(401).json({ 
          message: "Access token expired, please login again", 
          error: true, 
          success:  false 
        });
      }
      return res.status(403).json({ 
        message: "Invalid token", 
        error: true, 
        success:  false 
      });
    }

    const userId = decoded.id;
    const role = decoded.role?. toUpperCase();
    const { password } = req.body;

    // Password confirmation required
    if (! password) {
      return res. status(400).json({ 
        message: "Password is required to delete account", 
        error:  true, 
        success: false 
      });
    }

    // Find user based on role
    let user;
    let deletedUser;
    
    if (role === "LEARNER") {
      user = await LearnerUserModel.findById(userId);
      if (!user) {
        return res.status(404).json({ 
          message: "User not found", 
          error:  true, 
          success: false 
        });
      }

      // Verify password
      const isPasswordValid = await bcryptjs.compare(password, user. password);
      if (!isPasswordValid) {
        return res. status(400).json({ 
          message: "Incorrect password", 
          error:  true, 
          success: false 
        });
      }

      // Delete user
      deletedUser = await LearnerUserModel.findByIdAndDelete(userId);
      
    } else if (role === "EDUCATOR") {
      user = await EducatorUserModel.findById(userId);
      if (!user) {
        return res.status(404).json({ 
          message: "User not found", 
          error: true, 
          success: false 
        });
      }

      // Verify password
      const isPasswordValid = await bcryptjs.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(400).json({ 
          message: "Incorrect password", 
          error:  true, 
          success: false 
        });
      }

      // Delete user
      deletedUser = await EducatorUserModel.findByIdAndDelete(userId);
    } else {
      return res. status(400).json({ 
        message: "Invalid role", 
        error: true, 
        success: false 
      });
    }

    // Clear cookies
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");

    return res.status(200).json({ 
      message: "Account deleted successfully", 
      error: false, 
      success: true 
    });

  } catch (error) {
    console.error("Account deletion error:", error);
    return res.status(500).json({ 
      message: "Internal server error", 
      error:  error.message, 
      success: false 
    });
  }
}


export async function signout(request, response) {
  console.log('sign out');
  
  try {
    // Clear both access and refresh tokens
    response.clearCookie("accessToken", {
      httpOnly: true,
      sameSite: "Lax",
      secure: false, // set to true if using HTTPS
    });

    response.clearCookie("refreshToken", {
      httpOnly: true,
      sameSite: "Lax",
      secure: false,
    });

    return response.status(200).json({
      message: "Logout successful",
      success: true,
    });
  } catch (error) {
    console.error("Logout error:", error);
    return response.status(500).json({
      message: "Logout failed",
      error: error.message,
      success: false,
    });
  }
}


// -----------------------------search------------------------------------------------
export async function searchEducator(req, res) {
  try {
    const { searchKey } = req.query;

    const educators = await EducatorUserModel.find({
      subjects: { $regex: searchKey, $options: 'i' },
      Approved: true,
      suspended: 'NO'
    })
    .select('name country bio _id subjects documentUrl videoUrl sessionfee');

    if (educators.length > 0) {
      res.status(200).json({
        message: "Here is the list of all educators",
        data: educators,
        error: false,
        success: true
      });
    } else {
      res.status(404).json({
        message: 'No educator found'
      });
    }

  } catch (error) {
    console.log('Error:', error);
    res.status(500).json({
      message: 'Something went wrong',
      error: error.message || error,
      success: false
    });
  }
}



// ------------------------ToDos APIs --------------------------------------------------------
export async function addtodos(req, res) {
  const token = req.cookies.accessToken;
  const { newtodo } = req.body;

  if (!token || !newtodo?.trim()) {
    return res.status(400).json({ message: "Missing token or todo", success: false, error: true });
  }

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Access token expired, please login again.", success: false, error: true });
    }
    return res.status(403).json({ message: "Invalid access token", success: false, error: true });
  }

  try {
    const userId = decoded.id;

    const todoItem = {
      text: newtodo.trim(),
      completed: false,
    };

    const learner = await LearnerUserModel.findByIdAndUpdate(
      userId,
      { $push: { todos: todoItem } },
      { new: true, runValidators: true }
    );

    if (!learner) {
      return res.status(404).json({ message: "Learner not found", success: false, error: true });
    }

    res.status(200).json({
      message: "Todo added successfully",
      data: learner.todos,
      success: true,
      error: false,
    });
  } catch (error) {
    console.error("Error updating todos:", error);
    res.status(500).json({
      message: "Server error",
      error: error.message,
      success: false,
    });
  }
}

export async function fetchtodos(req, res) {
  const token = req.cookies.accessToken;

  if (!token) {
    return res.status(400).json({
      message: "Missing access token",
      success: false,
      error: true,
    });
  }

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({
        message: "Access token expired, please login again",
        success: false,
        error: true,
      });
    }
    return res.status(403).json({
      message: "Invalid access token",
      success: false,
      error: true,
    });
  }

  try {
    const userId = decoded.id;
    const alltodos = await LearnerUserModel.findById(userId).select("todos");

    res.status(200).json({
      message: "Fetched all todos successfully",
      data: alltodos,
      success: true,
      error: false,
    });
  } catch (error) {
    console.error("Failed to fetch todos:", error);
    res.status(500).json({
      message: "Failed to fetch todos",
      error: true,
      success: false,
      data: null,
    });
  }
}

export async function deletetodos(req, res) {
  const token = req.cookies.accessToken;
  const { todoid } = req.body;

  if (!token || !todoid) {
    return res.status(400).json({ message: "Missing token or todo ID", success: false, error: true });
  }

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Access token expired, please login again", success: false, error: true });
    }
    return res.status(403).json({ message: "Invalid access token", success: false, error: true });
  }

  try {
    const userId = decoded.id;

    const learner = await LearnerUserModel.findByIdAndUpdate(
      userId,
      { $pull: { todos: { _id: todoid } } },
      { new: true }
    );

    if (!learner) {
      return res.status(404).json({ message: "Learner not found", success: false, error: true });
    }

    res.status(200).json({
      message: "Todo deleted successfully",
      todos: learner.todos,
      success: true,
      error: false,
    });
  } catch (error) {
    console.error("Error deleting todo:", error);
    res.status(500).json({
      message: "Server error",
      error: error.message,
      success: false,
    });
  }
}

export async function toggleTodoComplete(req, res) {
  const token = req.cookies.accessToken;
  const { todoid } = req.body;

  if (!token || !todoid) {
    return res.status(400).json({ message: "Missing token or todo ID", success: false, error: true });
  }

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Access token expired, please login again", success: false, error: true });
    }
    return res.status(403).json({ message: "Invalid access token", success: false, error: true });
  }

  try {
    const userId = decoded.id;

    const learner = await LearnerUserModel.findById(userId);
    if (!learner) {
      return res.status(404).json({ message: "Learner not found", success: false, error: true });
    }

    const todoIndex = learner.todos.findIndex((t) => t._id.toString() === todoid);
    if (todoIndex === -1) {
      return res.status(404).json({ message: "Todo not found", success: false, error: true });
    }

    learner.todos[todoIndex].completed = !learner.todos[todoIndex].completed;
    await learner.save();

    res.status(200).json({
      message: "Todo completion toggled successfully",
      data: learner.todos,
      success: true,
      error: false,
    });
  } catch (error) {
    console.error("Error toggling todo:", error);
    res.status(500).json({
      message: "Server error",
      error: error.message,
      success: false,
    });
  }
}

// ---------------------fetch sessions---------------------------------------

export async function getEducatorSessions(req, res) {
  const token = req.cookies.accessToken;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized", success: false, error: true });
  }

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return res.status(err.name === "TokenExpiredError" ? 401 : 403).json({
      message: err.name === "TokenExpiredError" ? "Access token expired, please login again" : "Invalid token",
      success: false,
      error: true
    });
  }

  try {
    const educatorId = decoded.id;
    const now = new Date();

    const sessions = await SessionModel.find({ educatorId }).populate("learnerId", "name");
    const upcoming = sessions.filter(s => new Date(s.scheduledAt) > now);
    const previous = sessions.filter(s => new Date(s.scheduledAt) <= now);

    res.status(200).json({
      message: "Educator sessions fetched successfully",
      upcoming,
      previous,
      success: true,
      error: false
    });
  } catch (err) {
    console.error("Error fetching educator sessions:", err);
    res.status(500).json({
      message: "Failed to fetch educator sessions",
      error: true,
      success: false
    });
  }
}

export async function getLearnerSessions(req, res) {
  const token = req.cookies.accessToken;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized", success: false, error: true });
  }

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return res.status(err.name === "TokenExpiredError" ? 401 : 403).json({
      message: err.name === "TokenExpiredError" ? "Token expired" : "Invalid token",
      success: false,
      error: true
    });
  }

  try {
    const learnerId = decoded.id;
    const now = new Date();

    const sessions = await SessionModel.find({ learnerId }).populate("educatorId", "name");
    const upcoming = sessions.filter(s => new Date(s.scheduledAt) > now);
    const previous = sessions.filter(s => new Date(s.scheduledAt) <= now);

    res.status(200).json({
      message: "Learner sessions fetched successfully",
      upcoming,
      previous,
      success: true,
      error: false
    });
  } catch (err) {
    console.error("Error fetching learner sessions:", err);
    res.status(500).json({
      message: "Failed to fetch learner sessions",
      error: true,
      success: false
    });
  }
}

// -------------------------EducatorWallet-----------------------------------------------------

export async function WithdrawelRequest(req, res) {
  console.log("WithdrawelRequest initiated");

  const token = req.cookies?.accessToken;

  if (!token) {
    return res.status(401).json({
      message: "Unauthorized access. Try again or contact Help@radical-unlearning.com",
      success: false,
      error: true,
    });
  }

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return res.status(403).json({
      message: err.name === "TokenExpiredError" ? "Session expired. Please login again." : "Invalid token.",
      success: false,
      error: true,
    });
  }

  try {
    const { amount } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({ message: "Invalid withdrawal amount", success: false, error: true });
    }

    const user = await EducatorUserModel.findById(decoded.id).select("wallet");

    if (!user) {
      return res.status(404).json({ message: "Educator not found", success: false, error: true });
    }

    if (user.wallet < amount) {
      return res.status(400).json({ message: "Insufficient wallet balance", success: false, error: true });
    }

    await WithdrawelRequestModel.create({
      educator: decoded.id,
      amount,
    });

    return res.status(200).json({
      message: "Withdrawal request submitted successfully.",
      success: true,
      error: false,
    });
  } catch (error) {
    console.error("Error in WithdrawelRequest:", error);
    return res.status(500).json({
      message: "Internal server error. Please try again later.",
      success: false,
      error: true,
    });
  }
}

export async function fetchWalletAmount(req, res) {
  const token = req.cookies?.accessToken;

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
    return res.status(403).json({
      message: err.name === "TokenExpiredError" ? "Access token expired, please login again" : "Invalid token",
      error: true,
      success: false,
    });
  }

  try {
    const walletData = await EducatorUserModel.findById(decoded.id).select("wallet");

    if (!walletData) {
      return res.status(404).json({
        message: "Educator not found",
        data: null,
        error: true,
        success: false,
      });
    }

    res.status(200).json({
      message: "Wallet data fetched successfully",
      data: walletData.wallet,
      error: false,
      success: true,
    });
  } catch (error) {
    console.error("Error fetching wallet data:", error);
    res.status(500).json({
      message: "Unable to fetch wallet data",
      data: null,
      error: true,
      success: false,
    });
  }
}