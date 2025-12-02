'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Script from 'next/script';
import Header from '@/components/layout/Header';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store';
import { fetchPujaById } from '@/store/slices/pujaSlice';
import { loginSuccess, fetchUserInfo } from '@/store/slices/authSlice';
import { PujaCard, PlanResponse } from '@/types';
import { apiService } from '@/services/api';
import { storeAuthToken, getAuthToken } from '@/utils/auth';
import { useAppSelector } from '@/hooks';


interface ExtendedPujaCard extends PujaCard {
  benefits: Array<{id: number; benefit_title: string; benefit_description: string; puja_id: number; created_at: string}>;
  images: Array<{id: number; image_url: string}>;
  chadawas?: Chadawa[];
  temple_description?: string;
  prasad_price?: number;
  is_prasad_active?: boolean;
  dakshina_prices_inr?: string;
  dakshina_prices_usd?: string;
  is_dakshina_active?: boolean;
  manokamna_prices_inr?: string;
  manokamna_prices_usd?: string;
  is_manokamna_active?: boolean;
  sub_heading?: string;
  time?: string;
  temple_address?: string;
  isNew?: boolean;
  timer?: boolean;
  shareLabel?: string;
  plan_ids?: number[];
  selectedPlans?: PlanResponse[];
}

interface TransformedChadhwa {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  icon: string;
  selected: boolean;
}

