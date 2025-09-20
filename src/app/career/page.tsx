'use client';

import React, { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const CareerPage: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const jobOpenings = [
    {
      title: "Vedic Astrologer",
      department: "Astrology",
      location: "Remote/Mumbai",
      type: "Full Time",
      experience: "3+ years",
      description: "Expert in Vedic astrology with strong consultation skills"
    },
    {
      title: "Puja Coordinator",
      department: "Operations",
      location: "Delhi",
      type: "Full Time", 
      experience: "2+ years",
      description: "Coordinate puja ceremonies and temple operations"
    },
    {
      title: "Content Writer (Spiritual)",
      department: "Content",
      location: "Remote",
      type: "Part Time",
      experience: "1+ years",
      description: "Create spiritual content, blogs, and educational materials"
    },
    {
      title: "Customer Support Specialist",
      department: "Support",
      location: "Bangalore",
      type: "Full Time",
      experience: "1+ years",
      description: "Provide excellent customer service to spiritual seekers"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50/50 via-yellow-50/30 to-rose-50/50 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-orange-200/30 rounded-full mix-blend-multiply filter blur-xl animate-float"></div>
        <div className="absolute top-40 right-10 w-80 h-80 bg-rose-200/30 rounded-full mix-blend-multiply filter blur-xl animate-float animation-delay-2000"></div>
        <div className="absolute bottom-20 left-20 w-72 h-72 bg-yellow-200/30 rounded-full mix-blend-multiply filter blur-xl animate-float animation-delay-4000"></div>
      </div>
      
      <Header />
      
      <section className="relative pt-28 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="relative max-w-7xl mx-auto text-center">
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="mb-8 flex justify-center">
              <div className="relative p-6 rounded-full bg-gradient-to-br from-orange-200/40 to-rose-200/40 backdrop-blur-sm border border-orange-300/30 shadow-lg">
                <div className="text-6xl text-orange-600 animate-float font-bold">💼</div>
                <div className="absolute inset-0 bg-orange-300/20 rounded-full blur-xl animate-pulse"></div>
              </div>
            </div>
            
            <h1 className="text-[52px] sm:text-[64px] md:text-[72px] font-bold leading-[60px] sm:leading-[72px] md:leading-[80px] font-['Philosopher'] mb-8">
              <span className="bg-gradient-to-r from-orange-700 via-rose-600 to-orange-800 bg-clip-text text-transparent">
                Career
              </span>
              <br />
              <span className="bg-gradient-to-r from-rose-600 via-orange-700 to-yellow-600 bg-clip-text text-transparent">
                करियर
              </span>
            </h1>
            
            <p className="text-[20px] sm:text-[22px] md:text-[24px] font-normal leading-[32px] sm:leading-[34px] md:leading-[36px] font-['Lato'] max-w-5xl mx-auto text-gray-700 mb-12">
              Join our mission to spread spiritual wisdom and divine guidance across the world.
              <br className="hidden sm:block" />
              Be part of a team that makes a positive impact on people's spiritual journey.
            </p>
          </div>
        </div>
      </section>

      {/* Job Openings */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 font-['Philosopher'] mb-12 text-center">
            Current Job Openings
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {jobOpenings.map((job, index) => (
              <div
                key={index}
                className="group bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-700 border border-white/50 p-8 transform hover:scale-105"
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-gray-800 font-['Philosopher'] group-hover:text-orange-700 transition-colors duration-300">
                    {job.title}
                  </h3>
                  <span className="bg-gradient-to-r from-orange-500 to-rose-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                    {job.type}
                  </span>
                </div>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-orange-600 font-medium">🏢 {job.department}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-600">📍 {job.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-600">⏰ {job.experience}</span>
                  </div>
                </div>
                
                <p className="text-gray-600 font-['Lato'] text-sm leading-relaxed mb-6">
                  {job.description}
                </p>
                
                <button className="w-full py-3 px-6 bg-gradient-to-r from-orange-500 to-rose-500 text-white font-bold rounded-2xl hover:from-orange-600 hover:to-rose-600 transition-all duration-300 transform hover:scale-105">
                  Apply Now
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Company Culture */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 font-['Philosopher'] mb-12 text-center">
            Why Work With Us?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: "🌟",
                title: "Meaningful Work",
                description: "Make a positive impact on people's spiritual lives"
              },
              {
                icon: "🧘‍♀️",
                title: "Spiritual Growth",
                description: "Personal development and spiritual learning opportunities"
              },
              {
                icon: "👥",
                title: "Great Team",
                description: "Work with passionate and like-minded individuals"
              },
              {
                icon: "💰",
                title: "Competitive Pay",
                description: "Attractive salary packages and benefits"
              },
              {
                icon: "🏠",
                title: "Work Flexibility",
                description: "Remote work options and flexible schedules"
              },
              {
                icon: "📚",
                title: "Learning & Growth",
                description: "Continuous learning and career advancement"
              }
            ].map((benefit, index) => (
              <div
                key={index}
                className="group bg-white/70 backdrop-blur-lg rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all duration-700 border border-white/50 text-center transform hover:scale-105"
              >
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-500">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-800 font-['Philosopher'] mb-3">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 font-['Lato'] text-sm leading-relaxed">
                  {benefit.description}
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

export default CareerPage;