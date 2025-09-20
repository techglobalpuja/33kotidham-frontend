'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const BlogPage: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const blogPosts = [
    {
      id: 1,
      title: "Understanding Vedic Astrology: A Beginner's Guide",
      excerpt: "Explore the ancient wisdom of Vedic astrology and discover how planetary positions influence our daily lives.",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=400&fit=crop",
      date: "December 8, 2024",
      category: "Astrology",
      readTime: "5 min read"
    },
    {
      id: 2,
      title: "The Power of Mantras in Daily Life",
      excerpt: "Learn about the transformative power of sacred mantras and how to incorporate them into your spiritual practice.",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop",
      date: "December 6, 2024",
      category: "Spirituality",
      readTime: "7 min read"
    },
    {
      id: 3,
      title: "Significance of Ganesha Puja in Modern Times",
      excerpt: "Discover why Lord Ganesha worship remains relevant and powerful in today's fast-paced world.",
      image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=600&h=400&fit=crop",
      date: "December 4, 2024",
      category: "Puja",
      readTime: "6 min read"
    },
    {
      id: 4,
      title: "Numerology: The Science of Numbers and Destiny",
      excerpt: "Understand how numbers influence your life path and personality traits according to ancient numerology.",
      image: "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=600&h=400&fit=crop",
      date: "December 2, 2024",
      category: "Numerology",
      readTime: "8 min read"
    },
    {
      id: 5,
      title: "Kundali Matching: Traditional vs Modern Approach",
      excerpt: "Compare traditional Kundali matching methods with modern astrology for successful relationships.",
      image: "https://images.unsplash.com/photo-1604608672516-a224451d4ad3?w=600&h=400&fit=crop",
      date: "November 30, 2024",
      category: "Marriage",
      readTime: "10 min read"
    },
    {
      id: 6,
      title: "Sacred Geometry in Temple Architecture",
      excerpt: "Explore the mystical patterns and divine proportions used in ancient Indian temple construction.",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=400&fit=crop",
      date: "November 28, 2024",
      category: "Culture",
      readTime: "9 min read"
    }
  ];

  const categories = ["All", "Astrology", "Spirituality", "Puja", "Numerology", "Marriage", "Culture"];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50/50 via-yellow-50/30 to-rose-50/50 relative overflow-hidden">
      {/* Sacred Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-orange-200/30 rounded-full mix-blend-multiply filter blur-xl animate-float"></div>
        <div className="absolute top-40 right-10 w-80 h-80 bg-rose-200/30 rounded-full mix-blend-multiply filter blur-xl animate-float animation-delay-2000"></div>
        <div className="absolute bottom-20 left-20 w-72 h-72 bg-yellow-200/30 rounded-full mix-blend-multiply filter blur-xl animate-float animation-delay-4000"></div>
      </div>
      
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-28 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="relative max-w-7xl mx-auto text-center">
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {/* Sacred Om Symbol */}
            <div className="mb-8 flex justify-center">
              <div className="relative p-6 rounded-full bg-gradient-to-br from-orange-200/40 to-rose-200/40 backdrop-blur-sm border border-orange-300/30 shadow-lg">
                <div className="text-6xl text-orange-600 animate-float font-bold">📚</div>
                <div className="absolute inset-0 bg-orange-300/20 rounded-full blur-xl animate-pulse"></div>
              </div>
            </div>
            
            <h1 className="text-[52px] sm:text-[64px] md:text-[72px] font-bold leading-[60px] sm:leading-[72px] md:leading-[80px] font-['Philosopher'] mb-8">
              <span className="bg-gradient-to-r from-orange-700 via-rose-600 to-orange-800 bg-clip-text text-transparent">
                Spiritual
              </span>
              <br />
              <span className="bg-gradient-to-r from-rose-600 via-orange-700 to-yellow-600 bg-clip-text text-transparent">
                Blog
              </span>
            </h1>
            
            <p className="text-[20px] sm:text-[22px] md:text-[24px] font-normal leading-[32px] sm:leading-[34px] md:leading-[36px] font-['Lato'] max-w-5xl mx-auto text-gray-700 mb-12">
              Discover ancient wisdom, spiritual insights, and practical guidance for your spiritual journey.
              <br className="hidden sm:block" />
              Explore articles on astrology, spirituality, and divine practices.
            </p>
          </div>
        </div>
      </section>

      {/* Categories Filter */}
      <section className="relative py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category, index) => (
              <button
                key={index}
                className="px-6 py-3 bg-white/80 backdrop-blur-lg rounded-full border border-orange-200 text-gray-700 font-medium hover:bg-orange-100 hover:border-orange-300 transition-all duration-300 hover:scale-105"
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="relative py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <div
                key={post.id}
                className={`group bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-700 border border-white/50 overflow-hidden transform hover:scale-105 hover:-translate-y-2 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}
                style={{ animationDelay: `${600 + index * 150}ms` }}
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-gradient-to-r from-orange-500 to-rose-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                      {post.category}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                    <span>{post.date}</span>
                    <span>•</span>
                    <span>{post.readTime}</span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-800 font-['Philosopher'] mb-3 group-hover:text-orange-700 transition-colors duration-300">
                    {post.title}
                  </h3>
                  
                  <p className="text-gray-600 font-['Lato'] text-sm leading-relaxed mb-6">
                    {post.excerpt}
                  </p>
                  
                  <button className="w-full py-3 px-6 bg-gradient-to-r from-orange-500 to-rose-500 text-white font-bold rounded-2xl hover:from-orange-600 hover:to-rose-600 transition-all duration-300 transform hover:scale-105">
                    Read More
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default BlogPage;