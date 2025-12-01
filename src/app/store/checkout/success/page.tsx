'use client';

import React from 'react';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import GlobalFooter from '@/components/layout/GlobalFooter';

const CheckoutSuccessPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
      <Header />
      
      <main className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col items-center justify-center text-center">
        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-8 animate-bounce">
          <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        
        <h1 className="text-4xl font-bold text-gray-900 mb-4 font-['Philosopher']">Order Placed Successfully!</h1>
        <p className="text-lg text-gray-600 mb-8 max-w-lg">
          Thank you for your purchase. Your order has been confirmed and will be shipped shortly. You will receive an email with the order details.
        </p>
        
        <div className="flex gap-4">
          <Link 
            href="/store" 
            className="px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            Continue Shopping
          </Link>
          <Link 
            href="/" 
            className="px-8 py-3 bg-white text-gray-700 font-bold rounded-xl hover:bg-gray-50 transition-all duration-300 shadow-md border border-gray-200"
          >
            Go Home
          </Link>
        </div>
      </main>
      
      <GlobalFooter />
    </div>
  );
};

export default CheckoutSuccessPage;
