'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import '../../styles/horoscope-animations.css';

const ForumsPage: React.FC = () => {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);

  // Animation trigger on component mount
  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleBackToHome = () => {
    router.push('/');
  };

  // Forum categories data
  const categories = [
    {
      id: 1,
      title: "Vedic Astrology",
      description: "Discuss birth charts, planetary influences, and astrological predictions",
      icon: "🔮",
      color: "from-purple-400 to-indigo-500",
      topics: "1,248",
      posts: "8,932"
    },
    {
      id: 2,
      title: "Spiritual Practices",
      description: "Share experiences with meditation, yoga, and other spiritual disciplines",
      icon: "🧘",
      color: "from-orange-400 to-red-500",
      topics: "987",
      posts: "6,421"
    },
    {
      id: 3,
      title: "Numerology",
      description: "Explore the significance of numbers in personal and spiritual development",
      icon: "🔢",
      color: "from-blue-400 to-cyan-500",
      topics: "756",
      posts: "5,109"
    },
    {
      id: 4,
      title: "Palm Reading",
      description: "Discuss palmistry techniques and interpretations of hand features",
      icon: "✋",
      color: "from-rose-400 to-pink-500",
      topics: "634",
      posts: "4,287"
    },
    {
      id: 5,
      title: "Gemstones & Remedies",
      description: "Learn about auspicious stones and spiritual remedies for challenges",
      icon: "💎",
      color: "from-emerald-400 to-green-500",
      topics: "521",
      posts: "3,765"
    },
    {
      id: 6,
      title: "Matchmaking & Relationships",
      description: "Explore compatibility, Kundali matching, and relationship guidance",
      icon: "❤️",
      color: "from-red-400 to-orange-500",
      topics: "876",
      posts: "6,234"
    }
  ];

  // Recent discussions
  const recentDiscussions = [
    {
      id: 1,
      title: "Understanding Saturn's influence in 7th house",
      author: "Acharya Devanand",
      replies: 24,
      views: 342,
      category: "Vedic Astrology",
      time: "2 hours ago"
    },
    {
      id: 2,
      title: "Best meditation techniques for beginners?",
      author: "Shanti Priya",
      replies: 18,
      views: 298,
      category: "Spiritual Practices",
      time: "5 hours ago"
    },
    {
      id: 3,
      title: "Number 7 significance in my life path",
      author: "Ravi Shankar",
      replies: 15,
      views: 210,
      category: "Numerology",
      time: "1 day ago"
    },
    {
      id: 4,
      title: "Heart line and career prospects",
      author: "Anjali Mehta",
      replies: 32,
      views: 487,
      category: "Palm Reading",
      time: "1 day ago"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50/30 via-yellow-50/40 to-amber-50/30 relative overflow-hidden">
      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-orange-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-yellow-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-amber-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
        <div className="absolute bottom-20 right-20 w-72 h-72 bg-orange-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-6000"></div>
      </div>

      <Header />
      
      {/* Hero Section */}
      <section className="relative w-full min-h-screen pt-20 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Traditional Indian Ethnic Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-100/40 via-yellow-50/50 to-amber-100/60"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-orange-200/30 via-yellow-100/40 to-amber-200/50 animate-gradient-x"></div>
          
          {/* Ethnic Pattern Overlay */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 w-32 h-32 border-2 border-orange-400 rounded-full animate-spin-slow"></div>
            <div className="absolute top-20 right-20 w-20 h-20 border border-yellow-500 rounded-full animate-pulse"></div>
            <div className="absolute bottom-20 left-20 w-24 h-24 border-2 border-amber-300 rotate-45 animate-float"></div>
            <div className="absolute bottom-10 right-10 w-16 h-16 border border-yellow-400 rounded-full animate-twinkle"></div>
          </div>
          
          {/* Sacred Mandala Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96">
              <div className="w-full h-full border-8 border-orange-400 rounded-full animate-spin-slow"></div>
              <div className="absolute inset-8 border-4 border-yellow-500 rounded-full animate-pulse"></div>
              <div className="absolute inset-16 border-2 border-amber-300 rounded-full"></div>
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
                    <div className="p-8 rounded-full bg-white/20 backdrop-blur-lg border-2 border-orange-300/40 relative overflow-hidden group shadow-lg">
                      <div className="absolute inset-0 bg-gradient-to-br from-orange-200/20 to-yellow-200/20 rounded-full group-hover:scale-110 transition-transform duration-500"></div>
                      <div className="text-6xl text-orange-600 relative z-10 animate-float font-bold" style={{fontFamily: 'serif'}}>ॐ</div>
                      {/* Subtle glow effect */}
                      <div className="absolute inset-0 bg-orange-300/10 rounded-full blur-xl group-hover:bg-orange-300/20 transition-all duration-500"></div>
                    </div>
                  </div>
                  
                  {/* Sacred Heading with Sanskrit Elements */}
                  <h1 className="text-[48px] sm:text-[56px] md:text-[64px] lg:text-[72px] font-bold leading-[56px] sm:leading-[64px] md:leading-[72px] lg:leading-[80px] font-['Philosopher'] mb-8">
                    <span className="bg-gradient-to-r from-orange-700 via-orange-600 to-amber-600 bg-clip-text text-transparent">
                      समुदाय मंच
                    </span>
                    <br />
                    <span className="bg-gradient-to-r from-orange-600 via-amber-600 to-orange-700 bg-clip-text text-transparent">
                      Community Forums
                    </span>
                  </h1>
                  
                  <p className="text-[18px] sm:text-[20px] md:text-[22px] font-normal leading-[28px] sm:leading-[30px] md:leading-[32px] font-['Lato'] max-w-4xl mb-10 text-gray-700 mx-auto">
                    Engage in meaningful discussions with our global community of spiritual seekers and experts.
                    <br className="hidden sm:block" />
                    Share knowledge, ask questions, and grow together on your spiritual journey.
                  </p>
                  
                  {/* Enhanced Traditional CTA Buttons */}
                  <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
                    <button className="group relative px-10 py-4 bg-gradient-to-r from-orange-400 to-amber-400 text-white font-bold text-lg rounded-full overflow-hidden transition-all duration-500 hover:scale-105 shadow-lg hover:shadow-xl">
                      <span className="relative z-10 flex items-center justify-center gap-3">
                        <div className="text-xl">🗣️</div>
                        Start Discussion
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-amber-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </button>
                    
                    <button 
                      onClick={handleBackToHome}
                      className="group relative px-10 py-4 bg-white/80 backdrop-blur-sm text-orange-600 font-bold text-lg rounded-full border-2 border-orange-300 hover:border-orange-400 transition-all duration-500 hover:scale-105 shadow-md hover:shadow-lg"
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

      {/* Categories Section */}
      <section className="relative w-full py-[80px] sm:py-[90px] md:py-[100px] px-[42px] sm:px-[49px] md:px-[56px] bg-gradient-to-br from-white/80 to-orange-50/50">
        <div className="w-full max-w-[1440px] mx-auto">
          {/* Section Header */}
          <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="mb-6">
              <span className="inline-block px-6 py-2 bg-gradient-to-r from-orange-100 to-amber-100 text-orange-700 rounded-full text-sm font-semibold mb-4">
                📚 Forum Categories
              </span>
            </div>
            <h2 className="text-[42px] sm:text-[48px] md:text-[56px] font-bold leading-[48px] sm:leading-[54px] md:leading-[64px] text-gray-800 font-['Philosopher'] mb-6">
              <span className="bg-gradient-to-r from-orange-600 via-amber-600 to-yellow-600 bg-clip-text text-transparent">
                Explore Spiritual Disciplines
              </span>
            </h2>
            <p className="text-[18px] sm:text-[20px] md:text-[22px] font-normal leading-[28px] sm:leading-[30px] md:leading-[32px] text-gray-600 font-['Lato'] max-w-3xl mx-auto">
              Dive deep into specific areas of spiritual knowledge with our categorized discussion forums
            </p>
          </div>

          {/* Categories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <div
                key={category.id}
                className={`group relative bg-white/90 backdrop-blur-lg rounded-3xl p-8 shadow-2xl hover:shadow-orange-500/25 transition-all duration-700 border border-white/50 overflow-hidden transform hover:-translate-y-2 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}
                style={{ animationDelay: `${600 + index * 150}ms` }}
              >
                {/* Dynamic Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-15 transition-all duration-700 rounded-3xl`}></div>
                
                {/* Content */}
                <div className="relative z-10 text-center">
                  {/* Icon */}
                  <div className="relative mb-6 flex justify-center">
                    <div className="relative">
                      <div className={`relative w-20 h-20 rounded-full bg-gradient-to-br ${category.color} p-1 shadow-xl group-hover:shadow-orange-500/50 transition-all duration-500`}>
                        <div className="w-full h-full bg-white rounded-full flex items-center justify-center group-hover:bg-gray-50 transition-all duration-300 relative overflow-hidden">
                          <div className="text-3xl">{category.icon}</div>
                          {/* Icon glow effect */}
                          <div className={`absolute inset-0 bg-gradient-to-r ${category.color} opacity-0 group-hover:opacity-20 transition-opacity duration-500 rounded-full`}></div>
                        </div>
                      </div>
                      
                      {/* Outer glow */}
                      <div className={`absolute -inset-4 rounded-full bg-gradient-to-r ${category.color} opacity-0 group-hover:opacity-30 blur-xl transition-all duration-700`}></div>
                    </div>
                  </div>

                  {/* Category Info */}
                  <h3 className="text-[24px] font-bold text-gray-800 font-['Philosopher'] mb-4 group-hover:text-orange-700 transition-colors duration-300">
                    {category.title}
                  </h3>
                  
                  <p className="text-[15px] text-gray-600 font-['Lato'] leading-relaxed mb-6">
                    {category.description}
                  </p>
                  
                  {/* Stats */}
                  <div className="flex justify-between text-sm text-gray-500 font-['Lato']">
                    <span>{category.topics} topics</span>
                    <span>{category.posts} posts</span>
                  </div>
                </div>
                
                {/* Glow Effects */}
                <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-25 blur-2xl transition-all duration-700 -z-10 scale-90 group-hover:scale-100`}></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Discussions Section */}
      <section className="relative w-full py-[80px] sm:py-[90px] md:py-[100px] px-[42px] sm:px-[49px] md:px-[56px] bg-gradient-to-br from-amber-50/50 to-orange-50/50">
        <div className="w-full max-w-[1440px] mx-auto">
          <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="mb-6">
              <span className="inline-block px-6 py-2 bg-gradient-to-r from-amber-100 to-orange-100 text-amber-700 rounded-full text-sm font-semibold mb-4">
                🔥 Recent Discussions
              </span>
            </div>
            <h2 className="text-[42px] sm:text-[48px] md:text-[56px] font-bold leading-[48px] sm:leading-[54px] md:leading-[64px] text-gray-800 font-['Philosopher'] mb-6">
              <span className="bg-gradient-to-r from-amber-600 via-orange-600 to-yellow-600 bg-clip-text text-transparent">
                Trending Conversations
              </span>
            </h2>
            <p className="text-[18px] sm:text-[20px] md:text-[22px] font-normal leading-[28px] sm:leading-[30px] md:leading-[32px] text-gray-600 font-['Lato'] max-w-3xl mx-auto">
              Join the most active discussions in our spiritual community
            </p>
          </div>
          
          {/* Discussions List */}
          <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-xl border border-white/50">
            <div className="space-y-6">
              {recentDiscussions.map((discussion, index) => (
                <div 
                  key={discussion.id}
                  className={`group flex flex-col sm:flex-row items-start sm:items-center justify-between p-6 rounded-2xl bg-gradient-to-r from-white/50 to-amber-50/50 hover:from-white/70 hover:to-amber-50/70 transition-all duration-300 border border-white/30 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                  style={{ animationDelay: `${1000 + index * 150}ms` }}
                >
                  <div className="flex-1 mb-4 sm:mb-0">
                    <h3 className="text-[18px] font-bold text-gray-800 font-['Philosopher'] mb-2 group-hover:text-orange-700 transition-colors duration-300">
                      {discussion.title}
                    </h3>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 font-['Lato']">
                      <span>By {discussion.author}</span>
                      <span className="hidden sm:block">•</span>
                      <span>in {discussion.category}</span>
                      <span className="hidden sm:block">•</span>
                      <span>{discussion.time}</span>
                    </div>
                  </div>
                  <div className="flex gap-6 text-sm text-gray-500 font-['Lato']">
                    <div className="flex items-center gap-2">
                      <span>💬</span>
                      <span>{discussion.replies} replies</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>👁️</span>
                      <span>{discussion.views} views</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* View All Button */}
            <div className="text-center mt-10">
              <button className="group relative px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold text-lg rounded-full overflow-hidden transition-all duration-500 hover:scale-105 shadow-lg hover:shadow-xl">
                <span className="relative z-10 flex items-center justify-center gap-3">
                  <div className="text-xl">🔍</div>
                  View All Discussions
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-amber-600 to-orange-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="relative w-full py-[80px] sm:py-[90px] md:py-[100px] px-[42px] sm:px-[49px] md:px-[56px] bg-gradient-to-br from-orange-100/50 to-amber-100/50">
        <div className="w-full max-w-[1440px] mx-auto">
          <div className={`text-center transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="bg-gradient-to-r from-orange-500/10 to-amber-500/10 rounded-3xl p-8 border border-orange-200/50 backdrop-blur-sm">
              <h3 className="text-[28px] sm:text-[32px] font-bold text-gray-800 font-['Philosopher'] mb-4">
                Ready to Join the Conversation?
              </h3>
              <p className="text-gray-600 font-['Lato'] mb-8 max-w-2xl mx-auto">
                Connect with our community of spiritual seekers and share your insights in our vibrant forums.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <button className="group relative px-8 py-4 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold text-lg rounded-full overflow-hidden transition-all duration-500 hover:scale-105 shadow-lg hover:shadow-xl">
                  <span className="relative z-10 flex items-center justify-center gap-3">
                    <div className="text-xl">🌟</div>
                    Create New Topic
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-amber-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
                
                <button 
                  onClick={handleBackToHome}
                  className="group relative px-8 py-4 bg-white/80 backdrop-blur-sm text-orange-600 font-bold text-lg rounded-full border-2 border-orange-300 hover:border-orange-400 transition-all duration-500 hover:scale-105 shadow-md hover:shadow-lg"
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

export default ForumsPage;