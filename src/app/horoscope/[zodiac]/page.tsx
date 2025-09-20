'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';

// Comprehensive horoscope data
const horoscopeData = {
  aries: {
    name: "Aries",
    dateRange: "Mar 21 - Apr 19",
    element: "Fire",
    rulingPlanet: "Mars",
    symbol: "The Ram",
    icon: "/images/img_vector_black_900_01.svg",
    luckyNumbers: [1, 8, 17],
    luckyColors: ["Red", "Orange"],
    compatibility: ["Leo", "Sagittarius", "Gemini"],
    traits: {
      positive: ["Courageous", "Determined", "Confident", "Enthusiastic", "Optimistic"],
      negative: ["Impatient", "Aggressive", "Impulsive", "Selfish", "Short-tempered"]
    }
  },
  taurus: {
    name: "Taurus",
    dateRange: "Apr 20 - May 20",
    element: "Earth",
    rulingPlanet: "Venus",
    symbol: "The Bull",
    icon: "/images/img_vector_black_900_01_34x36.svg",
    luckyNumbers: [2, 6, 9],
    luckyColors: ["Green", "Pink"],
    compatibility: ["Virgo", "Capricorn", "Cancer"],
    traits: {
      positive: ["Reliable", "Patient", "Practical", "Devoted", "Stable"],
      negative: ["Stubborn", "Possessive", "Uncompromising", "Materialistic"]
    }
  },
  gemini: {
    name: "Gemini",
    dateRange: "May 21 - Jun 20",
    element: "Air",
    rulingPlanet: "Mercury",
    symbol: "The Twins",
    icon: "/images/img_vector_black_900_01_34x32.svg",
    luckyNumbers: [5, 7, 14],
    luckyColors: ["Yellow", "Silver"],
    compatibility: ["Libra", "Aquarius", "Aries"],
    traits: {
      positive: ["Gentle", "Affectionate", "Curious", "Adaptable", "Quick learner"],
      negative: ["Nervous", "Inconsistent", "Indecisive", "Superficial"]
    }
  },
  cancer: {
    name: "Cancer",
    dateRange: "Jun 21 - Jul 22",
    element: "Water",
    rulingPlanet: "Moon",
    symbol: "The Crab",
    icon: "/images/img_vector_black_900_01_36x26.svg",
    luckyNumbers: [2, 7, 11],
    luckyColors: ["White", "Silver"],
    compatibility: ["Scorpio", "Pisces", "Taurus"],
    traits: {
      positive: ["Tenacious", "Loyal", "Emotional", "Sympathetic", "Protective"],
      negative: ["Moody", "Pessimistic", "Suspicious", "Manipulative"]
    }
  },
  leo: {
    name: "Leo",
    dateRange: "Jul 23 - Aug 22",
    element: "Fire",
    rulingPlanet: "Sun",
    symbol: "The Lion",
    icon: "/images/img_vector_black_900_01_34x40.png",
    luckyNumbers: [1, 3, 10],
    luckyColors: ["Gold", "Orange"],
    compatibility: ["Aries", "Sagittarius", "Gemini"],
    traits: {
      positive: ["Creative", "Passionate", "Generous", "Warm-hearted", "Cheerful"],
      negative: ["Arrogant", "Stubborn", "Self-centered", "Lazy", "Inflexible"]
    }
  },
  virgo: {
    name: "Virgo",
    dateRange: "Aug 23 - Sep 22",
    element: "Earth",
    rulingPlanet: "Mercury",
    symbol: "The Virgin",
    icon: "/images/img_vector_black_900_01_34x26.svg",
    luckyNumbers: [6, 14, 18],
    luckyColors: ["Navy Blue", "Grey"],
    compatibility: ["Taurus", "Capricorn", "Cancer"],
    traits: {
      positive: ["Loyal", "Analytical", "Kind", "Hardworking", "Practical"],
      negative: ["Shyness", "Worry", "Overly critical", "Harsh"]
    }
  },
  libra: {
    name: "Libra",
    dateRange: "Sep 23 - Oct 22",
    element: "Air",
    rulingPlanet: "Venus",
    symbol: "The Scales",
    icon: "/images/img_vector_black_900_01_22x36.svg",
    luckyNumbers: [4, 6, 13],
    luckyColors: ["Blue", "Green"],
    compatibility: ["Gemini", "Aquarius", "Leo"],
    traits: {
      positive: ["Cooperative", "Diplomatic", "Gracious", "Fair-minded", "Social"],
      negative: ["Indecisive", "Avoids confrontations", "Self-pity", "Unreliable"]
    }
  },
  scorpio: {
    name: "Scorpio",
    dateRange: "Oct 23 - Nov 21",
    element: "Water",
    rulingPlanet: "Mars & Pluto",
    symbol: "The Scorpion",
    icon: "/images/img_component_2.png",
    luckyNumbers: [8, 11, 18],
    luckyColors: ["Deep Red", "Black"],
    compatibility: ["Cancer", "Pisces", "Virgo"],
    traits: {
      positive: ["Resourceful", "Brave", "Passionate", "Stubborn", "True friend"],
      negative: ["Distrusting", "Jealous", "Secretive", "Violent"]
    }
  },
  sagittarius: {
    name: "Sagittarius",
    dateRange: "Nov 22 - Dec 21",
    element: "Fire",
    rulingPlanet: "Jupiter",
    symbol: "The Archer",
    icon: "/images/img_vector_black_900_01_34x30.svg",
    luckyNumbers: [3, 9, 22],
    luckyColors: ["Turquoise", "Purple"],
    compatibility: ["Aries", "Leo", "Libra"],
    traits: {
      positive: ["Generous", "Idealistic", "Great sense of humor", "Adventurous"],
      negative: ["Promises more than deliver", "Impatient", "Undiplomatic"]
    }
  },
  capricorn: {
    name: "Capricorn",
    dateRange: "Dec 22 - Jan 19",
    element: "Earth",
    rulingPlanet: "Saturn",
    symbol: "The Goat",
    icon: "/images/img_vector_34x32.svg",
    luckyNumbers: [4, 8, 13],
    luckyColors: ["Brown", "Black"],
    compatibility: ["Taurus", "Virgo", "Scorpio"],
    traits: {
      positive: ["Responsible", "Disciplined", "Self-control", "Good managers"],
      negative: ["Know-it-all", "Unforgiving", "Condescending", "Pessimistic"]
    }
  },
  aquarius: {
    name: "Aquarius",
    dateRange: "Jan 20 - Feb 18",
    element: "Air",
    rulingPlanet: "Saturn & Uranus",
    symbol: "The Water Bearer",
    icon: "/images/img_vector_black_900_01_34x28.svg",
    luckyNumbers: [4, 7, 11],
    luckyColors: ["Light Blue", "Silver"],
    compatibility: ["Gemini", "Libra", "Sagittarius"],
    traits: {
      positive: ["Progressive", "Original", "Independent", "Humanitarian"],
      negative: ["Runs from emotional expression", "Temperamental", "Aloof"]
    }
  },
  pisces: {
    name: "Pisces",
    dateRange: "Feb 19 - Mar 20",
    element: "Water",
    rulingPlanet: "Jupiter & Neptune",
    symbol: "The Fish",
    icon: "/images/img_vector_black_900_01_26x36.svg",
    luckyNumbers: [3, 9, 12],
    luckyColors: ["Sea Green", "Lavender"],
    compatibility: ["Cancer", "Scorpio", "Taurus"],
    traits: {
      positive: ["Compassionate", "Artistic", "Intuitive", "Gentle", "Wise"],
      negative: ["Fearful", "Overly trusting", "Sad", "Desire to escape reality"]
    }
  }
};

