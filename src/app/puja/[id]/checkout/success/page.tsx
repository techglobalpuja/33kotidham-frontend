'use client';

import React, { useEffect } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Header from '@/components/layout/Header';

const CustomCheckoutSuccessPage: React.FC = () => {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const pujaId = params.id as string;
  
  // Get booking details from URL parameters
  const bookingId = searchParams.get('bookingId');
  const paymentId = searchParams.get('paymentId');
  const orderId = searchParams.get('orderId');
  
  useEffect(() => {
    // Show success notification
    console.log('Payment successful!', { bookingId, paymentId, orderId });
  }, [bookingId, paymentId, orderId]);
  
  // Display booking data
  const pujaData = {
    id: pujaId,
    title: 'Your Puja Booking',
    bookingId: bookingId || 'N/A',
    orderId: orderId || 'N/A',
    paymentId: paymentId || 'N/A'
  };

  const handleContinue = () => {
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-green-500 rounded-full flex items-center justify-center">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 font-['Philosopher'] mb-3">Booking Confirmed!</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Your puja booking has been successfully placed. You will receive a confirmation email shortly.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border border-green-100 mb-8">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 font-['Philosopher'] mb-2">Thank You for Your Booking</h2>
              <p className="text-gray-600">We&apos;re honored to perform this sacred ritual for you</p>
            </div>
            
            <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl p-5 mb-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="relative w-24 h-24 rounded-xl overflow-hidden shadow-md flex-shrink-0 mx-auto md:mx-0">
                  <Image
                    src="/placeholder.jpg"
                    alt={pujaData.title}
                    fill
                    className="object-cover"
                  />
                </div>
                
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 font-['Philosopher'] mb-3">{pujaData.title}</h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                    <div className="bg-white/70 rounded-lg p-3">
                      <p className="text-xs text-gray-500">Booking ID</p>
                      <p className="font-medium text-sm">{pujaData.bookingId}</p>
                    </div>
                    <div className="bg-white/70 rounded-lg p-3">
                      <p className="text-xs text-gray-500">Razorpay Order ID</p>
                      <p className="font-medium text-sm">{pujaData.orderId}</p>
                    </div>
                    <div className="bg-white/70 rounded-lg p-3 sm:col-span-2">
                      <p className="text-xs text-gray-500">Payment ID</p>
                      <p className="font-medium text-sm break-all">{pujaData.paymentId}</p>
                    </div>
                    <div className="bg-white/70 rounded-lg p-3 sm:col-span-2">
                      <p className="text-xs text-gray-500">Payment Status</p>
                      <p className="font-medium text-green-600 flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Payment Verified Successfully
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-green-50 rounded-xl p-5 mb-6 border border-green-200">
              <h3 className="text-lg font-bold text-gray-900 font-['Philosopher'] mb-3 flex items-center gap-2">
                <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                What to Expect Next
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-green-600 text-xs">1</span>
                  </div>
                  <p className="text-gray-700">You will receive a confirmation message on WhatsApp with puja details within 15 minutes</p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-green-600 text-xs">2</span>
                  </div>
                  <p className="text-gray-700">Our priest will perform the puja on the scheduled date and time</p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-green-600 text-xs">3</span>
                  </div>
                  <p className="text-gray-700">Prasad and puja recording will be delivered to your address within 7-10 business days</p>
                </li>
              </ul>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => router.push('/dashboard')}
                className="flex-1 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all duration-300 shadow-lg"
              >
                View Booking Details
              </button>
              <button
                onClick={handleContinue}
                className="flex-1 py-4 bg-white text-gray-700 font-bold rounded-xl border border-gray-300 hover:bg-gray-50 transition-all"
              >
                Continue Shopping
              </button>
            </div>
          </div>
          
          <div className="text-center text-sm text-gray-500">
            <p>Need help? Contact our support team at support@33kotidham.com or +91 9876543210</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CustomCheckoutSuccessPage;