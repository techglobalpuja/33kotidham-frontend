'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import '../../styles/horoscope-animations.css';

const MeetupsPage: React.FC = () => {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);

  // Animation trigger on component mount
  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleBackToHome = () => {
    router.push('/');
  };

  // Upcoming meetups data
  const upcomingMeetups = [
    {
      id: 1,
      title: "Vedic Astrology Workshop",
      date: "December 20, 2024",
      time: "6:00 PM - 8:00 PM",
      location: "Online via Zoom",
      description: "Learn the fundamentals of Vedic astrology and how to interpret birth charts",
      image: "/images/img__4.png",
      attendees: "128",
      category: "Astrology",
      color: "from-purple-400 to-indigo-500"
    },
    {
      id: 2,
      title: "Group Meditation & Mantra Chanting",
      date: "December 22, 2024",
      time: "7:00 AM - 8:30 AM",
      location: "Ashram Grounds, Rishikesh",
      description: "Experience the power of collective meditation and sacred mantra chanting",
      image: "/images/img__4.png",
      attendees: "85",
      category: "Spirituality",
      color: "from-orange-400 to-red-500"
    },
    {
      id: 3,
      title: "Numerology & Life Path Numbers",
      date: "December 25, 2024",
      time: "4:00 PM - 5:30 PM",
      location: "Online via Zoom",
      description: "Discover your life path number and its significance in your spiritual journey",
      image: "/images/img__4.png",
      attendees: "96",
      category: "Numerology",
      color: "from-blue-400 to-cyan-500"
    },
    {
      id: 4,
      title: "Gemstone Healing & Remedies",
      date: "December 28, 2024",
      time: "3:00 PM - 5:00 PM",
      location: "Spiritual Center, Mumbai",
      description: "Learn about auspicious gemstones and their healing properties",
      image: "/images/img__4.png",
      attendees: "72",
      category: "Healing",
      color: "from-emerald-400 to-green-500"
    }
  ];

  // Meetup benefits
  const benefits = [
    {
      title: "Real Connection",
      description: "Meet fellow spiritual seekers in person and build meaningful relationships",
      icon: "🤝"
    },
    {
      title: "Experiential Learning",
      description: "Participate in hands-on workshops and guided spiritual practices",
      icon: "🎯"
    },
    {
      title: "Cultural Exchange",
      description: "Experience diverse spiritual traditions from different regions and communities",
      icon: "🌍"
    },
    {
      title: "Collective Energy",
      description: "Benefit from the powerful energy of group spiritual practices",
      icon: "⚡"
    }
  ];

  // Testimonials
  const testimonials = [
    {
      id: 1,
      name: "Priya Sharma",
      text: "The group meditation meetup was transformative. The collective energy was incredible!",
      role: "Spiritual Seeker"
    },
    {
      id: 2,
      name: "Rajesh Kumar",
      text: "Learned so much from the Vedic astrology workshop. The expert guidance was invaluable.",
      role: "Astrology Student"
    },
    {
      id: 3,
      name: "Anjali Patel",
      text: "Meeting like-minded souls at the gemstone healing session was truly enriching.",
      role: "Holistic Practitioner"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50/30 via-yellow-50/40 to-orange-50/30 relative overflow-hidden">
      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-amber-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-yellow-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-orange-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
        <div className="absolute bottom-20 right-20 w-72 h-72 bg-amber-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-6000"></div>
      </div>

      <Header />
      
      {/* Hero Section */}
      <section className="relative w-full min-h-screen pt-20 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Traditional Indian Ethnic Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-100/40 via-yellow-50/50 to-orange-100/60"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-amber-200/30 via-yellow-100/40 to-orange-200/50 animate-gradient-x"></div>
          
          {/* Ethnic Pattern Overlay */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 w-32 h-32 border-2 border-amber-400 rounded-full animate-spin-slow"></div>
            <div className="absolute top-20 right-20 w-20 h-20 border border-yellow-500 rounded-full animate-pulse"></div>
            <div className="absolute bottom-20 left-20 w-24 h-24 border-2 border-orange-300 rotate-45 animate-float"></div>
            <div className="absolute bottom-10 right-10 w-16 h-16 border border-amber-400 rounded-full animate-twinkle"></div>
          </div>
          
          {/* Sacred Mandala Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96">
              <div className="w-full h-full border-8 border-amber-400 rounded-full animate-spin-slow"></div>
              <div className="absolute inset-8 border-4 border-yellow-500 rounded-full animate-pulse"></div>
              <div className="absolute inset-16 border-2 border-orange-300 rounded-full"></div>
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
                      <div className="absolute inset-0 bg-gradient-to-br from-amber-200/20 to-yellow-200/20 rounded-full group-hover:scale-110 transition-transform duration-500"></div>
                      <div className="text-6xl text-amber-600 relative z-10 animate-float font-bold" style={{fontFamily: 'serif'}}>ॐ</div>
                      {/* Subtle glow effect */}
                      <div className="absolute inset-0 bg-amber-300/10 rounded-full blur-xl group-hover:bg-amber-300/20 transition-all duration-500"></div>
                    </div>
                  </div>
                  
                  {/* Sacred Heading with Sanskrit Elements */}
                  <h1 className="text-[48px] sm:text-[56px] md:text-[64px] lg:text-[72px] font-bold leading-[56px] sm:leading-[64px] md:leading-[72px] lg:leading-[80px] font-['Philosopher'] mb-8">
                    <span className="bg-gradient-to-r from-amber-700 via-amber-600 to-yellow-600 bg-clip-text text-transparent">
                      समुदाय अभिमुखीकरण
                    </span>
                    <br />
                    <span className="bg-gradient-to-r from-amber-600 via-yellow-600 to-amber-700 bg-clip-text text-transparent">
                      Spiritual Meetups
                    </span>
                  </h1>
                  
                  <p className="text-[18px] sm:text-[20px] md:text-[22px] font-normal leading-[28px] sm:leading-[30px] md:leading-[32px] font-['Lato'] max-w-4xl mb-10 text-gray-700 mx-auto">
                    Join our in-person and virtual spiritual gatherings to connect with like-minded souls.
                    <br className="hidden sm:block" />
                    Experience the power of collective spiritual practice and community bonding.
                  </p>
                  
                  {/* Enhanced Traditional CTA Buttons */}
                  <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
                    <button className="group relative px-10 py-4 bg-gradient-to-r from-amber-400 to-yellow-400 text-white font-bold text-lg rounded-full overflow-hidden transition-all duration-500 hover:scale-105 shadow-lg hover:shadow-xl">
                      <span className="relative z-10 flex items-center justify-center gap-3">
                        <div className="text-xl">📅</div>
                        View Upcoming Meetups
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-yellow-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
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

      {/* Upcoming Meetups Section */}
      <section className="relative w-full py-[80px] sm:py-[90px] md:py-[100px] px-[42px] sm:px-[49px] md:px-[56px] bg-gradient-to-br from-white/80 to-amber-50/50">
        <div className="w-full max-w-[1440px] mx-auto">
          {/* Section Header */}
          <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="mb-6">
              <span className="inline-block px-6 py-2 bg-gradient-to-r from-amber-100 to-yellow-100 text-amber-700 rounded-full text-sm font-semibold mb-4">
                📅 Upcoming Gatherings
              </span>
            </div>
            <h2 className="text-[42px] sm:text-[48px] md:text-[56px] font-bold leading-[48px] sm:leading-[54px] md:leading-[64px] text-gray-800 font-['Philosopher'] mb-6">
              <span className="bg-gradient-to-r from-amber-600 via-yellow-600 to-orange-600 bg-clip-text text-transparent">
                Join Our Spiritual Gatherings
              </span>
            </h2>
            <p className="text-[18px] sm:text-[20px] md:text-[22px] font-normal leading-[28px] sm:leading-[30px] md:leading-[32px] text-gray-600 font-['Lato'] max-w-3xl mx-auto">
              Participate in our scheduled meetups to deepen your spiritual practice and connect with our community
            </p>
          </div>

          {/* Meetups Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {upcomingMeetups.map((meetup, index) => (
              <div
                key={meetup.id}
                className={`group relative bg-white/90 backdrop-blur-lg rounded-3xl p-8 shadow-2xl hover:shadow-amber-500/25 transition-all duration-700 border border-white/50 overflow-hidden transform hover:-translate-y-2 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}
                style={{ animationDelay: `${600 + index * 150}ms` }}
              >
                {/* Dynamic Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${meetup.color} opacity-0 group-hover:opacity-15 transition-all duration-700 rounded-3xl`}></div>
                
                {/* Content */}
                <div className="relative z-10">
                  {/* Category Badge */}
                  <div className="mb-4">
                    <span className={`inline-block px-4 py-2 bg-gradient-to-r ${meetup.color} text-white text-sm font-bold rounded-full`}>
                      {meetup.category}
                    </span>
                  </div>
                  
                  {/* Meetup Info */}
                  <h3 className="text-[24px] font-bold text-gray-800 font-['Philosopher'] mb-4 group-hover:text-amber-700 transition-colors duration-300">
                    {meetup.title}
                  </h3>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-3 text-gray-600">
                      <span>📅</span>
                      <span className="font-['Lato']">{meetup.date}</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-600">
                      <span>⏰</span>
                      <span className="font-['Lato']">{meetup.time}</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-600">
                      <span>📍</span>
                      <span className="font-['Lato']">{meetup.location}</span>
                    </div>
                  </div>
                  
                  <p className="text-[15px] text-gray-600 font-['Lato'] leading-relaxed mb-6">
                    {meetup.description}
                  </p>
                  
                  {/* Attendees */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-gray-500 font-['Lato']">
                      <span>👥</span>
                      <span>{meetup.attendees} attending</span>
                    </div>
                    <button className="px-6 py-3 bg-gradient-to-r from-amber-500 to-yellow-500 text-white font-bold rounded-2xl hover:from-amber-600 hover:to-yellow-600 transition-all duration-300 transform hover:scale-105">
                      Join Meetup
                    </button>
                  </div>
                </div>
                
                {/* Glow Effects */}
                <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${meetup.color} opacity-0 group-hover:opacity-25 blur-2xl transition-all duration-700 -z-10 scale-90 group-hover:scale-100`}></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="relative w-full py-[80px] sm:py-[90px] md:py-[100px] px-[42px] sm:px-[49px] md:px-[56px] bg-gradient-to-br from-yellow-50/50 to-amber-50/50">
        <div className="w-full max-w-[1440px] mx-auto">
          <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="mb-6">
              <span className="inline-block px-6 py-2 bg-gradient-to-r from-yellow-100 to-amber-100 text-yellow-700 rounded-full text-sm font-semibold mb-4">
                🌟 Meetup Benefits
              </span>
            </div>
            <h2 className="text-[42px] sm:text-[48px] md:text-[56px] font-bold leading-[48px] sm:leading-[54px] md:leading-[64px] text-gray-800 font-['Philosopher'] mb-6">
              <span className="bg-gradient-to-r from-yellow-600 via-amber-600 to-orange-600 bg-clip-text text-transparent">
                Why Attend Our Meetups?
              </span>
            </h2>
            <p className="text-[18px] sm:text-[20px] md:text-[22px] font-normal leading-[28px] sm:leading-[30px] md:leading-[32px] text-gray-600 font-['Lato'] max-w-3xl mx-auto">
              Experience the unique advantages of participating in our spiritual gatherings
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

      {/* Testimonials Section */}
      <section className="relative w-full py-[80px] sm:py-[90px] md:py-[100px] px-[42px] sm:px-[49px] md:px-[56px] bg-gradient-to-br from-white/80 to-yellow-50/50">
        <div className="w-full max-w-[1440px] mx-auto">
          <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="mb-6">
              <span className="inline-block px-6 py-2 bg-gradient-to-r from-orange-100 to-yellow-100 text-orange-700 rounded-full text-sm font-semibold mb-4">
                💬 Community Voices
              </span>
            </div>
            <h2 className="text-[42px] sm:text-[48px] md:text-[56px] font-bold leading-[48px] sm:leading-[54px] md:leading-[64px] text-gray-800 font-['Philosopher'] mb-6">
              <span className="bg-gradient-to-r from-orange-600 via-yellow-600 to-amber-600 bg-clip-text text-transparent">
                What Our Community Says
              </span>
            </h2>
            <p className="text-[18px] sm:text-[20px] md:text-[22px] font-normal leading-[28px] sm:leading-[30px] md:leading-[32px] text-gray-600 font-['Lato'] max-w-3xl mx-auto">
              Hear from participants who have experienced our spiritual meetups
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div 
                key={testimonial.id}
                className={`group bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-xl border border-white/50 transition-all duration-700 hover:shadow-2xl text-center ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}
                style={{ animationDelay: `${1000 + index * 150}ms` }}
              >
                <div className="text-5xl mb-6 text-amber-500">
                  {`"`}{`"`}
                </div>
                <p className="text-gray-600 font-['Lato'] leading-relaxed mb-6 italic">
                  {`"`}{testimonial.text}{`"`}
                </p>
                <div>
                  <h4 className="text-[18px] font-bold text-gray-800 font-['Philosopher']">
                    {testimonial.name}
                  </h4>
                  <p className="text-amber-600 font-['Lato'] text-sm">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="relative w-full py-[80px] sm:py-[90px] md:py-[100px] px-[42px] sm:px-[49px] md:px-[56px] bg-gradient-to-br from-amber-100/50 to-yellow-100/50">
        <div className="w-full max-w-[1440px] mx-auto">
          <div className={`text-center transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="bg-gradient-to-r from-amber-500/10 to-yellow-500/10 rounded-3xl p-8 border border-amber-200/50 backdrop-blur-sm">
              <h3 className="text-[28px] sm:text-[32px] font-bold text-gray-800 font-['Philosopher'] mb-4">
                Ready to Join Our Spiritual Gatherings?
              </h3>
              <p className="text-gray-600 font-['Lato'] mb-8 max-w-2xl mx-auto">
                Connect with our community and participate in transformative spiritual experiences.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <button className="group relative px-8 py-4 bg-gradient-to-r from-amber-500 to-yellow-500 text-white font-bold text-lg rounded-full overflow-hidden transition-all duration-500 hover:scale-105 shadow-lg hover:shadow-xl">
                  <span className="relative z-10 flex items-center justify-center gap-3">
                    <div className="text-xl">🌟</div>
                    Register for Next Meetup
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-600 to-yellow-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
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

export default MeetupsPage;