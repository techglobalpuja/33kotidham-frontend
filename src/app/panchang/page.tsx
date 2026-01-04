'use client';

import React, { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import GlobalFooter from '@/components/layout/GlobalFooter';
import { apiService } from '@/services/api';

interface PanchangData {
  day: string;
  tithi: string;
  yog: string;
  nakshatra: string;
  karan: string;
  sunrise: string;
  sunset: string;
}

const PanchangPage: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [panchangData, setPanchangData] = useState<PanchangData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [location, setLocation] = useState<{ lat: number; lon: number; city: string } | null>(null);
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Get user's location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
            city: 'Your Location',
          });
        },
        (error) => {
          console.error('Error getting location:', error);
          // Default to New Delhi coordinates
          setLocation({
            lat: 28.6139,
            lon: 77.2090,
            city: 'New Delhi',
          });
        }
      );
    } else {
      // Default to New Delhi coordinates
      setLocation({
        lat: 28.6139,
        lon: 77.2090,
        city: 'New Delhi',
      });
    }
  }, []);

  // Fetch Panchang data when location or date changes
  useEffect(() => {
    const fetchPanchangData = async () => {
      if (!location) return;

      setLoading(true);
      setError(null);

      try {
        const data = await apiService.fetchBasicPanchang({
          // Format date as DD/MM/YYYY for the new API
          date: `${selectedDate.getDate().toString().padStart(2, '0')}/${(selectedDate.getMonth() + 1).toString().padStart(2, '0')}/${selectedDate.getFullYear()}`,
          coordinates: {
            latitude: location.lat,
            longitude: location.lon,
          },
          timezone: 5.5, // IST timezone
          time: `${selectedDate.getHours().toString().padStart(2, '0')}:${selectedDate.getMinutes().toString().padStart(2, '0')}`, // Format time as HH:MM
        });

        setPanchangData(data);
      } catch (err) {
        setError('Failed to fetch Panchang data. Please try again later.');
        console.error('Panchang fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPanchangData();
  }, [location, selectedDate]);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(new Date(e.target.value));
  };

  const formatDate = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

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
                <div className="text-6xl text-orange-600 animate-float font-bold" style={{fontFamily: 'serif'}}>ॐ</div>
                <div className="absolute inset-0 bg-orange-300/20 rounded-full blur-xl animate-pulse"></div>
              </div>
            </div>
            
            <h1 className="text-[52px] sm:text-[64px] md:text-[72px] font-bold leading-[60px] sm:leading-[72px] md:leading-[80px] mb-8">
              <span className="bg-gradient-to-r from-orange-700 via-rose-600 to-orange-800 bg-clip-text text-transparent">
                पंचांग
              </span>
              <br />
              <span className="bg-gradient-to-r from-rose-600 via-orange-700 to-yellow-600 bg-clip-text text-transparent">
                Daily Panchang
              </span>
            </h1>
            
            <p className="text-[20px] sm:text-[22px] md:text-[24px] font-normal leading-[32px] sm:leading-[34px] md:leading-[36px] max-w-5xl mx-auto text-gray-700 mb-8">
              Discover today&apos;s auspicious timings, tithis, nakshatras, and divine guidance from ancient Vedic wisdom.
              <br className="hidden sm:block" />
              Plan your important activities according to cosmic energies.
            </p>

            {/* Date and Location Selector */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
              <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg p-4 border border-white/50">
                <label className="block text-sm font-bold text-gray-700 mb-2">Select Date</label>
                <input
                  type="date"
                  value={formatDate(selectedDate)}
                  onChange={handleDateChange}
                  className="px-4 py-2 border-2 border-orange-200 rounded-xl focus:ring-4 focus:ring-orange-200 focus:border-orange-400 text-gray-700 font-medium bg-white/80 backdrop-blur-sm transition-all duration-300"
                />
              </div>
              
              {location && (
                <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg p-4 border border-white/50">
                  <div className="text-sm font-bold text-gray-700 mb-1">Location</div>
                  <div className="text-orange-600 font-medium">{location.city}</div>
                  <div className="text-xs text-gray-500">
                    {location.lat.toFixed(2)}°N, {location.lon.toFixed(2)}°E
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Panchang Details Section */}
      <section className="relative py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-orange-500"></div>
            </div>
          ) : error ? (
            <div className="bg-red-50 border-2 border-red-200 rounded-3xl p-8 text-center">
              <p className="text-red-600 font-medium text-lg">{error}</p>
            </div>
          ) : panchangData ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              
              {/* Today's Panchang */}
              <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl p-8 border border-white/50">
                <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
                  Panchang Details
                </h2>
                
                <div className="space-y-6">
                  <div className="flex justify-between items-center p-4 bg-gradient-to-r from-orange-50 to-rose-50 rounded-2xl">
                    <span className="font-bold text-gray-700">वार (Day)</span>
                    <span className="text-orange-600 font-medium">{panchangData.day}</span>
                  </div>
                  
                  <div className="flex justify-between items-center p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl">
                    <span className="font-bold text-gray-700">तिथि (Tithi)</span>
                    <span className="text-orange-600 font-medium">{panchangData.tithi}</span>
                  </div>
                  
                  <div className="flex justify-between items-center p-4 bg-gradient-to-r from-rose-50 to-pink-50 rounded-2xl">
                    <span className="font-bold text-gray-700">नक्षत्र (Nakshatra)</span>
                    <span className="text-orange-600 font-medium">{panchangData.nakshatra}</span>
                  </div>
                  
                  <div className="flex justify-between items-center p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl">
                    <span className="font-bold text-gray-700">योग (Yoga)</span>
                    <span className="text-orange-600 font-medium">{panchangData.yog}</span>
                  </div>
                  
                  <div className="flex justify-between items-center p-4 bg-gradient-to-r from-green-50 to-teal-50 rounded-2xl">
                    <span className="font-bold text-gray-700">करण (Karana)</span>
                    <span className="text-orange-600 font-medium">{panchangData.karan}</span>
                  </div>
                </div>
              </div>
              
              {/* Sunrise & Sunset */}
              <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl p-8 border border-white/50">
                <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
                  Sun Timings
                </h2>
                
                <div className="space-y-6">
                  <div className="p-6 bg-gradient-to-r from-orange-50 to-amber-50 rounded-2xl">
                    <div className="flex items-center justify-center mb-4">
                      <div className="text-5xl">🌅</div>
                    </div>
                    <h3 className="font-bold text-gray-700 mb-2 text-center text-xl">Sunrise</h3>
                    <p className="text-orange-600 font-bold text-2xl text-center">{panchangData.sunrise}</p>
                  </div>
                  
                  <div className="p-6 bg-gradient-to-r from-rose-50 to-pink-50 rounded-2xl">
                    <div className="flex items-center justify-center mb-4">
                      <div className="text-5xl">🌇</div>
                    </div>
                    <h3 className="font-bold text-gray-700 mb-2 text-center text-xl">Sunset</h3>
                    <p className="text-rose-600 font-bold text-2xl text-center">{panchangData.sunset}</p>
                  </div>

                  {/* Info Box */}
                  <div className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl">
                    <p className="text-sm text-gray-600 text-center">
                      <span className="font-bold">Note:</span> Timings are calculated based on your location and selected date.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </section>
      
      <GlobalFooter />
    </div>
  );
};

export default PanchangPage;
