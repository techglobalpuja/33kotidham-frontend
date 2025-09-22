'use client';

import React, { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const KaalsarpDoshPage: React.FC = () => {
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
    console.log('Kaalsarp Dosh form submitted:', formData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50/50 via-green-50/30 to-blue-50/50 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-green-200/30 rounded-full mix-blend-multiply filter blur-xl animate-float"></div>
        <div className="absolute top-40 right-10 w-80 h-80 bg-blue-200/30 rounded-full mix-blend-multiply filter blur-xl animate-float animation-delay-2000"></div>
        <div className="absolute bottom-20 left-20 w-72 h-72 bg-gray-200/30 rounded-full mix-blend-multiply filter blur-xl animate-float animation-delay-4000"></div>
      </div>
      
      <Header />
      
      <section className="relative pt-28 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="relative max-w-7xl mx-auto text-center">
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="mb-8 flex justify-center">
              <div className="relative p-6 rounded-full bg-gradient-to-br from-green-200/40 to-blue-200/40 backdrop-blur-sm border border-green-300/30 shadow-lg">
                <div className="text-6xl text-green-600 animate-float font-bold">🐍</div>
                <div className="absolute inset-0 bg-green-300/20 rounded-full blur-xl animate-pulse"></div>
              </div>
            </div>
            
            <h1 className="text-[52px] sm:text-[64px] md:text-[72px] font-bold leading-[60px] sm:leading-[72px] md:leading-[80px] font-['Philosopher'] mb-8">
              <span className="bg-gradient-to-r from-green-700 via-blue-600 to-green-800 bg-clip-text text-transparent">
                Kaalsarp Dosh
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-600 via-green-700 to-gray-600 bg-clip-text text-transparent">
                कालसर्प दोष
              </span>
            </h1>
            
            <p className="text-[20px] sm:text-[22px] md:text-[24px] font-normal leading-[32px] sm:leading-[34px] md:leading-[36px] font-['Lato'] max-w-5xl mx-auto text-gray-700 mb-12">
              Discover if you have Kaalsarp Dosh and understand its impact on your life journey.
              <br className="hidden sm:block" />
              Get comprehensive analysis and powerful remedies for overcoming obstacles.
            </p>
          </div>
        </div>
      </section>

      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl p-8 border border-white/50">
            <h2 className="text-3xl font-bold text-gray-800 font-['Philosopher'] mb-8 text-center">
              Kaalsarp Dosh Calculator
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
                  className="w-full px-4 py-3 border-2 border-green-200 rounded-2xl focus:ring-4 focus:ring-green-200 focus:border-green-400 text-gray-700 font-medium bg-white/80 backdrop-blur-sm transition-all duration-300"
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
                  className="w-full px-4 py-3 border-2 border-green-200 rounded-2xl focus:ring-4 focus:ring-green-200 focus:border-green-400 text-gray-700 font-medium bg-white/80 backdrop-blur-sm transition-all duration-300"
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
                    className="w-full px-4 py-3 border-2 border-green-200 rounded-2xl focus:ring-4 focus:ring-green-200 focus:border-green-400 text-gray-700 font-medium bg-white/80 backdrop-blur-sm transition-all duration-300"
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
                    className="w-full px-4 py-3 border-2 border-green-200 rounded-2xl focus:ring-4 focus:ring-green-200 focus:border-green-400 text-gray-700 font-medium bg-white/80 backdrop-blur-sm transition-all duration-300"
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
                  className="w-full px-4 py-3 border-2 border-green-200 rounded-2xl focus:ring-4 focus:ring-green-200 focus:border-green-400 text-gray-700 font-medium bg-white/80 backdrop-blur-sm transition-all duration-300"
                  placeholder="Enter birth city/town"
                  required
                />
              </div>
              
              <div className="text-center">
                <button
                  type="submit"
                  className="px-12 py-4 bg-gradient-to-r from-green-500 to-blue-500 text-white font-bold text-lg rounded-full hover:from-green-600 hover:to-blue-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-2xl"
                >
                  Check Kaalsarp Dosh
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-green-50/30 to-blue-50/30">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 font-['Philosopher'] mb-12 text-center">
            Understanding Kaalsarp Dosh
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: "🐍",
                title: "What is Kaalsarp Dosh",
                description: "Occurs when all planets are positioned between Rahu and Ketu in birth chart"
              },
              {
                icon: "⚡",
                title: "Effects on Life",
                description: "Can cause obstacles, delays, and unexpected challenges in various life areas"
              },
              {
                icon: "🎯",
                title: "Types of Kaalsarp",
                description: "12 different types based on Rahu-Ketu positions in various houses"
              },
              {
                icon: "🙏",
                title: "Powerful Remedies",
                description: "Specific pujas, mantras, and rituals can neutralize negative effects"
              },
              {
                icon: "🕉️",
                title: "Spiritual Growth",
                description: "Can accelerate spiritual development and inner transformation"
              },
              {
                icon: "✨",
                title: "Positive Outcomes",
                description: "With remedies, can lead to unexpected success and breakthroughs"
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
            Effective Remedies for Kaalsarp Dosh
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Kaalsarp Puja",
                items: [
                  "Special puja at Trimbakeshwar Temple",
                  "Rudrabhishek with specific mantras",
                  "Offering milk to Shiva Lingam",
                  "Regular Maha Mrityunjaya Jaap"
                ],
                color: "from-green-500 to-blue-500",
                icon: "🕉️"
              },
              {
                title: "Daily Practices",
                items: [
                  "Recite Vishnu Sahasranama daily",
                  "Chant Om Namah Shivaya 108 times",
                  "Worship Lord Ganesha every Wednesday",
                  "Fast on Nag Panchami day"
                ],
                color: "from-blue-500 to-indigo-500",
                icon: "🙏"
              },
              {
                title: "Charity & Good Deeds",
                items: [
                  "Feed Brahmins and poor people",
                  "Donate silver snake to temple",
                  "Plant trees and protect environment",
                  "Help animals and birds"
                ],
                color: "from-indigo-500 to-purple-500",
                icon: "💝"
              }
            ].map((remedy, index) => (
              <div
                key={index}
                className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-xl border border-white/50"
              >
                <div className="text-center mb-6">
                  <div className="text-4xl mb-4">{remedy.icon}</div>
                  <h3 className={`text-2xl font-bold bg-gradient-to-r ${remedy.color} bg-clip-text text-transparent font-['Philosopher']`}>
                    {remedy.title}
                  </h3>
                </div>
                <ul className="space-y-3">
                  {remedy.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-center text-gray-700">
                      <span className="text-green-500 mr-3">•</span>
                      <span className="font-['Lato']">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-gray-50/30 to-green-50/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-800 font-['Philosopher'] mb-8">
            Important Note
          </h2>
          <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-xl border border-white/50">
            <p className="text-lg text-gray-700 font-['Lato'] leading-relaxed mb-6">
              Kaalsarp Dosh is not always negative. With proper understanding and remedies, 
              it can become a powerful force for spiritual growth and material success. 
              Many great personalities had this dosh and achieved remarkable success.
            </p>
            <div className="flex justify-center">
              <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-full font-bold">
                <span>🌟</span>
                <span>Transform Challenges into Opportunities</span>
                <span>🌟</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default KaalsarpDoshPage;