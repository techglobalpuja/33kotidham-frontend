'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import '../../styles/horoscope-animations.css';

const CommunityPage: React.FC = () => {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);

  // Animation trigger on component mount
  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleBackToHome = () => {
    router.push('/');
  };

  // Community features data
  const features = [
    {
      id: 1,
      title: "Spiritual Discussions",
      description: "Engage in meaningful conversations with fellow seekers on spiritual topics and practices",
      icon: "🗣️",
      color: "from-orange-400 to-amber-500"
    },
    {
      id: 2,
      title: "Expert Q&A",
      description: "Get your spiritual questions answered by our certified astrologers and guides",
      icon: "❓",
      color: "from-purple-400 to-indigo-500"
    },
    {
      id: 3,
      title: "Experience Sharing",
      description: "Share your spiritual journey and learn from others' experiences",
      icon: "📖",
      color: "from-blue-400 to-cyan-500"
    },
    {
      id: 4,
      title: "Group Meditations",
      description: "Participate in guided group meditation sessions for collective spiritual growth",
      icon: "🧘",
      color: "from-rose-400 to-pink-500"
    }
  ];

  // Community benefits
  const benefits = [
    {
      title: "Connect with Like-minded Souls",
      description: "Find your spiritual community and build meaningful connections",
      icon: "🤝"
    },
    {
      title: "Continuous Learning",
      description: "Expand your spiritual knowledge through shared wisdom and insights",
      icon: "🧠"
    },
    {
      title: "Supportive Environment",
      description: "Experience a safe space for spiritual exploration and growth",
      icon: "🕊️"
    },
    {
      title: "Cultural Exchange",
      description: "Learn about diverse spiritual traditions and practices from around the world",
      icon: "🌍"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50/30 via-orange-50/40 to-yellow-50/30 relative overflow-hidden">
      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-amber-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-orange-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-yellow-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
        <div className="absolute bottom-20 right-20 w-72 h-72 bg-amber-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-6000"></div>
      </div>

      <Header />
      
      {/* Hero Section */}
      <section className="relative w-full min-h-screen pt-20 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Traditional Indian Ethnic Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-100/40 via-orange-50/50 to-yellow-100/60"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-amber-200/30 via-orange-100/40 to-yellow-200/50 animate-gradient-x"></div>
          
          {/* Ethnic Pattern Overlay */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 w-32 h-32 border-2 border-amber-400 rounded-full animate-spin-slow"></div>
            <div className="absolute top-20 right-20 w-20 h-20 border border-orange-500 rounded-full animate-pulse"></div>
            <div className="absolute bottom-20 left-20 w-24 h-24 border-2 border-yellow-300 rotate-45 animate-float"></div>
            <div className="absolute bottom-10 right-10 w-16 h-16 border border-amber-400 rounded-full animate-twinkle"></div>
          </div>
          
          {/* Sacred Mandala Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96">
              <div className="w-full h-full border-8 border-amber-400 rounded-full animate-spin-slow"></div>
              <div className="absolute inset-8 border-4 border-orange-500 rounded-full animate-pulse"></div>
              <div className="absolute inset-16 border-2 border-yellow-300 rounded-full"></div>
            </div>
          </div>
        </div>
        
        {/* Content Container */}
        <div className="relative z-10 w-full max-w-7xl mx-auto">
          {/* Hero Content */}
          <div className="flex flex-col min-h-[calc(100vh-120px)] sm:min-h-[calc(100vh-100px)] pt-10 sm:pt-16 lg:pt-20">
            <div className="flex-1 flex items-center py-8 sm:py-12 lg:py-0">
              <div className="w-full max-w-4xl mx-auto text-center">
                <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                  {/* Sacred Om Symbol */}
                  <div className="mb-8 relative flex justify-center">
                    <div className="p-8 rounded-full bg-white/20 backdrop-blur-lg border-2 border-amber-300/40 relative overflow-hidden group shadow-lg">
                      <div className="absolute inset-0 bg-gradient-to-br from-amber-200/20 to-orange-200/20 rounded-full group-hover:scale-110 transition-transform duration-500"></div>
                      <div className="text-6xl text-amber-600 relative z-10 animate-float font-bold" style={{fontFamily: 'serif'}}>ॐ</div>
                      {/* Subtle glow effect */}
                      <div className="absolute inset-0 bg-amber-300/10 rounded-full blur-xl group-hover:bg-amber-300/20 transition-all duration-500"></div>
                    </div>
                  </div>
                  
                  {/* Sacred Heading with Sanskrit Elements */}
                  <h1 className="text-[48px] sm:text-[56px] md:text-[64px] lg:text-[72px] font-bold leading-[56px] sm:leading-[64px] md:leading-[72px] lg:leading-[80px] font-['Philosopher'] mb-8">
                    <span className="bg-gradient-to-r from-amber-700 via-amber-600 to-orange-600 bg-clip-text text-transparent">
                      समुदाय
                    </span>
                    <br />
                    <span className="bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 bg-clip-text text-transparent">
                      Spiritual Community
                    </span>
                  </h1>
                  
                  <p className="text-[18px] sm:text-[20px] md:text-[22px] font-normal leading-[28px] sm:leading-[30px] md:leading-[32px] font-['Lato'] max-w-4xl mb-10 text-gray-700 mx-auto">
                    Join our vibrant community of spiritual seekers and connect with like-minded souls on the path to enlightenment.
                    <br className="hidden sm:block" />
                    Share experiences, gain insights, and grow together in wisdom and harmony.
                  </p>
                  
                  {/* Enhanced Traditional CTA Buttons */}
                  <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
                    <button className="group relative px-10 py-4 bg-gradient-to-r from-amber-400 to-orange-400 text-white font-bold text-lg rounded-full overflow-hidden transition-all duration-500 hover:scale-105 shadow-lg hover:shadow-xl">
                      <span className="relative z-10 flex items-center justify-center gap-3">
                        <div className="text-xl">👥</div>
                        Join Our Community
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </button>
                    
                    <button 
                      onClick={handleBackToHome}
                      className="group relative px-10 py-4 bg-white/80 backdrop-blur-sm text-amber-600 font-bold text-lg rounded-full border-2 border-amber-300 hover:border-amber-400 transition-all duration-500 hover:scale-105 shadow-md hover:shadow-lg"
                    >
                      <span className="relative z-10 flex items-center justify-center gap-3">
                        <div className="text-xl">🏠</div>
                        Back to Home
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative w-full py-[80px] sm:py-[90px] md:py-[100px] px-[42px] sm:px-[49px] md:px-[56px] bg-gradient-to-br from-white/80 to-amber-50/50">
        <div className="w-full max-w-[1440px] mx-auto">
          {/* Section Header */}
          <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="mb-6">
              <span className="inline-block px-6 py-2 bg-gradient-to-r from-amber-100 to-orange-100 text-amber-700 rounded-full text-sm font-semibold mb-4">
                🌟 Community Features
              </span>
            </div>
            <h2 className="text-[42px] sm:text-[48px] md:text-[56px] font-bold leading-[48px] sm:leading-[54px] md:leading-[64px] text-gray-800 font-['Philosopher'] mb-6">
              <span className="bg-gradient-to-r from-amber-600 via-orange-600 to-yellow-600 bg-clip-text text-transparent">
                Connect, Share, and Grow
              </span>
            </h2>
            <p className="text-[18px] sm:text-[20px] md:text-[22px] font-normal leading-[28px] sm:leading-[30px] md:leading-[32px] text-gray-600 font-['Lato'] max-w-3xl mx-auto">
              Our community platform offers diverse ways to engage with fellow spiritual seekers and deepen your journey
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={feature.id}
                className={`group relative bg-white/90 backdrop-blur-lg rounded-3xl p-8 shadow-2xl hover:shadow-orange-500/25 transition-all duration-700 border border-white/50 overflow-hidden transform hover:-translate-y-2 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}
                style={{ animationDelay: `${600 + index * 150}ms` }}
              >
                {/* Dynamic Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-15 transition-all duration-700 rounded-3xl`}></div>
                
                {/* Content */}
                <div className="relative z-10 text-center">
                  {/* Icon */}
                  <div className="relative mb-6 flex justify-center">
                    <div className="relative">
                      <div className={`relative w-20 h-20 rounded-full bg-gradient-to-br ${feature.color} p-1 shadow-xl group-hover:shadow-orange-500/50 transition-all duration-500`}>
                        <div className="w-full h-full bg-white rounded-full flex items-center justify-center group-hover:bg-gray-50 transition-all duration-300 relative overflow-hidden">
                          <div className="text-3xl">{feature.icon}</div>
                          {/* Icon glow effect */}
                          <div className={`absolute inset-0 bg-gradient-to-r ${feature.color} opacity-0 group-hover:opacity-20 transition-opacity duration-500 rounded-full`}></div>
                        </div>
                      </div>
                      
                      {/* Outer glow */}
                      <div className={`absolute -inset-4 rounded-full bg-gradient-to-r ${feature.color} opacity-0 group-hover:opacity-30 blur-xl transition-all duration-700`}></div>
                    </div>
                  </div>

                  {/* Feature Info */}
                  <h3 className="text-[24px] font-bold text-gray-800 font-['Philosopher'] mb-4 group-hover:text-orange-700 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  
                  <p className="text-[15px] text-gray-600 font-['Lato'] leading-relaxed">
                    {feature.description}
                  </p>
                </div>
                
                {/* Glow Effects */}
                <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-25 blur-2xl transition-all duration-700 -z-10 scale-90 group-hover:scale-100`}></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="relative w-full py-[80px] sm:py-[90px] md:py-[100px] px-[42px] sm:px-[49px] md:px-[56px] bg-gradient-to-br from-orange-50/50 to-amber-50/50">
        <div className="w-full max-w-[1440px] mx-auto">
          <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="mb-6">
              <span className="inline-block px-6 py-2 bg-gradient-to-r from-orange-100 to-amber-100 text-orange-700 rounded-full text-sm font-semibold mb-4">
                🌸 Community Benefits
              </span>
            </div>
            <h2 className="text-[42px] sm:text-[48px] md:text-[56px] font-bold leading-[48px] sm:leading-[54px] md:leading-[64px] text-gray-800 font-['Philosopher'] mb-6">
              <span className="bg-gradient-to-r from-orange-600 via-amber-600 to-yellow-600 bg-clip-text text-transparent">
                Why Join Our Community?
              </span>
            </h2>
            <p className="text-[18px] sm:text-[20px] md:text-[22px] font-normal leading-[28px] sm:leading-[30px] md:leading-[32px] text-gray-600 font-['Lato'] max-w-3xl mx-auto">
              Experience the transformative power of spiritual community and collective growth
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div 
                key={index}
                className={`group bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-xl border border-white/50 transition-all duration-700 hover:shadow-2xl hover:-translate-y-2 text-center ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}
                style={{ animationDelay: `${800 + index * 150}ms` }}
              >
                <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-500">
                  {benefit.icon}
                </div>
                <h3 className="text-[22px] font-bold text-gray-800 font-['Philosopher'] mb-4">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 font-['Lato'] leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="relative w-full py-[80px] sm:py-[90px] md:py-[100px] px-[42px] sm:px-[49px] md:px-[56px] bg-gradient-to-br from-amber-100/50 to-orange-100/50">
        <div className="w-full max-w-[1440px] mx-auto">
          <div className={`text-center transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 rounded-3xl p-8 border border-amber-200/50 backdrop-blur-sm">
              <h3 className="text-[28px] sm:text-[32px] font-bold text-gray-800 font-['Philosopher'] mb-4">
                Begin Your Community Journey Today
              </h3>
              <p className="text-gray-600 font-['Lato'] mb-8 max-w-2xl mx-auto">
                Connect with our global community of spiritual seekers and embark on a transformative journey of shared wisdom and growth.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <button className="group relative px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold text-lg rounded-full overflow-hidden transition-all duration-500 hover:scale-105 shadow-lg hover:shadow-xl">
                  <span className="relative z-10 flex items-center justify-center gap-3">
                    <div className="text-xl">🌟</div>
                    Join Community Now
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-600 to-orange-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
                
                <button 
                  onClick={handleBackToHome}
                  className="group relative px-8 py-4 bg-white/80 backdrop-blur-sm text-amber-600 font-bold text-lg rounded-full border-2 border-amber-300 hover:border-amber-400 transition-all duration-500 hover:scale-105 shadow-md hover:shadow-lg"
                >
                  <span className="relative z-10 flex items-center justify-center gap-3">
                    <div className="text-xl">🏠</div>
                    Back to Home
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default CommunityPage;