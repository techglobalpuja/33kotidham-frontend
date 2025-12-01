'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Header from '@/components/layout/Header';
import GlobalFooter from '@/components/layout/GlobalFooter';
import { apiService } from '@/services/api';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { loginSuccess, fetchUserInfo } from '@/store/slices/authSlice';

// Define Razorpay type
interface RazorpayResponse {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}

interface CheckoutProduct {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface ShippingDetails {
  name: string;
  email: string;
  mobile: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
}

const CheckoutPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const isAuthenticated = user?.isAuthenticated || false;
  
  const [product, setProduct] = useState<CheckoutProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  
  // Auth State
  const [authState, setAuthState] = useState({
    isAuthenticated: false,
    showOtpInput: false,
    otpSent: false,
    requiresRegistration: false,
    showRegistrationForm: false,
    accessToken: '',
    tokenType: ''
  });
  
  const [otpCode, setOtpCode] = useState(['', '', '', '', '', '']);
  const [registrationData, setRegistrationData] = useState({
    name: '',
    email: ''
  });

  // Shipping Details
  const [shippingDetails, setShippingDetails] = useState<ShippingDetails>({
    name: '',
    email: '',
    mobile: '',
    address: '',
    city: '',
    state: '',
    pincode: ''
  });

  useEffect(() => {
    // Load product from localStorage
    const storedProduct = localStorage.getItem('checkoutProduct');
    if (storedProduct) {
      setProduct(JSON.parse(storedProduct));
    } else {
      router.push('/store');
    }
    setLoading(false);

    // Check auth status
    if (isAuthenticated && user) {
      setAuthState(prev => ({
        ...prev,
        isAuthenticated: true
      }));
      setShippingDetails(prev => ({
        ...prev,
        name: user.name || '',
        email: user.email || '',
        mobile: user.mobile || ''
      }));
    }
  }, [isAuthenticated, user, router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setShippingDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return;
    const newOtp = [...otpCode];
    newOtp[index] = value;
    setOtpCode(newOtp);
    
    // Auto focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleRequestOtp = async () => {
    if (!shippingDetails.mobile || shippingDetails.mobile.length !== 10) {
      alert('Please enter a valid 10-digit mobile number');
      return;
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/request-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mobile: shippingDetails.mobile })
      });
      
      const data = await response.json();
      
      if (data.requires_registration) {
        setAuthState(prev => ({
          ...prev,
          requiresRegistration: true,
          showRegistrationForm: true
        }));
      } else {
        setAuthState(prev => ({
          ...prev,
          showOtpInput: true,
          otpSent: true
        }));
        alert('OTP sent to your mobile number');
      }
    } catch (error) {
      console.error('Error requesting OTP:', error);
      alert('Failed to send OTP');
    }
  };

  const handleVerifyOtp = async () => {
    const otp = otpCode.join('');
    if (otp.length !== 6) {
      alert('Please enter valid OTP');
      return;
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/verify-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mobile: shippingDetails.mobile,
          otp_code: otp
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
        
        // Store token
        localStorage.setItem('accessToken', data.access_token);
        localStorage.setItem('tokenType', data.token_type);
        
        // Update Redux
        dispatch(loginSuccess({
          id: 0, // Placeholder
          name: registrationData.name || 'User',
          email: registrationData.email || '',
          mobile: shippingDetails.mobile,
          isAuthenticated: true,
          access_token: data.access_token,
          token_type: data.token_type
        }));
        dispatch(fetchUserInfo());
        
        alert('Authentication successful!');
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      alert('Invalid OTP');
    }
  };

  const handleRegisterWithOtp = async () => {
    if (!registrationData.name || !registrationData.email) {
      alert('Please fill in registration details');
      return;
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/register-with-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: registrationData.name,
          email: registrationData.email,
          mobile: shippingDetails.mobile,
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
        alert('Registration successful! OTP sent.');
      }
    } catch (error) {
      console.error('Error registering:', error);
      alert('Registration failed');
    }
  };

  const handlePlaceOrder = async () => {
    if (!product) return;
    
    // Validate shipping details
    if (!shippingDetails.name || !shippingDetails.address || !shippingDetails.city || !shippingDetails.state || !shippingDetails.pincode) {
      alert('Please fill in all shipping details');
      return;
    }

    if (!authState.isAuthenticated) {
      alert('Please login to place order');
      return;
    }

    setProcessing(true);

    try {
      // 1. Create Order
      // Construct payload to match API requirement:
      // {
      //   "shipping_name": "string",
      //   "shipping_mobile": "string",
      //   "shipping_address": "string",
      //   "shipping_city": "string",
      //   "shipping_state": "string",
      //   "shipping_pincode": "string",
      //   "notes": "string",
      //   "items": [ { "product_id": 0, "quantity": 0 } ],
      //   "promo_code": "string",
      //   "payment_method": "online"
      // }
      const orderData = {
        shipping_name: shippingDetails.name,
        shipping_mobile: shippingDetails.mobile,
        shipping_address: shippingDetails.address,
        shipping_city: shippingDetails.city,
        shipping_state: shippingDetails.state,
        shipping_pincode: shippingDetails.pincode,
        notes: '',
        items: [{
          product_id: parseInt(product.id),
          quantity: product.quantity
        }],
        promo_code: '',
        payment_method: 'online' as const
      };

      console.log('Creating order with data:', orderData);
      const orderResponse = await apiService.createOrder(orderData);
      console.log('Order created:', orderResponse);
      
      // 2. Create Razorpay Payment
      // API expects just the orderId as a number
      const paymentResponse = await apiService.createRazorpayOrderPayment(orderResponse.id);
      console.log('Razorpay payment created:', paymentResponse);

      // Destructure flat fields from response as per RazorpayOrderResponse interface
      const { razorpay_order_id, amount, currency, key_id } = paymentResponse;

      // 3. Initialize Razorpay
      if (!window.Razorpay) {
        alert('Razorpay SDK failed to load. Please check your internet connection.');
        setProcessing(false);
        return;
      }

      const options = {
        key: key_id || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || '', // Use key from response if available
        amount: amount,
        currency: currency,
        name: '33 Kotidham',
        description: 'Store Purchase',
        order_id: razorpay_order_id,
        prefill: {
          name: shippingDetails.name,
          email: shippingDetails.email,
          contact: shippingDetails.mobile
        },
        handler: async function (response: RazorpayResponse) {
          try {
            // 4. Verify Payment
            // API expects only razorpay fields
            const verifyResponse = await apiService.verifyOrderPayment({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature
            });

            if (verifyResponse.success) {
              // Clear cart/checkout data
              localStorage.removeItem('checkoutProduct');
              router.push('/store/checkout/success');
            } else {
              router.push('/store/checkout/failure');
            }
          } catch (error) {
            console.error('Payment verification failed:', error);
            router.push('/store/checkout/failure');
          }
        },
        modal: {
          ondismiss: function() {
            setProcessing(false);
          }
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (error: unknown) {
      console.error('Order placement failed:', error);
      const errorMessage = (error as Error)?.message || 'Failed to place order. Please try again.';
      alert(`Error: ${errorMessage}`);
      setProcessing(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-orange-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (!product) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="pt-28 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column: Details */}
          <div className="space-y-8">
            {/* Authentication Section */}
            {!authState.isAuthenticated && (
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Login / Register</h2>
                
                {!authState.showOtpInput && !authState.showRegistrationForm ? (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number</label>
                      <input
                        type="text"
                        name="mobile"
                        value={shippingDetails.mobile}
                        onChange={handleInputChange}
                        maxLength={10}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        placeholder="Enter 10-digit mobile number"
                      />
                    </div>
                    <button
                      onClick={handleRequestOtp}
                      className="w-full bg-orange-500 text-white py-2 rounded-lg font-medium hover:bg-orange-600 transition-colors"
                    >
                      Continue
                    </button>
                  </div>
                ) : authState.showRegistrationForm ? (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                      <input
                        type="text"
                        value={registrationData.name}
                        onChange={(e) => setRegistrationData({...registrationData, name: e.target.value})}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <input
                        type="email"
                        value={registrationData.email}
                        onChange={(e) => setRegistrationData({...registrationData, email: e.target.value})}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                    </div>
                    <button
                      onClick={handleRegisterWithOtp}
                      className="w-full bg-orange-500 text-white py-2 rounded-lg font-medium hover:bg-orange-600 transition-colors"
                    >
                      Register & Send OTP
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <p className="text-sm text-gray-600">Enter OTP sent to {shippingDetails.mobile}</p>
                    <div className="flex gap-2 justify-center">
                      {otpCode.map((digit, index) => (
                        <input
                          key={index}
                          id={`otp-${index}`}
                          type="text"
                          maxLength={1}
                          value={digit}
                          onChange={(e) => handleOtpChange(index, e.target.value)}
                          className="w-10 h-10 text-center border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        />
                      ))}
                    </div>
                    <button
                      onClick={handleVerifyOtp}
                      className="w-full bg-orange-500 text-white py-2 rounded-lg font-medium hover:bg-orange-600 transition-colors"
                    >
                      Verify OTP
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Shipping Details */}
            <div className={`bg-white p-6 rounded-2xl shadow-sm border border-gray-100 ${!authState.isAuthenticated ? 'opacity-50 pointer-events-none' : ''}`}>
              <h2 className="text-xl font-bold text-gray-800 mb-4">Shipping Details</h2>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={shippingDetails.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={shippingDetails.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                  <textarea
                    name="address"
                    value={shippingDetails.address}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                    <input
                      type="text"
                      name="city"
                      value={shippingDetails.city}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                    <input
                      type="text"
                      name="state"
                      value={shippingDetails.state}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Pincode</label>
                  <input
                    type="text"
                    name="pincode"
                    value={shippingDetails.pincode}
                    onChange={handleInputChange}
                    maxLength={6}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Order Summary */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 sticky top-28">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Order Summary</h2>
              
              <div className="flex gap-4 mb-6">
                <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">{product.name}</h3>
                  <p className="text-gray-500 text-sm">Qty: {product.quantity}</p>
                  <p className="text-orange-600 font-bold mt-1">₹{product.price}</p>
                </div>
              </div>

              <div className="border-t border-gray-100 pt-4 space-y-2">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>₹{product.price * product.quantity}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className="text-green-600">Free</span>
                </div>
                <div className="flex justify-between text-lg font-bold text-gray-900 pt-2 border-t border-gray-100 mt-2">
                  <span>Total</span>
                  <span>₹{product.price * product.quantity}</span>
                </div>
              </div>

              <button
                onClick={handlePlaceOrder}
                disabled={processing || !authState.isAuthenticated}
                className={`w-full mt-6 py-3 rounded-xl font-bold text-white transition-all duration-300 ${
                  processing || !authState.isAuthenticated
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-600 hover:to-rose-600 shadow-lg hover:shadow-xl'
                }`}
              >
                {processing ? 'Processing...' : 'Pay Now'}
              </button>
              
              {!authState.isAuthenticated && (
                <p className="text-xs text-red-500 text-center mt-2">Please login to continue</p>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <GlobalFooter />
      <script src="https://checkout.razorpay.com/v1/checkout.js" async></script>
    </div>
  );
};

export default CheckoutPage;
