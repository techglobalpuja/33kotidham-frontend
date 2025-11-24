'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Header from '@/components/layout/Header';
import GlobalFooter from '@/components/layout/GlobalFooter';
import { apiService } from '@/services/api';
import { BlogPost, BlogCategory } from '@/types';

const BlogPage: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [allBlogPosts, setAllBlogPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 9;

  useEffect(() => {
    setIsVisible(true);
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const blogs = await apiService.getAllBlogs(0, 100, false, null);
      setAllBlogPosts(blogs);
      setBlogPosts(blogs);
      
      // Extract unique categories from blog posts
      const uniqueCategories = Array.from(
        new Set(
          blogs
            .flatMap(blog => blog.categories || [])
            .map((category: BlogCategory) => category.name)
        )
      ).sort();
      
      setCategories(uniqueCategories);
    } catch (err) {
      setError('Failed to fetch blogs');
      console.error('Error fetching blogs:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryChange = (categoryName: string | null) => {
    setSelectedCategory(categoryName);
    setCurrentPage(1); // Reset to first page when category changes
    
    let filteredBlogs = allBlogPosts;
    if (categoryName !== null) {
      filteredBlogs = allBlogPosts.filter(blog => 
        blog.categories && blog.categories.some((category: BlogCategory) => category.name === categoryName)
      );
    }
    setBlogPosts(filteredBlogs);
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

  // Pagination logic
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = blogPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(blogPosts.length / postsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    // Scroll to top of blog posts section
    const blogSection = document.getElementById('blog-posts-section');
    if (blogSection) {
      blogSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50/50 via-yellow-50/30 to-rose-50/50 flex items-center justify-center">
        <div className="text-2xl  text-orange-600">Loading blogs...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50/50 via-yellow-50/30 to-rose-50/50 flex items-center justify-center">
        <div className="text-2xl  text-red-600">Error: {error}</div>
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
            
            <h1 className="text-[52px] sm:text-[64px] md:text-[72px] font-bold leading-[60px] sm:leading-[72px] md:leading-[80px]  mb-8">
              <span className="bg-gradient-to-r from-orange-700 via-rose-600 to-orange-800 bg-clip-text text-transparent">
                Spiritual Blog
              </span>
            </h1>
            
            <p className="text-[20px] sm:text-[22px] md:text-[24px] font-normal leading-[32px] sm:leading-[34px] md:leading-[36px]  max-w-5xl mx-auto text-gray-700">
              Discover ancient wisdom, spiritual insights, and practical guidance for your spiritual journey.
              <br className="hidden sm:block" />
              Explore articles on astrology, spirituality, and divine practices.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content with Sidebar */}
      <section className="relative py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Sidebar - Categories Filter */}
          <div className="lg:col-span-1">
            <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl p-6 border border-white/50 sticky top-24 transform transition-all duration-300 hover:shadow-lg">
              <h3 className="text-xl font-bold  text-gray-800 mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z"/>
                </svg>
                Categories
              </h3>
              <div className="space-y-3">
                <button
                  onClick={() => handleCategoryChange(null)}
                  className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-300 flex items-center justify-between group ${
                    selectedCategory === null 
                      ? 'bg-gradient-to-r from-orange-500 to-rose-500 text-white shadow-lg' 
                      : 'hover:bg-orange-50 text-gray-700'
                  }`}
                >
                  <span>All Categories</span>
                  {selectedCategory === null && (
                    <svg className="w-5 h-5 text-white animate-bounce" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </button>
                {categories.map((categoryName) => (
                  <button
                    key={categoryName}
                    onClick={() => handleCategoryChange(categoryName)}
                    className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-300 flex items-center justify-between group ${
                      selectedCategory === categoryName 
                        ? 'bg-gradient-to-r from-orange-500 to-rose-500 text-white shadow-lg' 
                        : 'hover:bg-orange-50 text-gray-700'
                    }`}
                  >
                    <span>{categoryName}</span>
                    {selectedCategory === categoryName && (
                      <svg className="w-5 h-5 text-white animate-bounce" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content - Blog Posts */}
          <div className="lg:col-span-3" id="blog-posts-section">
            {currentPosts.length === 0 ? (
              <div className="text-center py-12">
                <h3 className="text-2xl  text-gray-700">No blogs found</h3>
                <p className="text-gray-500 mt-2">Check back later for new spiritual insights</p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {currentPosts.map((post, index) => (
                    <div
                      key={post.id}
                      className={`group bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 border border-white/50 overflow-hidden transform hover:-translate-y-1 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                      style={{ animationDelay: `${600 + index * 150}ms` }}
                    >
                      <div className="relative h-40 overflow-hidden">
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
                        <div className="absolute top-3 left-3">
                          <span className="bg-gradient-to-r from-orange-500 to-rose-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                            {post.categories && post.categories.length > 0 
                              ? post.categories[0].name 
                              : 'Spirituality'}
                          </span>
                        </div>
                      </div>
                      
                      <div className="p-4">
                        <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                          <span>{post.publish_time ? formatDate(post.publish_time) : 'Unknown date'}</span>
                        </div>
                        
                        <h3 className="text-base font-bold text-gray-800  mb-2 group-hover:text-orange-700 transition-colors duration-300 line-clamp-2">
                          {post.title}
                        </h3>
                        
                        <p className="text-gray-600  text-xs leading-relaxed mb-3 line-clamp-2">
                          {post.subtitle || post.meta_description || 'No description available'}
                        </p>
                        
                        <button 
                          onClick={() => window.location.href = `/blog/${post.id}`}
                          className="w-full py-2 px-4 bg-gradient-to-r from-orange-500 to-rose-500 text-white text-sm font-bold rounded-xl hover:from-orange-600 hover:to-rose-600 transition-all duration-300 transform hover:scale-105"
                        >
                          Read More
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center mt-12">
                    <div className="flex gap-2 bg-white/80 backdrop-blur-lg rounded-2xl p-2 border border-white/50 shadow-lg">
                      <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
                          currentPage === 1 
                            ? 'text-gray-400 cursor-not-allowed' 
                            : 'text-gray-700 hover:bg-orange-100 hover:text-orange-700'
                        }`}
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </button>
                      
                      {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                        let pageNum;
                        if (totalPages <= 5) {
                          pageNum = i + 1;
                        } else if (currentPage <= 3) {
                          pageNum = i + 1;
                        } else if (currentPage >= totalPages - 2) {
                          pageNum = totalPages - 4 + i;
                        } else {
                          pageNum = currentPage - 2 + i;
                        }
                        
                        return (
                          <button
                            key={pageNum}
                            onClick={() => handlePageChange(pageNum)}
                            className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
                              currentPage === pageNum
                                ? 'bg-gradient-to-r from-orange-500 to-rose-500 text-white shadow-lg'
                                : 'text-gray-700 hover:bg-orange-100 hover:text-orange-700'
                            }`}
                          >
                            {pageNum}
                          </button>
                        );
                      })}
                      
                      <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
                          currentPage === totalPages 
                            ? 'text-gray-400 cursor-not-allowed' 
                            : 'text-gray-700 hover:bg-orange-100 hover:text-orange-700'
                        }`}
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </section>
      
      <GlobalFooter />
    </div>
  );
};

export default BlogPage;
