import React, { useState } from "react";
import axios from "axios";
import API from "../../common/apis/ServerBaseURL.jsx"
import { showErrorToast, showSuccessToast, showNetworkErrorToast } from "../../utils/Notification.jsx";

const ForgotPassword = ({ isOpen, onClose, defaultRole = "" }) => {
  const [forgotPasswordStep, setForgotPasswordStep] = useState(1);
  const [forgotPasswordData, setForgotPasswordData] = useState({
    email: "",
    role: defaultRole, // Can be pre-filled
    otp: "",
    newPassword:  "",
    confirmPassword: ""
  });
  const [forgotPasswordLoading, setForgotPasswordLoading] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Close and reset
  const handleClose = () => {
    setForgotPasswordStep(1);
    setForgotPasswordData({
      email: "",
      role: defaultRole,
      otp: "",
      newPassword:  "",
      confirmPassword: ""
    });
    setShowNewPassword(false);
    setShowConfirmPassword(false);
    onClose();
  };

  // SEND OTP HANDLER
  const handleSendOTP = async () => {
    if (!forgotPasswordData.email || !forgotPasswordData.role) {
      showErrorToast("Please enter email and select role");
      return;
    }

    setForgotPasswordLoading(true);

    try {
      const response = await axios.post(
        API.forgotPasswordSendOTP. url,
        {
          email: forgotPasswordData.email,
          role: forgotPasswordData.role
        }
      );

      if (response.status === 200) {
        showSuccessToast("OTP sent to your email!");
        setForgotPasswordStep(2);
      }
    } catch (error) {
      console.error("Send OTP error:", error);
      showErrorToast(error.response?.data?.message || "Failed to send OTP");
      
      if (error.message === "Network Error") {
        showNetworkErrorToast("Your Network connection Is Unstable OR Disconnected");
      }
    } finally {
      setForgotPasswordLoading(false);
    }
  };

  // RESET PASSWORD HANDLER
  const handleResetPassword = async () => {
    // Validation
    if (!forgotPasswordData.otp) {
      showErrorToast("Please enter OTP");
      return;
    }

    if (! forgotPasswordData.newPassword || !forgotPasswordData.confirmPassword) {
      showErrorToast("Please enter new password and confirm it");
      return;
    }

    if (forgotPasswordData.newPassword !== forgotPasswordData.confirmPassword) {
      showErrorToast("Passwords don't match!");
      return;
    }

    if (forgotPasswordData.newPassword.length < 6) {
      showErrorToast("Password must be at least 6 characters");
      return;
    }

    setForgotPasswordLoading(true);

    try {
      const response = await axios. post(
        API.forgotPasswordReset.url,
        {
          email: forgotPasswordData.email,
          role: forgotPasswordData.role,
          otp: forgotPasswordData. otp,
          newPassword:  forgotPasswordData.newPassword
        }
      );

      if (response.status === 200) {
        showSuccessToast("Password reset successfully!  Please login with your new password");
        handleClose();
      }
    } catch (error) {
      console.error("Reset password error:", error);
      showErrorToast(error.response?.data?.message || "Failed to reset password");
      
      if (error.message === "Network Error") {
        showNetworkErrorToast("Your Network connection Is Unstable OR Disconnected");
      }
    } finally {
      setForgotPasswordLoading(false);
    }
  };

  if (! isOpen) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center p-4 z-50 animate-fadeIn">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 transform transition-all animate-scaleIn">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            {forgotPasswordStep === 1 ? "Forgot Password" : "Reset Password"}
          </h2>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Step 1: Email & Role */}
        {forgotPasswordStep === 1 && (
          <div>
            <p className="text-sm text-gray-600 mb-4">
              Enter your email and select account type to receive a password reset OTP.
            </p>

            {/* Role Selection - Only show if not pre-filled */}
            {! defaultRole && (
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Select Account Type *
                </label>
                
                <div className="space-y-3">
                  {/* LEARNER Option */}
                  <label className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    forgotPasswordData. role === 'LEARNER' 
                      ? 'border-blue-500 bg-blue-50' 
                      :  'border-gray-300 hover:border-blue-300'
                  }`}>
                    <input
                      type="radio"
                      name="forgotRole"
                      value="LEARNER"
                      checked={forgotPasswordData.role === 'LEARNER'}
                      onChange={(e) => setForgotPasswordData({...forgotPasswordData, role: e.target.value})}
                      className="mr-3 w-4 h-4"
                    />
                    <div>
                      <p className="font-medium text-gray-800">Learner Account</p>
                      <p className="text-sm text-gray-500">For students and learners</p>
                    </div>
                  </label>

                  {/* EDUCATOR Option */}
                  <label className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    forgotPasswordData.role === 'EDUCATOR' 
                      ? 'border-blue-500 bg-blue-50' 
                      :  'border-gray-300 hover:border-blue-300'
                  }`}>
                    <input
                      type="radio"
                      name="forgotRole"
                      value="EDUCATOR"
                      checked={forgotPasswordData.role === 'EDUCATOR'}
                      onChange={(e) => setForgotPasswordData({...forgotPasswordData, role: e.target.value})}
                      className="mr-3 w-4 h-4"
                    />
                    <div>
                      <p className="font-medium text-gray-800">Educator Account</p>
                      <p className="text-sm text-gray-500">For teachers and educators</p>
                    </div>
                  </label>

                  {/* ADMIN Option */}
                  {/* <label className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    forgotPasswordData.role === 'ADMIN' 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-300 hover:border-blue-300'
                  }`}>
                    <input
                      type="radio"
                      name="forgotRole"
                      value="ADMIN"
                      checked={forgotPasswordData.role === 'ADMIN'}
                      onChange={(e) => setForgotPasswordData({...forgotPasswordData, role: e.target.value})}
                      className="mr-3 w-4 h-4"
                    />
                    <div>
                      <p className="font-medium text-gray-800">Admin Account</p>
                      <p className="text-sm text-gray-500">For administrators</p>
                    </div>
                  </label> */}
                </div>
              </div>
            )}

            {/* If role is pre-filled, show it */}
            {defaultRole && (
              <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>Account Type:</strong> {defaultRole}
                </p>
              </div>
            )}

            {/* Email Input */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address *
              </label>
              <input
                type="email"
                value={forgotPasswordData.email}
                onChange={(e) => setForgotPasswordData({...forgotPasswordData, email: e. target.value})}
                placeholder="your@email.com"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus: ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                required
              />
            </div>

            {/* Send OTP Button */}
            <button
              onClick={handleSendOTP}
              disabled={forgotPasswordLoading || !forgotPasswordData.email || !forgotPasswordData.role}
              className={`w-full px-4 py-3 text-white rounded-lg font-medium transition-all flex items-center justify-center gap-2 ${
                forgotPasswordLoading || !forgotPasswordData.email || !forgotPasswordData.role
                  ? "bg-blue-300 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 cursor-pointer"
              }`}
            >
              {forgotPasswordLoading ? (
                <>
                  <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                  </svg>
                  Sending OTP...
                </>
              ) : (
                "Send OTP"
              )}
            </button>
          </div>
        )}

        {/* Step 2: OTP & New Password */}
        {forgotPasswordStep === 2 && (
          <div>
            <p className="text-sm text-gray-600 mb-4">
              Enter the OTP sent to <strong>{forgotPasswordData.email}</strong>
            </p>

            {/* OTP Input */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                OTP (6 digits) *
              </label>
              <input
                type="text"
                value={forgotPasswordData.otp}
                onChange={(e) => setForgotPasswordData({...forgotPasswordData, otp: e.target.value})}
                placeholder="123456"
                maxLength="6"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-center text-2xl tracking-widest font-mono"
                required
              />
            </div>

            {/* New Password */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                New Password *
              </label>
              <div className="relative">
                <input
                  type={showNewPassword ? "text" : "password"}
                  value={forgotPasswordData.newPassword}
                  onChange={(e) => setForgotPasswordData({...forgotPasswordData, newPassword: e.target.value})}
                  placeholder="Enter new password"
                  minLength="6"
                  className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                >
                  {showNewPassword ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"/>
                    </svg>
                  )}
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-1">Minimum 6 characters</p>
            </div>

            {/* Confirm Password */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Confirm Password *
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" :  "password"}
                  value={forgotPasswordData.confirmPassword}
                  onChange={(e) => setForgotPasswordData({... forgotPasswordData, confirmPassword:  e.target.value})}
                  placeholder="Confirm new password"
                  minLength="6"
                  className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                >
                  {showConfirmPassword ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"/>
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                onClick={() => setForgotPasswordStep(1)}
                disabled={forgotPasswordLoading}
                className="flex-1 px-4 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg font-medium transition-all disabled:opacity-50"
              >
                Back
              </button>
              <button
                onClick={handleResetPassword}
                disabled={forgotPasswordLoading || ! forgotPasswordData.otp || !forgotPasswordData. newPassword || !forgotPasswordData. confirmPassword}
                className={`flex-1 px-4 py-3 text-white rounded-lg font-medium transition-all flex items-center justify-center gap-2 ${
                  forgotPasswordLoading || !forgotPasswordData.otp || !forgotPasswordData.newPassword
                    ? "bg-blue-300 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700 cursor-pointer"
                }`}
              >
                {forgotPasswordLoading ? (
                  <>
                    <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                    </svg>
                    Resetting...
                  </>
                ) : (
                  "Reset Password"
                )}
              </button>
            </div>

            {/* Resend OTP Link */}
            <div className="mt-4 text-center">
              <button
                type="button"
                onClick={() => {
                  setForgotPasswordStep(1);
                  setForgotPasswordData({... forgotPasswordData, otp:  "", newPassword: "", confirmPassword:  ""});
                }}
                className="text-sm text-blue-600 hover:text-blue-700 hover:underline"
              >
                Didn't receive OTP?  Send again
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default ForgotPassword;