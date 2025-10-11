'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { apiService } from '@/services/api';
import { BlogPost } from '@/types';

const BlogPage: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsVisible(true);
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const blogs = await apiService.getAllBlogs();
      setBlogPosts(blogs);
    } catch (err) {
      setError('Failed to fetch blogs');
      console.error('Error fetching blogs:', err);
    } finally {
      setLoading(false);
    }
  };

  // Helper function to construct full image URL using the production API domain
  const constructImageUrl = (imagePath: string) => {
    // If it's already a full URL, return as is
    if (imagePath && imagePath.startsWith('http')) {
      return imagePath;
    }
    
    // If it's a relative path, construct the full URL using the production API domain
    if (imagePath && !imagePath.startsWith('http')) {
      try {
        const trimmedPath = imagePath.trim();
        if (trimmedPath && !trimmedPath.includes(' ') && !trimmedPath.includes('\\') && 
            !trimmedPath.includes('..') && trimmedPath.length > 3) {
          // Use the production API domain as specified
          const baseUrl = 'https://api.33kotidham.com';
          const fullPath = `${baseUrl}${trimmedPath.startsWith('/') ? '' : '/'}${trimmedPath}`;
          return fullPath;
        }
      } catch (error) {
        console.warn('Error constructing full image URL:', error);
      }
    }
    
    // Fallback to placeholder
    return '/placeholder.jpg';
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const categories = ["All", "Astrology", "Spirituality", "Puja", "Numerology", "Marriage", "Culture"];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50/50 via-yellow-50/30 to-rose-50/50 flex items-center justify-center">
        <div className="text-2xl font-['Philosopher'] text-orange-600">Loading blogs...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50/50 via-yellow-50/30 to-rose-50/50 flex items-center justify-center">
        <div className="text-2xl font-['Philosopher'] text-red-600">Error: {error}</div>
      </div>
    );
  }

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
      <section className="relative pt-28 pb-10 px-4 sm:px-6 lg:px-8 overflow-hidden">
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
                Spiritual Blog
              </span>
            </h1>
            
            <p className="text-[20px] sm:text-[22px] md:text-[24px] font-normal leading-[32px] sm:leading-[34px] md:leading-[36px] font-['Lato'] max-w-5xl mx-auto text-gray-700">
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
      <section className="relative py-8 px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-7xl mx-auto">
          {blogPosts.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-2xl font-['Philosopher'] text-gray-700">No blogs found</h3>
              <p className="text-gray-500 mt-2">Check back later for new spiritual insights</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map((post, index) => (
                <div
                  key={post.id}
                  className={`group bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-700 border border-white/50 overflow-hidden transform hover:scale-105 hover:-translate-y-2 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}
                  style={{ animationDelay: `${600 + index * 150}ms` }}
                >
                  <div className="relative h-48 overflow-hidden">
                    {post.thumbnail_image ? (
                      <Image
                        src={constructImageUrl(post.thumbnail_image)}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                        unoptimized={true}
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = '/placeholder.jpg';
                        }}
                      />
                    ) : (
                      <div className="bg-gradient-to-br from-orange-200 to-rose-200 w-full h-full flex items-center justify-center">
                        <div className="text-4xl text-white">📚</div>
                      </div>
                    )}
                    <div className="absolute top-4 left-4">
                      <span className="bg-gradient-to-r from-orange-500 to-rose-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                        {post.category?.name || 'Spirituality'}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                      <span>{post.publish_time ? formatDate(post.publish_time) : 'Unknown date'}</span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-800 font-['Philosopher'] mb-3 group-hover:text-orange-700 transition-colors duration-300">
                      {post.title}
                    </h3>
                    
                    <p className="text-gray-600 font-['Lato'] text-sm leading-relaxed mb-6">
                      {post.subtitle || post.meta_description || 'No description available'}
                    </p>
                    
                    <button 
                      onClick={() => window.location.href = `/blog/${post.id}`}
                      className="w-full py-3 px-6 bg-gradient-to-r from-orange-500 to-rose-500 text-white font-bold rounded-2xl hover:from-orange-600 hover:to-rose-600 transition-all duration-300 transform hover:scale-105"
                    >
                      Read More
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default BlogPage;