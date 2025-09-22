'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppSelector, useAppDispatch } from '@/hooks';
import { setLoginModalOpen } from '@/store/slices/uiSlice';
import { loginStart, loginSuccess, loginFailure, signupUser } from '@/store/slices/authSlice';
import { apiService } from '@/services/api';

const LoginModal: React.FC = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isLoginModalOpen } = useAppSelector((state) => state.ui);
  const { isLoading, error } = useAppSelector((state) => state.auth);
  
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [formError, setFormError] = useState<string | null>(null);

  const handleClose = () => {
    dispatch(setLoginModalOpen(false));
  };

  useEffect(() => {
    if (error) {
      setFormError(error);
    }
  }, [error]);
  
  // Close modal on successful signup/login
  const { user } = useAppSelector((state) => state.auth);
  useEffect(() => {
    if (user && !isLoading) {
      handleClose();
    }
  }, [user, isLoading]);

  const validateForm = () => {
    setFormError(null);
    
    if (!isLogin) {
      if (password !== confirmPassword) {
        setFormError('Passwords do not match');
        return false;
      }
      
      if (!name.trim()) {
        setFormError('Name is required');
        return false;
      }
      
      if (!mobile.trim()) {
        setFormError('Mobile number is required');
        return false;
      }
    }
    
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // TEMPORARY: Comment out login logic and redirect directly to dashboard
    handleClose();
    router.push('/dashboard');
    
    // TODO: Uncomment below when ready to implement actual authentication
    /*
    if (!validateForm()) {
      return;
    }

    if (isLogin) {
      dispatch(loginStart());
      
      try {
        // Updated login method with client ID and client secret parameters
        const clientId = process.env.NEXT_PUBLIC_CLIENT_ID || 'default-client-id';
        const clientSecret = process.env.NEXT_PUBLIC_CLIENT_SECRET || 'default-client-secret';
        const user = await apiService.login(email, password, clientId, clientSecret);
        // Store the token in localStorage if available
        if (user.access_token) {
          // Import the auth utility
          const { storeAuthToken } = await import('@/utils/auth');
          storeAuthToken(user.access_token, user.token_type || 'Bearer');
        }
        // Add isAuthenticated flag to the user object
        dispatch(loginSuccess({...user, isAuthenticated: true}));
        
        // Close modal and redirect to dashboard
        handleClose();
        router.push('/dashboard');
      } catch (error) {
        dispatch(loginFailure(error instanceof Error ? error.message : 'Login failed. Please try again.'));
      }
    } else {
      // Signup process
      try {
        const result = await dispatch(signupUser({ name, email, mobile, password })).unwrap();
        // After successful signup, redirect to dashboard
        handleClose();
        router.push('/dashboard');
      } catch (error) {
        // Error is already handled in the async thunk
      }
    }
    */
  };

  if (!isLoginModalOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="relative bg-white/20 backdrop-blur-xl border border-orange-200/30 rounded-2xl shadow-2xl p-6 w-full max-w-md transform transition-all duration-300 ease-in-out">
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-black/70 hover:text-black"
          onClick={handleClose}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Title */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-black font-['Philosopher'] inline-block">
            {isLogin ? 'Login' : 'Sign Up'}
          </h2>
          <div className="mt-2">
            <button
              className={`px-4 py-1 rounded-full text-sm font-['Work_Sans'] ${
                isLogin ? 'bg-orange-100/40 text-black' : 'text-black/70 hover:bg-orange-50/50'
              }`}
              onClick={() => setIsLogin(true)}
            >
              Login
            </button>
            <button
              className={`ml-2 px-4 py-1 rounded-full text-sm font-['Work_Sans'] ${
                !isLogin ? 'bg-orange-100/40 text-black' : 'text-black/70 hover:bg-orange-50/50'
              }`}
              onClick={() => setIsLogin(false)}
            >
              Sign Up
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-black font-['Lato']">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 w-full px-4 py-2 bg-white/30 border border-orange-200/30 rounded-lg focus:ring-2 focus:ring-orange-200 focus:border-transparent text-black placeholder-black/50"
                placeholder="Enter your full name"
                required
              />
            </div>
          )}
          <div>
            <label className="block text-sm font-medium text-black font-['Lato']">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full px-4 py-2 bg-white/30 border border-orange-200/30 rounded-lg focus:ring-2 focus:ring-orange-200 focus:border-transparent text-black placeholder-black/50"
              placeholder="Enter your email"
              required
            />
          </div>
          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-black font-['Lato']">Mobile Number</label>
              <input
                type="tel"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                className="mt-1 w-full px-4 py-2 bg-white/30 border border-orange-200/30 rounded-lg focus:ring-2 focus:ring-orange-200 focus:border-transparent text-black placeholder-black/50"
                placeholder="Enter your mobile number"
                required
              />
            </div>
          )}
          <div>
            <label className="block text-sm font-medium text-black font-['Lato']">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full px-4 py-2 bg-white/30 border border-orange-200/30 rounded-lg focus:ring-2 focus:ring-orange-200 focus:border-transparent text-black placeholder-black/50"
              placeholder="Enter password"
              required
            />
          </div>
          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-black font-['Lato']">Confirm Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="mt-1 w-full px-4 py-2 bg-white/30 border border-orange-200/30 rounded-lg focus:ring-2 focus:ring-orange-200 focus:border-transparent text-black placeholder-black/50"
                placeholder="Confirm password"
                required
              />
            </div>
          )}
          {formError && (
            <div className="text-red-500 text-sm mt-2">
              {formError}
            </div>
          )}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-orange-200/60 to-orange-300/70 text-black font-semibold py-2.5 rounded-lg hover:shadow-lg transition-all duration-200 font-['Work_Sans'] uppercase text-sm disabled:opacity-50"
          >
            {isLoading ? 'Loading...' : (isLogin ? 'Login' : 'Sign Up')}
          </button>
        </form>

        {/* Google Login + Switch */}
        <div className="mt-6 text-center">
          <button
            className="w-full bg-orange-100/40 text-black font-semibold py-2.5 rounded-lg hover:bg-orange-200/60 hover:shadow-lg transition-all duration-200 font-['Work_Sans'] uppercase text-sm flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12c0 4.41 2.87 8.16 6.84 9.47.5.09.68-.22.68-.48 0-.24-.01-1.04-.01-1.91-2.48.54-3.03-1.04-3.23-1.99-.11-.48-.58-1.99-.99-2.39-.34-.57-.82-1.01-1.41-1.01-.96 0-1.74.58-1.74 1.25 0 .69.28 1.44.68 1.78.4.21.83.41 1.26.59 1.48.65 2.68.95 3.42.76.11-.59.43-1.01.78-1.24-2.74-.31-5.6-1.37-5.6-6.08 0-1.34.48-2.44 1.27-3.3-.13-.31-.55-1.56.12-3.25 0 0 1.03-.33 3.37 1.26 1-.28 2.07-.42 3.13-.42 1.06 0 2.13.14 3.13.42 2.34-1.59 3.37-1.26 3.37-1.26.67 1.69.25 2.94.12 3.25.79.86 1.27 1.96 1.27 3.3 0 4.71-2.86 5.77-5.6 6.08.44.23.83.68.83 1.37 0 1.02-.01 1.84-.01 2.09 0 .26.18.58.69.48C19.13 20.16 22 16.41 22 12c0-5.52-4.48-10-10-10z" />
            </svg>
            {isLogin ? 'Login with Google' : 'Sign up with Google'}
          </button>
          <p className="mt-4 text-sm text-black/70">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <button className="text-orange-600 hover:underline ml-1" onClick={() => setIsLogin(!isLogin)}>
              {isLogin ? 'Sign up' : 'Login'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;