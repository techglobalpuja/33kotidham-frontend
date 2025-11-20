'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Script from 'next/script';
import { useParams, useRouter } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@/store';
import { loginSuccess } from '@/store/slices/authSlice';
import Header from '@/components/layout/Header';
import GlobalFooter from '@/components/layout/GlobalFooter';
import { apiService } from '@/services/api';
import { storeAuthToken } from '@/utils/auth';
import { Temple, Chadawa } from '@/types';

const CheckoutPage: React.FC = () => {
  const params = useParams();
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { templeId, chadawaId } = params;
  const { user } = useSelector((state: RootState) => state.auth);
  
  const [temple, setTemple] = useState<Temple | null>(null);
  const [chadawas, setChadawas] = useState<Chadawa[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [selectedChadawas, setSelectedChadawas] = useState<number[]>([parseInt(chadawaId as string)]);
  const [isProcessing, setIsProcessing] = useState(false);
  
  // OTP Authentication states
  const [authState, setAuthState] = useState({
    isAuthenticated: false,
    showOtpInput: false,
    requiresRegistration: false,
    showRegistrationForm: false,
    otpSent: false,
    mobile: ''
  });
  const [otpCode, setOtpCode] = useState('');
  const [registrationData, setRegistrationData] = useState({
    name: '',
    email: ''
  });
  const [isRequestingOtp, setIsRequestingOtp] = useState(false);
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);
  
  const [formData, setFormData] = useState({
    mobileNumber: '',
    whatsappNumber: '',
    gotra: '',
    dontKnowGotra: false,
  });

  useEffect(() => {
    const fetchCheckoutData = async () => {
      try {
        setLoading(true);
        
        // Fetch specific temple data by ID
        const templeData = await apiService.getTempleById(parseInt(templeId as string));
        setTemple(templeData);
        
        // Fetch all chadawas for this temple
        const chadawaData = await apiService.getChadawas();
        setChadawas(chadawaData);
        
        // Initialize with the chadawa from the URL
        if (chadawaId) {
          setSelectedChadawas([parseInt(chadawaId as string)]);
        }
      } catch (err) {
        setError('Failed to fetch checkout data');
        console.error('Error fetching checkout data:', err);
      } finally {
        setLoading(false);
      }
    };

    if (templeId) {
      fetchCheckoutData();
    }
  }, [templeId, chadawaId]);

  // Pre-fill mobile number if user is authenticated
  useEffect(() => {
    if (user && user.isAuthenticated && user.mobile) {
      setFormData(prev => ({
        ...prev,
        mobileNumber: user.mobile || '',
        whatsappNumber: prev.whatsappNumber || user.mobile || ''
      }));
      setAuthState(prev => ({
        ...prev,
        isAuthenticated: true,
        mobile: user.mobile || ''
      }));
    }
  }, [user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleChadawaToggle = (chadawaId: number) => {
    setSelectedChadawas(prev => 
      prev.includes(chadawaId) 
        ? prev.filter(id => id !== chadawaId) 
        : [...prev, chadawaId]
    );
  };


  // Request OTP
  const handleRequestOtp = async () => {
    if (!formData.mobileNumber || formData.mobileNumber.length !== 10) {
      alert('Please enter a valid 10-digit mobile number');
      return;
    }

    setIsRequestingOtp(true);
    try {
      const response = await fetch('https://api.33kotidham.in/api/v1/auth/request-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'accept': 'application/json'
        },
        body: JSON.stringify({ mobile: formData.mobileNumber })
      });

      const data = await response.json();

      if (data.requires_registration) {
        // New user - show registration form
        setAuthState({
          ...authState,
          requiresRegistration: true,
          showRegistrationForm: true,
          mobile: formData.mobileNumber
        });
        alert('New user detected. Please complete registration.');
      } else if (data.message && data.message.includes('OTP sent')) {
        // Existing user - show OTP input
        setAuthState({
          ...authState,
          showOtpInput: true,
          otpSent: true,
          mobile: formData.mobileNumber
        });
        alert('OTP sent to your mobile number');
      } else {
        alert('Failed to send OTP. Please try again.');
      }
    } catch (error) {
      console.error('OTP request error:', error);
      alert('Failed to send OTP. Please try again.');
    } finally {
      setIsRequestingOtp(false);
    }
  };

  // Register new user
  const handleRegister = async () => {
    if (!registrationData.name || !registrationData.email) {
      alert('Please enter your name and email');
      return;
    }

    setIsRequestingOtp(true);
    try {
      const response = await fetch('https://api.33kotidham.in/api/v1/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'accept': 'application/json'
        },
        body: JSON.stringify({
          name: registrationData.name,
          email: registrationData.email,
          mobile: authState.mobile
        })
      });

      const data = await response.json();

      if (data.id) {
        // Registration successful, now request OTP
        const otpResponse = await fetch('https://api.33kotidham.in/api/v1/auth/request-otp', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'accept': 'application/json'
          },
          body: JSON.stringify({ mobile: authState.mobile })
        });

        const otpData = await otpResponse.json();

        if (otpData.message && otpData.message.includes('OTP sent')) {
          setAuthState({
            ...authState,
            showRegistrationForm: false,
            showOtpInput: true,
            otpSent: true
          });
          alert('Registration successful! OTP sent to your mobile number.');
        }
      } else {
        alert('Registration failed. Please try again.');
      }
    } catch (error) {
      console.error('Registration error:', error);
      alert('Registration failed. Please try again.');
    } finally {
      setIsRequestingOtp(false);
    }
  };

  // Verify OTP
  const handleVerifyOtp = async () => {
    if (!otpCode || otpCode.length !== 6) {
      alert('Please enter a valid 6-digit OTP');
      return;
    }

    setIsVerifyingOtp(true);
    try {
      const response = await fetch('https://api.33kotidham.in/api/v1/auth/verify-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'accept': 'application/json'
        },
        body: JSON.stringify({
          mobile: authState.mobile,
          otp_code: otpCode
        })
      });

      const data = await response.json();

      if (data.access_token) {
        // Store token
        storeAuthToken(data.access_token);
        
        // Fetch user info
        const userResponse = await fetch('https://api.33kotidham.in/api/v1/users/me', {
          headers: {
            'Authorization': `Bearer ${data.access_token}`,
            'accept': 'application/json'
          }
        });

        const userData = await userResponse.json();

        // Update Redux state
        dispatch(loginSuccess({
          id: userData.id,
          name: userData.name,
          email: userData.email,
          mobile: userData.mobile,
          isAuthenticated: true,
          access_token: data.access_token,
          token_type: data.token_type
        }));

        setAuthState({
          ...authState,
          isAuthenticated: true,
          showOtpInput: false
        });

        alert('Authentication successful!');
      } else {
        alert('Invalid OTP. Please try again.');
      }
    } catch (error) {
      console.error('OTP verification error:', error);
      alert('OTP verification failed. Please try again.');
    } finally {
      setIsVerifyingOtp(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check if user is authenticated (either from Redux or local auth state)
    if (!user?.isAuthenticated && !authState.isAuthenticated) {
      alert('Please authenticate with OTP to continue');
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

    if (selectedChadawas.length === 0) {
      alert('Please select at least one chadawa');
      return;
    }
    
    setIsProcessing(true);

    try {
      // Prepare booking data
      const bookingData = {
        puja_id: 0,
        temple_id: parseInt(templeId as string),
        plan_id: 0,
        booking_date: new Date().toISOString(),
        mobile_number: formData.mobileNumber,
        whatsapp_number: formData.whatsappNumber,
        gotra: formData.dontKnowGotra ? 'Unknown' : formData.gotra,
        chadawas: [],
        chadawa_ids: selectedChadawas
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
        description: temple?.name || 'Chadawa Offering',
        order_id: response.razorpay_order_id,
        handler: async function (razorpayResponse: {razorpay_order_id: string; razorpay_payment_id: string; razorpay_signature: string}) {
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
            router.push(`/chadawa-store/${templeId}/${chadawaId}/checkout/success?bookingId=${response.booking.id}&paymentId=${razorpayResponse.razorpay_payment_id}&orderId=${razorpayResponse.razorpay_order_id}`);
          } catch (verificationError) {
            console.error('Payment verification failed:', verificationError);
            // Redirect to failure page
            router.push(`/chadawa-store/${templeId}/${chadawaId}/checkout/failure?bookingId=${response.booking.id}&orderId=${razorpayResponse.razorpay_order_id}`);
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

      // Define a more specific type for Razorpay
      interface RazorpayOptions {
        key: string;
        amount: number;
        currency: string;
        name: string;
        description: string;
        image?: string;
        order_id: string;
        handler: (response: RazorpayResponse) => void;
        modal?: {
          ondismiss?: () => void;
        };
        theme?: {
          color?: string;
        };
      }

      interface RazorpayResponse {
        razorpay_order_id: string;
        razorpay_payment_id: string;
        razorpay_signature: string;
      }

      interface Window {
        Razorpay: new (options: RazorpayOptions) => { open: () => void };
      }

      if (typeof window !== 'undefined' && (window as unknown as Window).Razorpay) {
        const razorpay = new (window as unknown as Window).Razorpay(options);
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

  // Helper function to construct full image URL
  const constructImageUrl = (imagePath: string) => {
    // If it's already a full URL, return as is
    if (imagePath && imagePath.startsWith('http')) {
      return imagePath;
    }
    
    // If it's a relative path, construct the full URL using the production API domain
    if (imagePath && !imagePath.startsWith('http')) {
      try {
        const trimmedPath = imagePath.trim();
        if (trimmedPath && !trimmedPath.includes(' ') && !trimmedPath.includes('\\') && 
            !trimmedPath.includes('..') && trimmedPath.length > 3) {
          // Use the production API domain as specified
          const baseUrl = 'https://api.33kotidham.com';
          const fullPath = `${baseUrl}${trimmedPath.startsWith('/') ? '' : '/'}${trimmedPath}`;
          return fullPath;
        }
      } catch (_error) {
        console.warn('Error constructing full image URL:', _error);
      }
    }
    
    // Fallback to dummy image
    return 'https://placehold.co/600x400/orange/white?text=Image';
  };

  // Calculate total
  const total = chadawas
    .filter(chadawa => selectedChadawas.includes(chadawa.id))
    .reduce((total, chadawa) => total + parseFloat(chadawa.price), 0);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50/50 via-yellow-50/30 to-rose-50/50 flex items-center justify-center">
        <div className="text-2xl font-['Philosopher'] text-orange-600">Loading checkout details...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50/50 via-yellow-50/30 to-rose-50/50 flex items-center justify-center">
        <div className="text-2xl font-['Philosopher'] text-red-600">Error: {error}</div>
      </div>
    );
  }

  if (!temple) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50/50 via-yellow-50/30 to-rose-50/50 flex items-center justify-center">
        <div className="text-2xl font-['Philosopher'] text-red-600">Temple not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50/50 via-yellow-50/30 to-rose-50/50">
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="lazyOnload"
      />
      <Header />
      
      {/* Breadcrumb */}
      <section className="pt-20 sm:pt-28 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <nav className="flex flex-wrap items-center text-xs sm:text-sm text-gray-500 mb-4 sm:mb-8 gap-1">
            <Link href="/" className="hover:text-orange-600">Home</Link>
            <span className="mx-1">/</span>
            <Link href="/chadawa-store" className="hover:text-orange-600">Chadawa Store</Link>
            <span className="mx-1">/</span>
            <Link href={`/chadawa-store/${templeId}`} className="hover:text-orange-600 truncate max-w-[100px] sm:max-w-none">{temple.name}</Link>
            <span className="mx-1">/</span>
            <span className="text-orange-600 font-medium">Checkout</span>
          </nav>
        </div>
      </section>

      {/* Checkout Section */}
      <section className="pb-8 sm:pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 text-center mb-2 font-['Philosopher'] px-2">
            Complete Your Temple Offering
          </h1>
          <p className="text-sm sm:text-base text-gray-600 text-center mb-6 sm:mb-12 max-w-2xl mx-auto px-4">
            Select your chadawas and provide your details to complete the offering process at {temple.name}
          </p>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            {/* Order Summary */}
            <div className="lg:col-span-1 order-2 lg:order-1">
              <div className="bg-white/80 backdrop-blur-lg rounded-2xl sm:rounded-3xl shadow-xl p-4 sm:p-6 border border-white/50 lg:sticky lg:top-32">
                {/* <h2 className="text-xl font-bold text-gray-800 mb-6">Order Summary</h2> */}
                
                {/* Temple */}
                <div className="mb-6 pb-6 border-b border-gray-200">
                  {/* <h3 className="font-bold text-gray-800 mb-3">Temple</h3> */}
                  
                    <div className="relative w-100 h-[150px] rounded-lg overflow-hidden">
                      <Image
                        src={constructImageUrl(temple.image_url)}
                        alt={temple.name}
                        fill
                        className="object-cover"
                        unoptimized={true}
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = 'https://placehold.co/600x400/orange/white?text=Temple+Image';
                        }}
                      />
                    </div>
                    {/* <div className="ml-3">
                      <div className="font-bold text-gray-800">{temple.name}</div>
                      <div className="text-sm text-gray-600">{temple.location}</div>
                    </div> */}
                  
                  <div className="mt-2">
                      <div className="font-bold text-gray-800">{temple.name}</div>
                      <div className="text-sm text-gray-600">{temple.location}</div>
                    </div>
                  <p className="text-sm text-gray-600 mt-2">{temple.description}</p>
                </div>
                
                {/* Selected Chadawas */}
                {selectedChadawas.length > 0 && (
                  <div className="mb-6 pb-6 border-b border-gray-200">
                    <h3 className="font-bold text-gray-800 mb-3">Selected Chadawas</h3>
                    <div className="space-y-3">
                      {chadawas
                        .filter(chadawa => selectedChadawas.includes(chadawa.id))
                        .map(chadawa => (
                          <div key={chadawa.id} className="flex justify-between">
                            <span className="text-gray-600">{chadawa.name}</span>
                            <span className="font-medium">₹{parseFloat(chadawa.price).toFixed(2)}</span>
                          </div>
                        ))}
                    </div>
                  </div>
                )}
                
                {/* Pricing */}
                <div className="space-y-3">
                  <div className="flex justify-between pt-3 border-t border-gray-200">
                    <span className="text-lg font-bold text-gray-800">Total Amount</span>
                    <span className="text-lg font-bold text-orange-600">₹{total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Checkout Form */}
            <div className="lg:col-span-2 order-1 lg:order-2">
              <div className="bg-white/80 backdrop-blur-lg rounded-2xl sm:rounded-3xl shadow-xl p-4 sm:p-6 border border-white/50">
                <form onSubmit={handleSubmit}>
                  {/* Chadawa Selection */}
                  <div className="mb-6 sm:mb-8">
                    <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-3 sm:mb-4">Select Chadawas</h2>
                    <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4">Choose one or more chadawas for your offering</p>
                    
                    {chadawas.length === 0 ? (
                      <div className="text-center py-8 text-gray-500">
                        No chadawas available
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 gap-3 sm:gap-4">
                        {chadawas.map((chadawa) => (
                          <div 
                            key={chadawa.id}
                            onClick={() => handleChadawaToggle(chadawa.id)}
                            className={`border-2 rounded-xl sm:rounded-2xl p-3 sm:p-4 cursor-pointer transition-all duration-300 active:scale-98 ${
                              selectedChadawas.includes(chadawa.id)
                                ? 'border-orange-500 bg-orange-50 ring-4 ring-orange-100'
                                : 'border-gray-200 hover:border-orange-300'
                            }`}
                          >
                            <div className="flex items-center gap-3 sm:gap-4">
                              <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden flex-shrink-0">
                                <Image
                                  src={constructImageUrl(chadawa.image_url)}
                                  alt={chadawa.name}
                                  fill
                                  className="object-cover"
                                  unoptimized={true}
                                  onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.src = 'https://placehold.co/600x400/orange/white?text=Chadawa+Image';
                                  }}
                                />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="font-bold text-gray-800 text-sm sm:text-base">{chadawa.name}</div>
                                <div className="text-xs sm:text-sm text-gray-600 line-clamp-2 sm:line-clamp-1">{chadawa.description}</div>
                                <div className="text-base sm:text-lg font-bold text-orange-600 mt-1">₹{parseFloat(chadawa.price).toFixed(2)}</div>
                              </div>
                              {selectedChadawas.includes(chadawa.id) && (
                                <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-orange-500 flex items-center justify-center flex-shrink-0">
                                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                  </svg>
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                    
                    {selectedChadawas.length === 0 && (
                      <p className="text-red-500 mt-2 text-sm">Please select at least one chadawa to proceed</p>
                    )}
                  </div>
                  
                  {/* Personal Information - Required for Razorpay */}
                  <div className="mb-6 sm:mb-8">
                    <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-3 sm:mb-4">Contact Details</h2>
                    <div className="grid grid-cols-1 gap-4 sm:gap-6">
                      <div>
                        <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Mobile Number *</label>
                        <div className="flex flex-col sm:flex-row gap-2">
                          <input
                            type="tel"
                            name="mobileNumber"
                            value={formData.mobileNumber}
                            onChange={handleInputChange}
                            placeholder="Enter your mobile number"
                            className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors duration-300"
                            required
                            disabled={authState.showOtpInput || authState.isAuthenticated || user?.isAuthenticated}
                            maxLength={10}
                          />
                          {!authState.showOtpInput && !authState.showRegistrationForm && !authState.isAuthenticated && !user?.isAuthenticated && (
                            <button
                              type="button"
                              onClick={handleRequestOtp}
                              disabled={isRequestingOtp || formData.mobileNumber.length !== 10}
                              className="w-full sm:w-auto px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base bg-orange-500 text-white font-semibold rounded-lg sm:rounded-xl hover:bg-orange-600 active:scale-95 transition-all disabled:bg-gray-400 disabled:cursor-not-allowed whitespace-nowrap"
                            >
                              {isRequestingOtp ? 'Sending...' : 'Send OTP'}
                            </button>
                          )}
                        </div>
                        {(authState.isAuthenticated || user?.isAuthenticated) && (
                          <p className="text-green-600 text-sm mt-1 flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            Verified
                          </p>
                        )}
                      </div>
                      
                      {/* Registration Form */}
                      {authState.showRegistrationForm && (
                        <div className="bg-blue-50 border border-blue-200 rounded-lg sm:rounded-xl p-3 sm:p-4">
                          <h3 className="text-sm sm:text-base font-bold text-gray-800 mb-3">Complete Registration</h3>
                          <div className="grid grid-cols-1 gap-3 sm:gap-4">
                            <div>
                              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                              <input
                                type="text"
                                value={registrationData.name}
                                onChange={(e) => setRegistrationData({ ...registrationData, name: e.target.value })}
                                placeholder="Enter your full name"
                                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                                required
                              />
                            </div>
                            <div>
                              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Email *</label>
                              <input
                                type="email"
                                value={registrationData.email}
                                onChange={(e) => setRegistrationData({ ...registrationData, email: e.target.value })}
                                placeholder="Enter your email"
                                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                                required
                              />
                            </div>
                            <div>
                              <button
                                type="button"
                                onClick={handleRegister}
                                disabled={isRequestingOtp}
                                className="w-full px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base bg-green-500 text-white font-semibold rounded-lg sm:rounded-xl hover:bg-green-600 active:scale-95 transition-all disabled:bg-gray-400"
                              >
                                {isRequestingOtp ? 'Registering...' : 'Register & Send OTP'}
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      {/* OTP Input */}
                      {authState.showOtpInput && !authState.isAuthenticated && (
                        <div className="bg-green-50 border border-green-200 rounded-lg sm:rounded-xl p-3 sm:p-4">
                          <h3 className="text-sm sm:text-base font-bold text-gray-800 mb-3">Enter OTP</h3>
                          <div className="flex flex-col sm:flex-row gap-2">
                            <input
                              type="text"
                              value={otpCode}
                              onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ''))}
                              placeholder="Enter 6-digit OTP"
                              className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-center text-base sm:text-lg tracking-widest"
                              maxLength={6}
                            />
                            <button
                              type="button"
                              onClick={handleVerifyOtp}
                              disabled={isVerifyingOtp || otpCode.length !== 6}
                              className="w-full sm:w-auto px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base bg-green-500 text-white font-semibold rounded-lg sm:rounded-xl hover:bg-green-600 active:scale-95 transition-all disabled:bg-gray-400 disabled:cursor-not-allowed"
                            >
                              {isVerifyingOtp ? 'Verifying...' : 'Verify OTP'}
                            </button>
                          </div>
                          <button
                            type="button"
                            onClick={handleRequestOtp}
                            disabled={isRequestingOtp}
                            className="text-orange-600 hover:underline text-sm mt-2"
                          >
                            Resend OTP
                          </button>
                        </div>
                      )}
                      
                      <div>
                        <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">WhatsApp Number *</label>
                        <input
                          type="tel"
                          name="whatsappNumber"
                          value={formData.whatsappNumber}
                          onChange={handleInputChange}
                          placeholder="Enter your WhatsApp number"
                          className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors duration-300"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Gotra *</label>
                        <input
                          type="text"
                          name="gotra"
                          value={formData.gotra}
                          onChange={handleInputChange}
                          placeholder="Enter your gotra"
                          disabled={formData.dontKnowGotra}
                          className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors duration-300 disabled:bg-gray-100"
                          required={!formData.dontKnowGotra}
                        />
                        <div className="mt-2 flex items-center">
                          <input
                            type="checkbox"
                            id="dontKnowGotra"
                            checked={formData.dontKnowGotra}
                            onChange={(e) => setFormData({ ...formData, dontKnowGotra: e.target.checked, gotra: e.target.checked ? '' : formData.gotra })}
                            className="mr-2 h-4 w-4 text-orange-600 rounded focus:ring-orange-500"
                          />
                          <label htmlFor="dontKnowGotra" className="text-xs sm:text-sm text-gray-600">I don&apos;t know my Gotra</label>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isProcessing || selectedChadawas.length === 0}
                    className={`w-full py-3 sm:py-4 rounded-xl sm:rounded-2xl text-base sm:text-lg font-bold shadow-lg transform transition-all duration-300 active:scale-95 ${
                      isProcessing || selectedChadawas.length === 0
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-gradient-to-r from-orange-500 to-rose-500 text-white hover:from-orange-600 hover:to-rose-600 hover:scale-105'
                    }`}
                  >
                    {isProcessing ? (
                      <div className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing Payment...
                      </div>
                    ) : (
                      `Pay ₹${total.toFixed(2)} & Confirm Offering`
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      <GlobalFooter />
    </div>
  );
};

export default CheckoutPage;