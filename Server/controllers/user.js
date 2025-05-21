import {
  LearnerUserModel,
  EducatorUserModel,
  AdminModel,
  SessionModel,
  WithdrawelRequestModel
} from "../models/user.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";


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

export async function registerEducatorController(request, response) { try { const { name, email, password, role, subrole, country, language, phone, dob, address, bio, experience, subjects, serviceType, sessionfee, payoutMethod, upiId, bankAccount, ifscCode, paypalEmail, otherPayout, documentUrl, videoUrl, profileUrl, terms1, terms2, terms3, terms4, terms5, } = request.body;

console.log("Received payload:", request.body);

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

if (payoutMethod === "other" && !otherPayout) {
  return response.status(400).json({
    message: "Other payout method details are required",
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
  payoutMethod,
  upiId,
  bankAccount,
  ifscCode,
  paypalEmail,
  otherPayout,
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
        expiresIn: "8h",
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
    console.log(token);

    if (!token) {
      return res.status(400).json({ message: "Missing token or todo" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;
    const role = decoded.role.toUpperCase();

    let updateUser;

    if (role === "LEARNER") {
      const { name, email, country, language, bio , avatar } = req.body;
      console.log("updateUserDetails:", req.body);
      
      updateUser = await LearnerUserModel.updateOne(
        { _id: userId },
        {
          ...(name && { name }),
          ...(email && { email }),
          ...(country && { country }),
          ...(language && { language }),
          ...(bio && { bio }),
          ...(avatar && { avatar }),
        }
      );
    } else if (role === "EDUCATOR") {
      const {
        bio,
        experience,
        avatar
      } = req.body;

      updateUser = await EducatorUserModel.updateOne(
        { _id: userId },
        {
          ...(bio && { bio }),
          ...(experience && { experience }),
          ...(avatar && { avatar }),
        }
      );
    }

    return res.json({
      message: "Updated successfully",
      error: false,
      success: true,
      data: updateUser,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
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
      Approved: true,         // Ensures only approved educators are returned
      suspended: 'NO'         // Ensures only non-suspended educators are returned
    })
    .select('name country bio _id subjects documentUrl videoUrl ');
console.log(educators);

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
    return res.status(400).json({ message: "Missing token or todo" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    const todoItem = {
      text: newtodo.trim(),
      completed: false
    };

    const learner = await LearnerUserModel.findByIdAndUpdate(
      userId,
      { $push: { todos: todoItem } }, 
      { new: true, runValidators: true }
    );

    if (!learner) {
      return res.status(404).json({ message: "Learner not found" });
    }

    res.status(200).json({
      message: "Todo added successfully",
      data: learner.todos,
      success: true,
      error: false
    });
  } catch (error) {
    console.error("Error updating todos:", error);
    res.status(500).json({ 
      message: "Server error",
      error: error.message,
      success: false 
    });
  }
}

export async function fetchtodos(req, res) {
  const token = req.cookies.accessToken;
  
  if (!token) {
    return res.status(400).json({ message: "Missing token or todo" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id
    const alltodos = await LearnerUserModel.findById(userId).select('todos')
   
    res.status(200).json({
      message:'fetched all todos successfuly',
      data:alltodos,
      error:false,
      success:true
    })
  } catch (error) {
    res.status(500).json({
      message:'failed to fetch all todos',
      error:true,
      success:false,
      error
    })
  }
}

export async function deletetodos(req, res) {
  const token = req.cookies.accessToken;
  const { todoid } = req.body;

  if (!token || !todoid) {
    return res.status(400).json({ message: "Missing token or todo ID" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    const learner = await LearnerUserModel.findByIdAndUpdate(
      userId,
      { $pull: { todos: { _id: todoid } } }, // <- remove by matching _id
      { new: true }
    );

    if (!learner) {
      return res.status(404).json({ message: "Learner not found" });
    }

    res.status(200).json({ 
      message: "Todo deleted successfully", 
      todos: learner.todos,
      success: true,
      error: false
    });
  } catch (error) {
    console.error("Error deleting todo:", error);
    res.status(500).json({ 
      message: "Server error", 
      error: error.message,
      success: false
    });
  }
}

export async function toggleTodoComplete(req, res) {
  const token = req.cookies.accessToken;
  const { todoid } = req.body;

  if (!token || !todoid) {
    return res.status(400).json({ message: "Missing token or todo ID" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    const learner = await LearnerUserModel.findById(userId);
    if (!learner) {
      return res.status(404).json({ message: "Learner not found" });
    }

    const todoIndex = learner.todos.findIndex(t => t._id.toString() === todoid);
    if (todoIndex === -1) {
      return res.status(404).json({ message: "Todo not found" });
    }

    // Toggle the completed field
    learner.todos[todoIndex].completed = !learner.todos[todoIndex].completed;

    // Save the updated learner document
    await learner.save();

    res.status(200).json({
      message: "Todo completion toggled successfully",
      data: learner.todos,
      success: true,
      error: false
    });
  } catch (error) {
    console.error("Error toggling todo:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
}

// ---------------------ToggleTheme---------------------------------------------------------------

export const toggleTheme = async (req, res) => {
  try {
    // Get token from cookies
    const token = req.cookies.accessToken;
    if (!token) {
      return res.status(401).json({ message: "Access token missing" });
    }

    // Verify and decode token
    const decoded = jwt.verify(token, process.env.JWT_SECRET); 
    const { role, id } = decoded;


    if (!role || !id) {
      return res.status(400).json({ message: "Invalid token payload" });
    }

    let UserModel;

    // Pick the correct model based on role
    if (role === "learner") {
      UserModel = LearnerUserModel;
    } else if (role === "educator") {
      UserModel = EducatorUserModel;
    } else if (role === "admin") {
      UserModel = AdminModel;
    } else {
      return res.status(400).json({ message: "Invalid role" });
    }

    // Find the user
    const user = await UserModel.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Toggle theme
    const newTheme = user.theme === "light" ? "dark" : "light";
    user.theme = newTheme;
    await user.save();
console.log('all done');

    return res.status(200).json({ message: `Theme updated to ${newTheme}`, theme: newTheme });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export async function getEducatorSessions(req, res) {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  const { id: educatorId } = jwt.verify(token, process.env.JWT_SECRET);

  try {
    const now = new Date();

    const sessions = await SessionModel.find({ educatorId }).populate("learnerId", "name");

    const upcoming = sessions.filter(s => new Date(s.scheduledAt) > now);
    const previous = sessions.filter(s => new Date(s.scheduledAt) <= now);

    res.json({ upcoming, previous });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch educator sessions" });
  }
}

export async function getLearnerSessions(req, res) {
  const token = req.cookies.accessToken;
  
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  const { id: learnerId } = jwt.verify(token, process.env.JWT_SECRET);

  try {
    const now = new Date();

    const sessions = await SessionModel.find({ learnerId }).populate("educatorId", "name");

    const upcoming = sessions.filter(s => new Date(s.scheduledAt) > now);
    const previous = sessions.filter(s => new Date(s.scheduledAt) <= now);

    res.json({ upcoming, previous });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch learner sessions" });
  }
}

// -------------------------EducatorWallet-----------------------------------------------------

export async function WithdrawelRequest(req , res) {
  console.log('WithdrawelRequest initiated');
  
  try {
    const token = req.cookies.accessToken;

    if(!token){
      return res.status(401).json({
        message:"Unauthorised access. Try again or contact to Help@radical-unlearning.com"
      })
    }

    const {id} = jwt.verify(token , process.env.JWT_SECRET);

    const user = await EducatorUserModel.findById(id).select('wallet');
    const { amount } = req.body;
if (user.wallet < amount) {
  return res.status(400).json({ message: "Insufficient wallet balance" });
  
}

await WithdrawelRequestModel.create({
  educator: id,
  amount,
});

return res.status(200).json({message:"Withdrawel request submitted successfully."})
    
  } catch (error) {
    console.error(error); 
    return res.status(500).json({ message: "Internal server error. Please try again later." });
  }
}