// Sample horoscope content for different periods
const horoscopeContent = {
  daily: {
    general: "Today brings new opportunities for growth and self-discovery. Trust your instincts and take calculated risks.",
    love: "Your relationships are highlighted today. Express your feelings openly and honestly with your partner.",
    career: "Professional success is within reach. Focus on your goals and maintain good relationships with colleagues.",
    health: "Pay attention to your physical and mental well-being. Balance work with proper rest and nutrition.",
    finance: "Financial decisions made today will have long-term implications. Be cautious with investments."
  },
  weekly: {
    general: "This week emphasizes personal transformation and new beginnings. Embrace change with confidence.",
    love: "Romantic relationships flourish this week. Single? You might meet someone special at a social gathering.",
    career: "Career advancement opportunities present themselves. Your hard work is finally getting recognition.",
    health: "Focus on maintaining a healthy lifestyle. Regular exercise and proper diet are crucial this week.",
    finance: "Good week for financial planning. Consider consulting with financial advisors for investment strategies."
  },
  monthly: {
    general: "This month brings significant changes in your personal and professional life. Stay adaptable and positive.",
    love: "Love relationships undergo positive transformations. Communication improves significantly with your partner.",
    career: "Professional growth accelerates this month. New projects and responsibilities come your way.",
    health: "Health requires attention this month. Regular check-ups and preventive care are recommended.",
    finance: "Financial stability improves gradually. Avoid major expenses in the first half of the month."
  },
  yearly: {
    general: "2025 is a year of tremendous growth and achievement. Your patience and perseverance will pay off.",
    love: "Relationships reach new levels of understanding and commitment. Wedding bells might ring for some.",
    career: "Career reaches new heights with promotions and recognition. Leadership opportunities await.",
    health: "Overall health remains good with proper care. Focus on preventive measures and regular exercise.",
    finance: "Financial growth is steady throughout the year. Investment decisions prove profitable."
  }
};

