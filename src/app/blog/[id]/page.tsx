'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import parse from 'html-react-parser';
import Header from '@/components/layout/Header';
import GlobalFooter from '@/components/layout/GlobalFooter';
import { apiService } from '@/services/api';
import { BlogPost, BlogCategory } from '@/types';

const BlogPostPage: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [blogPost, setBlogPost] = useState<BlogPost | null>(null);
  const [relatedBlogs, setRelatedBlogs] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [loadingRelated, setLoadingRelated] = useState(true);
  const params = useParams();
  const { id } = params;

  const fetchRelatedBlogs = useCallback(async (categoryId: number | null, excludeId: number) => {
    try {
      setLoadingRelated(true);
      // Get up to 3 related blogs from the same category, excluding the current blog
      const blogs = await apiService.getAllBlogs(0, 4, false, categoryId);
      // Filter out the current blog and take only 3
      const filteredBlogs = blogs.filter(blog => blog.id !== excludeId).slice(0, 3);
      setRelatedBlogs(filteredBlogs);
    } catch (err) {
      console.error('Error fetching related blogs:', err);
      // Set empty array to avoid showing loading state indefinitely
      setRelatedBlogs([]);
    } finally {
      setLoadingRelated(false);
    }
  }, []);

  const fetchBlogPost = useCallback(async (blogId: number) => {
    try {
      setLoading(true);
      const post = await apiService.getBlogById(blogId);
      setBlogPost(post);
      
      // Fetch related blogs after getting the main blog post
      if (post.category_id) {
        fetchRelatedBlogs(post.category_id, blogId);
      } else {
        fetchRelatedBlogs(null, blogId);
      }
    } catch (err) {
      setError('Failed to fetch blog post');
      console.error('Error fetching blog post:', err);
    } finally {
      setLoading(false);
    }
  }, [fetchRelatedBlogs]);

  const fetchCategories = useCallback(async () => {
    try {
      const fetchedCategories = await apiService.getBlogCategories();
      setCategories(fetchedCategories);
    } catch (err) {
      console.error('Error fetching categories:', err);
    }
  }, []);

  useEffect(() => {
    setIsVisible(true);
    if (id) {
      fetchBlogPost(Number(id));
      fetchCategories();
    }
  }, [id, fetchBlogPost, fetchCategories]);

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

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50/50 via-yellow-50/30 to-rose-50/50 flex items-center justify-center">
        <div className="text-2xl font-['Philosopher'] text-orange-600">Loading blog post...</div>
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

  if (!blogPost) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50/50 via-yellow-50/30 to-rose-50/50 flex items-center justify-center">
        <div className="text-2xl font-['Philosopher'] text-gray-600">Blog post not found</div>
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
      
      {/* Blog Post Header */}
      <section className="relative pt-32 pb-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="relative max-w-4xl mx-auto text-center">
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="flex justify-center mb-6">
              <span className="bg-gradient-to-r from-orange-500 to-rose-500 text-white text-sm font-bold px-4 py-2 rounded-full animate-pulse">
                {blogPost.category?.name || 'Spirituality'}
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold font-['Philosopher'] text-gray-800 mb-6 animate-fade-in">
              {blogPost.title}
            </h1>
            
            {blogPost.subtitle && (
              <p className="text-xl text-gray-600 font-['Lato'] mb-8 max-w-3xl mx-auto animate-fade-in-delay">
                {blogPost.subtitle}
              </p>
            )}
            
            <div className="flex flex-wrap items-center justify-center gap-6 text-gray-600 animate-fade-in-delay-2">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
                <span>{blogPost.author?.name || 'Unknown Author'}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                </svg>
                <span>{blogPost.publish_time ? formatDate(blogPost.publish_time) : 'Unknown date'}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Post Content */}
      <section className="relative py-8 px-4 sm:px-6 lg:px-8 pb-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl overflow-hidden border border-white/50 transform transition-all duration-500 hover:shadow-2xl">
              {blogPost.thumbnail_image && (
                <div className="relative h-96 w-full overflow-hidden">
                  <Image
                    src={constructImageUrl(blogPost.thumbnail_image)}
                    alt={blogPost.title}
                    fill
                    className="object-cover transition-transform duration-700 hover:scale-105"
                    unoptimized={true}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = '/placeholder.jpg';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
              )}
              
              <div className="p-8 md:p-12">
                {blogPost.content ? (
                  <div className="prose prose-lg max-w-none font-['Lato'] text-gray-700 leading-relaxed space-y-6">
                    {parse(blogPost.content)}
                  </div>
                ) : (
                  <p className="text-gray-600">No content available for this blog post.</p>
                )}
              </div>
            </div>
            
            {/* Tags */}
            {blogPost.tags && (
              <div className="mt-8 flex flex-wrap gap-3 animate-fade-in">
                <h3 className="text-lg font-bold font-['Philosopher'] text-gray-800 mr-2">Tags:</h3>
                {blogPost.tags.split(',').map((tag, index) => (
                  <span 
                    key={index} 
                    className="px-4 py-2 bg-gradient-to-r from-orange-100 to-rose-100 text-orange-800 rounded-full text-sm font-medium hover:from-orange-200 hover:to-rose-200 transition-all duration-300 transform hover:scale-105"
                  >
                    {tag.trim()}
                  </span>
                ))}
              </div>
            )}
          </div>
          
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl p-6 border border-white/50 sticky top-24 transform transition-all duration-300 hover:shadow-lg">
              <h3 className="text-xl font-bold font-['Philosopher'] text-gray-800 mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z"/>
                </svg>
                Categories
              </h3>
              <div className="space-y-3">
                <button
                  className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-300 flex items-center justify-between group ${
                    blogPost.category_id === null 
                      ? 'bg-gradient-to-r from-orange-500 to-rose-500 text-white shadow-lg' 
                      : 'hover:bg-orange-50 text-gray-700'
                  }`}
                  onClick={() => {
                    window.location.href = '/blog';
                  }}
                >
                  <span>All Categories</span>
                  {blogPost.category_id === null && (
                    <svg className="w-5 h-5 text-white animate-bounce" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </button>
                {categories.map((category) => (
                  <button
                    key={category.id}
                    className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-300 flex items-center justify-between group ${
                      blogPost.category_id === category.id 
                        ? 'bg-gradient-to-r from-orange-500 to-rose-500 text-white shadow-lg' 
                        : 'hover:bg-orange-50 text-gray-700'
                    }`}
                    onClick={() => {
                      window.location.href = `/blog?category=${category.id}`;
                    }}
                  >
                    <span>{category.name}</span>
                    {blogPost.category_id === category.id && (
                      <svg className="w-5 h-5 text-white animate-bounce" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </button>
                ))}
              </div>
              
              <div className="mt-8 pt-6 border-t border-orange-100">
                <h3 className="text-xl font-bold font-['Philosopher'] text-gray-800 mb-4 flex items-center gap-2">
                  <svg className="w-5 h-5 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z"/>
                  </svg>
                  Share This Post
                </h3>
                <div className="flex gap-4">
                  <button className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-all duration-300 transform hover:scale-110 shadow-md hover:shadow-lg">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                    </svg>
                  </button>
                  <button className="w-12 h-12 bg-blue-800 text-white rounded-full flex items-center justify-center hover:bg-blue-900 transition-all duration-300 transform hover:scale-110 shadow-md hover:shadow-lg">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                    </svg>
                  </button>
                  <button className="w-12 h-12 bg-red-600 text-white rounded-full flex items-center justify-center hover:bg-red-700 transition-all duration-300 transform hover:scale-110 shadow-md hover:shadow-lg">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.28.073-1.689-.073-4.849 0-3.204.013-3.583.07-4.849zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.848 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </button>
                  <button className="w-12 h-12 bg-gray-700 text-white rounded-full flex items-center justify-center hover:bg-gray-800 transition-all duration-300 transform hover:scale-110 shadow-md hover:shadow-lg">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z"/>
                    </svg>
                  </button>
                </div>
              </div>
              
              <div className="mt-8 pt-6 border-t border-orange-100">
                <button 
                  onClick={() => window.location.href = '/blog'}
                  className="w-full py-3 px-4 bg-gradient-to-r from-orange-500 to-rose-500 text-white font-bold rounded-2xl hover:from-orange-600 hover:to-rose-600 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
                  </svg>
                  Back to Blog
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Related Blog Posts */}
      <section className="relative py-8 px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold font-['Philosopher'] text-gray-800 mb-8 text-center animate-fade-in">
            Related Articles
          </h2>
          
          {loadingRelated ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map((item) => (
                <div key={item} className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg overflow-hidden border border-white/50 animate-pulse">
                  <div className="h-48 bg-gray-200"></div>
                  <div className="p-6">
                    <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
                    <div className="h-6 bg-gray-200 rounded w-3/4 mb-3"></div>
                    <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : relatedBlogs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedBlogs.map((post, index) => (
                <div 
                  key={post.id} 
                  className={`bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg overflow-hidden border border-white/50 hover:shadow-xl transition-all duration-500 cursor-pointer group transform hover:-translate-y-2 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                  style={{ animationDelay: `${index * 150}ms` }}
                  onClick={() => window.location.href = `/blog/${post.id}`}
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
                      <span className="bg-gradient-to-r from-orange-500 to-rose-500 text-white text-xs font-bold px-3 py-1 rounded-full animate-pulse">
                        {post.category?.name || 'Spirituality'}
                      </span>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                      <svg className="w-4 h-4 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                      </svg>
                      <span>{post.publish_time ? formatDate(post.publish_time) : 'Unknown date'}</span>
                    </div>
                    
                    <h3 className="text-lg font-bold text-gray-800 font-['Philosopher'] mb-3 group-hover:text-orange-600 transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    
                    <p className="text-gray-600 font-['Lato'] text-sm leading-relaxed line-clamp-3">
                      {post.subtitle || post.meta_description || 'No description available'}
                    </p>
                    
                    <button className="mt-4 text-orange-600 font-['Lato'] font-bold text-sm flex items-center hover:text-orange-700 transition-colors">
                      Read More
                      <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg border border-white/50">
              <div className="text-5xl mb-4">📚</div>
              <h3 className="text-xl font-bold font-['Philosopher'] text-gray-800 mb-2">No Related Articles</h3>
              <p className="text-gray-600">Check out our other blog posts for more spiritual insights.</p>
              <button 
                onClick={() => window.location.href = '/blog'}
                className="mt-6 px-6 py-3 bg-gradient-to-r from-orange-500 to-rose-500 text-white font-bold rounded-2xl hover:from-orange-600 hover:to-rose-600 transition-all duration-300 transform hover:scale-105"
              >
                Browse All Blogs
              </button>
            </div>
          )}
        </div>
      </section>
      
      <GlobalFooter />
    </div>
  );
};

export default BlogPostPage;