'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Header from '@/components/layout/Header';
import '../../styles/horoscope-animations.css';

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

const astrologers = [
  {
    id: '1',
    name: 'Pandit Raj Sharma',
    image: '/images/astrologer-1.jpg',
    experience: '25+ Years',
    specialization: 'Vedic Astrology',
    rating: '4.9',
    consultations: '10,000+'
  },
  {
    id: '2',
    name: 'Dr. Kavya Nair',
    image: '/images/astrologer-2.jpg',
    experience: '18+ Years',
    specialization: 'Numerology',
    rating: '4.8',
    consultations: '8,500+'
  },
  {
    id: '3',
    name: 'Acharya Vikram',
    image: '/images/astrologer-3.jpg',
    experience: '30+ Years',
    specialization: 'Palmistry',
    rating: '4.9',
    consultations: '15,000+'
  },
  {
    id: '4',
    name: 'Pandit Anuj Dubey',
    image: '/images/astrologer-4.jpg',
    experience: '22+ Years',
    specialization: 'KP Astrology',
    rating: '4.7',
    consultations: '12,000+'
  }
];

const HoroscopePage: React.FC = () => {
  const router = useRouter();
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [selectedElement, setSelectedElement] = useState<string>('All');
  const [isVisible, setIsVisible] = useState(false);
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);
  const [activeAstrologer, setActiveAstrologer] = useState<string | null>(null);

  // Animation trigger on component mount
  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleZodiacClick = (zodiacId: string) => {
    router.push(`/horoscope/${zodiacId}`);
  };

  const elements = ['All', 'Fire', 'Earth', 'Air', 'Water'];
  
  const filteredData = selectedElement === 'All' 
    ? horoscopeData 
    : horoscopeData.filter(zodiac => zodiac.element === selectedElement);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-hidden">
      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-yellow-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
        <div className="absolute bottom-20 right-20 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-6000"></div>
      </div>

      {/* Puja-Themed Ethnic Hero Section */}
      <section className="relative w-full min-h-screen bg-gradient-to-r from-orange-50/30 to-yellow-50/40 overflow-hidden">
        {/* Traditional Indian Ethnic Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-200/40 via-yellow-100/50 to-orange-100/60"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-orange-300/30 via-yellow-200/40 to-orange-200/50 animate-gradient-x"></div>
          
          {/* Ethnic Pattern Overlay */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 w-32 h-32 border-2 border-orange-400 rounded-full animate-spin-slow"></div>
            <div className="absolute top-20 right-20 w-20 h-20 border border-yellow-500 rounded-full animate-pulse"></div>
            <div className="absolute bottom-20 left-20 w-24 h-24 border-2 border-orange-300 rotate-45 animate-float"></div>
            <div className="absolute bottom-10 right-10 w-16 h-16 border border-yellow-400 rounded-full animate-twinkle"></div>
          </div>
          
          {/* Sacred Mandala Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96">
              <div className="w-full h-full border-8 border-orange-400 rounded-full animate-spin-slow"></div>
              <div className="absolute inset-8 border-4 border-yellow-500 rounded-full animate-pulse"></div>
              <div className="absolute inset-16 border-2 border-orange-300 rounded-full"></div>
            </div>
          </div>
        </div>
        
        {/* Header and Content Container */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Header />
          
          {/* Hero Content */}
          <div className="flex flex-col min-h-[calc(100vh-120px)] sm:min-h-[calc(100vh-100px)] pt-20 sm:pt-24 lg:pt-28">
            <div className="flex-1 flex items-center py-8 sm:py-12 lg:py-0">
              <div className="w-full max-w-4xl mx-auto text-center">
                <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                  {/* Sacred Om Symbol */}
                  <div className="mb-8 relative flex justify-center">
                    <div className="p-8 rounded-full bg-white/20 backdrop-blur-lg border-2 border-orange-300/40 relative overflow-hidden group shadow-lg">
                      <div className="absolute inset-0 bg-gradient-to-br from-orange-200/20 to-yellow-200/20 rounded-full group-hover:scale-110 transition-transform duration-500"></div>
                      <div className="text-6xl text-orange-600 relative z-10 animate-float font-bold" style={{fontFamily: 'serif'}}>ॐ</div>
                      {/* Subtle glow effect */}
                      <div className="absolute inset-0 bg-orange-300/10 rounded-full blur-xl group-hover:bg-orange-300/20 transition-all duration-500"></div>
                    </div>
                  </div>
                  
                  {/* Sacred Heading with Sanskrit Elements */}
                  <h1 className="text-[48px] sm:text-[56px] md:text-[64px] lg:text-[72px] font-bold leading-[56px] sm:leading-[64px] md:leading-[72px] lg:leading-[80px] font-['Philosopher'] mb-8">
                    <span className="bg-gradient-to-r from-orange-700 via-orange-600 to-yellow-600 bg-clip-text text-transparent">
                      ज्योतिष की
                    </span>
                    <br />
                    <span className="bg-gradient-to-r from-orange-600 via-yellow-600 to-orange-700 bg-clip-text text-transparent">
                      Divine Guidance
                    </span>
                  </h1>
                  
                  <p className="text-[18px] sm:text-[20px] md:text-[22px] font-normal leading-[28px] sm:leading-[30px] md:leading-[32px] font-['Lato'] max-w-4xl mb-10 text-gray-700 mx-auto">
                    Sacred astrological wisdom rooted in ancient Vedic traditions. Discover your cosmic path through divine horoscope readings
                  </p>
                  
                  {/* Enhanced Traditional CTA Buttons */}
                  <div className="flex flex-col sm:flex-row gap-6 justify-center">
                    <button className="group relative px-10 py-4 bg-gradient-to-r from-orange-400 to-yellow-400 text-white font-bold text-lg rounded-full overflow-hidden transition-all duration-500 hover:scale-105 shadow-lg hover:shadow-xl">
                      <span className="relative z-10 flex items-center justify-center gap-3">
                        <div className="text-xl">🔯</div>
                        Get Horoscope
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-yellow-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </button>
                    
                    <button className="group relative px-10 py-4 bg-white/80 backdrop-blur-sm text-orange-600 font-bold text-lg rounded-full border-2 border-orange-300 hover:border-orange-400 transition-all duration-500 hover:scale-105 shadow-md hover:shadow-lg">
                      <span className="relative z-10 flex items-center justify-center gap-3">
                        <div className="text-xl">📚</div>
                        Learn More
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Revolutionary Zodiac Grid Section */}
      <section className="relative w-full py-[100px] sm:py-[110px] md:py-[120px] px-[42px] sm:px-[49px] md:px-[56px]">
        <div className="w-full max-w-[1440px] mx-auto">
          {/* Enhanced Section Header */}
          <div className={`text-center mb-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="mb-8">
              <span className="inline-block px-6 py-2 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 rounded-full text-sm font-semibold mb-4">
                ✨ Discover Your Path
              </span>
            </div>
            <h2 className="text-[48px] sm:text-[56px] md:text-[64px] lg:text-[72px] font-bold leading-[56px] sm:leading-[64px] md:leading-[72px] lg:leading-[80px] text-gray-800 font-['Philosopher'] mb-8">
              <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Choose Your
              </span>
              <br />
              <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Zodiac Sign
              </span>
            </h2>
            <div className="w-32 h-1.5 bg-gradient-to-r from-purple-500 via-blue-500 to-indigo-500 mx-auto mb-8 rounded-full"></div>
            <p className="text-[18px] sm:text-[20px] md:text-[22px] font-normal leading-[28px] sm:leading-[30px] md:leading-[32px] text-gray-600 font-['Lato'] max-w-4xl mx-auto">
              Embark on a celestial journey of self-discovery. Select your zodiac sign to unlock personalized cosmic insights, 
              daily guidance, and profound astrological wisdom crafted specifically for your stellar path.
            </p>
          </div>

          {/* Enhanced Element Filter */}
          <div className={`flex justify-center mb-16 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="relative">
              <div className="flex bg-white/80 backdrop-blur-lg rounded-2xl p-3 shadow-2xl border border-white/20 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400/10 via-blue-400/10 to-indigo-400/10 animate-gradient-x"></div>
                {elements.map((element, index) => (
                  <button
                    key={element}
                    onClick={() => setSelectedElement(element)}
                    className={`relative px-8 py-4 rounded-xl text-sm font-bold transition-all duration-500 transform hover:scale-105 ${
                      selectedElement === element
                        ? 'bg-gradient-to-r from-purple-500 via-blue-500 to-indigo-500 text-white shadow-lg scale-105'
                        : 'text-gray-600 hover:text-purple-600 hover:bg-white/50'
                    }`}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      {element === 'All' && '🌟'}
                      {element === 'Fire' && '🔥'}
                      {element === 'Earth' && '🌍'}
                      {element === 'Air' && '💨'}
                      {element === 'Water' && '💧'}
                      {element}
                    </span>
                    {selectedElement === element && (
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-600/20 to-blue-600/20 animate-pulse"></div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Revolutionary Zodiac Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
            {filteredData.map((zodiac, index) => (
              <div
                key={zodiac.id}
                onClick={() => handleZodiacClick(zodiac.id)}
                onMouseEnter={() => setHoveredCard(zodiac.id)}
                onMouseLeave={() => setHoveredCard(null)}
                className={`group relative cursor-pointer transform transition-all duration-700 hover:scale-110 hover:-translate-y-4 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}
                style={{ 
                  animationDelay: `${600 + index * 150}ms`,
                  transformStyle: 'preserve-3d'
                }}
              >
                {/* Main Card Container */}
                <div className="relative bg-white/90 backdrop-blur-lg rounded-3xl p-8 shadow-2xl hover:shadow-purple-500/25 transition-all duration-700 border border-white/50 overflow-hidden group-hover:bg-white">
                  
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
                    {/* Revolutionary Icon Design */}
                    <div className="relative mb-8 flex justify-center">
                      <div className="relative">
                        {/* Outer rotating ring */}
                        <div className={`absolute inset-0 w-24 h-24 rounded-full border-4 border-gradient-to-r ${zodiac.color} opacity-0 group-hover:opacity-100 group-hover:rotate-180 transition-all duration-1000`}></div>
                        
                        {/* Middle pulsing ring */}
                        <div className={`absolute inset-2 w-20 h-20 rounded-full bg-gradient-to-r ${zodiac.color} opacity-20 group-hover:scale-110 transition-all duration-500 animate-pulse`}></div>
                        
                        {/* Icon container */}
                        <div className={`relative w-24 h-24 rounded-full bg-gradient-to-br ${zodiac.color} p-1 shadow-2xl group-hover:shadow-purple-500/50 transition-all duration-500 group-hover:rotate-12`}>
                          <div className="w-full h-full bg-white rounded-full flex items-center justify-center group-hover:bg-gray-50 transition-all duration-300 relative overflow-hidden">
                            <Image
                              src={zodiac.icon}
                              alt={zodiac.name}
                              width={48}
                              height={48}
                              className="w-12 h-12 group-hover:scale-125 transition-transform duration-500 relative z-10"
                            />
                            {/* Icon glow effect */}
                            <div className={`absolute inset-0 bg-gradient-to-r ${zodiac.color} opacity-0 group-hover:opacity-20 transition-opacity duration-500 rounded-full`}></div>
                          </div>
                        </div>
                        
                        {/* Outer glow */}
                        <div className={`absolute -inset-4 rounded-full bg-gradient-to-r ${zodiac.color} opacity-0 group-hover:opacity-30 blur-xl transition-all duration-700`}></div>
                      </div>
                    </div>

                    {/* Enhanced Zodiac Info */}
                    <h3 className="text-[26px] sm:text-[28px] font-bold text-gray-800 font-['Philosopher'] mb-3 group-hover:text-purple-700 transition-colors duration-300 transform group-hover:scale-105">
                      {zodiac.name}
                    </h3>
                    
                    <p className="text-[15px] text-gray-500 font-['Lato'] mb-2 font-semibold">
                      {zodiac.dateRange}
                    </p>
                    
                    <p className="text-[14px] text-gray-600 font-['Lato'] mb-6 leading-relaxed px-2">
                      {zodiac.description}
                    </p>

                    {/* Enhanced Element Badge */}
                    <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-bold bg-gradient-to-r ${zodiac.color} text-white shadow-lg group-hover:shadow-xl transition-all duration-300 transform group-hover:scale-105`}>
                      <span className="mr-2 text-lg">
                        {zodiac.element === 'Fire' && '🔥'}
                        {zodiac.element === 'Earth' && '🌍'}
                        {zodiac.element === 'Air' && '💨'}
                        {zodiac.element === 'Water' && '💧'}
                      </span>
                      {zodiac.element} Element
                    </div>

                    {/* Interactive Hover Action */}
                    <div className="mt-8 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-6 group-hover:translate-y-0">
                      <button className={`w-full py-3 px-6 bg-gradient-to-r ${zodiac.color} text-white font-bold rounded-2xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 relative overflow-hidden`}>
                        <span className="relative z-10 flex items-center justify-center gap-2">
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                          </svg>
                          Read Your Horoscope
                        </span>
                        <div className="absolute inset-0 bg-white opacity-0 hover:opacity-20 transition-opacity duration-300"></div>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Advanced Glow Effects */}
                <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${zodiac.color} opacity-0 group-hover:opacity-25 blur-2xl transition-all duration-700 -z-10 scale-90 group-hover:scale-100`}></div>
                <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${zodiac.color} opacity-0 group-hover:opacity-10 blur-3xl transition-all duration-1000 -z-20 scale-75 group-hover:scale-110`}></div>
              </div>
            ))}
          </div>
          
          {/* Cosmic Decoration */}
          <div className="flex justify-center mt-20">
            <div className="flex items-center gap-4 text-gray-400">
              <div className="w-16 h-0.5 bg-gradient-to-r from-purple-300 to-transparent"></div>
              <svg className="w-8 h-8 text-purple-400 animate-spin-slow" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
              <div className="w-16 h-0.5 bg-gradient-to-l from-purple-300 to-transparent"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Premium Astrologers Section */}
      <section className="relative w-full py-[100px] sm:py-[110px] md:py-[120px] px-[42px] sm:px-[49px] md:px-[56px] bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 overflow-hidden">
        {/* Background Decoration */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
          <div className="absolute bottom-20 right-10 w-64 h-64 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>
        
        <div className="relative w-full max-w-[1440px] mx-auto">
          <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="mb-6">
              <span className="inline-block px-6 py-2 bg-white/80 text-purple-700 rounded-full text-sm font-semibold mb-4 backdrop-blur-sm border border-purple-200">
                🏭 Expert Guidance
              </span>
            </div>
            <h2 className="text-[42px] sm:text-[48px] md:text-[56px] font-bold leading-[48px] sm:leading-[54px] md:leading-[64px] text-gray-800 font-['Philosopher'] mb-6">
              <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                Meet Our Expert
              </span>
              <br />
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Astrologers
              </span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-indigo-500 mx-auto mb-6 rounded-full"></div>
            <p className="text-[16px] sm:text-[18px] md:text-[20px] font-normal leading-[26px] sm:leading-[28px] md:leading-[30px] text-gray-600 font-['Lato'] max-w-3xl mx-auto">
              Connect with our certified astrologers for personalized readings and profound cosmic insights
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {astrologers.map((astrologer, index) => (
              <div
                key={astrologer.id}
                onMouseEnter={() => setActiveAstrologer(astrologer.id)}
                onMouseLeave={() => setActiveAstrologer(null)}
                className={`group relative bg-white/90 backdrop-blur-lg rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-700 border border-white/50 overflow-hidden transform hover:scale-105 hover:-translate-y-2 cursor-pointer ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
                }`}
                style={{ animationDelay: `${800 + index * 200}ms` }}
              >
                {/* Background Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-400/10 via-blue-400/10 to-indigo-400/10 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                
                {/* Profile Image Section */}
                <div className="relative h-56 overflow-hidden rounded-t-3xl">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-400 via-blue-400 to-indigo-400 opacity-80"></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  
                  {/* Floating Elements */}
                  <div className="absolute inset-0">
                    {[...Array(8)].map((_, i) => (
                      <div
                        key={i}
                        className={`absolute w-2 h-2 bg-white/60 rounded-full transition-all duration-1000 ${
                          activeAstrologer === astrologer.id ? 'opacity-100' : 'opacity-0'
                        }`}
                        style={{
                          top: `${15 + (i * 10)}%`,
                          left: `${10 + (i * 8)}%`,
                          animationDelay: `${i * 150}ms`,
                          animation: activeAstrologer === astrologer.id ? 'twinkle 2s ease-in-out infinite' : 'none'
                        }}
                      ></div>
                    ))}
                  </div>
                  
                  {/* Profile Avatar */}
                  <div className="relative z-10 h-full flex items-center justify-center">
                    <div className="relative">
                      <div className="w-32 h-32 bg-white/90 rounded-full flex items-center justify-center shadow-2xl group-hover:shadow-purple-500/25 transition-all duration-500 border-4 border-white/50">
                        <div className="w-28 h-28 bg-gradient-to-br from-purple-500 via-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white text-3xl font-bold group-hover:scale-110 transition-transform duration-500">
                          {astrologer.name.split(' ').map(name => name[0]).join('')}
                        </div>
                      </div>
                      {/* Floating Ring */}
                      <div className="absolute inset-0 w-32 h-32 rounded-full border-2 border-white/50 opacity-0 group-hover:opacity-100 group-hover:scale-125 transition-all duration-700"></div>
                    </div>
                  </div>
                  
                  {/* Rating Badge */}
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 shadow-lg">
                    <div className="flex items-center gap-1">
                      <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                      </svg>
                      <span className="text-sm font-bold text-gray-800">{astrologer.rating}</span>
                    </div>
                  </div>
                </div>
                
                {/* Content Section */}
                <div className="relative p-8">
                  <div className="text-center">
                    <h3 className="text-[20px] sm:text-[22px] font-bold text-gray-800 font-['Philosopher'] mb-3 group-hover:text-purple-700 transition-colors duration-300">
                      {astrologer.name}
                    </h3>
                    
                    {/* Specialization */}
                    <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700 rounded-full text-sm font-semibold mb-4 group-hover:from-purple-200 group-hover:to-blue-200 transition-all duration-300">
                      <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                      </svg>
                      {astrologer.specialization}
                    </div>
                    
                    {/* Stats */}
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600 font-medium">Experience:</span>
                        <span className="text-purple-600 font-bold">{astrologer.experience}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600 font-medium">Consultations:</span>
                        <span className="text-indigo-600 font-bold">{astrologer.consultations}</span>
                      </div>
                    </div>
                    
                    {/* CTA Button */}
                    <button className="w-full bg-gradient-to-r from-purple-500 via-blue-500 to-indigo-500 text-white py-3 px-6 rounded-2xl text-[15px] font-bold hover:from-purple-600 hover:via-blue-600 hover:to-indigo-600 transition-all duration-500 transform hover:scale-105 shadow-lg hover:shadow-xl relative overflow-hidden group/btn">
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        <svg className="w-5 h-5 group-hover/btn:rotate-12 transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                        </svg>
                        Consult Now
                      </span>
                      <div className="absolute inset-0 bg-white opacity-0 group-hover/btn:opacity-10 transition-opacity duration-300"></div>
                    </button>
                  </div>
                </div>
                
                {/* Hover Glow Effect */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-purple-400/20 via-blue-400/20 to-indigo-400/20 opacity-0 group-hover:opacity-100 blur-xl transition-all duration-700 -z-10"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Understanding Section */}
      <section className="relative w-full py-[100px] sm:py-[110px] md:py-[120px] px-[42px] sm:px-[49px] md:px-[56px] bg-gradient-to-br from-white via-purple-50/30 to-blue-50/30">
        <div className="w-full max-w-[1440px] mx-auto">
          <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="mb-6">
              <span className="inline-block px-6 py-2 bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700 rounded-full text-sm font-semibold mb-4">
                📜 Ancient Wisdom
              </span>
            </div>
            <h2 className="text-[42px] sm:text-[48px] md:text-[56px] font-bold leading-[48px] sm:leading-[54px] md:leading-[64px] text-gray-800 font-['Philosopher'] mb-8">
              <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Understanding the Art of
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Astrology & Horoscopes
              </span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto mb-8 rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Content Side */}
            <div className={`space-y-8 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
              <div className="space-y-6 text-[16px] sm:text-[17px] md:text-[18px] font-normal leading-[28px] sm:leading-[30px] md:leading-[32px] text-gray-700 font-['Lato']">
                <p className="relative pl-6">
                  <span className="absolute left-0 top-1 w-2 h-2 bg-purple-500 rounded-full"></span>
                  Horoscopes represent a fascinating blend of <strong className="text-purple-600">ancient wisdom and cosmic science</strong>, offering profound insights into personality traits, life patterns, and future possibilities through celestial observations.
                </p>
                <p className="relative pl-6">
                  <span className="absolute left-0 top-1 w-2 h-2 bg-blue-500 rounded-full"></span>
                  The practice of astrology has flourished across <strong className="text-blue-600">diverse civilizations for millennia</strong>, from Babylonian astronomers to Vedic scholars, each contributing unique perspectives to our understanding of cosmic influences.
                </p>
                <p className="relative pl-6">
                  <span className="absolute left-0 top-1 w-2 h-2 bg-indigo-500 rounded-full"></span>
                  Modern horoscope readings combine <strong className="text-indigo-600">traditional astrological principles with contemporary insights</strong>, providing practical guidance for daily decisions, relationship dynamics, and personal growth.
                </p>
              </div>
              
              {/* Features Grid */}
              <div className="grid grid-cols-2 gap-6 mt-12">
                {[
                  { icon: '🌟', title: 'Daily Insights', desc: 'Personalized daily guidance' },
                  { icon: '🔮', title: 'Future Predictions', desc: 'Cosmic trend analysis' },
                  { icon: '🧠', title: 'Personality Mapping', desc: 'Deep character insights' },
                  { icon: '💕', title: 'Relationship Guide', desc: 'Compatibility analysis' }
                ].map((feature, index) => (
                  <div key={index} className="group p-6 bg-white/70 backdrop-blur-sm rounded-2xl border border-purple-100 hover:border-purple-300 transition-all duration-300 hover:shadow-lg transform hover:scale-105">
                    <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">{feature.icon}</div>
                    <h4 className="text-[16px] font-bold text-gray-800 mb-2 font-['Philosopher']">{feature.title}</h4>
                    <p className="text-[13px] text-gray-600">{feature.desc}</p>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Visual Side */}
            <div className={`relative transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
              <div className="relative p-8">
                {/* Central Cosmic Circle */}
                <div className="relative w-80 h-80 mx-auto">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-400 via-blue-400 to-indigo-400 rounded-full opacity-20 animate-pulse"></div>
                  <div className="absolute inset-4 bg-gradient-to-tr from-purple-300 via-blue-300 to-indigo-300 rounded-full opacity-30 animate-spin-slow"></div>
                  <div className="absolute inset-8 bg-gradient-to-bl from-purple-200 via-blue-200 to-indigo-200 rounded-full opacity-40"></div>
                  
                  {/* Zodiac Icons Around Circle */}
                  {horoscopeData.slice(0, 8).map((zodiac, index) => {
                    const angle = (index * 45) * (Math.PI / 180);
                    const radius = 140;
                    const x = Math.cos(angle) * radius;
                    const y = Math.sin(angle) * radius;
                    
                    return (
                      <div
                        key={zodiac.id}
                        className="absolute w-12 h-12 transform -translate-x-6 -translate-y-6 animate-float"
                        style={{
                          left: `50%`,
                          top: `50%`,
                          marginLeft: `${x}px`,
                          marginTop: `${y}px`,
                          animationDelay: `${index * 0.5}s`
                        }}
                      >
                        <div className={`w-full h-full bg-gradient-to-br ${zodiac.color} rounded-full p-2 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110`}>
                          <div className="w-full h-full bg-white rounded-full flex items-center justify-center">
                            <Image
                              src={zodiac.icon}
                              alt={zodiac.name}
                              width={20}
                              height={20}
                              className="w-5 h-5"
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  
                  {/* Center Content */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center mb-4 mx-auto shadow-2xl">
                        <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                        </svg>
                      </div>
                      <h4 className="text-lg font-bold text-gray-800 font-['Philosopher']">Cosmic Wisdom</h4>
                      <p className="text-sm text-gray-600">Ancient & Modern</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive FAQ Section */}
      <section className="relative w-full py-[100px] sm:py-[110px] md:py-[120px] px-[42px] sm:px-[49px] md:px-[56px] bg-gradient-to-br from-slate-50 via-purple-50/50 to-blue-50/50 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-10 right-10 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute bottom-10 left-10 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>
        
        <div className="relative w-full max-w-[1440px] mx-auto">
          <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="mb-6">
              <span className="inline-block px-6 py-2 bg-white/80 text-purple-700 rounded-full text-sm font-semibold mb-4 backdrop-blur-sm border border-purple-200">
                ❓ Common Questions
              </span>
            </div>
            <h2 className="text-[42px] sm:text-[48px] md:text-[56px] font-bold leading-[48px] sm:leading-[54px] md:leading-[64px] text-gray-800 font-['Philosopher'] mb-6">
              <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Frequently Asked
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Questions
              </span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto mb-6 rounded-full"></div>
            <p className="text-[16px] sm:text-[18px] md:text-[20px] font-normal leading-[26px] sm:leading-[28px] md:leading-[30px] text-gray-600 font-['Lato'] max-w-3xl mx-auto">
              Get answers to the most common questions about astrology and horoscope readings
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto space-y-6">
            {[
              {
                question: "What Is The Difference Between Sun Sign And Moon Sign?",
                answer: "Your Sun sign represents your core personality, ego, and life purpose - it's determined by your birth date. Your Moon sign reflects your emotional nature, instincts, and subconscious patterns - it's based on the moon's position at your birth time. Both are equally important for a complete astrological understanding.",
                icon: "☀️"
              },
              {
                question: "Which Sign Is The Best For The 2025 Horoscope?",
                answer: "Each zodiac sign has unique opportunities in 2025. Rather than one 'best' sign, different signs will excel in different areas - some in career advancement, others in relationships or personal growth. Your individual birth chart provides the most accurate guidance for your specific journey.",
                icon: "🎆"
              },
              {
                question: "Which Is The Luckiest Zodiac Sign Of 2025?",
                answer: "Astrological 'luck' is highly personalized and varies throughout the year based on planetary transits, your birth chart, and current life circumstances. Jupiter's position and other planetary movements create different opportunities for each sign at different times.",
                icon: "🍀"
              },
              {
                question: "Should I Trust The 2025 Horoscope?",
                answer: "Horoscopes are best used as guidance tools for self-reflection and awareness rather than absolute predictions. They can help you understand potential energies and timing, but your free will and personal choices ultimately shape your destiny. Use them as cosmic weather forecasts.",
                icon: "🧐"
              },
              {
                question: "Can Horoscopes Help In Preparing For The Future?",
                answer: "Absolutely! Horoscopes can help you identify favorable timing for important decisions, understand potential challenges before they arise, and align your actions with cosmic energies. They're excellent tools for strategic planning and personal development.",
                icon: "🔮"
              }
            ].map((faq, index) => (
              <div
                key={index}
                className={`group relative bg-white/80 backdrop-blur-lg rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-700 border border-white/50 overflow-hidden transform hover:scale-[1.02] ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
                }`}
                style={{ animationDelay: `${1000 + index * 200}ms` }}
              >
                {/* Background Gradient */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400/5 via-blue-400/5 to-indigo-400/5 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                
                <button
                  onClick={() => setExpandedFAQ(expandedFAQ === index ? null : index)}
                  className="relative w-full p-8 text-left transition-all duration-300 group-hover:bg-white/50"
                >
                  <div className="flex items-start gap-6">
                    {/* Icon */}
                    <div className="flex-shrink-0">
                      <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300 shadow-lg">
                        {faq.icon}
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-4">
                        <h3 className="text-[18px] sm:text-[20px] font-bold text-gray-800 font-['Philosopher'] group-hover:text-purple-700 transition-colors duration-300 pr-4">
                          {faq.question}
                        </h3>
                        
                        {/* Expand Icon */}
                        <div className="flex-shrink-0">
                          <div className={`w-8 h-8 bg-gradient-to-r from-purple-100 to-blue-100 rounded-full flex items-center justify-center transition-all duration-300 group-hover:from-purple-200 group-hover:to-blue-200 ${
                            expandedFAQ === index ? 'rotate-180' : ''
                          }`}>
                            <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </div>
                        </div>
                      </div>
                      
                      {/* Answer */}
                      <div className={`transition-all duration-500 overflow-hidden ${
                        expandedFAQ === index ? 'max-h-96 opacity-100 mt-6' : 'max-h-0 opacity-0'
                      }`}>
                        <div className="p-6 bg-gradient-to-r from-purple-50/50 to-blue-50/50 rounded-2xl border border-purple-100/50">
                          <p className="text-[15px] sm:text-[16px] text-gray-700 font-['Lato'] leading-[26px] sm:leading-[28px]">
                            {faq.answer}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </button>
              </div>
            ))}
          </div>
          
          {/* Bottom CTA */}
          <div className={`text-center mt-16 transition-all duration-1000 delay-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="inline-flex items-center gap-4 bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-lg border border-purple-100">
              <div className="text-4xl">💬</div>
              <div className="text-left">
                <h4 className="text-lg font-bold text-gray-800 mb-1 font-['Philosopher']">Still have questions?</h4>
                <p className="text-gray-600 text-sm">Our expert astrologers are here to help</p>
              </div>
              <button className="ml-4 px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white font-bold rounded-xl hover:from-purple-600 hover:to-blue-600 transition-all duration-300 transform hover:scale-105">
                Ask an Expert
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HoroscopePage;