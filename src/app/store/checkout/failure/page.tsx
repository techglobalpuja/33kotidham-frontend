'use client';

import React from 'react';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import GlobalFooter from '@/components/layout/GlobalFooter';

const CheckoutFailurePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50">
      <Header />
      
      <main className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col items-center justify-center text-center">
        <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mb-8">
          <svg className="w-12 h-12 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
        
        <h1 className="text-4xl font-bold text-gray-900 mb-4 font-['Philosopher']">Payment Failed</h1>
        <p className="text-lg text-gray-600 mb-8 max-w-lg">
          We couldn&apos;t process your payment. Please try again or contact support if the issue persists.
        </p>
        
        <div className="flex gap-4">
          <Link 
            href="/store/checkout" 
            className="px-8 py-3 bg-gradient-to-r from-red-500 to-orange-600 text-white font-bold rounded-xl hover:from-red-600 hover:to-orange-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            Try Again
          </Link>
          <Link 
            href="/contact" 
            className="px-8 py-3 bg-white text-gray-700 font-bold rounded-xl hover:bg-gray-50 transition-all duration-300 shadow-md border border-gray-200"
          >
            Contact Support
          </Link>
        </div>
      </main>
      
      <GlobalFooter />
    </div>
  );
};

export default CheckoutFailurePage;
