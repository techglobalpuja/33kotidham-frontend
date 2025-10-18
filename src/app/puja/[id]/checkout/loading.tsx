import React from 'react';

const CustomCheckoutLoading = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-purple-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-orange-500 mx-auto mb-4"></div>
        <h2 className="text-2xl font-bold text-gray-900 font-['Philosopher'] mb-2">Preparing Your Checkout</h2>
        <p className="text-gray-600">Setting up your puja booking experience...</p>
      </div>
    </div>
  );
};

export default CustomCheckoutLoading;