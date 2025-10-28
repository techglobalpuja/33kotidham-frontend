'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/layout/Header';
import GlobalFooter from '@/components/layout/GlobalFooter';
import { apiService } from '@/services/api';
import { Temple } from '@/types';

const ChadawaStorePage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [temples, setTemples] = useState<Temple[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchTemples();
  }, []);

  const fetchTemples = async () => {
    try {
      setLoading(true);
      const fetchedTemples = await apiService.getTemples(0, 100);
      setTemples(fetchedTemples);
      setError(null);
    } catch (err) {
      setError('Failed to fetch temples');
      console.error('Error fetching temples:', err);
    } finally {
      setLoading(false);
    }
  };

  // Handle temple selection - navigate directly to checkout with a default chadawa ID
  const handleTempleSelect = (templeId: number) => {
    // Navigate to checkout page with temple ID and a default chadawa ID (you can modify this as needed)
    window.location.href = `/chadawa-store/${templeId}/4/checkout`;
  };

  // Helper function to construct full image URL
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
    
    // Fallback to dummy image
    return 'https://placehold.co/600x400/orange/white?text=Temple+Image';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50/50 via-yellow-50/30 to-rose-50/50 flex items-center justify-center">
        <div className="text-2xl font-['Philosopher'] text-orange-600">Loading temples...</div>
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
    <div className="min-h-screen bg-gradient-to-br from-orange-50/50 via-yellow-50/30 to-rose-50/50">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-28 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-64 h-64 bg-orange-200/30 rounded-full mix-blend-multiply filter blur-xl animate-float"></div>
          <div className="absolute top-40 right-10 w-80 h-80 bg-rose-200/30 rounded-full mix-blend-multiply filter blur-xl animate-float animation-delay-2000"></div>
          <div className="absolute bottom-20 left-20 w-72 h-72 bg-yellow-200/30 rounded-full mix-blend-multiply filter blur-xl animate-float animation-delay-4000"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto text-center">
          <div className="mb-8 flex justify-center">
            <div className="relative p-6 rounded-full bg-gradient-to-br from-orange-200/40 to-rose-200/40 backdrop-blur-sm border border-orange-300/30 shadow-lg">
              <div className="text-6xl text-orange-600 animate-float font-bold">🕉️</div>
              <div className="absolute inset-0 bg-orange-300/20 rounded-full blur-xl animate-pulse"></div>
            </div>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 font-['Philosopher'] mb-6">
            <span className="bg-gradient-to-r from-rose-600 via-orange-700 to-yellow-600 bg-clip-text text-transparent">
              Divine Temple Selection
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12">
            Choose from our associated temples where you can offer your sacred chadawas. 
            Each temple has experienced priests who will perform the offering ceremony with devotion.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="px-4 sm:px-6 lg:px-8 pb-12">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl p-6 mb-8 border border-white/50">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`px-5 py-2 rounded-full text-sm font-bold transition-all duration-300 ${
                    selectedCategory === 'all'
                      ? 'bg-gradient-to-r from-orange-500 to-rose-500 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-orange-100'
                  }`}
                >
                  All Temples
                </button>
                <button
                  onClick={() => setSelectedCategory('popular')}
                  className={`px-5 py-2 rounded-full text-sm font-bold transition-all duration-300 ${
                    selectedCategory === 'popular'
                      ? 'bg-gradient-to-r from-orange-500 to-rose-500 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-orange-100'
                  }`}
                >
                  Popular
                </button>
                <button
                  onClick={() => setSelectedCategory('new')}
                  className={`px-5 py-2 rounded-full text-sm font-bold transition-all duration-300 ${
                    selectedCategory === 'new'
                      ? 'bg-gradient-to-r from-orange-500 to-rose-500 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-orange-100'
                  }`}
                >
                  New Arrivals
                </button>
              </div>
              
              <div className="flex items-center gap-4">
                <span className="text-sm font-bold text-gray-700">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 border-2 border-orange-200 rounded-full focus:ring-4 focus:ring-orange-200 focus:border-orange-400 text-sm font-medium bg-white/80 backdrop-blur-sm transition-all duration-300"
                >
                  <option value="featured">Featured</option>
                  <option value="rating">Top Rated</option>
                  <option value="experience">Experience</option>
                  <option value="distance">Nearest</option>
                </select>
              </div>
            </div>
          </div>

          {/* Temple Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {temples.map((temple) => (
              <Link 
                key={temple.id} 
                href={`/chadawa-store/${temple.id}/4/checkout`}
                className="group relative bg-white/90 backdrop-blur-lg rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-white/50 overflow-hidden transform hover:-translate-y-2"
              >
                <div className="relative h-60 overflow-hidden rounded-t-2xl">
                  <Image
                    src={constructImageUrl(temple.image_url)}
                    alt={temple.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                    unoptimized={true}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      // Use a dummy image as fallback
                      target.src = 'https://placehold.co/600x400/orange/white?text=Temple+Image';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-bold text-gray-800 font-['Philosopher'] group-hover:text-orange-600 transition-colors duration-300">
                      {temple.name}
                    </h3>
                    <div className="flex items-center bg-orange-100 text-orange-800 px-2 py-1 rounded-full">
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                      </svg>
                      <span className="text-sm font-bold">5.0</span>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {temple.description}
                  </p>
                  
                  <div className="flex justify-between items-center mb-4">
                    <div className="text-sm">
                      <div className="font-bold text-gray-800">{temple.location}</div>
                      <div className="text-gray-500">Sacred Temple</div>
                    </div>
                    <div className="text-sm">
                      <div className="font-bold text-gray-800">Experienced priests</div>
                      <div className="text-gray-500">Devotional service</div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="text-sm text-gray-600">
                      Divine offerings available
                    </div>
                    <button 
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleTempleSelect(temple.id);
                      }}
                      className="bg-gradient-to-r from-orange-500 to-rose-500 text-white px-4 py-2 rounded-full text-sm font-bold hover:from-orange-600 hover:to-rose-600 transition-all duration-300 transform hover:scale-105"
                    >
                      Select Temple
                    </button>
                  </div>
                </div>
                
                {/* Glow effect on hover */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-orange-400/20 to-rose-400/20 opacity-0 group-hover:opacity-100 blur-xl transition-all duration-500 -z-10"></div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <GlobalFooter />
    </div>
  );
};

export default ChadawaStorePage;