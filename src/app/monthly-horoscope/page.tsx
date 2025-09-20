'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import '../../styles/horoscope-animations.css';

const MonthlyHoroscopePage: React.FC = () => {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);
  const [selectedZodiac, setSelectedZodiac] = useState<string | null>(null);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  // Animation trigger on component mount
  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Comprehensive horoscope data with correct date ranges
  const horoscopeData = [
    { 
      id: 'aries', 
      icon: "/images/img_vector_black_900_01.svg", 
      name: "Aries", 
      dateRange: "Mar 21 - Apr 19",
      element: "Fire",
      rulingPlanet: "Mars",
      symbol: "The Ram",
      color: "from-red-400 to-orange-500",
      description: "Bold, ambitious, and fiery by nature"
    },
    { 
      id: 'taurus', 
      icon: "/images/img_vector_black_900_01_34x36.svg", 
      name: "Taurus", 
      dateRange: "Apr 20 - May 20",
      element: "Earth",
      rulingPlanet: "Venus",
      symbol: "The Bull",
      color: "from-green-400 to-emerald-500",
      description: "Reliable, patient, and practical"
    },
    { 
      id: 'gemini', 
      icon: "/images/img_vector_black_900_01_34x32.svg", 
      name: "Gemini", 
      dateRange: "May 21 - Jun 20",
      element: "Air",
      rulingPlanet: "Mercury",
      symbol: "The Twins",
      color: "from-yellow-400 to-amber-500",
      description: "Curious, adaptable, and communicative"
    },
    { 
      id: 'cancer', 
      icon: "/images/img_vector_black_900_01_36x26.svg", 
      name: "Cancer", 
      dateRange: "Jun 21 - Jul 22",
      element: "Water",
      rulingPlanet: "Moon",
      symbol: "The Crab",
      color: "from-blue-400 to-cyan-500",
      description: "Emotional, intuitive, and nurturing"
    },
    { 
      id: 'leo', 
      icon: "/images/img_vector_black_900_01_34x40.png", 
      name: "Leo", 
      dateRange: "Jul 23 - Aug 22",
      element: "Fire",
      rulingPlanet: "Sun",
      symbol: "The Lion",
      color: "from-orange-400 to-red-500",
      description: "Confident, generous, and dramatic"
    },
    { 
      id: 'virgo', 
      icon: "/images/img_vector_black_900_01_34x26.svg", 
      name: "Virgo", 
      dateRange: "Aug 23 - Sep 22",
      element: "Earth",
      rulingPlanet: "Mercury",
      symbol: "The Virgin",
      color: "from-emerald-400 to-green-500",
      description: "Analytical, practical, and perfectionist"
    },
    { 
      id: 'libra', 
      icon: "/images/img_vector_black_900_01_22x36.svg", 
      name: "Libra", 
      dateRange: "Sep 23 - Oct 22",
      element: "Air",
      rulingPlanet: "Venus",
      symbol: "The Scales",
      color: "from-pink-400 to-rose-500",
      description: "Diplomatic, balanced, and social"
    },
    { 
      id: 'scorpio', 
      icon: "/images/img_component_2.png", 
      name: "Scorpio", 
      dateRange: "Oct 23 - Nov 21",
      element: "Water",
      rulingPlanet: "Mars & Pluto",
      symbol: "The Scorpion",
      color: "from-purple-400 to-indigo-500",
      description: "Intense, passionate, and mysterious"
    },
    { 
      id: 'sagittarius', 
      icon: "/images/img_vector_black_900_01_34x30.svg", 
      name: "Sagittarius", 
      dateRange: "Nov 22 - Dec 21",
      element: "Fire",
      rulingPlanet: "Jupiter",
      symbol: "The Archer",
      color: "from-violet-400 to-purple-500",
      description: "Adventurous, optimistic, and philosophical"
    },
    { 
      id: 'capricorn', 
      icon: "/images/img_vector_34x32.svg", 
      name: "Capricorn", 
      dateRange: "Dec 22 - Jan 19",
      element: "Earth",
      rulingPlanet: "Saturn",
      symbol: "The Goat",
      color: "from-slate-400 to-gray-500",
      description: "Ambitious, disciplined, and practical"
    },
    { 
      id: 'aquarius', 
      icon: "/images/img_vector_black_900_01_34x28.svg", 
      name: "Aquarius", 
      dateRange: "Jan 20 - Feb 18",
      element: "Air",
      rulingPlanet: "Saturn & Uranus",
      symbol: "The Water Bearer",
      color: "from-cyan-400 to-blue-500",
      description: "Independent, innovative, and humanitarian"
    },
    { 
      id: 'pisces', 
      icon: "/images/img_vector_black_900_01_26x36.svg", 
      name: "Pisces", 
      dateRange: "Feb 19 - Mar 20",
      element: "Water",
      rulingPlanet: "Jupiter & Neptune",
      symbol: "The Fish",
      color: "from-teal-400 to-cyan-500",
      description: "Compassionate, artistic, and intuitive"
    }
  ];

  const handleZodiacClick = (zodiacId: string) => {
    setSelectedZodiac(zodiacId);
    // In a real app, this would navigate to a specific monthly horoscope for that sign
    // router.push(`/monthly-horoscope/${zodiacId}`);
  };

  const handleBackToHome = () => {
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50/30 via-cyan-50/40 to-blue-50/30 relative overflow-hidden">
      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-teal-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-cyan-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
        <div className="absolute bottom-20 right-20 w-72 h-72 bg-teal-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-6000"></div>
      </div>

      <Header />
      
      {/* Hero Section */}
      <section className="relative w-full min-h-screen pt-20 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Traditional Indian Ethnic Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-teal-100/40 via-cyan-50/50 to-blue-100/60"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-teal-200/30 via-cyan-100/40 to-blue-200/50 animate-gradient-x"></div>
          
          {/* Ethnic Pattern Overlay */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 w-32 h-32 border-2 border-teal-400 rounded-full animate-spin-slow"></div>
            <div className="absolute top-20 right-20 w-20 h-20 border border-cyan-500 rounded-full animate-pulse"></div>
            <div className="absolute bottom-20 left-20 w-24 h-24 border-2 border-blue-300 rotate-45 animate-float"></div>
            <div className="absolute bottom-10 right-10 w-16 h-16 border border-cyan-400 rounded-full animate-twinkle"></div>
          </div>
          
          {/* Sacred Mandala Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96">
              <div className="w-full h-full border-8 border-teal-400 rounded-full animate-spin-slow"></div>
              <div className="absolute inset-8 border-4 border-cyan-500 rounded-full animate-pulse"></div>
              <div className="absolute inset-16 border-2 border-blue-300 rounded-full"></div>
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
                    <div className="p-8 rounded-full bg-white/20 backdrop-blur-lg border-2 border-teal-300/40 relative overflow-hidden group shadow-lg">
                      <div className="absolute inset-0 bg-gradient-to-br from-teal-200/20 to-cyan-200/20 rounded-full group-hover:scale-110 transition-transform duration-500"></div>
                      <div className="text-6xl text-teal-600 relative z-10 animate-float font-bold" style={{fontFamily: 'serif'}}>ॐ</div>
                      {/* Subtle glow effect */}
                      <div className="absolute inset-0 bg-teal-300/10 rounded-full blur-xl group-hover:bg-teal-300/20 transition-all duration-500"></div>
                    </div>
                  </div>
                  
                  {/* Sacred Heading with Sanskrit Elements */}
                  <h1 className="text-[48px] sm:text-[56px] md:text-[64px] lg:text-[72px] font-bold leading-[56px] sm:leading-[64px] md:leading-[72px] lg:leading-[80px] font-['Philosopher'] mb-8">
                    <span className="bg-gradient-to-r from-teal-700 via-cyan-600 to-blue-600 bg-clip-text text-transparent">
                      मासिक राशिफल
                    </span>
                    <br />
                    <span className="bg-gradient-to-r from-teal-600 via-cyan-600 to-blue-700 bg-clip-text text-transparent">
                      Monthly Horoscope
                    </span>
                  </h1>
                  
                  <p className="text-[18px] sm:text-[20px] md:text-[22px] font-normal leading-[28px] sm:leading-[30px] md:leading-[32px] font-['Lato'] max-w-4xl mb-10 text-gray-700 mx-auto">
                    Discover your monthly cosmic guidance rooted in ancient Vedic traditions. 
                    <br className="hidden sm:block" />
                    Unlock personalized insights for the month ahead and your zodiac sign.
                  </p>
                  
                  {/* Enhanced Traditional CTA Buttons */}
                  <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
                    <button className="group relative px-10 py-4 bg-gradient-to-r from-teal-400 to-cyan-400 text-white font-bold text-lg rounded-full overflow-hidden transition-all duration-500 hover:scale-105 shadow-lg hover:shadow-xl">
                      <span className="relative z-10 flex items-center justify-center gap-3">
                        <div className="text-xl">🔯</div>
                        Get Your Monthly Horoscope
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-teal-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </button>
                    
                    <button 
                      onClick={handleBackToHome}
                      className="group relative px-10 py-4 bg-white/80 backdrop-blur-sm text-teal-600 font-bold text-lg rounded-full border-2 border-teal-300 hover:border-teal-400 transition-all duration-500 hover:scale-105 shadow-md hover:shadow-lg"
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

      {/* Zodiac Selection Section */}
      <section className="relative w-full py-[80px] sm:py-[90px] md:py-[100px] px-[42px] sm:px-[49px] md:px-[56px] bg-gradient-to-br from-white/80 to-teal-50/50">
        <div className="w-full max-w-[1440px] mx-auto">
          {/* Section Header */}
          <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="mb-6">
              <span className="inline-block px-6 py-2 bg-gradient-to-r from-teal-100 to-cyan-100 text-teal-700 rounded-full text-sm font-semibold mb-4">
                ✨ Select Your Zodiac Sign
              </span>
            </div>
            <h2 className="text-[42px] sm:text-[48px] md:text-[56px] font-bold leading-[48px] sm:leading-[54px] md:leading-[64px] text-gray-800 font-['Philosopher'] mb-6">
              <span className="bg-gradient-to-r from-teal-600 via-cyan-600 to-blue-600 bg-clip-text text-transparent">
                This Month's Cosmic Insights
              </span>
            </h2>
            <p className="text-[18px] sm:text-[20px] md:text-[22px] font-normal leading-[28px] sm:leading-[30px] md:leading-[32px] text-gray-600 font-['Lato'] max-w-3xl mx-auto">
              Choose your zodiac sign to receive personalized monthly predictions and cosmic guidance
            </p>
          </div>

          {/* Zodiac Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {horoscopeData.map((zodiac, index) => (
              <div
                key={zodiac.id}
                onClick={() => handleZodiacClick(zodiac.id)}
                onMouseEnter={() => setHoveredCard(zodiac.id)}
                onMouseLeave={() => setHoveredCard(null)}
                className={`group relative cursor-pointer transform transition-all duration-700 hover:scale-105 hover:-translate-y-4 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}
                style={{ 
                  animationDelay: `${600 + index * 150}ms`,
                  transformStyle: 'preserve-3d'
                }}
              >
                {/* Main Card Container */}
                <div className="relative bg-white/90 backdrop-blur-lg rounded-3xl p-8 shadow-2xl hover:shadow-teal-500/25 transition-all duration-700 border border-white/50 overflow-hidden group-hover:bg-white">
                  
                  {/* Dynamic Background Gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${zodiac.color} opacity-0 group-hover:opacity-15 transition-all duration-700 rounded-3xl`}></div>
                  
                  {/* Animated Particle System */}
                  <div className="absolute inset-0 overflow-hidden rounded-3xl">
                    {[...Array(6)].map((_, i) => (
                      <div
                        key={i}
                        className={`absolute w-2 h-2 bg-gradient-to-r ${zodiac.color} rounded-full opacity-0 group-hover:opacity-60 transition-all duration-1000`}
                        style={{
                          top: `${20 + (i * 15)}%`,
                          left: `${10 + (i * 12)}%`,
                          animationDelay: `${i * 200}ms`,
                          animation: hoveredCard === zodiac.id ? 'float 3s ease-in-out infinite' : 'none'
                        }}
                      ></div>
                    ))}
                  </div>

                  {/* Content */}
                  <div className="relative z-10 text-center">
                    {/* Icon Design */}
                    <div className="relative mb-6 flex justify-center">
                      <div className="relative">
                        {/* Icon container */}
                        <div className={`relative w-20 h-20 rounded-full bg-gradient-to-br ${zodiac.color} p-1 shadow-xl group-hover:shadow-teal-500/50 transition-all duration-500 group-hover:rotate-12`}>
                          <div className="w-full h-full bg-white rounded-full flex items-center justify-center group-hover:bg-gray-50 transition-all duration-300 relative overflow-hidden">
                            <Image
                              src={zodiac.icon}
                              alt={zodiac.name}
                              width={40}
                              height={40}
                              className="w-10 h-10 group-hover:scale-125 transition-transform duration-500 relative z-10"
                            />
                            {/* Icon glow effect */}
                            <div className={`absolute inset-0 bg-gradient-to-r ${zodiac.color} opacity-0 group-hover:opacity-20 transition-opacity duration-500 rounded-full`}></div>
                          </div>
                        </div>
                        
                        {/* Outer glow */}
                        <div className={`absolute -inset-4 rounded-full bg-gradient-to-r ${zodiac.color} opacity-0 group-hover:opacity-30 blur-xl transition-all duration-700`}></div>
                      </div>
                    </div>

                    {/* Zodiac Info */}
                    <h3 className="text-[22px] sm:text-[24px] font-bold text-gray-800 font-['Philosopher'] mb-2 group-hover:text-teal-700 transition-colors duration-300 transform group-hover:scale-105">
                      {zodiac.name}
                    </h3>
                    
                    <p className="text-[14px] text-gray-500 font-['Lato'] mb-1 font-semibold">
                      {zodiac.dateRange}
                    </p>
                    
                    <p className="text-[13px] text-gray-600 font-['Lato'] leading-relaxed px-2">
                      {zodiac.description}
                    </p>

                    {/* Element Badge */}
                    <div className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-bold bg-gradient-to-r ${zodiac.color} text-white shadow-md group-hover:shadow-lg transition-all duration-300 transform group-hover:scale-105 mt-4`}>
                      <span className="mr-1.5 text-base">
                        {zodiac.element === 'Fire' && '🔥'}
                        {zodiac.element === 'Earth' && '🌍'}
                        {zodiac.element === 'Air' && '💨'}
                        {zodiac.element === 'Water' && '💧'}
                      </span>
                      {zodiac.element} Element
                    </div>
                  </div>
                </div>

                {/* Glow Effects */}
                <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${zodiac.color} opacity-0 group-hover:opacity-25 blur-2xl transition-all duration-700 -z-10 scale-90 group-hover:scale-100`}></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Monthly Horoscope Insights Section */}
      <section className="relative w-full py-[80px] sm:py-[90px] md:py-[100px] px-[42px] sm:px-[49px] md:px-[56px] bg-gradient-to-br from-blue-50/50 to-teal-50/50">
        <div className="w-full max-w-[1440px] mx-auto">
          <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="mb-6">
              <span className="inline-block px-6 py-2 bg-gradient-to-r from-blue-100 to-teal-100 text-blue-700 rounded-full text-sm font-semibold mb-4">
                🌟 Monthly Predictions
              </span>
            </div>
            <h2 className="text-[42px] sm:text-[48px] md:text-[56px] font-bold leading-[48px] sm:leading-[54px] md:leading-[64px] text-gray-800 font-['Philosopher'] mb-6">
              <span className="bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 bg-clip-text text-transparent">
                Four Weeks of Cosmic Guidance
              </span>
            </h2>
            <p className="text-[18px] sm:text-[20px] md:text-[22px] font-normal leading-[28px] sm:leading-[30px] md:leading-[32px] text-gray-600 font-['Lato'] max-w-3xl mx-auto">
              Unlock the celestial wisdom that guides your month ahead
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Love & Relationships */}
            <div className={`group bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-xl border border-white/50 transition-all duration-700 hover:shadow-2xl hover:-translate-y-2 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ animationDelay: '600ms' }}>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 bg-gradient-to-br from-pink-400 to-rose-500 rounded-2xl flex items-center justify-center text-white text-2xl">
                  💖
                </div>
                <h3 className="text-[24px] font-bold text-gray-800 font-['Philosopher']">
                  Love & Relationships
                </h3>
              </div>
              <p className="text-gray-600 font-['Lato'] leading-relaxed">
                This month brings significant opportunities for deeper emotional connections. Single signs may encounter meaningful encounters, especially during the second week. Those in relationships should focus on quality time together. Communication is key to resolving any misunderstandings. Express appreciation for your partner{`'`}s support throughout the month.
              </p>
            </div>
            
            {/* Career & Finance */}
            <div className={`group bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-xl border border-white/50 transition-all duration-700 hover:shadow-2xl hover:-translate-y-2 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ animationDelay: '800ms' }}>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-2xl flex items-center justify-center text-white text-2xl">
                  💼
                </div>
                <h3 className="text-[24px] font-bold text-gray-800 font-['Philosopher']">
                  Career & Finance
                </h3>
              </div>
              <p className="text-gray-600 font-['Lato'] leading-relaxed">
                Professional matters gain significant momentum this month. A proposal or project may reach a crucial decision point during the third week. Financial planning should be prioritized, especially towards the end of the month. Unexpected opportunities may arise for those in creative or communication fields. Networking events could prove particularly beneficial.
              </p>
            </div>
            
            {/* Health & Wellness */}
            <div className={`group bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-xl border border-white/50 transition-all duration-700 hover:shadow-2xl hover:-translate-y-2 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ animationDelay: '1000ms' }}>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center text-white text-2xl">
                  🧘
                </div>
                <h3 className="text-[24px] font-bold text-gray-800 font-['Philosopher']">
                  Health & Wellness
                </h3>
              </div>
              <p className="text-gray-600 font-['Lato'] leading-relaxed">
                Prioritize holistic wellness this month. Physical activity will boost your energy levels significantly. Pay attention to your diet and hydration, especially during the middle weeks. Meditation or yoga can help center your thoughts during busy periods. Listen to your body{`'`}s signals and rest when needed. Mental well-being requires extra attention this month.
              </p>
            </div>
          </div>
          
          {/* Call to Action */}
          <div className={`text-center mt-16 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="bg-gradient-to-r from-teal-500/10 to-blue-500/10 rounded-3xl p-8 border border-teal-200/50 backdrop-blur-sm">
              <h3 className="text-[28px] sm:text-[32px] font-bold text-gray-800 font-['Philosopher'] mb-4">
                Ready for Your Personalized Monthly Horoscope?
              </h3>
              <p className="text-gray-600 font-['Lato'] mb-8 max-w-2xl mx-auto">
                Get detailed predictions tailored specifically to your zodiac sign and birth chart for deeper insights into your month ahead.
              </p>
              <button className="group relative px-8 py-4 bg-gradient-to-r from-teal-500 to-blue-500 text-white font-bold text-lg rounded-full overflow-hidden transition-all duration-500 hover:scale-105 shadow-lg hover:shadow-xl">
                <span className="relative z-10 flex items-center justify-center gap-3">
                  <div className="text-xl">🔮</div>
                  Get Your Detailed Monthly Horoscope
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-teal-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default MonthlyHoroscopePage;