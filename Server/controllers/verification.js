// import nodemailer from "nodemailer";
// import dotenv from "dotenv";
// dotenv.config();

// export const verifyOTP = async (req, resp) => {
//   try {
//     const transporter = nodemailer.createTransport({
//       host: "us2.smtp.mailhostbox.com", // Updated based on the reference image 
//       port: 587, // Use STARTTLS (secure = false)
//       secure: false, // False for STARTTLS, true for SSL (port 465 is not listed)
//       auth: {
//         user: process.env.SMTP_USER, // donotreply@amarjha.tech
//         pass: process.env.SMTP_PASS, // Your SMTP password
//       },
//       tls: {
//         rejectUnauthorized: false, // Avoid certificate validation issues
//       },
//     });
    
//     const mailOptions = {
//       from: '"Amar Jha" <donotreply@amarjha.tech>',
//       to: "amarjha.tech@gmail.com",
//       subject: "Test Email from Vanity Email",
//       text: "Hello! This is a test email using a vanity email account.",
//     };

//     const info = await transporter.sendMail(mailOptions);
    
//     console.log("Email sent successfully:", info.response);
    
//     return resp.status(200).json({
//       message: "Email sent successfully",
//       success: true,
//     });

//   } catch (error) {
//     console.error("Error sending email:", error);
//     return resp.status(500).json({
//       message: "Something went wrong",
//       error: error.message,
//       success: false,
//     });
//   }
// };
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import {generateOTP} from '../utils/generateOTP.js'
dotenv.config();

let otpStore = {}; // Temporary store for OTPs

export const sendOTP = async (req, res) => {
  try {
    const { email } = req.body;

    // Generate a 6-digit OTP
    const otp = generateOTP();
    otpStore[email] = otp; // Store OTP temporarily

    // Set a timer to delete OTP after 5 minutes
    setTimeout(() => {
      delete otpStore[email];
      console.log(`OTP for ${email} expired`);
    }, 1 * 60 * 1000);

    const transporter = nodemailer.createTransport({
      host: "us2.smtp.mailhostbox.com",
      port: 587,
      secure: false, // False for STARTTLS
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    const mailOptions = {
      from: '"Amar Jha" <donotreply@amarjha.tech>',
      to: email,
      subject: "Your OTP Code",
      text: `Your OTP is: ${otp}. It is valid for 1 minutes.`,
    };

    const info = await transporter.sendMail(mailOptions);

    console.log("OTP sent successfully:", info.response);

    return res.status(200).json({
      message: "OTP sent successfully",
      success: true,
    });

  } catch (error) {
    console.error("Error sending OTP:", error);
    return res.status(500).json({
      message: "Something went wrong",
      error: error.message,
      success: false,
    });
  }
};

// Verify OTP
export const verifyOTP = (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!otpStore[email]) {
      return res.status(400).json({
        message: "OTP expired or not requested. Please request a new OTP.",
        success: false,
      });
    }

    if (otpStore[email] === otp) {
      delete otpStore[email]; 
      return res.status(200).json({
        message: "OTP verified successfully",
        success: true,
      });
    } else {
      return res.status(400).json({
        message: "Invalid OTP",
        success: false,
      });
    }
  } catch (error) {
    console.error("Error verifying OTP:", error);
    return res.status(500).json({
      message: "Something went wrong",
      error: error.message,
      success: false,
    });
  }
};
