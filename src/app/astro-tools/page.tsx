'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const AstroToolsPage: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const tools = [
    {
      title: "Astro Watch",
      description: "Track celestial events and their spiritual significance",
      href: "/astro-watch",
      icon: "⏰",
      color: "from-indigo-500 to-purple-600"
    },
    {
      title: "Manglik Dosh Calculator",
      description: "Check for Manglik Dosh and get effective remedies",
      href: "/manglik-dosh",
      icon: "🔴",
      color: "from-red-500 to-orange-600"
    },
    {
      title: "Kaalsarp Dosh Calculator",
      description: "Analyze Kaalsarp Dosh and understand its impact",
      href: "/kaalsarp-dosh",
      icon: "🐍",
      color: "from-green-500 to-blue-600"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50/50 via-purple-50/30 to-blue-50/50 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-indigo-200/30 rounded-full mix-blend-multiply filter blur-xl animate-float"></div>
        <div className="absolute top-40 right-10 w-80 h-80 bg-purple-200/30 rounded-full mix-blend-multiply filter blur-xl animate-float animation-delay-2000"></div>
        <div className="absolute bottom-20 left-20 w-72 h-72 bg-blue-200/30 rounded-full mix-blend-multiply filter blur-xl animate-float animation-delay-4000"></div>
      </div>
      
      <Header />
      
      <section className="relative pt-28 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="relative max-w-7xl mx-auto text-center">
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="mb-8 flex justify-center">
              <div className="relative p-6 rounded-full bg-gradient-to-br from-indigo-200/40 to-purple-200/40 backdrop-blur-sm border border-indigo-300/30 shadow-lg">
                <div className="text-6xl text-indigo-600 animate-float font-bold">🛠️</div>
                <div className="absolute inset-0 bg-indigo-300/20 rounded-full blur-xl animate-pulse"></div>
              </div>
            </div>
            
            <h1 className="text-[52px] sm:text-[64px] md:text-[72px] font-bold leading-[60px] sm:leading-[72px] md:leading-[80px] font-['Philosopher'] mb-8">
              <span className="bg-gradient-to-r from-indigo-700 via-purple-600 to-blue-800 bg-clip-text text-transparent">
                Astro Tools
              </span>
              <br />
              <span className="bg-gradient-to-r from-purple-600 via-indigo-700 to-blue-600 bg-clip-text text-transparent">
                ज्योतिष उपकरण
              </span>
            </h1>
            
            <p className="text-[20px] sm:text-[22px] md:text-[24px] font-normal leading-[32px] sm:leading-[34px] md:leading-[36px] font-['Lato'] max-w-5xl mx-auto text-gray-700 mb-12">
              Powerful astrology tools to analyze your birth chart and understand cosmic influences.
              <br className="hidden sm:block" />
              Discover doshas, track celestial events, and get personalized insights.
            </p>
          </div>
        </div>
      </section>

      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tools.map((tool, index) => (
              <Link
                key={index}
                href={tool.href}
                className={`group block bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-700 border border-white/50 overflow-hidden transform hover:scale-105 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}
                style={{ animationDelay: `${600 + index * 200}ms` }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${tool.color} opacity-0 group-hover:opacity-10 transition-all duration-500 rounded-3xl`}></div>
                
                <div className="relative z-10 text-center">
                  <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-500">
                    {tool.icon}
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-800 font-['Philosopher'] mb-4 group-hover:text-indigo-700 transition-colors duration-300">
                    {tool.title}
                  </h3>
                  
                  <p className="text-gray-600 font-['Lato'] leading-relaxed mb-6">
                    {tool.description}
                  </p>
                  
                  <div className={`inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r ${tool.color} text-white rounded-full font-bold text-sm group-hover:shadow-lg transition-all duration-300`}>
                    <span>Explore Tool</span>
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
                
                <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${tool.color} opacity-0 group-hover:opacity-20 blur-xl transition-all duration-700 -z-10`}></div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default AstroToolsPage;