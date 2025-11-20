'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useAppSelector, useAppDispatch } from '@/hooks';
import { setLoginModalOpen } from '@/store/slices/uiSlice';
import { requestOtp, verifyOtp, registerWithOtp } from '@/store/slices/authSlice';

const OtpLoginModal: React.FC = () => {
  const dispatch = useAppDispatch();
  const { isLoginModalOpen } = useAppSelector((state) => state.ui);
  const { isLoading, error } = useAppSelector((state) => state.auth);
  
  const [isLogin, setIsLogin] = useState(true);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [requiresRegistration, setRequiresRegistration] = useState(false); // New state variable
  // Removed unused state variable: isRegistrationStep
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState('');
  const [countdown, setCountdown] = useState(0);
  const [formError, setFormError] = useState<string | null>(null);
  const [prefillMobile, setPrefillMobile] = useState(''); // New state for pre-filled mobile number

  // Countdown timer for resend OTP
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  const handleClose = useCallback(() => {
    dispatch(setLoginModalOpen(false));
    // Reset form state
    setIsLogin(true);
    setIsOtpSent(false);
    setRequiresRegistration(false); // Reset registration requirement
    // Removed unused state variable: isRegistrationStep
    setName('');
    setMobile('');
    setOtp('');
    setFormError(null);
    setCountdown(0);
    setPrefillMobile(''); // Reset pre-filled mobile
  }, [dispatch, setIsLogin, setIsOtpSent, setRequiresRegistration, setName, setMobile, setOtp, setFormError, setCountdown, setPrefillMobile]);

  // Track if user just logged in
  const { user } = useAppSelector((state) => state.auth);
  
  // Close modal after successful authentication (but don't redirect)
  useEffect(() => {
    if (isLoginModalOpen && user && user.isAuthenticated && !isLoading) {
      handleClose();
    }
  }, [user, isLoading, isLoginModalOpen, handleClose]);

  useEffect(() => {
    if (error) {
      setFormError(error);
    }
  }, [error]);

  // Reset prefillMobile when switching back to login
  useEffect(() => {
    if (isLogin) {
      setPrefillMobile('');
    }
  }, [isLogin]);

  // When requiresRegistration is true, switch to registration mode
  useEffect(() => {
    if (requiresRegistration) {
      setIsLogin(false);
      // Removed unused state variable: isRegistrationStep
    }
  }, [requiresRegistration]);

  const validateMobile = (mobile: string) => {
    const mobileRegex = /^[6-9]\d{9}$/;
    return mobileRegex.test(mobile);
  };

  const handleRegistrationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) {
      setFormError('Please enter your name');
      return;
    }
    
    // Use prefillMobile if available, otherwise use mobile
    const mobileToUse = prefillMobile || mobile;
    
    if (!mobileToUse) {
      setFormError('Mobile number is required');
      return;
    }
    
    if (!validateMobile(mobileToUse)) {
      setFormError('Please enter a valid Indian mobile number');
      return;
    }
    
    try {
      // Register user with name and mobile using register-with-otp endpoint
      await dispatch(registerWithOtp({ name, mobile: mobileToUse })).unwrap();
      // Then request OTP
      await dispatch(requestOtp(mobileToUse)).unwrap();
      setIsOtpSent(true);
      setCountdown(30); // 30 seconds countdown for resend
      setFormError(null);
    } catch (error) {
      setFormError(error instanceof Error ? error.message : 'Failed to process request');
    }
  };

  const handleRequestOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!mobile) {
      setFormError('Mobile number is required');
      return;
    }
    
    if (!validateMobile(mobile)) {
      setFormError('Please enter a valid Indian mobile number');
      return;
    }
    
    try {
      // Request OTP for login
      const response = await dispatch(requestOtp(mobile)).unwrap();
      
      // Check if the response contains requires_registration field
      // This check is now handled by the API service, but we'll keep it as a backup
      if (response && response.requires_registration === true) {
        setFormError(null); // Clear any error message
        setIsOtpSent(false);
        setRequiresRegistration(true);
        setIsLogin(false); // Switch to registration form
        setPrefillMobile(mobile); // Pre-fill mobile number in registration form
        return;
      }
      
      // Only show OTP screen if request was successful
      setIsOtpSent(true);
      setRequiresRegistration(false); // Reset registration requirement
      setCountdown(30); // 30 seconds countdown for resend
      setFormError(null);
    } catch (error) {
      // Check if the error is because user is not registered
      const errorMessage = error instanceof Error ? error.message : 'Failed to process request';
      
      // Handle specific API response for unregistered users
      if (errorMessage.includes('User not found. Please register first.') || 
          errorMessage.includes('requires_registration') ||
          errorMessage.includes('requires_registration:true') ||
          errorMessage.includes('"requires_registration":true') ||
          errorMessage.includes('"requires_registration": true') ||
          errorMessage.includes('User not registered. Please sign up first.') ||
          errorMessage.includes('not found') || 
          errorMessage.includes('not registered') || 
          errorMessage.includes('404') ||
          errorMessage.includes('user does not exist')) {
        setFormError(null); // Clear the error message
        // Explicitly ensure OTP screen is not shown
        setIsOtpSent(false);
        setRequiresRegistration(true); // Set registration requirement
        setIsLogin(false); // Switch to registration mode
        setPrefillMobile(mobile); // Pre-fill mobile number in registration form
        setName(''); // Clear name field
        return; // Exit early to prevent any further processing
      } else {
        setFormError(errorMessage);
        // Explicitly ensure OTP screen is not shown
        setIsOtpSent(false);
        setRequiresRegistration(false); // Reset registration requirement
        return; // Exit early to prevent any further processing
      }
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!otp) {
      setFormError('OTP is required');
      return;
    }
    
    if (otp.length !== 6) {
      setFormError('OTP must be 6 digits');
      return;
    }
    
    try {
      await dispatch(verifyOtp({ mobile, otpCode: otp })).unwrap();
      setFormError(null);
    } catch (error) {
      setFormError(error instanceof Error ? error.message : 'Failed to verify OTP');
    }
  };

  const handleResendOtp = async () => {
    if (countdown > 0) return;
    
    try {
      await dispatch(requestOtp(mobile)).unwrap();
      setCountdown(30);
      setFormError(null);
    } catch (error) {
      setFormError(error instanceof Error ? error.message : 'Failed to resend OTP');
    }
  };

  if (!isLoginModalOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="relative bg-gradient-to-br from-white to-orange-50 backdrop-blur-xl border border-orange-200 rounded-2xl shadow-2xl p-6 w-full max-w-md transform transition-all duration-300 ease-in-out">
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-orange-500 hover:text-orange-700 transition-colors"
          onClick={handleClose}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Header with Logo/Title */}
        <div className="text-center mb-6">
          <div className="mx-auto w-16 h-16 rounded-full bg-gradient-to-r from-orange-400 to-orange-500 flex items-center justify-center mb-4">
            <span className="text-white text-2xl font-bold">33</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 font-['Philosopher']">
            {!isLogin ? 'Join Us' : 'Welcome Back'}
          </h2>
          <p className="text-gray-600 mt-1 text-sm">
            {!isLogin ? 'Create a new account' : 'Login to your account'}
          </p>
        </div>

        {/* Registration Form (Signup) */}
        {!isLogin && !isOtpSent && (
          <form onSubmit={handleRegistrationSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 font-['Lato']">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 bg-white border border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-300 focus:border-transparent text-gray-800 placeholder-gray-400 shadow-sm transition-all"
                placeholder="Enter your full name"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 font-['Lato']">Mobile Number</label>
              <div className="flex">
                <span className="inline-flex items-center px-4 rounded-l-lg border border-r-0 border-orange-200 bg-orange-50 text-gray-700 font-medium">
                  +91
                </span>
                <input
                  type="tel"
                  value={prefillMobile || mobile}
                  onChange={(e) => {
                    const newValue = e.target.value.replace(/\D/g, '').slice(0, 10);
                    if (prefillMobile) {
                      setPrefillMobile(newValue);
                    } else {
                      setMobile(newValue);
                    }
                  }}
                  className="flex-1 px-4 py-3 bg-white border border-orange-200 rounded-r-lg focus:ring-2 focus:ring-orange-300 focus:border-transparent text-gray-800 placeholder-gray-400 shadow-sm transition-all"
                  placeholder="Enter 10-digit mobile number"
                  required
                  readOnly={!!prefillMobile} // Make mobile field read-only when pre-filled
                />
              </div>
            </div>
            
            {formError && (
              <div className="text-red-500 text-sm p-2 bg-red-50 rounded-lg border border-red-200">
                {formError}
              </div>
            )}
            
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-orange-400 to-orange-500 text-white font-semibold py-3 rounded-lg hover:shadow-lg transition-all duration-200 font-['Work_Sans'] uppercase text-sm disabled:opacity-50"
            >
              {isLoading ? 'Processing...' : 'Continue'}
            </button>
          </form>
        )}

        {/* Login Form or OTP Verification Form */}
        {(isLogin || isOtpSent) && (
          <>
            {(!isOtpSent || formError || requiresRegistration) ? (
              /* Mobile Number Form */
              <form onSubmit={handleRequestOtp} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 font-['Lato']">Mobile Number</label>
                  <div className="flex">
                    <span className="inline-flex items-center px-4 rounded-l-lg border border-r-0 border-orange-200 bg-orange-50 text-gray-700 font-medium">
                      +91
                    </span>
                    <input
                      type="tel"
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value.replace(/\D/g, '').slice(0, 10))}
                      className="flex-1 px-4 py-3 bg-white border border-orange-200 rounded-r-lg focus:ring-2 focus:ring-orange-300 focus:border-transparent text-gray-800 placeholder-gray-400 shadow-sm transition-all"
                      placeholder="Enter 10-digit mobile number"
                      required
                    />
                  </div>
                </div>
                
                {formError && (
                  <div className="text-red-500 text-sm p-2 bg-red-50 rounded-lg border border-red-200">
                    {formError}
                  </div>
                )}
                
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-orange-400 to-orange-500 text-white font-semibold py-3 rounded-lg hover:shadow-lg transition-all duration-200 font-['Work_Sans'] uppercase text-sm disabled:opacity-50"
                >
                  {isLoading ? 'Processing...' : 'Request OTP'}
                </button>
              </form>
            ) : (
              /* OTP Verification Form */
              <form onSubmit={handleVerifyOtp} className="space-y-5">
                <div className="text-center">
                  <div className="mx-auto w-16 h-16 rounded-full bg-orange-100 flex items-center justify-center mb-4">
                    <svg className="w-8 h-8 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <p className="text-gray-700 font-['Lato']">
                    OTP sent to <span className="font-bold text-orange-600">+91 {mobile}</span>
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    Please enter the 6-digit OTP received on your mobile
                  </p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 font-['Lato']">Enter OTP</label>
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    className="w-full px-4 py-3 bg-white border border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-300 focus:border-transparent text-gray-800 placeholder-gray-400 text-center text-2xl tracking-widest shadow-sm transition-all"
                    placeholder="0 0 0 0 0 0"
                    required
                  />
                </div>
                
                <div className="flex justify-between items-center">
                  <button
                    type="button"
                    onClick={() => {
                      setIsOtpSent(false);
                      setOtp('');
                    }}
                    className="text-sm text-orange-600 hover:text-orange-800 font-medium"
                  >
                    Change Number
                  </button>
                  
                  <button
                    type="button"
                    onClick={handleResendOtp}
                    disabled={countdown > 0 || isLoading}
                    className={`text-sm font-medium ${countdown > 0 ? 'text-gray-400' : 'text-orange-600 hover:text-orange-800'}`}
                    translate="no"
                  >
                    {countdown > 0 ? `Resend in ${countdown}s` : 'Resend OTP'}
                  </button>
                </div>
                
                {formError && (
                  <div className="text-red-500 text-sm p-2 bg-red-50 rounded-lg border border-red-200">
                    {formError}
                  </div>
                )}
                
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-orange-400 to-orange-500 text-white font-semibold py-3 rounded-lg hover:shadow-lg transition-all duration-200 font-['Work_Sans'] uppercase text-sm disabled:opacity-50"
                >
                  {isLoading ? 'Verifying...' : 'Verify & Login'}
                </button>
              </form>
            )}
          </>
        )}

        {/* Switch between Login and Sign Up */}
        {!isOtpSent && (
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              <button 
                className="text-orange-600 hover:text-orange-800 font-medium ml-1" 
                onClick={() => {
                  setIsLogin(!isLogin);
                  setFormError(null);
                  setRequiresRegistration(false); // Reset registration requirement
                  // Clear form fields when switching
                  setName('');
                  setMobile('');
                  setOtp('');
                  setPrefillMobile(''); // Reset pre-filled mobile
                }}
              >
                {isLogin ? 'Sign up' : 'Login'}
              </button>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OtpLoginModal;