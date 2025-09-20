'use client';

import React, { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const ManglikDoshPage: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    gender: '',
    birthDate: '',
    birthTime: '',
    birthPlace: ''
  });

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Manglik Dosh form submitted:', formData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50/50 via-orange-50/30 to-yellow-50/50 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-red-200/30 rounded-full mix-blend-multiply filter blur-xl animate-float"></div>
        <div className="absolute top-40 right-10 w-80 h-80 bg-orange-200/30 rounded-full mix-blend-multiply filter blur-xl animate-float animation-delay-2000"></div>
        <div className="absolute bottom-20 left-20 w-72 h-72 bg-yellow-200/30 rounded-full mix-blend-multiply filter blur-xl animate-float animation-delay-4000"></div>
      </div>
      
      <Header />
      
      <section className="relative pt-28 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="relative max-w-7xl mx-auto text-center">
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="mb-8 flex justify-center">
              <div className="relative p-6 rounded-full bg-gradient-to-br from-red-200/40 to-orange-200/40 backdrop-blur-sm border border-red-300/30 shadow-lg">
                <div className="text-6xl text-red-600 animate-float font-bold">🔴</div>
                <div className="absolute inset-0 bg-red-300/20 rounded-full blur-xl animate-pulse"></div>
              </div>
            </div>
            
            <h1 className="text-[52px] sm:text-[64px] md:text-[72px] font-bold leading-[60px] sm:leading-[72px] md:leading-[80px] font-['Philosopher'] mb-8">
              <span className="bg-gradient-to-r from-red-700 via-orange-600 to-red-800 bg-clip-text text-transparent">
                Manglik Dosh
              </span>
              <br />
              <span className="bg-gradient-to-r from-orange-600 via-red-700 to-yellow-600 bg-clip-text text-transparent">
                मांगलिक दोष
              </span>
            </h1>
            
            <p className="text-[20px] sm:text-[22px] md:text-[24px] font-normal leading-[32px] sm:leading-[34px] md:leading-[36px] font-['Lato'] max-w-5xl mx-auto text-gray-700 mb-12">
              Check if you have Manglik Dosh and understand its effects on marriage and relationships.
              <br className="hidden sm:block" />
              Get detailed analysis and effective remedies for harmonious married life.
            </p>
          </div>
        </div>
      </section>

      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl p-8 border border-white/50">
            <h2 className="text-3xl font-bold text-gray-800 font-['Philosopher'] mb-8 text-center">
              Manglik Dosh Calculator
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-red-200 rounded-2xl focus:ring-4 focus:ring-red-200 focus:border-red-400 text-gray-700 font-medium bg-white/80 backdrop-blur-sm transition-all duration-300"
                  placeholder="Enter your full name"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Gender *
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-red-200 rounded-2xl focus:ring-4 focus:ring-red-200 focus:border-red-400 text-gray-700 font-medium bg-white/80 backdrop-blur-sm transition-all duration-300"
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Date of Birth *
                  </label>
                  <input
                    type="date"
                    name="birthDate"
                    value={formData.birthDate}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-red-200 rounded-2xl focus:ring-4 focus:ring-red-200 focus:border-red-400 text-gray-700 font-medium bg-white/80 backdrop-blur-sm transition-all duration-300"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Time of Birth *
                  </label>
                  <input
                    type="time"
                    name="birthTime"
                    value={formData.birthTime}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-red-200 rounded-2xl focus:ring-4 focus:ring-red-200 focus:border-red-400 text-gray-700 font-medium bg-white/80 backdrop-blur-sm transition-all duration-300"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Place of Birth *
                </label>
                <input
                  type="text"
                  name="birthPlace"
                  value={formData.birthPlace}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-red-200 rounded-2xl focus:ring-4 focus:ring-red-200 focus:border-red-400 text-gray-700 font-medium bg-white/80 backdrop-blur-sm transition-all duration-300"
                  placeholder="Enter birth city/town"
                  required
                />
              </div>
              
              <div className="text-center">
                <button
                  type="submit"
                  className="px-12 py-4 bg-gradient-to-r from-red-500 to-orange-500 text-white font-bold text-lg rounded-full hover:from-red-600 hover:to-orange-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-2xl"
                >
                  Check Manglik Dosh
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-red-50/30 to-orange-50/30">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 font-['Philosopher'] mb-12 text-center">
            Understanding Manglik Dosh
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: "🔴",
                title: "What is Manglik Dosh",
                description: "Mars positioned in 1st, 2nd, 4th, 7th, 8th, or 12th house causes Manglik Dosh"
              },
              {
                icon: "💔",
                title: "Effects on Marriage",
                description: "Can cause delays, conflicts, or challenges in married life if not addressed"
              },
              {
                icon: "🙏",
                title: "Remedies Available",
                description: "Specific pujas, mantras, and gemstones can neutralize negative effects"
              },
              {
                icon: "💕",
                title: "Manglik Matching",
                description: "Two Mangliks can marry each other to cancel the dosha effects"
              },
              {
                icon: "🕉️",
                title: "Spiritual Solutions",
                description: "Regular prayers to Lord Hanuman and Mars can reduce negative impacts"
              },
              {
                icon: "⭐",
                title: "Positive Aspects",
                description: "Mangliks often have strong determination, courage, and leadership qualities"
              }
            ].map((info, index) => (
              <div
                key={index}
                className="group bg-white/70 backdrop-blur-lg rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all duration-700 border border-white/50 text-center transform hover:scale-105"
              >
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-500">
                  {info.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-800 font-['Philosopher'] mb-3">
                  {info.title}
                </h3>
                <p className="text-gray-600 font-['Lato'] text-sm leading-relaxed">
                  {info.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 font-['Philosopher'] mb-12 text-center">
            Common Remedies for Manglik Dosh
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: "Spiritual Remedies",
                items: [
                  "Regular recitation of Hanuman Chalisa",
                  "Fasting on Tuesdays",
                  "Visiting Hanuman temples",
                  "Offering red flowers to Lord Mars"
                ],
                color: "from-red-500 to-orange-500"
              },
              {
                title: "Gemstone & Charity",
                items: [
                  "Wearing Red Coral (Moonga) gemstone",
                  "Donating red items on Tuesdays",
                  "Feeding birds and animals",
                  "Helping poor and needy people"
                ],
                color: "from-orange-500 to-yellow-500"
              }
            ].map((remedy, index) => (
              <div
                key={index}
                className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-xl border border-white/50"
              >
                <h3 className={`text-2xl font-bold mb-6 text-center bg-gradient-to-r ${remedy.color} bg-clip-text text-transparent font-['Philosopher']`}>
                  {remedy.title}
                </h3>
                <ul className="space-y-3">
                  {remedy.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-center text-gray-700">
                      <span className="text-red-500 mr-3">•</span>
                      <span className="font-['Lato']">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default ManglikDoshPage;