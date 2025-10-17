'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Header from '@/components/layout/Header';

const NewCheckoutPage: React.FC = () => {
  const params = useParams();
  const router = useRouter();
  const pujaId = params.id as string;
  
  // Mock puja data - in a real app this would come from an API
  const pujaData = {
    id: pujaId,
    title: 'Navagraha Shanti Puja',
    temple: 'Shri Mahakaleshwar Temple, Ujjain',
    date: 'October 15, 2025',
    image: '/placeholder.jpg',
    price: 5000,
    description: 'A powerful ritual to pacify the negative influences of the nine planets and bring harmony, peace, and prosperity to your life.',
    chadhwas: [
      { 
        id: 1, 
        name: 'Flowers', 
        description: 'Fresh flower bouquet for divine offering', 
        price: 200, 
        image: '/images/chadhwas/flowers.jpg',
        icon: '🌸' 
      },
      { 
        id: 2, 
        name: 'Incense Sticks', 
        description: 'Premium sandalwood incense sticks', 
        price: 150, 
        image: '/images/chadhwas/incense.jpg',
        icon: '�' 
      },
      { 
        id: 3, 
        name: 'Brass Lamp', 
        description: 'Traditional brass diya with oil', 
        price: 300, 
        image: '/images/chadhwas/lamp.jpg',
        icon: '🪔' 
      },
      { 
        id: 4, 
        name: 'Sweets', 
        description: 'Assorted traditional sweets', 
        price: 250, 
        image: '/images/chadhwas/sweets.jpg',
        icon: '🍬' 
      },
      { 
        id: 5, 
        name: 'Coconut', 
        description: 'Fresh coconut for sacred ritual', 
        price: 100, 
        image: '/images/chadhwas/coconut.jpg',
        icon: '🥥' 
      },
      { 
        id: 6, 
        name: 'Banana', 
        description: 'Fresh banana for divine offering', 
        price: 50, 
        image: '/images/chadhwas/banana.jpg',
        icon: '🍌' 
      }
    ]
  };

  // Form states
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    gotra: '',
    whatsappNumber: '',
    sameAsPhone: true,
    dontKnowGotra: false,
    dakshina: ''
  });

  const [selectedPackage, setSelectedPackage] = useState('individual');
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox' && name === 'sameAsPhone') {
      setFormData(prev => ({
        ...prev,
        sameAsPhone: checked,
        whatsappNumber: checked ? prev.phone : ''
      }));
    } else if (type === 'checkbox' && name === 'dontKnowGotra') {
      setFormData(prev => ({
        ...prev,
        dontKnowGotra: checked,
        gotra: checked ? '' : prev.gotra
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormData(prev => ({
      ...prev,
      phone: value,
      whatsappNumber: prev.sameAsPhone ? value : prev.whatsappNumber
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    // Simulate processing
    setTimeout(() => {
      router.push(`/puja/${pujaId}/checkout/success`);
    }, 1500);
  };

  const packages = [
    {
      id: 'individual',
      name: 'Individual Puja',
      price: 5000,
      originalPrice: 7000,
      features: ['Individual Sankalp', 'Video Recording', 'Digital Certificate', 'Prasad Delivery'],
      icon: '🧘'
    },
    {
      id: 'partner',
      name: 'Partner Puja',
      price: 8000,
      originalPrice: 11000,
      features: ['Couple Sankalp', 'HD Video Recording', 'Digital Certificate', 'Premium Prasad'],
      icon: '💑'
    },
    {
      id: 'family',
      name: 'Family Puja',
      price: 12000,
      originalPrice: 16000,
      features: ['Family Sankalp', 'Live Streaming', 'Digital Certificate', 'Complete Prasad Kit'],
      icon: '👨‍👩‍👧‍👦'
    }
  ];

  const selectedPackageData = packages.find(pkg => pkg.id === selectedPackage) || packages[0];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 font-['Philosopher'] mb-3">Complete Your Puja Booking</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Experience divine blessings with our authentic puja services
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Order Summary */}
            <div className="lg:col-span-2 space-y-8">
              {/* Puja Details Card */}
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
                    <p className="text-orange-600 font-medium mb-3">{pujaData.temple}</p>
                    <p className="text-gray-600 text-sm mb-4">{pujaData.description}</p>
                    
                    <div className="flex flex-wrap gap-3">
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
                
                {/* Enhanced Chadhwas Section */}
                <div className="mt-6 pt-4 border-t border-orange-200">
                  <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <span className="text-orange-500">🕯️</span>
                    Sacred Offerings (Chadhwas)
                  </h4>
                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                    {pujaData.chadhwas.map((chadhwa) => (
                      <div 
                        key={chadhwa.id} 
                        className="bg-white rounded-xl p-3 text-center shadow-sm border border-orange-100 hover:shadow-md transition-all duration-300 transform hover:-translate-y-1"
                      >
                        <div className="relative w-12 h-12 rounded-lg overflow-hidden mx-auto mb-2">
                          <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-full flex items-center justify-center">
                            <span className="text-lg">{chadhwa.icon}</span>
                          </div>
                        </div>
                        <div className="text-xs font-bold text-orange-600 mb-1">{chadhwa.name}</div>
                        <div className="text-xs text-gray-500">{chadhwa.price}</div>
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
                  
                  <p className="text-xs text-gray-500 mt-3 italic">
                    All sacred offerings are personally presented by the priest during the puja ceremony
                  </p>
                </div>
              </div>
              
              {/* Package Selection Card */}
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-orange-100">
                <div className="flex items-center justify-between mb-5">
                  <h2 className="text-xl font-bold text-gray-900 font-['Philosopher']">Select Package</h2>
                  <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                    2
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {packages.map((pkg) => (
                    <div 
                      key={pkg.id}
                      className={`border-2 rounded-xl p-4 cursor-pointer transition-all duration-200 ${
                        selectedPackage === pkg.id 
                          ? 'border-orange-500 bg-orange-50 ring-2 ring-orange-200' 
                          : 'border-gray-200 hover:border-orange-300'
                      }`}
                      onClick={() => setSelectedPackage(pkg.id)}
                    >
                      <div className="text-center">
                        <div className="text-3xl mb-2">{pkg.icon}</div>
                        <h4 className="font-bold text-gray-900 mb-1">{pkg.name}</h4>
                        <div className="mb-3">
                          <span className="text-lg font-bold text-orange-600">₹{pkg.price.toLocaleString()}</span>
                          <span className="text-xs text-gray-500 line-through ml-2">₹{pkg.originalPrice.toLocaleString()}</span>
                        </div>
                        <ul className="text-xs text-gray-600 space-y-1 mb-4">
                          {pkg.features.map((feature, idx) => (
                            <li key={idx} className="flex items-start gap-1">
                              <svg className="w-3 h-3 text-green-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                        {selectedPackage === pkg.id ? (
                          <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center mx-auto">
                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                        ) : (
                          <div className="w-6 h-6 border-2 border-gray-300 rounded-full mx-auto"></div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Right Column - Checkout Form */}
            <div className="space-y-8">
              {/* Order Summary Card */}
              <div className="border-t border-gray-200 pt-6 bg-gradient-to-r from-orange-50/50 to-amber-50/50 rounded-2xl p-4">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Package Price</span>
                  <span className="font-medium">₹{selectedPackageData.price.toLocaleString()}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Service Fee</span>
                  <span className="font-medium">₹500</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">GST (18%)</span>
                  <span className="font-medium">₹{(selectedPackageData.price * 0.18).toFixed(0)}</span>
                </div>
                {formData.dakshina && parseInt(formData.dakshina) > 0 && (
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Dakshina to Pandit</span>
                    <span className="font-medium">₹{parseInt(formData.dakshina).toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between text-lg font-bold mt-4 pt-4 border-t border-gray-200">
                  <span>Total Amount</span>
                  <span className="text-orange-600">
                    ₹{(
                      selectedPackageData.price + 
                      500 + 
                      selectedPackageData.price * 0.18 + 
                      (formData.dakshina ? parseInt(formData.dakshina) : 0)
                    ).toLocaleString()}
                  </span>
                </div>
              </div>
              
              {/* Personal Details Card */}
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-orange-100">
                <div className="flex items-center justify-between mb-5">
                  <h2 className="text-xl font-bold text-gray-900 font-['Philosopher']">Personal Details</h2>
                  <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                    3
                  </div>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                      placeholder="Enter your full name"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handlePhoneChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                      placeholder="Enter your phone number"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="gotra" className="block text-sm font-medium text-gray-700 mb-1">
                      Gotra (Optional)
                    </label>
                    <input
                      type="text"
                      id="gotra"
                      name="gotra"
                      value={formData.dontKnowGotra ? '' : formData.gotra}
                      onChange={handleInputChange}
                      disabled={formData.dontKnowGotra}
                      className={`w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all ${
                        formData.dontKnowGotra ? 'bg-gray-100 cursor-not-allowed' : ''
                      }`}
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
                        I don't know my Gotra
                      </label>
                    </div>
                  </div>
                  
                  <div className="bg-orange-50 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-3">
                      <label className="block text-sm font-medium text-gray-700">
                        WhatsApp Number
                      </label>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="sameAsPhone"
                          name="sameAsPhone"
                          checked={formData.sameAsPhone}
                          onChange={handleInputChange}
                          className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                        />
                        <label htmlFor="sameAsPhone" className="ml-2 text-sm text-gray-600">
                          Same as phone
                        </label>
                      </div>
                    </div>
                    
                    {!formData.sameAsPhone && (
                      <input
                        type="tel"
                        id="whatsappNumber"
                        name="whatsappNumber"
                        value={formData.whatsappNumber}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                        placeholder="Enter WhatsApp number"
                      />
                    )}
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 font-['Philosopher'] mb-3">Payment Method</h3>
                    
                    <div className="space-y-3">
                      <div 
                        className={`border-2 rounded-xl p-4 cursor-pointer transition-all duration-200 ${
                          paymentMethod === 'upi' 
                            ? 'border-orange-500 bg-orange-50 ring-2 ring-orange-200' 
                            : 'border-gray-200 hover:border-orange-300'
                        }`}
                        onClick={() => setPaymentMethod('upi')}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
                            <span className="text-orange-600 font-bold">₹</span>
                          </div>
                          <div className="flex-1">
                            <h4 className="font-bold text-gray-900">UPI Payment</h4>
                            <p className="text-sm text-gray-600">Google Pay, PhonePe, etc.</p>
                          </div>
                          {paymentMethod === 'upi' ? (
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
                      
                      <div 
                        className={`border-2 rounded-xl p-4 cursor-pointer transition-all duration-200 ${
                          paymentMethod === 'credit-card' 
                            ? 'border-orange-500 bg-orange-50 ring-2 ring-orange-200' 
                            : 'border-gray-200 hover:border-orange-300'
                        }`}
                        onClick={() => setPaymentMethod('credit-card')}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
                            <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                            </svg>
                          </div>
                          <div className="flex-1">
                            <h4 className="font-bold text-gray-900">Credit/Debit Card</h4>
                            <p className="text-sm text-gray-600">Visa, Mastercard, Rupay</p>
                          </div>
                          {paymentMethod === 'credit-card' ? (
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
                  
                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={isProcessing}
                      className={`w-full py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all shadow-lg flex items-center justify-center ${
                        isProcessing ? 'opacity-75 cursor-not-allowed' : ''
                      }`}
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
                        `Proceed to Pay ₹${(selectedPackageData.price + 500 + selectedPackageData.price * 0.18 + (formData.dakshina ? parseInt(formData.dakshina) : 0)).toLocaleString()}`
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
                  
                  <div className="text-center text-xs text-gray-500 pt-3">
                    <p>By proceeding, you agree to our Terms & Conditions</p>
                    <div className="flex items-center justify-center gap-3 mt-2">
                      <div className="flex items-center gap-1">
                        <svg className="w-3 h-3 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                        <span>Secure Payment</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <svg className="w-3 h-3 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                        <span>Trusted by 100K+ Users</span>
                      </div>
                    </div>
                  </div>
                </form>
                
                {/* Selected Plan Section */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <h3 className="text-xl font-bold text-gray-900 font-['Philosopher'] mb-4">Selected Plan</h3>
                  <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-2xl p-5 border border-orange-100">
                    <div className="flex items-start gap-4">
                      <div className="text-3xl">{selectedPackageData.icon}</div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-bold text-gray-900 text-lg">{selectedPackageData.name}</h4>
                        </div>
                        <p className="text-orange-600 font-bold text-xl mb-3">₹{selectedPackageData.price.toLocaleString()}</p>
                        <ul className="text-sm text-gray-600 space-y-1">
                          {selectedPackageData.features.map((feature, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <svg className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default NewCheckoutPage;