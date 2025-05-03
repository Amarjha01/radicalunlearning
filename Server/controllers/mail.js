import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

export const sendInvoiceMail = async (InvoiceData) => {
  console.log(InvoiceData);

  try {
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
      to: 'amarjha.tech@gmail.com',
      subject: 'Invoice Data', // fixed typo capitalization
      html: `
        <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #f9f9f9; padding: 40px 0;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 10px; box-shadow: 0 2px 8px rgba(0,0,0,0.05); overflow: hidden;">
            <div style="background-color: #4F46E5; color: white; padding: 20px 30px; text-align: center;">
              <h1 style="margin: 0; font-size: 24px;">Radical Unlearning</h1>
              <p style="margin: 4px 0 0;">Contact Form Submission</p>
            </div>
            <div style="padding: 30px;">
              <h2 style="font-size: 20px; margin-bottom: 20px; color: #333;">Learner Information</h2>
              <table style="width: 100%; border-collapse: collapse;">
                <tr><td style="padding: 8px 0; font-weight: bold;">Name:</td><td style="padding: 8px 0;">${InvoiceData.learnerName}</td></tr>
                <tr><td style="padding: 8px 0; font-weight: bold;">Email:</td><td style="padding: 8px 0;">${InvoiceData.learnerMail}</td></tr>
                <tr><td style="padding: 8px 0; font-weight: bold;">Subject:</td><td style="padding: 8px 0;">${InvoiceData.subject}</td></tr>
                <tr><td style="padding: 8px 0; font-weight: bold;">Amount:</td><td style="padding: 8px 0;">₹ ${InvoiceData.amount}</td></tr>
              </table>
            </div>
            <div style="background-color: #f1f5f9; padding: 20px 30px; text-align: center; color: #6b7280; font-size: 12px;">
              &copy; ${new Date().getFullYear()} Radical Unlearning. All rights reserved.
            </div>
          </div>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions); // <-- FIXED

    console.log("Email sent:", info.messageId); // optional log

  } catch (error) {
    console.error("Error sending invoice email:", error);
  }
};


export const queryMail = async (req, res) => {
  try {
    const { name , email , subject , message} = req.body;

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
      to: 'amarjha.tech@gmail.com',
      subject: subject || 'New Contact Form Submission',
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f4f4f4;">
          <div style="max-width: 600px; margin: auto; background: white; padding: 20px; border-radius: 10px;">
            <h2 style="color: #333;">New Contact Form Submission</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Subject:</strong> ${subject}</p>
            <p><strong>Message:</strong></p>
            <p>${message}</p>
          </div>
        </div>
      `,
    };
    

    const info = await transporter.sendMail(mailOptions);
console.log(info);

    return res.status(200).json({
      message: "Mail sent successfully",
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