const ZodiacDetailPage: React.FC = () => {
  const params = useParams();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'daily' | 'weekly' | 'monthly' | 'yearly'>('daily');
  
  const zodiacId = params?.zodiac as string;
  const zodiacInfo = horoscopeData[zodiacId as keyof typeof horoscopeData];

  if (!zodiacInfo) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4 font-['Philosopher']">Zodiac Sign Not Found</h1>
          <button
            onClick={() => router.push('/horoscope')}
            className="bg-orange-500 text-white px-6 py-2 rounded-full hover:bg-orange-600 transition-colors"
          >
            Back to Horoscope
          </button>
        </div>
      </div>
    );
  }

  const currentContent = horoscopeContent[activeTab];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative w-full py-[80px] sm:py-[100px] md:py-[120px] mt-20">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-orange-500">
          <div className="absolute inset-0 bg-black/20"></div>
        </div>
        <div className="relative z-10 w-full max-w-[1440px] mx-auto px-[42px] sm:px-[49px] md:px-[56px]">
          <div className="flex flex-col lg:flex-row items-center gap-8">
            <div className="flex-1 text-center lg:text-left text-white">
              <div className="flex items-center justify-center lg:justify-start gap-4 mb-6">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg">
                  <Image
                    src={zodiacInfo.icon}
                    alt={zodiacInfo.name}
                    width={32}
                    height={32}
                    className="w-8 h-8"
                  />
                </div>
                <div>
                  <h1 className="text-[42px] sm:text-[48px] md:text-[56px] font-bold leading-[48px] sm:leading-[54px] md:leading-[64px] font-['Philosopher']">
                    {zodiacInfo.name}
                  </h1>
                  <p className="text-[18px] sm:text-[20px] font-normal opacity-90 font-['Lato']">
                    {zodiacInfo.dateRange}
                  </p>
                </div>
              </div>
              <p className="text-[16px] sm:text-[18px] font-normal leading-[24px] sm:leading-[26px] font-['Lato'] opacity-90 max-w-2xl">
                Discover what the stars have in store for {zodiacInfo.name}. Get personalized insights about your personality, relationships, career, and future predictions.
              </p>
            </div>
            <div className="lg:w-2/5">
              <div className="bg-white/10 backdrop-blur-md rounded-[20px] p-6 border border-white/20">
                <h3 className="text-[20px] font-bold text-white font-['Philosopher'] mb-4">Quick Facts</h3>
                <div className="space-y-3 text-white/90">
                  <div className="flex justify-between">
                    <span className="font-medium">Element:</span>
                    <span>{zodiacInfo.element}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Ruling Planet:</span>
                    <span>{zodiacInfo.rulingPlanet}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Symbol:</span>
                    <span>{zodiacInfo.symbol}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Lucky Colors:</span>
                    <span>{zodiacInfo.luckyColors.join(', ')}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <section className="w-full py-8 px-[42px] sm:px-[49px] md:px-[56px] bg-gray-50">
        <div className="w-full max-w-[1440px] mx-auto">
          <div className="flex justify-center">
            <div className="flex bg-white rounded-full p-2 shadow-lg border border-gray-200">
              {['daily', 'weekly', 'monthly', 'yearly'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab as any)}
                  className={`px-6 py-3 rounded-full text-sm font-medium uppercase font-['Work_Sans'] transition-all duration-300 ${
                    activeTab === tab
                      ? 'bg-gradient-to-r from-orange-400 to-orange-500 text-white shadow-md'
                      : 'text-gray-600 hover:text-orange-500'
                  }`}
                >
                  {tab} Horoscope
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Horoscope Content */}
      <section className="w-full py-[70px] sm:py-[80px] md:py-[90px] px-[42px] sm:px-[49px] md:px-[56px]">
        <div className="w-full max-w-[1440px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Horoscope Content */}
            <div className="lg:col-span-2">
              <h2 className="text-[28px] sm:text-[32px] md:text-[36px] font-bold leading-[32px] sm:leading-[36px] md:leading-[40px] text-[#111111] font-['Philosopher'] mb-8 capitalize">
                {activeTab} Horoscope for {zodiacInfo.name}
              </h2>
              
              <div className="space-y-6">
                {Object.entries(currentContent).map(([category, content]) => (
                  <div key={category} className="bg-white border border-gray-200 rounded-[15px] p-6 shadow-sm">
                    <h3 className="text-[20px] font-bold text-orange-600 font-['Philosopher'] mb-3 capitalize flex items-center gap-2">
                      {category === 'general' && '🌟'}
                      {category === 'love' && '💖'}
                      {category === 'career' && '💼'}
                      {category === 'health' && '🌿'}
                      {category === 'finance' && '💰'}
                      {category}
                    </h3>
                    <p className="text-[14px] sm:text-[15px] md:text-[16px] font-normal leading-[24px] sm:leading-[26px] md:leading-[28px] text-[#6d6d6d] font-['Lato']">
                      {content}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Personality Traits */}
              <div className="bg-white border border-gray-200 rounded-[15px] p-6 shadow-sm">
                <h3 className="text-[20px] font-bold text-[#111111] font-['Philosopher'] mb-4">Personality Traits</h3>
                
                <div className="mb-4">
                  <h4 className="text-[16px] font-semibold text-green-600 mb-2 font-['Philosopher']">Positive Traits</h4>
                  <div className="flex flex-wrap gap-2">
                    {zodiacInfo.traits.positive.map((trait, index) => (
                      <span key={index} className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                        {trait}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="text-[16px] font-semibold text-red-600 mb-2 font-['Philosopher']">Areas to Work On</h4>
                  <div className="flex flex-wrap gap-2">
                    {zodiacInfo.traits.negative.map((trait, index) => (
                      <span key={index} className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm">
                        {trait}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Compatibility */}
              <div className="bg-white border border-gray-200 rounded-[15px] p-6 shadow-sm">
                <h3 className="text-[20px] font-bold text-[#111111] font-['Philosopher'] mb-4">Compatible Signs</h3>
                <div className="space-y-2">
                  {zodiacInfo.compatibility.map((sign, index) => (
                    <div key={index} className="flex items-center gap-3 p-2 bg-orange-50 rounded-lg">
                      <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                        <span className="text-orange-600 text-xs font-bold">
                          {sign.charAt(0)}
                        </span>
                      </div>
                      <span className="text-[14px] font-medium text-gray-700">{sign}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Lucky Numbers */}
              <div className="bg-white border border-gray-200 rounded-[15px] p-6 shadow-sm">
                <h3 className="text-[20px] font-bold text-[#111111] font-['Philosopher'] mb-4">Lucky Numbers</h3>
                <div className="flex gap-3">
                  {zodiacInfo.luckyNumbers.map((number, index) => (
                    <div key={index} className="w-12 h-12 bg-gradient-to-r from-orange-400 to-orange-500 text-white rounded-full flex items-center justify-center font-bold">
                      {number}
                    </div>
                  ))}
                </div>
              </div>

              {/* Back to All Horoscopes */}
              <button
                onClick={() => router.push('/horoscope')}
                className="w-full bg-gradient-to-r from-orange-400 to-orange-500 text-white py-3 px-6 rounded-full text-[16px] font-medium hover:from-orange-500 hover:to-orange-600 transition-all duration-300 font-['Work_Sans']"
              >
                View All Horoscopes
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ZodiacDetailPage;