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



const HoroscopePage: React.FC = () => {
  const router = useRouter();
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [selectedElement, setSelectedElement] = useState<string>('All');
  const [isVisible, setIsVisible] = useState(false);
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);

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
      
      <Header />

      {/* Revolutionary Zodiac Grid Section */}
      <section className="relative w-full py-[100px] sm:py-[110px] md:py-[120px] px-[42px] sm:px-[49px] md:px-[56px]">
        <div className="w-full max-w-[1440px] mx-auto">
          {/* Enhanced Section Header */}
          <div className={`text-center mb-10 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="mb-8">
              <span className="inline-block px-6 py-2 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 rounded-full text-sm font-semibold mb-4">
                ✨ Discover Your Path
              </span>
            </div>
            <h2 className="text-[48px] sm:text-[56px] md:text-[64px] lg:text-[72px] font-bold leading-[56px] sm:leading-[64px] md:leading-[72px] lg:leading-[80px] text-gray-800  mb-8">
              <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Check Your Zodiac
              </span>
              
            </h2>
            <div className="w-32 h-1.5 bg-gradient-to-r from-purple-500 via-blue-500 to-indigo-500 mx-auto mb-8 rounded-full"></div>
            <p className="text-[18px] sm:text-[20px] md:text-[22px] font-normal leading-[28px] sm:leading-[30px] md:leading-[32px] text-gray-600  max-w-5xl mx-auto">
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
                    className={`relative px-6 py-3 sm:px-8 sm:py-4 rounded-xl text-sm font-bold transition-all duration-500 transform hover:scale-105 ${
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
                    <h3 className="text-[26px] sm:text-[28px] font-bold text-gray-800  mb-3 group-hover:text-purple-700 transition-colors duration-300 transform group-hover:scale-105">
                      {zodiac.name}
                    </h3>
                    
                    {/* <p className="text-[15px] text-gray-500  mb-2 font-semibold">
                      {zodiac.dateRange}
                    </p> */}
                    
                    <p className="text-[14px] text-gray-600  mb-6 leading-relaxed px-2">
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
                    <div className="mt-8 ">
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

    

      {/* Enhanced Understanding Section */}
    
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
            <h2 className="text-[42px] sm:text-[48px] md:text-[56px] font-bold leading-[48px] sm:leading-[54px] md:leading-[64px] text-gray-800  mb-6">
              <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Frequently Asked
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Questions
              </span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto mb-6 rounded-full"></div>
            <p className="text-[16px] sm:text-[18px] md:text-[20px] font-normal leading-[26px] sm:leading-[28px] md:leading-[30px] text-gray-600  max-w-3xl mx-auto">
              Get answers to the most common questions about astrology and horoscope readings
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto space-y-6">
            {[{
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
                        <h3 className="text-[18px] sm:text-[20px] font-bold text-gray-800  group-hover:text-purple-700 transition-colors duration-300 pr-4">
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
                          <p className="text-[15px] sm:text-[16px] text-gray-700  leading-[26px] sm:leading-[28px]">
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
                <h4 className="text-lg font-bold text-gray-800 mb-1 ">Still have questions?</h4>
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
