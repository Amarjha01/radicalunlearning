let otpStore = {}; 


export const generateOTP = (length = 6) => {
  return Math.floor(10 ** (length - 1) + Math.random() * 9 * 10 ** (length - 1)).toString();
};

// Store OTP and set expiration
export const storeOTP = (email, otp, expiryTime = 5 * 60 * 1000) => {
  otpStore[email] = otp;

  setTimeout(() => {
    delete otpStore[email];
    console.log(`OTP for ${email} expired`);
  }, expiryTime);
};

// Verify OTP
export const verifyStoredOTP = (email, otp) => {
  if (!otpStore[email]) return { success: false, message: "OTP expired or not requested" };
  if (otpStore[email] !== otp) return { success: false, message: "Invalid OTP" };

  delete otpStore[email]; // Remove OTP after successful verification
  return { success: true, message: "OTP verified successfully" };
};
