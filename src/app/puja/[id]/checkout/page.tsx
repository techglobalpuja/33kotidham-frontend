'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Script from 'next/script';
import Header from '@/components/layout/Header';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store';
import { fetchPujaById } from '@/store/slices/pujaSlice';
import { fetchChadawas } from '@/store/slices/chadawaSlice';
import { PujaCard, Plan, Chadawa } from '@/types';
import { apiService } from '@/services/api';
import { useAppSelector } from '@/hooks';

interface BackendPujaBenefit {
  id: number;
  benefit_title: string;
  benefit_description: string;
  puja_id: number;
  created_at: string;
}

interface BackendPujaImage {
  id: number;
  image_url: string;
}

interface ExtendedPujaCard extends PujaCard {
  benefits: BackendPujaBenefit[];
  images: BackendPujaImage[];
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
  selectedPlans?: Plan[];
}

const CustomCheckoutPage: React.FC = () => {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useDispatch<AppDispatch>();
  const { selectedPuja, isLoading, error } = useSelector((state: RootState) => state.puja);
  const { chadawas: reduxChadawas, isLoading: isChadawaLoading, error: chadawaError } = useSelector((state: RootState) => state.chadawa);
  
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
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);
  const { user } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (pujaId) {
      dispatch(fetchPujaById(pujaId));
    }
    // Fetch chadawas when component mounts
    dispatch(fetchChadawas());
  }, [dispatch, pujaId]);

  // Transform Redux chadawas to the format used in the UI
  const chadhwas = useMemo(() => {
    return reduxChadawas.map((chadawa: Chadawa) => ({
      id: chadawa.id,
      name: chadawa.name,
      description: chadawa.description,
      price: parseFloat(chadawa.price),
      image: chadawa.image_url.startsWith('http') ? chadawa.image_url : `https://api.33kotidham.com/${chadawa.image_url}`,
      icon: '', // We'll leave this empty for now
      selected: true // Default all to selected
    }));
  }, [reduxChadawas]);

  const [selectedChadhwas, setSelectedChadhwas] = useState<any[]>([]);

  useEffect(() => {
    if (chadhwas.length > 0) {
      setSelectedChadhwas(chadhwas.filter((chadhwa: any) => chadhwa.selected));
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

  const toggleChadhwa = (chadhwa: typeof chadhwas[0]) => {
    setSelectedChadhwas(prev => {
      const isSelected = prev.some(c => c.id === chadhwa.id);
      if (isSelected) {
        return prev.filter(c => c.id !== chadhwa.id);
      } else {
        return [...prev, chadhwa];
      }
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate authentication
    if (!user || !user.isAuthenticated) {
      alert('Please login to complete booking');
      router.push('/');
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
        chadawa_ids: selectedChadhwas.map(c => c.id)
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
        handler: async function (razorpayResponse: any) {
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
          name: user.name || '',
          email: user.email || '',
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

      if (typeof window !== 'undefined' && (window as any).Razorpay) {
        const razorpay = new (window as any).Razorpay(options);
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

  // Show loading state while fetching puja data or chadawa data
  if (isLoading || isChadawaLoading) {
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

  // Show error if chadawa data couldn't be loaded
  if (chadawaError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
        <Header />
        <div className="pt-24 flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Error Loading Sacred Offerings
            </h1>
            <p className="text-gray-600 mb-4">{chadawaError}</p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => dispatch(fetchChadawas())}
                className="bg-orange-500 text-white px-8 py-3 rounded-full hover:bg-orange-600 transition-all shadow-lg hover:shadow-xl"
              >
                Try Again
              </button>
              <button
                onClick={() => router.push('/')}
                className="bg-gray-500 text-white px-8 py-3 rounded-full hover:bg-gray-600 transition-all shadow-lg hover:shadow-xl"
              >
                Go Back Home
              </button>
            </div>
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
  const chadhwaTotal = selectedChadhwas.reduce((sum, chadhwa) => sum + chadhwa.price, 0);
  const planTotal = selectedPlan?.price || 0;
  const dakshinaAmount = formData.dakshina ? parseInt(formData.dakshina) : 0;
  const totalAmount = planTotal + chadhwaTotal + dakshinaAmount;

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        onLoad={() => setRazorpayLoaded(true)}
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
                    <input
                      type="tel"
                      id="mobileNumber"
                      name="mobileNumber"
                      value={formData.mobileNumber}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                      placeholder="Enter your mobile number"
                    />
                  </div>

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
                  {chadhwas.map((chadhwa) => (
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
                  ))}
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

                    {selectedChadhwas.map((chadhwa) => (
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
                    disabled={isProcessing}
                    className={`w-full py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all shadow-lg flex items-center justify-center ${isProcessing ? 'opacity-75 cursor-not-allowed' : ''}`}
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
                    ) : (
                      `Proceed to Pay ₹${totalAmount.toLocaleString()}`
                    )}
                  </button>

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