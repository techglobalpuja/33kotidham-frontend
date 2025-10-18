'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

const CustomSuccessError = ({ reset }: { error: Error; reset: () => void }) => {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-purple-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center border border-orange-100">
        <div className="text-5xl mb-4">⚠️</div>
        <h2 className="text-2xl font-bold text-gray-900 font-['Philosopher'] mb-4">Payment Processing Failed!</h2>
        <p className="text-gray-600 mb-6">
          We encountered an issue while processing your payment. Please try again or contact support.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={reset}
            className="px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all shadow-lg"
          >
            Try Again
          </button>
          <button
            onClick={() => router.push('/')}
            className="px-6 py-3 bg-gray-100 text-gray-700 font-bold rounded-xl hover:bg-gray-200 transition-all"
          >
            Go Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomSuccessError;