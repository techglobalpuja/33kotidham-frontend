'use client';

import React, { useEffect } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import Header from '@/components/layout/Header';

const CheckoutFailurePage: React.FC = () => {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const pujaId = params.id as string;
  
  // Get failure details from URL parameters
  const bookingId = searchParams.get('bookingId');
  const orderId = searchParams.get('orderId');
  
  useEffect(() => {
    // Log failure for debugging
    console.log('Payment verification failed', { bookingId, orderId });
  }, [bookingId, orderId]);

  const handleRetry = () => {
    // Go back to puja details to start over
    router.push(`/puja/${pujaId}`);
  };

  const handleContactSupport = () => {
    // You can add a support contact form or WhatsApp link here
    window.location.href = 'https://wa.me/919876543210?text=I need help with my puja booking';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-gradient-to-r from-red-400 to-red-500 rounded-full flex items-center justify-center">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 font-['Philosopher'] mb-3">Payment Verification Failed</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We couldn&apos;t verify your payment. Don&apos;t worry, if the amount was deducted, it will be refunded within 5-7 business days.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border border-red-100 mb-8">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 font-['Philosopher'] mb-2">What Happened?</h2>
              <p className="text-gray-600">Your payment could not be verified with our system</p>
            </div>
            
            {(bookingId || orderId) && (
              <div className="bg-red-50 rounded-xl p-5 mb-6 border border-red-200">
                <h3 className="text-sm font-bold text-gray-900 mb-3">Transaction Details</h3>
                <div className="space-y-2 text-sm">
                  {bookingId && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Booking ID:</span>
                      <span className="font-medium">{bookingId}</span>
                    </div>
                  )}
                  {orderId && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Order ID:</span>
                      <span className="font-medium">{orderId}</span>
                    </div>
                  )}
                </div>
                <p className="text-xs text-gray-500 mt-3">
                  Please save these details for reference when contacting support
                </p>
              </div>
            )}
            
            <div className="bg-amber-50 rounded-xl p-5 mb-6 border border-amber-200">
              <h3 className="text-lg font-bold text-gray-900 font-['Philosopher'] mb-3 flex items-center gap-2">
                <svg className="w-5 h-5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                What Should You Do?
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-amber-600 text-xs">1</span>
                  </div>
                  <p className="text-gray-700">Check your bank account or payment method to see if the amount was deducted</p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-amber-600 text-xs">2</span>
                  </div>
                  <p className="text-gray-700">If deducted, please wait 5-7 business days for automatic refund</p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-amber-600 text-xs">3</span>
                  </div>
                  <p className="text-gray-700">Contact our support team if you need immediate assistance</p>
                </li>
              </ul>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleRetry}
                className="flex-1 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all duration-300 shadow-lg"
              >
                Try Again
              </button>
              <button
                onClick={handleContactSupport}
                className="flex-1 py-4 bg-white text-gray-700 font-bold rounded-xl border border-gray-300 hover:bg-gray-50 transition-all"
              >
                Contact Support
              </button>
            </div>
          </div>
          
          <div className="text-center text-sm text-gray-500">
            <p>Need immediate help? Contact us at support@33kotidham.com or call +91 9876543210</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CheckoutFailurePage;
