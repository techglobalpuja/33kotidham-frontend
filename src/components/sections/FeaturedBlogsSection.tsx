'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { apiService } from '@/services/api';
import { BlogPost } from '@/types';
import Button from '@/components/ui/Button';

const FeaturedBlogsSection: React.FC = () => {
  const [featuredBlogs, setFeaturedBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchFeaturedBlogs();
  }, []);

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

  const fetchFeaturedBlogs = async () => {
    try {
      setLoading(true);
      const blogs = await apiService.getFeaturedBlogs(4); // Get 4 featured blogs
      setFeaturedBlogs(blogs);
    } catch (err) {
      setError('Failed to fetch featured blogs');
      console.error('Error fetching featured blogs:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (loading) {
    return (
      <section className="w-full py-10 px-8 bg-white">
        <div className="w-full max-w-7xl mx-auto">
          <div className="flex flex-col items-center text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900  mb-4">
              Featured Blogs
            </h2>
            <div className="flex items-center justify-center mb-4">
              <Image
                src="/images/img_vector_smart_object.png"
                alt="Decorative Line"
                width={240}
                height={14}
                className="w-60 h-auto"
              />
            </div>
            {/* <div className="flex items-center justify-center mb-4">
              <div className="w-60 h-1 bg-gradient-to-r from-orange-400 to-rose-400 rounded-full"></div>
            </div> */}
            <p className="text-gray-600  max-w-2xl leading-relaxed">
              Loading featured spiritual insights...
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="flex flex-col w-full bg-white rounded-lg overflow-hidden shadow-md animate-pulse">
                <div className="bg-gray-200 h-48 w-full"></div>
                <div className="p-6">
                  <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
                  <div className="h-6 bg-gray-200 rounded w-3/4 mb-3"></div>
                  <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="w-full py-10 px-8 bg-white">
        <div className="w-full max-w-7xl mx-auto">
          <div className="flex flex-col items-center text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900  mb-4">
              Featured Blogs
            </h2>
            <div className="flex items-center justify-center mb-4">
              <Image
                src="/images/img_vector_smart_object.png"
                alt="Decorative Line"
                width={240}
                height={14}
                className="w-60 h-auto"
              />
            </div>
            {/* <div className="flex items-center justify-center mb-4">
              <div className="w-60 h-1 bg-gradient-to-r from-orange-400 to-rose-400 rounded-full"></div>
            </div> */}
            <p className="text-red-500  max-w-2xl leading-relaxed">
              {error}
            </p>
          </div>
        </div>
      </section>
    );
  }

  if (featuredBlogs.length === 0) {
    return null; // Don't show the section if there are no featured blogs
  }

  return (
    <section className="w-full py-10 px-8 bg-white">
      <div className="w-full max-w-7xl mx-auto">
        <div className="flex flex-col items-center text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900  mb-4">
            Featured Blogs
          </h2>
          <div className="flex items-center justify-center mb-4">
            <Image
              src="/images/img_vector_smart_object.png"
              alt="Decorative Line"
              width={240}
              height={14}
              className="w-60 h-auto"
            />
          </div>
          {/* <div className="flex items-center justify-center mb-4">
            <div className="w-60 h-1 bg-gradient-to-r from-orange-400 to-rose-400 rounded-full"></div>
          </div> */}
          <p className="text-gray-600  max-w-2xl leading-relaxed">
            Discover our most popular spiritual insights and wisdom articles.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {featuredBlogs.map((blog) => (
            <div 
              key={blog.id} 
              className="flex flex-col w-full bg-white rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-gray-100"
            >
              {/* Image with category badge */}
              <div className="relative">
                {blog.thumbnail_image ? (
                  <div className="relative h-48 w-full">
                    <Image
                      src={constructImageUrl(blog.thumbnail_image)}
                      alt={blog.title}
                      fill
                      className="object-cover"
                      unoptimized={true}
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = '/placeholder.jpg';
                      }}
                    />
                  </div>
                ) : (
                  <div className="bg-gradient-to-br from-orange-100 to-rose-100 h-48 w-full flex items-center justify-center">
                    <div className="text-4xl text-orange-500">📚</div>
                  </div>
                )}
                <div className="absolute top-4 left-4">
                  <div className="bg-gradient-to-r from-orange-500 to-rose-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                    {blog.category?.name || 'Spirituality'}
                  </div>
                </div>
              </div>
              
              {/* Content */}
              <div className="p-6">
                {/* Date */}
                <div className="flex items-center text-sm text-gray-500 mb-3">
                  <svg className="w-4 h-4 mr-2 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                  </svg>
                  <span>{blog.publish_time ? formatDate(blog.publish_time) : 'Unknown date'}</span>
                </div>
                
                {/* Title */}
                <h3 className="text-lg font-bold text-gray-900  mb-3 leading-tight line-clamp-2">
                  {blog.title}
                </h3>
                
                {/* Excerpt */}
                <p className="text-gray-600  text-sm leading-relaxed line-clamp-3 mb-4">
                  {blog.subtitle || blog.meta_description || 'No description available'}
                </p>
                
                {/* Read More Button */}
                <button
                  onClick={() => window.location.href = `/blog/${blog.id}`}
                  className="text-orange-600  font-bold text-sm flex items-center hover:text-orange-700 transition-colors"
                >
                  Read More
                  <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="flex justify-center">
          <Button
            variant="primary"
            size="md"
            onClick={() => window.location.href = '/blog'}
            className="bg-gradient-to-r from-orange-400 to-orange-500 text-white px-8 py-3 rounded-full  hover:shadow-lg transition-shadow"
          >
            View All Blogs
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedBlogsSection;
