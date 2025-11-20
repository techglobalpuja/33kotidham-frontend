'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import Header from '@/components/layout/Header';
import GlobalFooter from '@/components/layout/GlobalFooter';
import { apiService } from '@/services/api';
import { Temple, Chadawa } from '@/types';

const TempleDetailPage: React.FC = () => {
  const params = useParams();
  const { templeId } = params;
  
  const [temple, setTemple] = useState<Temple | null>(null);
  const [chadawas, setChadawas] = useState<Chadawa[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {
    const fetchTempleData = async () => {
      try {
        setLoading(true);
        // Fetch specific temple data by ID
        const templeData = await apiService.getTempleById(parseInt(templeId as string));
        setTemple(templeData);
        
        // Use chadawas from temple data directly
        // If the temple data doesn't include chadawas, fetch all chadawas as fallback
        if (templeData.chadawas && templeData.chadawas.length > 0) {
          // Convert the chadawas data to the proper Chadawa type
          const formattedChadawas = templeData.chadawas.map((chadawa) => ({
            id: chadawa.id,
            name: chadawa.name,
            description: chadawa.description,
            image_url: chadawa.image_url,
            price: chadawa.price,
            requires_note: chadawa.requires_note
          }));
          setChadawas(formattedChadawas);
        } else {
          // Fallback: fetch all chadawas if temple doesn't have them
          const chadawaData = await apiService.getChadawas();
          setChadawas(chadawaData);
        }
      } catch (err) {
        setError('Failed to fetch temple data');
        console.error('Error fetching temple data:', err);
      } finally {
        setLoading(false);
      }
    };

    if (templeId) {
      fetchTempleData();
    }
  }, [templeId]);

  // Handle chadawa selection
  const handleChadawaSelect = (chadawaId: number) => {
    // Navigate to the specific chadawa checkout page
    window.location.href = `/chadawa-store/${templeId}/${chadawaId}/checkout`;
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
        <div className="text-2xl font-['Philosopher'] text-orange-600">Loading temple details...</div>
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

  if (!temple) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50/50 via-yellow-50/30 to-rose-50/50 flex items-center justify-center">
        <div className="text-2xl font-['Philosopher'] text-red-600">Temple not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50/50 via-yellow-50/30 to-rose-50/50">
      <Header />
      
      {/* Breadcrumb */}
      <section className="pt-28 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <nav className="flex items-center text-sm text-gray-500 mb-8">
            <Link href="/" className="hover:text-orange-600">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/chadawa-store" className="hover:text-orange-600">Chadawa Store</Link>
            <span className="mx-2">/</span>
            <span className="text-orange-600 font-medium">{temple.name}</span>
          </nav>
        </div>
      </section>

      {/* Temple Hero Section */}
      <section className="pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Temple Image */}
            <div className="space-y-6">
              <div className="relative h-96 rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src={constructImageUrl(temple.image_url)}
                  alt={temple.name}
                  fill
                  className="object-cover"
                  unoptimized={true}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'https://placehold.co/600x400/orange/white?text=Temple+Image';
                  }}
                />
              </div>
            </div>
            
            {/* Temple Info */}
            <div>
              <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl p-8 border border-white/50">
                <div className="flex justify-between items-start mb-4">
                  <h1 className="text-3xl font-bold text-gray-800 font-['Philosopher']">{temple.name}</h1>
                  <div className="flex items-center bg-orange-100 text-orange-800 px-3 py-1 rounded-full">
                    <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                    <span className="font-bold">5.0</span>
                    <span className="text-xs ml-1">(Experienced priests)</span>
                  </div>
                </div>
                
                <div className="flex items-center text-gray-600 mb-6">
                  <svg className="w-5 h-5 mr-2 text-orange-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                  </svg>
                  <span>{temple.location}</span>
                  <span className="mx-2">•</span>
                  <span>Sacred Temple</span>
                </div>
                
                <p className="text-gray-600 mb-6">{temple.description}</p>
                
                <div className="mb-8 p-4 bg-orange-50 rounded-xl border border-orange-200">
                  <h3 className="font-bold text-orange-800 mb-2">Temple Highlights</h3>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <li className="flex items-center">
                      <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700">Experienced priests</span>
                    </li>
                    <li className="flex items-center">
                      <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700">{chadawas.length} different chadawas available</span>
                    </li>
                    <li className="flex items-center">
                      <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700">Daily puja ceremonies</span>
                    </li>
                    <li className="flex items-center">
                      <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700">Traditional rituals performed</span>
                    </li>
                  </ul>
                </div>
                
                <div className="text-center">
                  <button className="px-6 py-3 bg-gradient-to-r from-orange-500 to-rose-500 text-white font-bold rounded-2xl hover:from-orange-600 hover:to-rose-600 transition-all duration-300 transform hover:scale-105 shadow-lg">
                    Learn More About Our Rituals
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Full Description */}
          <div className="mt-12 bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl p-8 border border-white/50">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">About This Temple</h2>
            <p className="text-gray-600 leading-relaxed">{temple.description}</p>
          </div>
          
          {/* Chadawa Selection */}
          <div className="mt-12">
            <h2 className="text-3xl font-bold text-gray-800 text-center mb-4 font-['Philosopher']">
              Select a Chadawa for Your Offering
            </h2>
            <p className="text-gray-600 text-center mb-12 max-w-3xl mx-auto">
              Choose from our collection of sacred chadawas, each crafted with devotion and traditional artistry. 
              Our priests will perform the offering ceremony according to traditional rituals.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {chadawas.map((chadawa) => (
                <div 
                  key={chadawa.id}
                  onClick={() => handleChadawaSelect(chadawa.id)}
                  className={`group relative bg-white/90 backdrop-blur-lg rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border-2 overflow-hidden cursor-pointer transform hover:-translate-y-2 ${
                    'border-white/50 hover:border-orange-300'
                  }`}
                >
                  <div className="relative h-52 overflow-hidden rounded-t-2xl">
                    <Image
                      src={constructImageUrl(chadawa.image_url)}
                      alt={chadawa.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                      unoptimized={true}
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = 'https://placehold.co/600x400/orange/white?text=Chadawa+Image';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                  </div>
                  
                  <div className="p-5">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-bold text-gray-800 group-hover:text-orange-600 transition-colors duration-300">
                        {chadawa.name}
                      </h3>
                      <div className="flex items-center bg-orange-100 text-orange-800 px-2 py-1 rounded-full">
                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                        </svg>
                        <span className="text-xs font-bold">5.0</span>
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">{chadawa.description}</p>
                    
                    <div className="flex justify-between items-center">
                      <div className="text-lg font-bold text-orange-600">₹{parseFloat(chadawa.price).toFixed(2)}</div>
                      <div className="text-xs text-gray-500">Popular choice</div>
                    </div>
                  </div>
                  

                </div>
              ))}
            </div>
            
            {/* Checkout Button */}
            <div className="mt-12 text-center">
              <button
                onClick={() => {
                  // If there's a selected chadawa, go to its checkout page
                  // Otherwise, go to the first chadawa checkout page
                  const chadawaToCheckout = chadawas.length > 0 ? chadawas[0].id : 1;
                  window.location.href = `/chadawa-store/${templeId}/${chadawaToCheckout}/checkout`;
                }}
                className="px-12 py-4 rounded-2xl text-lg font-bold shadow-lg transform transition-all duration-300 bg-gradient-to-r from-orange-500 to-rose-500 text-white hover:from-orange-600 hover:to-rose-600 hover:scale-105"
              >
                Proceed to Checkout
              </button>
            </div>

          </div>
        </div>
      </section>

      <GlobalFooter />
    </div>
  );
};

export default TempleDetailPage;