'use client';

import React, { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const AstroWatchPage: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('all');

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const astroEvents = [
    {
      id: 1,
      title: "Full Moon in Scorpio",
      date: "2024-01-25",
      time: "17:54",
      type: "lunar",
      description: "A powerful Full Moon bringing transformation and deep insights",
      significance: "Time for emotional healing and letting go of old patterns",
      color: "from-purple-500 to-indigo-600"
    },
    {
      id: 2,
      title: "Mars in Capricorn",
      date: "2024-01-28",
      time: "06:30",
      type: "planetary",
      description: "Mars enters ambitious Capricorn, bringing focused energy",
      significance: "Excellent time for career advancement and goal setting",
      color: "from-red-500 to-orange-600"
    },
    {
      id: 3,
      title: "Venus Conjunct Jupiter",
      date: "2024-01-30",
      time: "14:22",
      type: "conjunction",
      description: "Beautiful conjunction bringing love and abundance",
      significance: "Favorable for relationships, finances, and spiritual growth",
      color: "from-green-500 to-emerald-600"
    },
    {
      id: 4,
      title: "Mercury Retrograde",
      date: "2024-02-04",
      time: "23:10",
      type: "retrograde",
      description: "Mercury begins its retrograde motion in Aquarius",
      significance: "Time to review, revise, and reconnect with old projects",
      color: "from-yellow-500 to-amber-600"
    },
    {
      id: 5,
      title: "New Moon in Aquarius",
      date: "2024-02-09",
      time: "22:59",
      type: "lunar",
      description: "New Moon bringing innovation and new beginnings",
      significance: "Perfect time for setting intentions and starting fresh",
      color: "from-blue-500 to-cyan-600"
    }
  ];

  const categories = [
    { id: 'all', label: 'All Events', icon: '🌟' },
    { id: 'lunar', label: 'Lunar Events', icon: '🌙' },
    { id: 'planetary', label: 'Planetary', icon: '🪐' },
    { id: 'conjunction', label: 'Conjunctions', icon: '✨' },
    { id: 'retrograde', label: 'Retrogrades', icon: '↩️' }
  ];

  const filteredEvents = selectedFilter === 'all' 
    ? astroEvents 
    : astroEvents.filter(event => event.type === selectedFilter);

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
                <div className="text-6xl text-indigo-600 animate-float font-bold">⏰</div>
                <div className="absolute inset-0 bg-indigo-300/20 rounded-full blur-xl animate-pulse"></div>
              </div>
            </div>
            
            <h1 className="text-[52px] sm:text-[64px] md:text-[72px] font-bold leading-[60px] sm:leading-[72px] md:leading-[80px] font-['Philosopher'] mb-8">
              <span className="bg-gradient-to-r from-indigo-700 via-purple-600 to-blue-800 bg-clip-text text-transparent">
                Astro Watch
              </span>
              <br />
              <span className="bg-gradient-to-r from-purple-600 via-indigo-700 to-blue-600 bg-clip-text text-transparent">
                ज्योतिष पैनल
              </span>
            </h1>
            
            <p className="text-[20px] sm:text-[22px] md:text-[24px] font-normal leading-[32px] sm:leading-[34px] md:leading-[36px] font-['Lato'] max-w-5xl mx-auto text-gray-700 mb-12">
              Stay updated with important celestial events and their spiritual significance.
              <br className="hidden sm:block" />
              Track planetary movements, lunar phases, and cosmic alignments that influence your life.
            </p>
          </div>
        </div>
      </section>

      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-4 mb-12 justify-center">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedFilter(category.id)}
                className={`px-6 py-3 rounded-full text-sm font-bold transition-all duration-300 transform hover:scale-105 ${
                  selectedFilter === category.id
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg'
                    : 'bg-white/80 backdrop-blur-sm text-gray-700 hover:bg-indigo-100 hover:text-indigo-600 shadow-md border border-white/50'
                }`}
              >
                <span className="text-lg mr-2">{category.icon}</span>
                {category.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEvents.map((event, index) => (
              <div
                key={event.id}
                className={`group bg-white/80 backdrop-blur-lg rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all duration-700 border border-white/50 overflow-hidden transform hover:scale-105 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}
                style={{ animationDelay: `${600 + index * 150}ms` }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${event.color} opacity-0 group-hover:opacity-10 transition-all duration-500 rounded-3xl`}></div>
                
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r ${event.color}`}>
                      {event.type.toUpperCase()}
                    </span>
                    <div className="text-right text-sm text-gray-600">
                      <div className="font-bold">{event.date}</div>
                      <div>{event.time}</div>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-800 font-['Philosopher'] mb-3 group-hover:text-indigo-700 transition-colors duration-300">
                    {event.title}
                  </h3>
                  
                  <p className="text-gray-600 font-['Lato'] mb-4 text-sm leading-relaxed">
                    {event.description}
                  </p>
                  
                  <div className="border-t border-gray-200 pt-4">
                    <div className="text-xs font-bold text-gray-500 mb-2">SPIRITUAL SIGNIFICANCE</div>
                    <p className="text-sm text-gray-700 font-medium">
                      {event.significance}
                    </p>
                  </div>
                </div>
                
                <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${event.color} opacity-0 group-hover:opacity-20 blur-xl transition-all duration-700 -z-10`}></div>
              </div>
            ))}
          </div>

          {filteredEvents.length === 0 && (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2 font-['Philosopher']">No events found</h3>
              <p className="text-gray-600">Try selecting a different category to see more events.</p>
            </div>
          )}
        </div>
      </section>

      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-indigo-50/30 to-purple-50/30">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 font-['Philosopher'] mb-12 text-center">
            Understanding Cosmic Events
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: "🌙",
                title: "Lunar Phases",
                description: "New and Full Moons affecting emotions and intuition"
              },
              {
                icon: "🪐",
                title: "Planetary Movements",
                description: "Planet transitions through zodiac signs"
              },
              {
                icon: "✨",
                title: "Conjunctions",
                description: "When planets align in the same zodiac degree"
              },
              {
                icon: "↩️",
                title: "Retrogrades",
                description: "Apparent backward motion bringing reflection"
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
      
      <Footer />
    </div>
  );
};

export default AstroWatchPage;