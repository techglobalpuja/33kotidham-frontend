'use client';

import React, { useEffect } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import Header from '@/components/layout/Header';

const ChadawaCheckoutFailurePage: React.FC = () => {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { templeId, chadawaId } = params;
  
  // Get failure details from URL parameters
  const bookingId = searchParams.get('bookingId');
  const orderId = searchParams.get('orderId');
  
  useEffect(() => {
    // Log failure for debugging
    console.log('Payment verification failed', { bookingId, orderId });
  }, [bookingId, orderId]);

  const handleRetry = () => {
    // Go back to chadawa checkout to start over
    router.push(`/chadawa-store/${templeId}/${chadawaId}/checkout`);
  };

  const handleContactSupport = () => {
    // WhatsApp support link
    window.location.href = 'https://wa.me/919876543210?text=I need help with my chadawa booking';
  };

  const handleBrowseTemples = () => {
    router.push(`/chadawa-store/${templeId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50/50 via-yellow-50/30 to-rose-50/50">
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-gradient-to-r from-red-400 to-red-500 rounded-full flex items-center justify-center shadow-lg">
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
                    <span className="text-amber-600 text-xs font-bold">1</span>
                  </div>
                  <p className="text-gray-700 text-sm">Check your bank account or payment method to see if the amount was deducted</p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-amber-600 text-xs font-bold">2</span>
                  </div>
                  <p className="text-gray-700 text-sm">If deducted, please wait 5-7 business days for automatic refund</p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-amber-600 text-xs font-bold">3</span>
                  </div>
                  <p className="text-gray-700 text-sm">Contact our support team if you need immediate assistance</p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-amber-600 text-xs font-bold">4</span>
                  </div>
                  <p className="text-gray-700 text-sm">You can try placing the order again if you wish to proceed with the chadawa offering</p>
                </li>
              </ul>
            </div>
            
            <div className="bg-blue-50 rounded-xl p-5 mb-6 border border-blue-200">
              <h3 className="text-md font-bold text-gray-900 mb-2 flex items-center gap-2">
                <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Common Reasons for Payment Failure
              </h3>
              <ul className="text-sm text-gray-700 space-y-2 ml-7">
                <li className="list-disc">Insufficient balance in your account</li>
                <li className="list-disc">Network connectivity issues</li>
                <li className="list-disc">Incorrect payment details entered</li>
                <li className="list-disc">Bank server downtime or maintenance</li>
                <li className="list-disc">Transaction limit exceeded</li>
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
                onClick={handleBrowseTemples}
                className="flex-1 py-4 bg-white text-gray-700 font-bold rounded-xl border-2 border-orange-300 hover:bg-orange-50 transition-all"
              >
                Browse Other Chadawas
              </button>
            </div>
            
            <div className="mt-4">
              <button
                onClick={handleContactSupport}
                className="w-full py-4 bg-green-500 text-white font-bold rounded-xl hover:bg-green-600 transition-all flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Contact Support via WhatsApp
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

export default ChadawaCheckoutFailurePage;
