'use client';

import React, { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const PanchangPage: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50/50 via-yellow-50/30 to-rose-50/50 relative overflow-hidden">
      {/* Sacred Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-orange-200/30 rounded-full mix-blend-multiply filter blur-xl animate-float"></div>
        <div className="absolute top-40 right-10 w-80 h-80 bg-rose-200/30 rounded-full mix-blend-multiply filter blur-xl animate-float animation-delay-2000"></div>
        <div className="absolute bottom-20 left-20 w-72 h-72 bg-yellow-200/30 rounded-full mix-blend-multiply filter blur-xl animate-float animation-delay-4000"></div>
      </div>
      
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-28 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="relative max-w-7xl mx-auto text-center">
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {/* Sacred Om Symbol */}
            <div className="mb-8 flex justify-center">
              <div className="relative p-6 rounded-full bg-gradient-to-br from-orange-200/40 to-rose-200/40 backdrop-blur-sm border border-orange-300/30 shadow-lg">
                <div className="text-6xl text-orange-600 animate-float font-bold" style={{fontFamily: 'serif'}}>ॐ</div>
                <div className="absolute inset-0 bg-orange-300/20 rounded-full blur-xl animate-pulse"></div>
              </div>
            </div>
            
            <h1 className="text-[52px] sm:text-[64px] md:text-[72px] font-bold leading-[60px] sm:leading-[72px] md:leading-[80px] font-['Philosopher'] mb-8">
              <span className="bg-gradient-to-r from-orange-700 via-rose-600 to-orange-800 bg-clip-text text-transparent">
                पंचांग
              </span>
              <br />
              <span className="bg-gradient-to-r from-rose-600 via-orange-700 to-yellow-600 bg-clip-text text-transparent">
                Daily Panchang
              </span>
            </h1>
            
            <p className="text-[20px] sm:text-[22px] md:text-[24px] font-normal leading-[32px] sm:leading-[34px] md:leading-[36px] font-['Lato'] max-w-5xl mx-auto text-gray-700 mb-12">
              Discover today's auspicious timings, tithis, nakshatras, and divine guidance from ancient Vedic wisdom.
              <br className="hidden sm:block" />
              Plan your important activities according to cosmic energies.
            </p>
          </div>
        </div>
      </section>

      {/* Panchang Details Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Today's Panchang */}
            <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl p-8 border border-white/50">
              <h2 className="text-3xl font-bold text-gray-800 font-['Philosopher'] mb-6 text-center">
                आज का पंचांग
              </h2>
              
              <div className="space-y-6">
                <div className="flex justify-between items-center p-4 bg-gradient-to-r from-orange-50 to-rose-50 rounded-2xl">
                  <span className="font-bold text-gray-700">तिथि (Tithi)</span>
                  <span className="text-orange-600 font-medium">चतुर्दशी</span>
                </div>
                
                <div className="flex justify-between items-center p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl">
                  <span className="font-bold text-gray-700">नक्षत्र (Nakshatra)</span>
                  <span className="text-orange-600 font-medium">अश्विनी</span>
                </div>
                
                <div className="flex justify-between items-center p-4 bg-gradient-to-r from-rose-50 to-pink-50 rounded-2xl">
                  <span className="font-bold text-gray-700">योग (Yoga)</span>
                  <span className="text-orange-600 font-medium">विष्कुम्भ</span>
                </div>
                
                <div className="flex justify-between items-center p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl">
                  <span className="font-bold text-gray-700">करण (Karana)</span>
                  <span className="text-orange-600 font-medium">बव</span>
                </div>
                
                <div className="flex justify-between items-center p-4 bg-gradient-to-r from-green-50 to-teal-50 rounded-2xl">
                  <span className="font-bold text-gray-700">वार (Day)</span>
                  <span className="text-orange-600 font-medium">मंगलवार</span>
                </div>
              </div>
            </div>
            
            {/* Auspicious Timings */}
            <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl p-8 border border-white/50">
              <h2 className="text-3xl font-bold text-gray-800 font-['Philosopher'] mb-6 text-center">
                शुभ मुहूर्त
              </h2>
              
              <div className="space-y-6">
                <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl">
                  <h3 className="font-bold text-gray-700 mb-2 font-['Philosopher']">अभिजित मुहूर्त</h3>
                  <p className="text-green-600 font-medium">12:00 PM - 12:48 PM</p>
                </div>
                
                <div className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl">
                  <h3 className="font-bold text-gray-700 mb-2 font-['Philosopher']">अमृत काल</h3>
                  <p className="text-blue-600 font-medium">6:30 AM - 8:15 AM</p>
                </div>
                
                <div className="p-4 bg-gradient-to-r from-purple-50 to-violet-50 rounded-2xl">
                  <h3 className="font-bold text-gray-700 mb-2 font-['Philosopher']">ब्रह्म मुहूर्त</h3>
                  <p className="text-purple-600 font-medium">4:30 AM - 6:00 AM</p>
                </div>
                
                <div className="p-4 bg-gradient-to-r from-red-50 to-rose-50 rounded-2xl">
                  <h3 className="font-bold text-gray-700 mb-2 font-['Philosopher']">राहु काल</h3>
                  <p className="text-red-600 font-medium">3:30 PM - 5:00 PM</p>
                </div>
                
                <div className="p-4 bg-gradient-to-r from-orange-50 to-amber-50 rounded-2xl">
                  <h3 className="font-bold text-gray-700 mb-2 font-['Philosopher']">गुलिक काल</h3>
                  <p className="text-orange-600 font-medium">1:30 PM - 3:00 PM</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default PanchangPage;