const CustomCheckoutPage: React.FC = () => {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useDispatch<AppDispatch>();
  const { selectedPuja, isLoading, error } = useSelector((state: RootState) => state.puja);
  
  const pujaId = params.id as string;
  const planId = searchParams.get('planId');
  const planPrice = searchParams.get('planPrice');
  const planName = searchParams.get('planName');

  // Form states
  const [formData, setFormData] = useState({
    mobileNumber: '',
    whatsappNumber: '',
    syncWhatsApp: false,
    gotra: '',
    dontKnowGotra: false,
    dakshina: ''
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const { user } = useAppSelector((state) => state.auth);

  // OTP Authentication states
  const [authState, setAuthState] = useState({
    isAuthenticated: false,
    accessToken: '',
    tokenType: '',
    showOtpInput: false,
    requiresRegistration: false,
    showRegistrationForm: false,
    otpSent: false
  });
  const [otpCode, setOtpCode] = useState('');
  const [registrationData, setRegistrationData] = useState({
    name: '',
    email: ''
  });
  const [isRequestingOtp, setIsRequestingOtp] = useState(false);
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);
  const [selectedChadhwas, setSelectedChadhwas] = useState<TransformedChadhwa[]>([]);

  useEffect(() => {
    if (pujaId) {
      dispatch(fetchPujaById(pujaId));
    }
  }, [dispatch, pujaId]);

  // Transform chadawas from puja detail to the format used in the UI
  const chadhwas = useMemo(() => {
    if (!selectedPuja) {
      console.log('No selectedPuja');
      return [];
    }
    
    const puja = selectedPuja as ExtendedPujaCard;
    console.log('Selected Puja:', puja);
    console.log('Chadawas from API:', puja.chadawas);
    
    if (!puja.chadawas || puja.chadawas.length === 0) {
      console.log('No chadawas found in puja');
      return [];
    }
    
    const transformed = puja.chadawas.map((chadawa) => ({
      id: chadawa.id,
      name: chadawa.name,
      description: chadawa.description,
      price: parseFloat(chadawa.price),
      image: chadawa.image_url.startsWith('http') ? chadawa.image_url : `https://api.33kotidham.com/${chadawa.image_url}`,
      icon: '', // We'll leave this empty for now
      selected: true // Default all to selected
    }));
    
    console.log('Transformed chadhwas:', transformed);
    return transformed;
  }, [selectedPuja]);



  useEffect(() => {
    if (chadhwas.length > 0) {
      setSelectedChadhwas(chadhwas.filter((chadhwa) => chadhwa.selected));
    }
  }, [chadhwas]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    if (type === 'checkbox') {
      if (name === 'syncWhatsApp') {
        setFormData(prev => ({
          ...prev,
          syncWhatsApp: checked,
          whatsappNumber: checked ? prev.mobileNumber : prev.whatsappNumber
        }));
      } else if (name === 'dontKnowGotra') {
        setFormData(prev => ({
          ...prev,
          dontKnowGotra: checked,
          gotra: checked ? '' : prev.gotra
        }));
      }
    } else {
      setFormData(prev => {
        const updatedData = {
          ...prev,
          [name]: value
        };
        
        // If sync is enabled, update WhatsApp number when mobile number changes
        if (name === 'mobileNumber' && prev.syncWhatsApp) {
          updatedData.whatsappNumber = value;
        }
        
        return updatedData;
      });
    }
  };

  // OTP Authentication Functions
  const handleRequestOtp = async () => {
    if (!formData.mobileNumber || formData.mobileNumber.length !== 10) {
      alert('Please enter a valid 10-digit mobile number');
      return;
    }

    setIsRequestingOtp(true);
    try {
      const response = await fetch('https://api.33kotidham.com/api/v1/auth/request-otp', {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          mobile: formData.mobileNumber
        })
      });

      const data = await response.json();

      if (data.requires_registration) {
        // User needs to register first
        setAuthState(prev => ({
          ...prev,
          requiresRegistration: true,
          showRegistrationForm: true
        }));
      } else {
        // OTP sent successfully
        setAuthState(prev => ({
          ...prev,
          showOtpInput: true,
          otpSent: true
        }));
        alert('OTP sent to your mobile number');
      }
    } catch (error) {
      console.error('Error requesting OTP:', error);
      alert('Failed to send OTP. Please try again.');
    } finally {
      setIsRequestingOtp(false);
    }
  };

  const handleRegisterWithOtp = async () => {
    if (!registrationData.name || !registrationData.email) {
      alert('Please fill in all registration details');
      return;
    }

    setIsRequestingOtp(true);
    try {
      const response = await fetch('https://api.33kotidham.com/api/v1/auth/register-with-otp', {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: registrationData.name,
          email: registrationData.email,
          mobile: formData.mobileNumber,
          password: '',
          role: 'user'
        })
      });

      if (response.ok) {
        setAuthState(prev => ({
          ...prev,
          showRegistrationForm: false,
          showOtpInput: true,
          otpSent: true
        }));
        alert('Registration successful! OTP sent to your mobile number');
      } else {
        throw new Error('Registration failed');
      }
    } catch (error) {
      console.error('Error registering:', error);
      alert('Failed to register. Please try again.');
    } finally {
      setIsRequestingOtp(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!otpCode || otpCode.length !== 6) {
      alert('Please enter a valid 6-digit OTP');
      return;
    }

    setIsVerifyingOtp(true);
    try {
      const response = await fetch('https://api.33kotidham.com/api/v1/auth/verify-otp', {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          mobile: formData.mobileNumber,
          otp_code: otpCode
        })
      });

      const data = await response.json();

      if (data.access_token) {
        setAuthState(prev => ({
          ...prev,
          isAuthenticated: true,
          accessToken: data.access_token,
          tokenType: data.token_type,
          showOtpInput: false
        }));
        // Store token using auth utility
        storeAuthToken(data.access_token, data.token_type);
        
        // Dispatch loginSuccess to update global auth state
        dispatch(loginSuccess({
          id: 0,
          name: registrationData.name || 'User',
          email: registrationData.email || '',
          mobile: formData.mobileNumber,
          isAuthenticated: true,
          access_token: data.access_token,
          token_type: data.token_type
        }));
        
        // Fetch full user info from backend
        dispatch(fetchUserInfo());
        
        alert('Authentication successful! You can now proceed with booking.');
      } else {
        throw new Error('Invalid OTP');
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      alert('Invalid OTP. Please try again.');
    } finally {
      setIsVerifyingOtp(false);
    }
  };

  // Check for existing token on mount
  useEffect(() => {
    const { token, tokenType } = getAuthToken();
    if (token && tokenType) {
      setAuthState(prev => ({
        ...prev,
        isAuthenticated: true,
        accessToken: token,
        tokenType: tokenType
      }));
    }
  }, []);

  const toggleChadhwa = (chadhwa: typeof chadhwas[0]) => {
    setSelectedChadhwas((prev: TransformedChadhwa[]) => {
      const isSelected = prev.some((c: TransformedChadhwa) => c.id === chadhwa.id);
      if (isSelected) {
        return prev.filter((c: TransformedChadhwa) => c.id !== chadhwa.id);
      } else {
        return [...prev, chadhwa];
      }
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate authentication - check both user state and authState
    if (!authState.isAuthenticated && (!user || !user.isAuthenticated)) {
      alert('Please authenticate with OTP to complete booking');
      return;
    }

    // Validate required fields
    if (!formData.mobileNumber) {
      alert('Please enter your mobile number');
      return;
    }
    
    if (!formData.whatsappNumber) {
      alert('Please enter your WhatsApp number');
      return;
    }
    
    // Validate gotra field if "don't know gotra" is not checked
    if (!formData.dontKnowGotra && !formData.gotra) {
      alert('Please enter your gotra or check "I don\'t know my Gotra"');
      return;
    }

    if (!planId) {
      alert('Please select a plan');
      return;
    }
    
    setIsProcessing(true);

    try {
      // Prepare booking data
      const bookingData = {
        puja_id: parseInt(pujaId),
        plan_id: parseInt(planId),
        booking_date: new Date().toISOString(),
        mobile_number: formData.mobileNumber,
        whatsapp_number: formData.whatsappNumber,
        gotra: formData.dontKnowGotra ? 'Unknown' : formData.gotra,
        chadawas: [],
        chadawa_ids: selectedChadhwas.map((c: TransformedChadhwa) => c.id)
      };

      // Create Razorpay booking
      const response = await apiService.createRazorpayBooking(bookingData);
      
      if (!response || !response.razorpay_order_id) {
        throw new Error('Failed to create booking');
      }

      // Get Razorpay key from environment
      const razorpayKey = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
      
      if (!razorpayKey) {
        throw new Error('Razorpay key not configured. Please contact support.');
      }

      // Initialize Razorpay payment
      const options = {
        key: razorpayKey,
        amount: response.razorpay_order.amount,
        currency: response.razorpay_order.currency,
        name: '33KotiDham',
        description: selectedPuja?.title || 'Puja Booking',
        order_id: response.razorpay_order_id,
        handler: async function (razorpayResponse: { razorpay_order_id: string; razorpay_payment_id: string; razorpay_signature: string }) {
          // Payment successful from Razorpay, now verify on backend
          console.log('Payment successful from Razorpay:', razorpayResponse);
          
          try {
            // Verify payment with backend
            const verificationData = {
              booking_id: response.booking.id,
              razorpay_order_id: razorpayResponse.razorpay_order_id,
              razorpay_payment_id: razorpayResponse.razorpay_payment_id,
              razorpay_signature: razorpayResponse.razorpay_signature
            };
            
            const verificationResult = await apiService.verifyPayment(verificationData);
            console.log('Payment verification result:', verificationResult);
            
            // Redirect to success page with booking details
            router.push(`/puja/${pujaId}/checkout/success?bookingId=${response.booking.id}&paymentId=${razorpayResponse.razorpay_payment_id}&orderId=${razorpayResponse.razorpay_order_id}`);
          } catch (verificationError) {
            console.error('Payment verification failed:', verificationError);
            // Redirect to failure page
            router.push(`/puja/${pujaId}/checkout/failure?bookingId=${response.booking.id}&orderId=${razorpayResponse.razorpay_order_id}`);
          }
        },
        prefill: {
          name: user?.name || '',
          email: user?.email || '',
          contact: formData.mobileNumber
        },
        theme: {
          color: '#f97316'
        },
        modal: {
          ondismiss: function() {
            setIsProcessing(false);
            alert('Payment cancelled. You can try again.');
          }
        }
      };

      if (typeof window !== 'undefined' && window.Razorpay) {
        const razorpay = new window.Razorpay(options);
        razorpay.open();
      } else {
        throw new Error('Razorpay SDK not loaded');
      }
    } catch (error) {
      console.error('Booking error:', error);
      alert(error instanceof Error ? error.message : 'Failed to process booking');
      setIsProcessing(false);
    }
  };

  // Show loading state while fetching puja data
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
        <Header />
        <div className="pt-24 flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
        </div>
      </div>
    );
  }

  // Show error if puja data couldn't be loaded
  if (error || !selectedPuja) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
        <Header />
        <div className="pt-24 flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              {error ? 'Error Loading Puja' : 'Puja Not Found'}
            </h1>
            {error && <p className="text-gray-600 mb-4">{error}</p>}
            <button
              onClick={() => router.push('/')}
              className="bg-orange-500 text-white px-8 py-3 rounded-full hover:bg-orange-600 transition-all shadow-lg hover:shadow-xl"
            >
              Go Back Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Use actual puja data instead of hardcoded data
  const isExtendedPuja = (puja: PujaCard): puja is ExtendedPujaCard => {
    return puja && typeof puja === 'object' && 'benefits' in puja && 'images' in puja;
  };
  
  const pujaData = {
    id: selectedPuja.id,
    title: selectedPuja.title,
    temple: selectedPuja.temple,
    date: selectedPuja.date,
    image: selectedPuja.image,
    price: isExtendedPuja(selectedPuja) && (selectedPuja as ExtendedPujaCard)?.is_prasad_active ? (selectedPuja as ExtendedPujaCard)?.prasad_price || 0 : 0,
    description: selectedPuja.description
  };

  // Find the selected plan based on planId
  let selectedPlan = null;
  if (planId) {
    selectedPlan = {
      id: planId,
      name: planName || `Selected Plan ${planId}`,
      price: planPrice ? parseFloat(planPrice) : (pujaData.price || 0),
      icon: '🧘'
    };
  }

  // Calculate total (removed service fee and GST)
  const chadhwaTotal = selectedChadhwas.reduce((sum, chadhwa: TransformedChadhwa) => sum + chadhwa.price, 0);
  const planTotal = selectedPlan?.price || 0;
  const dakshinaAmount = formData.dakshina ? parseInt(formData.dakshina) : 0;
  const totalAmount = planTotal + chadhwaTotal + dakshinaAmount;

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="lazyOnload"
      />
      <Header />

      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 font-['Philosopher'] mb-3">Complete Your Puja Booking</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Add sacred offerings and complete your puja reservation
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Puja Details */}
            <div className="space-y-8">
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-orange-100">
                <div className="flex items-center justify-between mb-5">
                  <h2 className="text-xl font-bold text-gray-900 font-['Philosopher']">Puja Details</h2>
                  <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                    1
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-6">
                  <div className="relative w-32 h-32 rounded-xl overflow-hidden shadow-md flex-shrink-0">
                    <Image
                      src={pujaData.image}
                      alt={pujaData.title}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 font-['Philosopher'] mb-2">{pujaData.title}</h3>
                    <p className="text-orange-600 font-medium mb-2">{pujaData.temple}</p>

                    <div className="flex flex-wrap gap-2">
                      <div className="flex items-center gap-1 bg-orange-50 px-3 py-1 rounded-full">
                        <svg className="w-4 h-4 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span className="text-sm">{pujaData.date}</span>
                      </div>
                      <div className="flex items-center gap-1 bg-orange-50 px-3 py-1 rounded-full">
                        <svg className="w-4 h-4 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-sm">3:00 PM</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Form Section */}
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-orange-100">
                <div className="flex items-center justify-between mb-5">
                  <h2 className="text-xl font-bold text-gray-900 font-['Philosopher']">Personal Details</h2>
                  <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                    2
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label htmlFor="mobileNumber" className="block text-sm font-medium text-gray-700 mb-1">
                      Mobile Number *
                    </label>
                    <div className="flex gap-2 flex-wrap">
                      <input
                        type="tel"
                        id="mobileNumber"
                        name="mobileNumber"
                        value={formData.mobileNumber}
                        onChange={handleInputChange}
                        required
                        disabled={authState.showOtpInput || authState.showRegistrationForm}
                        className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all disabled:bg-gray-100 disabled:cursor-not-allowed"
                        placeholder="Enter your mobile number"
                        maxLength={10}
                      />
                      {!user?.isAuthenticated && !authState.isAuthenticated && !authState.showOtpInput && !authState.showRegistrationForm && (
                        <button
                          type="button"
                          onClick={handleRequestOtp}
                          disabled={isRequestingOtp || formData.mobileNumber.length !== 10}
                          className="px-6 py-3 bg-orange-500 text-white font-medium rounded-xl hover:bg-orange-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                        >
                          {isRequestingOtp ? 'Sending...' : 'Send OTP'}
                        </button>
                      )}
                      {(user?.isAuthenticated || authState.isAuthenticated) && (
                        <div className="flex items-center px-4 py-3 bg-green-50 text-green-600 rounded-xl">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="ml-2 text-sm font-medium">Verified</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Registration Form */}
                  {authState.showRegistrationForm && (
                    <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 space-y-4">
                      <div className="flex items-center gap-2 text-orange-600 font-medium">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>New User - Please Complete Registration</span>
                      </div>
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          id="name"
                          value={registrationData.name}
                          onChange={(e) => setRegistrationData(prev => ({ ...prev, name: e.target.value }))}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                          placeholder="Enter your full name"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                          Email *
                        </label>
                        <input
                          type="email"
                          id="email"
                          value={registrationData.email}
                          onChange={(e) => setRegistrationData(prev => ({ ...prev, email: e.target.value }))}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                          placeholder="Enter your email"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={handleRegisterWithOtp}
                        disabled={isRequestingOtp}
                        className="w-full px-6 py-3 bg-orange-500 text-white font-medium rounded-xl hover:bg-orange-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isRequestingOtp ? 'Registering...' : 'Register & Send OTP'}
                      </button>
                    </div>
                  )}

                  {/* OTP Input */}
                  {authState.showOtpInput && !authState.isAuthenticated && (
                    <div className="bg-green-50 border border-green-200 rounded-xl p-4 space-y-4">
                      <div className="flex items-center gap-2 text-green-600 font-medium">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        <span>OTP Sent to {formData.mobileNumber}</span>
                      </div>
                      <div>
                        <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-1">
                          Enter OTP *
                        </label>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            id="otp"
                            value={otpCode}
                            onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ''))}
                            required
                            maxLength={6}
                            className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all text-center text-lg tracking-widest"
                            placeholder="000000"
                          />
                          <button
                            type="button"
                            onClick={handleVerifyOtp}
                            disabled={isVerifyingOtp || otpCode.length !== 6}
                            className="px-6 py-3 bg-green-500 text-white font-medium rounded-xl hover:bg-green-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                          >
                            {isVerifyingOtp ? 'Verifying...' : 'Verify OTP'}
                          </button>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={handleRequestOtp}
                        disabled={isRequestingOtp}
                        className="text-sm text-orange-600 hover:text-orange-700 font-medium"
                      >
                        Resend OTP
                      </button>
                    </div>
                  )}

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="syncWhatsApp"
                      name="syncWhatsApp"
                      checked={formData.syncWhatsApp}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                    />
                    <label htmlFor="syncWhatsApp" className="ml-2 text-sm text-gray-600">
                      Use same number for WhatsApp
                    </label>
                  </div>

                  <div>
                    <label htmlFor="whatsappNumber" className="block text-sm font-medium text-gray-700 mb-1">
                      WhatsApp Number *
                    </label>
                    <input
                      type="tel"
                      id="whatsappNumber"
                      name="whatsappNumber"
                      value={formData.whatsappNumber}
                      onChange={handleInputChange}
                      required
                      disabled={formData.syncWhatsApp}
                      className={`w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all ${formData.syncWhatsApp ? 'bg-gray-100 cursor-not-allowed' : ''}`}
                      placeholder="Enter your WhatsApp number"
                    />
                  </div>

                  <div>
                    <label htmlFor="gotra" className="block text-sm font-medium text-gray-700 mb-1">
                      Gotra {!formData.dontKnowGotra && '*'}
                    </label>
                    <input
                      type="text"
                      id="gotra"
                      name="gotra"
                      value={formData.dontKnowGotra ? '' : formData.gotra}
                      onChange={handleInputChange}
                      required={!formData.dontKnowGotra}
                      disabled={formData.dontKnowGotra}
                      className={`w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all ${formData.dontKnowGotra ? 'bg-gray-100 cursor-not-allowed' : ''}`}
                      placeholder="Enter your gotra"
                    />
                    <div className="flex items-center mt-2">
                      <input
                        type="checkbox"
                        id="dontKnowGotra"
                        name="dontKnowGotra"
                        checked={formData.dontKnowGotra}
                        onChange={handleInputChange}
                        className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                      />
                      <label htmlFor="dontKnowGotra" className="ml-2 text-sm text-gray-600">
                        I don&apos;t know my Gotra
                      </label>
                    </div>
                  </div>
                </form>
              </div>
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-orange-100">
                <div className="flex items-center justify-between mb-5">
                  <h2 className="text-xl font-bold text-gray-900 font-['Philosopher']">Selected Puja Plan</h2>
                  <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                    3
                  </div>
                </div>
                <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-2xl p-5 border border-orange-100">
                  <div className="flex items-center gap-4">
                    <div className="text-3xl">{selectedPlan?.icon || '🧘'}</div>
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-900 text-lg">{selectedPlan?.name || pujaData.title}</h4>
                      <p className="text-orange-600 font-bold text-xl">₹{selectedPlan?.price?.toLocaleString() || pujaData.price?.toLocaleString() || '0'}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-6 border border-green-100">
                <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  What to Expect
                </h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Confirmation message on WhatsApp within 15 minutes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Puja performed by qualified priests at {pujaData.temple}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Prasad delivery within 7-10 business days</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Right Column - Chadhwas Selection */}
            <div className="space-y-8">
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-orange-100">
                <div className="flex items-center justify-between mb-5">
                  <h2 className="text-xl font-bold text-gray-900 font-['Philosopher']">Sacred Offerings (Chadhwas)</h2>
                  <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                    4
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  {chadhwas.length === 0 ? (
                    <div className="col-span-2 text-center py-8 text-gray-500">
                      <p className="text-lg mb-2">No Sacred Offerings available for this puja</p>
                      <p className="text-sm">Check browser console for debugging info</p>
                    </div>
                  ) : (
                    chadhwas.map((chadhwa: TransformedChadhwa) => (
                      <div
                        key={chadhwa.id}
                        className={`border-2 rounded-xl p-4 cursor-pointer transition-all duration-200 ${selectedChadhwas.some(c => c.id === chadhwa.id)
                                ? 'border-orange-500 bg-orange-50 ring-2 ring-orange-200'
                                : 'border-gray-200 hover:border-orange-300'
                              }`}
                        onClick={() => toggleChadhwa(chadhwa)}
                      >
                        <div className="flex items-start gap-4">
                          <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                            <Image
                              src={chadhwa.image}
                              alt={chadhwa.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-bold text-gray-900">{chadhwa.name}</h4>
                            <p className="text-xs text-gray-600 mt-1">{chadhwa.description}</p>
                            <div className="flex items-center justify-between mt-2">
                              <span className="text-orange-600 font-bold">₹{chadhwa.price}</span>
                              {selectedChadhwas.some(c => c.id === chadhwa.id) ? (
                                <div className="w-5 h-5 bg-orange-500 rounded-full flex items-center justify-center">
                                  <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                  </svg>
                                </div>
                              ) : (
                                <div className="w-5 h-5 border-2 border-gray-300 rounded-full"></div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {/* Dakshina to Pandit */}
                <div className="mt-6 pt-4 border-t border-orange-200">
                  <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <span className="text-orange-500">💰</span>
                    Dakshina to Pandit (Optional)
                  </h4>
                  <div className="bg-orange-50 rounded-lg p-4">
                    <div className="flex items-center gap-3">
                      <div className="flex-1">
                        <label htmlFor="dakshina" className="block text-sm font-medium text-gray-700 mb-1">
                          Amount (₹)
                        </label>
                        <input
                          type="number"
                          id="dakshina"
                          name="dakshina"
                          value={formData.dakshina}
                          onChange={handleInputChange}
                          min="0"
                          placeholder="Enter amount"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                        />
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-600">Additional</p>
                        <p className="text-lg font-bold text-orange-600">
                          ₹{formData.dakshina ? parseInt(formData.dakshina).toLocaleString() : '0'}
                        </p>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      Your generous contribution to the priest for performing the puja
                    </p>
                  </div>
                </div>

                {/* Order Summary */}
                <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl p-5">
                  <h3 className="font-bold text-gray-900 mb-4">Order Summary</h3>

                  <div className="space-y-3 mb-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Plan Price</span>
                      <span className="font-medium">₹{planTotal.toLocaleString()}</span>
                    </div>

                    {selectedChadhwas.map((chadhwa: TransformedChadhwa) => (
                      <div key={chadhwa.id} className="flex justify-between">
                        <span className="text-gray-600">{chadhwa.name}</span>
                        <span className="font-medium">₹{chadhwa.price.toLocaleString()}</span>
                      </div>
                    ))}

                    {formData.dakshina && parseInt(formData.dakshina) > 0 && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Dakshina to Pandit</span>
                        <span className="font-medium">₹{parseInt(formData.dakshina).toLocaleString()}</span>
                      </div>
                    )}

                    <div className="flex justify-between pt-3 border-t border-gray-200">
                      <span className="font-bold">Total Amount</span>
                      <span className="font-bold text-orange-600">
                        ₹{totalAmount.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <div className="text-xs text-gray-500 mt-4">
                    <p>All offerings are personally presented by qualified priests during the puja ceremony.</p>
                  </div>
                </div>

                {/* Payment Buttons */}
                <div className="pt-6 border-t border-gray-200 mt-6">
                  <button
                    type="submit"
                    disabled={isProcessing || (!authState.isAuthenticated && (!user || !user.isAuthenticated))}
                    className={`w-full py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all shadow-lg flex items-center justify-center ${(isProcessing || (!authState.isAuthenticated && (!user || !user.isAuthenticated))) ? 'opacity-75 cursor-not-allowed' : ''}`}
                    onClick={handleSubmit}
                  >
                    {isProcessing ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing Payment...
                      </>
                    ) : (!authState.isAuthenticated && (!user || !user.isAuthenticated)) ? (
                      'Please Authenticate to Proceed'
                    ) : (
                      `Proceed to Pay ₹${totalAmount.toLocaleString()}`
                    )}
                  </button>
                  {(!authState.isAuthenticated && (!user || !user.isAuthenticated)) && (
                    <p className="text-sm text-orange-600 text-center mt-2">
                      Please verify your mobile number with OTP to continue
                    </p>
                  )}

                  <button
                    type="button"
                    onClick={() => router.back()}
                    className="w-full mt-3 py-3 bg-gray-100 text-gray-700 font-bold rounded-xl hover:bg-gray-200 transition-all"
                  >
                    ← Back to Puja Details
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CustomCheckoutPage;