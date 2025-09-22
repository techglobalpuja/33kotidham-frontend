'use client';

import React, { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const MatchMakingPage: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    boyName: '',
    boyDOB: '',
    boyTOB: '',
    boyPOB: '',
    girlName: '',
    girlDOB: '',
    girlTOB: '',
    girlPOB: ''
  });

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Match making form submitted:', formData);
  };

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
            <div className="mb-8 flex justify-center">
              <div className="relative p-6 rounded-full bg-gradient-to-br from-orange-200/40 to-rose-200/40 backdrop-blur-sm border border-orange-300/30 shadow-lg">
                <div className="text-6xl text-orange-600 animate-float font-bold">💕</div>
                <div className="absolute inset-0 bg-orange-300/20 rounded-full blur-xl animate-pulse"></div>
              </div>
            </div>
            
            <h1 className="text-[52px] sm:text-[64px] md:text-[72px] font-bold leading-[60px] sm:leading-[72px] md:leading-[80px] font-['Philosopher'] mb-8">
              <span className="bg-gradient-to-r from-orange-700 via-rose-600 to-orange-800 bg-clip-text text-transparent">
                Match Making
              </span>
              <br />
              <span className="bg-gradient-to-r from-rose-600 via-orange-700 to-yellow-600 bg-clip-text text-transparent">
                गुण मिलान
              </span>
            </h1>
            
            <p className="text-[20px] sm:text-[22px] md:text-[24px] font-normal leading-[32px] sm:leading-[34px] md:leading-[36px] font-['Lato'] max-w-5xl mx-auto text-gray-700 mb-12">
              Check compatibility between partners using ancient Vedic astrology principles.
              <br className="hidden sm:block" />
              Get detailed Guna Milan and Manglik Dosha analysis for successful marriage.
            </p>
          </div>
        </div>
      </section>

      {/* Match Making Form */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl p-8 border border-white/50">
            <h2 className="text-3xl font-bold text-gray-800 font-['Philosopher'] mb-8 text-center">
              Enter Both Partners' Details
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-12">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                
                {/* Boy's Details */}
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-orange-600 font-['Philosopher'] text-center border-b-2 border-orange-200 pb-4">
                    Boy's Details
                  </h3>
                  
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="boyName"
                      value={formData.boyName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-orange-200 rounded-2xl focus:ring-4 focus:ring-orange-200 focus:border-orange-400 text-gray-700 font-medium bg-white/80 backdrop-blur-sm transition-all duration-300"
                      placeholder="Enter boy's full name"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Date of Birth *
                    </label>
                    <input
                      type="date"
                      name="boyDOB"
                      value={formData.boyDOB}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-orange-200 rounded-2xl focus:ring-4 focus:ring-orange-200 focus:border-orange-400 text-gray-700 font-medium bg-white/80 backdrop-blur-sm transition-all duration-300"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Time of Birth *
                    </label>
                    <input
                      type="time"
                      name="boyTOB"
                      value={formData.boyTOB}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-orange-200 rounded-2xl focus:ring-4 focus:ring-orange-200 focus:border-orange-400 text-gray-700 font-medium bg-white/80 backdrop-blur-sm transition-all duration-300"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Place of Birth *
                    </label>
                    <input
                      type="text"
                      name="boyPOB"
                      value={formData.boyPOB}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-orange-200 rounded-2xl focus:ring-4 focus:ring-orange-200 focus:border-orange-400 text-gray-700 font-medium bg-white/80 backdrop-blur-sm transition-all duration-300"
                      placeholder="Enter birth city/town"
                      required
                    />
                  </div>
                </div>
                
                {/* Girl's Details */}
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-rose-600 font-['Philosopher'] text-center border-b-2 border-rose-200 pb-4">
                    Girl's Details
                  </h3>
                  
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="girlName"
                      value={formData.girlName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-rose-200 rounded-2xl focus:ring-4 focus:ring-rose-200 focus:border-rose-400 text-gray-700 font-medium bg-white/80 backdrop-blur-sm transition-all duration-300"
                      placeholder="Enter girl's full name"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Date of Birth *
                    </label>
                    <input
                      type="date"
                      name="girlDOB"
                      value={formData.girlDOB}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-rose-200 rounded-2xl focus:ring-4 focus:ring-rose-200 focus:border-rose-400 text-gray-700 font-medium bg-white/80 backdrop-blur-sm transition-all duration-300"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Time of Birth *
                    </label>
                    <input
                      type="time"
                      name="girlTOB"
                      value={formData.girlTOB}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-rose-200 rounded-2xl focus:ring-4 focus:ring-rose-200 focus:border-rose-400 text-gray-700 font-medium bg-white/80 backdrop-blur-sm transition-all duration-300"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Place of Birth *
                    </label>
                    <input
                      type="text"
                      name="girlPOB"
                      value={formData.girlPOB}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-rose-200 rounded-2xl focus:ring-4 focus:ring-rose-200 focus:border-rose-400 text-gray-700 font-medium bg-white/80 backdrop-blur-sm transition-all duration-300"
                      placeholder="Enter birth city/town"
                      required
                    />
                  </div>
                </div>
              </div>
              
              <div className="text-center">
                <button
                  type="submit"
                  className="px-12 py-4 bg-gradient-to-r from-orange-500 to-rose-500 text-white font-bold text-lg rounded-full hover:from-orange-600 hover:to-rose-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-2xl"
                >
                  Check Compatibility
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 font-['Philosopher'] mb-12 text-center">
            What You Get in Compatibility Report
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: "🌟",
                title: "Guna Milan",
                description: "36-point compatibility scoring system"
              },
              {
                icon: "🔴",
                title: "Manglik Dosha",
                description: "Mars dosha analysis and remedies"
              },
              {
                icon: "💰",
                title: "Financial Compatibility",
                description: "Wealth and prosperity predictions"
              },
              {
                icon: "👶",
                title: "Family Life",
                description: "Children and family happiness forecast"
              }
            ].map((feature, index) => (
              <div
                key={index}
                className="group bg-white/70 backdrop-blur-lg rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all duration-700 border border-white/50 text-center transform hover:scale-105"
              >
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-500">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-800 font-['Philosopher'] mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 font-['Lato'] text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default MatchMakingPage;