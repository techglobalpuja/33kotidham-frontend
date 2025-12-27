'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Header from '@/components/layout/Header';
import CountdownTimer from '@/components/CountdownTimer';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store';
import { fetchPujaById } from '@/store/slices/pujaSlice';
import { PujaCard, Plan } from '@/types';
import { apiService } from '@/services/api';

interface BackendPujaBenefit {
  id: number;
  benefit_title: string;
  benefit_description: string;
  puja_id: number;
  created_at: string;
}

interface BackendPujaImage {
  id: number;
  image_url: string;
}

interface ExtendedPujaCard {
  id: string;
  image: string;
  title: string;
  temple: string;
  description: string;
  date: string;
  time?: string;
  benefits: BackendPujaBenefit[];
  images: BackendPujaImage[];
  temple_description?: string;
  temple_image_url?: string;
  prasad_price?: number;
  is_prasad_active?: boolean;
  dakshina_prices_inr?: string;
  dakshina_prices_usd?: string;
  is_dakshina_active?: boolean;
  manokamna_prices_inr?: string;
  manokamna_prices_usd?: string;
  is_manokamna_active?: boolean;
  sub_heading?: string;
  temple_address?: string;
  isNew?: boolean;
  timer?: boolean;
  shareLabel?: string;
  plan_ids?: number[];
  selectedPlans?: Plan[];
}

const PujaDetailPage: React.FC = () => {
  const params = useParams();
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { selectedPuja, isLoading, error } = useSelector((state: RootState) => state.puja);
  
  const pujaId = params.id as string;
  const [selectedImageIndex, setSelectedImageIndex] = useState(1);
  const [isNavSticky, setIsNavSticky] = useState(false);
  const [activeSection, setActiveSection] = useState('packages');
  const [selectedPlans, setSelectedPlans] = useState<Plan[]>([]);
  const [loadingPlans, setLoadingPlans] = useState(false);
  
  const navRef = useRef<HTMLDivElement>(null);
  const packagesRef = useRef<HTMLDivElement>(null!);
  const aboutRef = useRef<HTMLDivElement>(null!);
  const benefitsRef = useRef<HTMLDivElement>(null!);
  const processRef = useRef<HTMLDivElement>(null!);
  const templeRef = useRef<HTMLDivElement>(null!);
  const reviewsRef = useRef<HTMLDivElement>(null!);
  const faqRef = useRef<HTMLDivElement>(null!);

  // Auto-slide interval ref
  const autoSlideRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (pujaId) {
      dispatch(fetchPujaById(pujaId));
    }
  }, [dispatch, pujaId]);

  useEffect(() => {
    const handleScroll = () => {
      if (navRef.current) {
        const navTop = navRef.current.offsetTop;
        setIsNavSticky(window.scrollY > navTop);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [navRef, setIsNavSticky]);

  const nextImage = useCallback(() => {
    if (selectedPuja) {
      const puja = selectedPuja as ExtendedPujaCard;
      if (puja.images && puja.images.length > 1) {
        setSelectedImageIndex((prevIndex) => {
          const nextIndex = prevIndex + 1;
          if (nextIndex >= puja.images.length) {
            return 1;
          }
          if (nextIndex === 0) {
            return 1;
          }
          return nextIndex;
        });
      }
    }
  }, [selectedPuja]);

  // Auto-slide effect
  useEffect(() => {
    const startAutoSlide = () => {
      if (autoSlideRef.current) {
        clearInterval(autoSlideRef.current);
      }
      
      autoSlideRef.current = setInterval(() => {
        nextImage();
      }, 5000); // Change slide every 5 seconds
    };

    if (selectedPuja && isExtendedPuja(selectedPuja) && selectedPuja.images && selectedPuja.images.length > 1) {
      startAutoSlide();
    }

    return () => {
      if (autoSlideRef.current) {
        clearInterval(autoSlideRef.current);
      }
    };
  }, [selectedPuja, nextImage]);

  // Fetch plans when puja data is loaded
  useEffect(() => {
    const fetchPlans = async () => {
      if (selectedPuja && isExtendedPuja(selectedPuja) && selectedPuja.plan_ids && selectedPuja.plan_ids.length > 0) {
        setLoadingPlans(true);
        try {
          const plans = await Promise.all(
            selectedPuja.plan_ids.map(id => apiService.getPlanById(id))
          );
          setSelectedPlans(plans);
        } catch (error) {
          console.error('Error fetching plans:', error);
        } finally {
          setLoadingPlans(false);
        }
      }
    };

    fetchPlans();
  }, [selectedPuja]);

  const scrollToSection = (ref: React.RefObject<HTMLDivElement>, section: string) => {
    setActiveSection(section);
    ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const constructImageUrl = (imagePath: string) => {
    console.log('Constructing image URL for:', imagePath);
    // If it's already a full URL, return as is
    if (imagePath && imagePath.startsWith('http')) {
      console.log('Returning full URL as is:', imagePath);
      return imagePath;
    }
    
    // If it's a relative path, construct the full URL using the production API domain
    if (imagePath && !imagePath.startsWith('http')) {
      try {
        const trimmedPath = imagePath.trim();
        console.log('Trimmed path:', trimmedPath);
        if (trimmedPath && trimmedPath.length > 0) {
          // Use the production API domain as specified
          const baseUrl = 'https://api.33kotidham.com';
          const fullPath = `${baseUrl}${trimmedPath.startsWith('/') ? '' : '/'}${trimmedPath}`;
          console.log('Constructed full path:', fullPath);
          return fullPath;
        }
      } catch (error) {
        console.warn('Error constructing full image URL:', error);
      }
    }
    
    // Fallback to placeholder
    console.log('Returning placeholder for:', imagePath);
    return '/placeholder.jpg';
  };

  const prevImage = () => {
    if (selectedPuja) {
      const puja = selectedPuja as ExtendedPujaCard;
      if (puja.images && puja.images.length > 1) {
        setSelectedImageIndex((prevIndex) => {
          const prevIndexValue = prevIndex - 1;
          if (prevIndexValue < 1) {
            return puja.images.length - 1;
          }
          if (prevIndexValue === 0) {
            return puja.images.length - 1;
          }
          return prevIndexValue;
        });
      }
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-orange-50 via-white to-orange-50">
        <Header />
        <div className="pt-24 flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
        </div>
      </div>
    );
  }

  if (error || !selectedPuja) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-orange-50 via-white to-orange-50">
        <Header />
        <div className="pt-24 flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              {error ? 'Error Loading Puja' : 'Puja Not Found'}
            </h1>
            {error && <p className="text-gray-600 mb-4">{error}</p>}
            <button
              onClick={() => router.push('/')}
              className="bg-orange-500 text-white px-8 py-3 rounded-full hover:bg-orange-600 transition-all shadow-lg hover:shadow-xl"
            >
              Go Back Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  const isExtendedPuja = (puja: unknown): puja is ExtendedPujaCard => {
    return (puja as ExtendedPujaCard)?.benefits !== undefined && (puja as ExtendedPujaCard)?.images !== undefined;
  };

  let pujaImages: BackendPujaImage[] = [];
  let pujaBenefits: BackendPujaBenefit[] = [];
  
  if (selectedPuja) {
    if (isExtendedPuja(selectedPuja)) {
      pujaImages = selectedPuja.images || [];
      pujaBenefits = selectedPuja.benefits || [];
    } else {
      const standardPuja = selectedPuja as PujaCard;
      pujaImages = standardPuja.image ? [{ id: 1, image_url: standardPuja.image }] : [];
      pujaBenefits = [];
    }
  }
 const formatDate = (dateString: string | null) => {
  if (!dateString) return 'N/A';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-IN', { 
    weekday: 'short', // adds day name like Mon, Tue
    day: '2-digit', 
    month: 'short', 
    year: 'numeric'
  });
};



return (
  <div className="min-h-screen bg-gradient-to-b from-orange-50 via-white to-orange-50">
    <Header />
    
    <main className="pt-20 pb-16">
      
      {/* Hero Section - Matching Image Design */}
      <div className="bg-gradient-to-br from-orange-50 to-amber-50 border-b-4 border-orange-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8 items-center">
            
            {/* Left - Image Card */}
            <div className="relative">
              <div className="bg-gradient-to-br from-orange-100 to-amber-100 rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                {/* Badge */}
                

                {/* Image Carousel */}
                <div className="relative w-full h-[400px] md:h-[400px] lg:h-[600px]">
                  {pujaImages.length > 0 && pujaImages[selectedImageIndex] ? (
                    <Image
                      src={constructImageUrl(pujaImages[selectedImageIndex].image_url)}
                      alt={selectedPuja.title}
                      fill
                      className="object-cover"
                      unoptimized={true}
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-orange-300 to-amber-400">
                      <span className="text-white text-7xl">🛕</span>
                    </div>
                  )}

                    {/* Carousel Navigation */}
                    {pujaImages.length > 1 && (
                      <>
                        <button 
                          onClick={prevImage}
                          className="absolute left-3 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 rounded-full p-2 shadow-lg transition-all z-10"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                          </svg>
                        </button>
                        <button 
                          onClick={nextImage}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 rounded-full p-2 shadow-lg transition-all z-10"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
                        
                        {/* Dots */}
                        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
                          {pujaImages.map((_, index) => (
                            <button
                              key={index}
                              onClick={() => setSelectedImageIndex(index)}
                              className={`h-2 rounded-full transition-all ${
                                index === selectedImageIndex ? 'bg-orange-500 w-6' : 'bg-white/60 w-2'
                              }`}
                            />
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Right - Content */}
              <div>
                <h1 className="text-4xl md:text-4xl font-bold text-gray-900 mb-3 leading-tight">
                  {selectedPuja.title || 'Baglamukhi-Mahalakshmi 11000 Mool Mantra Jaap + Havan'}
                </h1>
                <p className="text-lg text-gray-600 mb-6">
                  {isExtendedPuja(selectedPuja) ? (selectedPuja as ExtendedPujaCard).sub_heading: 'For accomplishment of tasks, power of attraction (Vashikaran), destruction of enemies, and wealth'}
                </p>

                {/* Info Grid */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">📅</span>
                    <div>
                      <p className="text-md font-semibold text-gray-900">{formatDate(selectedPuja.date)}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">🛕</span>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{selectedPuja.temple}</p>
                    </div>
                  </div>
                  {pujaBenefits && pujaBenefits.length > 0 ? (
                    pujaBenefits.slice(0, 4).map((benefit) => (
                      <div key={benefit.id} className="flex items-center gap-3">
                        <span className="text-orange-500 text-xl">🕉️</span>
                        <div>
                          <p className="text-sm text-gray-700">{benefit.benefit_title}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <>
                      <div className="flex items-center gap-3">
                        <span className="text-orange-500 text-xl">🕉️</span>
                        <div>
                          <p className="text-sm text-gray-700">Enemy Destruction</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-orange-500 text-xl">🕉️</span>
                        <div>
                          <p className="text-sm text-gray-700">Attraction of Wealth</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-orange-500 text-xl">🕉️</span>
                        <div>
                          <p className="text-sm text-gray-700">Freedom from Black Magic & Evil Eye</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-orange-500 text-xl">🕉️</span>
                        <div>
                          <p className="text-sm text-gray-700">Relief from Court Cases & Legal Issues</p>
                        </div>
                      </div>
                    </>
                  )}
                </div>

                {/* Booking Info */}
                <div className="bg-orange-100 border-l-4 border-orange-500 p-4 mb-4 rounded-r-lg">
                  <p className="text-orange-800 font-semibold flex items-center gap-2">
                    <span className="text-2xl">🔥</span>
                    <span>194 | Devotees already booked this Puja.</span>
                  </p>
                </div>

                {/* Countdown Timer */}
                {selectedPuja.date && selectedPuja.time && (
                  <div className="mb-6 w-[165px]" translate="no">
                    <CountdownTimer date={selectedPuja.date} time={selectedPuja.time} />
                  </div>
                )}

                {/* CTA Buttons */}
                <div className="flex gap-4">
                  <button 
                    onClick={() => scrollToSection(packagesRef, 'packages')}
                    className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold py-3 px-6 rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all shadow-lg flex items-center justify-center gap-2"
                  >
                    <span>PARTICIPATE NOW</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sticky Navigation */}
        {/* <div ref={navRef} className={`bg-white border-b-2 border-gray-200 ${isNavSticky ? 'fixed top-20 left-0 right-0 z-40 shadow-lg' : ''}`}> */}
          <div className=" px-10 border-b-2 border-gray-200 shadow-lg bg-white sticky top-[75px] z-40">
            <div className="flex items-center justify-between overflow-x-auto">
              <button
                onClick={() => scrollToSection(packagesRef, 'packages')}
                className={`py-4 px-6 font-semibold transition-all whitespace-nowrap ${
                  activeSection === 'packages' ? 'text-orange-600 border-b-3 border-orange-600' : 'text-gray-600 hover:text-orange-600'
                }`}
              >
                Puja Packages
              </button>
              <button
                onClick={() => scrollToSection(aboutRef, 'about')}
                className={`py-4 px-6 font-semibold transition-all whitespace-nowrap ${
                  activeSection === 'about' ? 'text-orange-600 border-b-3 border-orange-600' : 'text-gray-600 hover:text-orange-600'
                }`}
              >
                About Puja
              </button>
              <button
                onClick={() => scrollToSection(benefitsRef, 'benefits')}
                className={`py-4 px-6 font-semibold transition-all whitespace-nowrap ${
                  activeSection === 'benefits' ? 'text-orange-600 border-b-3 border-orange-600' : 'text-gray-600 hover:text-orange-600'
                }`}
              >
                Puja Benefits
              </button>
              <button
                onClick={() => scrollToSection(processRef, 'process')}
                className={`py-4 px-6 font-semibold transition-all whitespace-nowrap ${
                  activeSection === 'process' ? 'text-orange-600 border-b-3 border-orange-600' : 'text-gray-600 hover:text-orange-600'
                }`}
              >
                Puja Process
              </button>
              <button
                onClick={() => scrollToSection(templeRef, 'temple')}
                className={`py-4 px-6 font-semibold transition-all whitespace-nowrap ${
                  activeSection === 'temple' ? 'text-orange-600 border-b-3 border-orange-600' : 'text-gray-600 hover:text-orange-600'
                }`}
              >
                Temple Details
              </button>
              <button
                onClick={() => scrollToSection(reviewsRef, 'reviews')}
                className={`py-4 px-6 font-semibold transition-all whitespace-nowrap ${
                  activeSection === 'reviews' ? 'text-orange-600 border-b-3 border-orange-600' : 'text-gray-600 hover:text-orange-600'
                }`}
              >
                Reviews
              </button>
              <button
                onClick={() => scrollToSection(faqRef, 'faq')}
                className={`py-4 px-6 font-semibold transition-all whitespace-nowrap ${
                  activeSection === 'faq' ? 'text-orange-600 border-b-3 border-orange-600' : 'text-gray-600 hover:text-orange-600'
                }`}
              >
                FAQ
              </button>
            </div>
          </div>
        {/* </div> */}

        {/* Puja Packages Section */}
        <div ref={packagesRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 mb-16 scroll-mt-20">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Puja Packages
            </h2>
            <p className="text-gray-600">Choose the offering that suits your spiritual needs</p>
          </div>

          <div className="flex flex-wrap justify-center gap-6">
            {loadingPlans ? (
              <div className="col-span-full flex justify-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
              </div>
            ) : selectedPlans && selectedPlans.length > 0 ? (
              selectedPlans.map((plan, index) => {
                // Determine if this is a featured or luxury plan based on index or other criteria
                const isFeatured = index === 1; // Example: make the second plan featured
                const isLuxury = index === 3; // Example: make the fourth plan luxury
                
                return (
                  <div
                    key={plan.id}
                    className={`w-full sm:w-[calc(50%-12px)] lg:w-[calc(25%-18px)] max-w-sm bg-white rounded-2xl p-6 shadow-lg border-2 hover:shadow-xl transition-all ${
                      isFeatured ? 'border-orange-400 relative scale-105' : isLuxury ? 'border-red-300' : 'border-orange-100 hover:scale-105'
                    }`}
                  >
                    {isFeatured && (
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-orange-500 text-white px-4 py-1 rounded-full text-xs font-bold">
                        POPULAR
                      </div>
                    )}
                    <div className="text-center">
                      <div className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-3 ${
                        isLuxury ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white' : 'bg-orange-100 text-orange-600'
                      }`}>
                        {plan.name}
                      </div>
                      <div className="text-3xl font-bold text-orange-600 mb-1">₹{plan.price}</div>
                      <button 
                        className={`w-full font-semibold py-2.5 px-4 rounded-full transition-all duration-200 mb-4 ${
                          isFeatured ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-md' : 'bg-orange-500 hover:bg-orange-600 text-white'
                        }`}
                        onClick={() => router.push(`/puja/${pujaId}/checkout?planId=${plan.id}&planPrice=${plan.price}&planName=${encodeURIComponent(plan.name)}`)}
                      >
                        SELECT
                      </button>
                      <ul className="text-left space-y-2 text-sm">
                        {/* Display plan description features */}
                        {plan.description.feature1 && (
                          <li className="flex items-start gap-2">
                            <span className="text-orange-500 mt-0.5">✓</span>
                            <span className="text-gray-700">{plan.description.feature1}</span>
                          </li>
                        )}
                        {plan.description.feature2 && (
                          <li className="flex items-start gap-2">
                            <span className="text-orange-500 mt-0.5">✓</span>
                            <span className="text-gray-700">{plan.description.feature2}</span>
                          </li>
                        )}
                        {plan.description.feature3 && (
                          <li className="flex items-start gap-2">
                            <span className="text-orange-500 mt-0.5">✓</span>
                            <span className="text-gray-700">{plan.description.feature3}</span>
                          </li>
                        )}
                        {plan.description.feature4 && (
                          <li className="flex items-start gap-2">
                            <span className="text-orange-500 mt-0.5">✓</span>
                            <span className="text-gray-700">{plan.description.feature4}</span>
                          </li>
                        )}
                      </ul>
                    </div>
                  </div>
                );
              })
            ) : (
              // Fallback to static data if no plans are available
              [
                { price: '50', label: 'BASIC', features: ['Complete puja ceremony', 'Prasad delivery', 'Photo documentation', 'Energized rudraksha'] },
                { price: '7000', label: 'STANDARD', features: ['All Basic benefits', 'Live video participation', 'Personal sankalp', 'Energized yantra'], featured: true },
                { price: '9000', label: 'PREMIUM', features: ['All Standard benefits', 'Extended ceremony', 'Horoscope consultation', 'Premium prasad'] },
                { price: '12000', label: 'LUXURY', features: ['All Premium benefits', 'Priority scheduling', 'Lifetime guidance', 'Exclusive items'], luxury: true }
              ].map((pkg, index) => (
                <div
                  key={index}
                  className={`w-full sm:w-[calc(50%-12px)] lg:w-[calc(25%-18px)] max-w-sm bg-white rounded-2xl p-6 shadow-lg border-2 hover:shadow-xl transition-all ${
                    pkg.featured ? 'border-orange-400 relative scale-105' : pkg.luxury ? 'border-red-300' : 'border-orange-100 hover:scale-105'
                  }`}
                >
                  {pkg.featured && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-orange-500 text-white px-4 py-1 rounded-full text-xs font-bold">
                      POPULAR
                    </div>
                  )}
                  <div className="text-center">
                    <div className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-3 ${
                      pkg.luxury ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white' : 'bg-orange-100 text-orange-600'
                    }`}>
                      {pkg.label}
                    </div>
                    <div className="text-3xl font-bold text-orange-600 mb-1">₹{pkg.price}</div>
                    <button 
                      className={`w-full font-semibold py-2.5 px-4 rounded-full transition-all duration-200 mb-4 ${
                        pkg.featured ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-md' : 'bg-orange-500 hover:bg-orange-600 text-white'
                      }`}
                      onClick={() => router.push(`/puja/${pujaId}/checkout?planId=${pkg.label}&planPrice=${pkg.price}`)}
                    >
                      SELECT
                    </button>
                    <ul className="text-left space-y-2 text-sm">
                      {pkg.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-orange-500 mt-0.5">✓</span>
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* About Puja Section */}
        <div ref={aboutRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 scroll-mt-20">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              About This Puja
            </h2>
          </div>
          
          <div className="bg-white rounded-3xl p-10 shadow-xl border border-orange-100">
            <p className="text-gray-700 text-lg leading-relaxed text-center">
              {selectedPuja.description || 'In Tantra Shastra, Maa Baglamukhi is considered immediately result-giving. In Kaliyuga, her worship destroys enemies, ensures success in legal matters, removes negativity, grants success in government-related work, and bestows attraction and hypnotic powers. When the chanting of Maa Baglamukhi\'s root mantras is performed along with the worship of Mahalakshmi, life becomes filled with wealth, prosperity, happiness, and abundance.'}
            </p>
          </div>
        </div>

        {/* Puja Benefits Section */}
        <div ref={benefitsRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 scroll-mt-20">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Puja Benefits
            </h2>
            <p className="text-gray-600">Experience divine blessings and transformation</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pujaBenefits && pujaBenefits.length > 0 ? (
              pujaBenefits.slice(0, 4).map((benefit, index) => (
                <div key={benefit.id} className="bg-white rounded-2xl p-8 shadow-lg border border-orange-100 hover:shadow-xl transition-all hover:scale-105 text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-orange-100 to-orange-200 rounded-full flex items-center justify-center mx-auto mb-5">
                    <span className="text-4xl">
                      {index === 0 && '🛡️'}
                      {index === 1 && '⭐'}
                      {index === 2 && '💪'}
                      {index === 3 && '💰'}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {benefit.benefit_title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {benefit.benefit_description}
                  </p>
                </div>
              ))
            ) : (
              <>
                {[
                  { icon: '🛡️', title: 'Divine Protection', desc: 'Receive powerful protection from negative energies and evil influences' },
                  { icon: '⭐', title: 'Remove Obstacles', desc: 'Clear all barriers and challenges blocking your path to success' },
                  { icon: '💪', title: 'Spiritual Strength', desc: 'Gain inner power and confidence to overcome life\'s challenges' },
                  { icon: '💰', title: 'Prosperity & Wealth', desc: 'Attract abundance and financial success into your life' }
                ].map((benefit, i) => (
                  <div key={i} className="bg-white rounded-2xl p-8 shadow-lg border border-orange-100 hover:shadow-xl transition-all hover:scale-105 text-center">
                    <div className="w-20 h-20 bg-gradient-to-br from-orange-100 to-orange-200 rounded-full flex items-center justify-center mx-auto mb-5">
                      <span className="text-4xl">{benefit.icon}</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{benefit.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{benefit.desc}</p>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>

        {/* Puja Process Section - Enhanced */}
        <div ref={processRef} className="bg-gradient-to-br from-orange-50 to-amber-50 py-16 scroll-mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                Puja Process
              </h2>
              <p className="text-gray-600 text-lg">Follow these simple steps to participate in this sacred ritual</p>
            </div>

            <div className="relative">
              {/* Connection Line */}
              <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-orange-300 via-orange-400 to-orange-300 transform -translate-y-1/2" style={{ top: '80px' }}></div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
                {[
                  { icon: '🛕', title: 'Select Package', desc: 'Choose your preferred puja package from our offerings', step: 1 },
                  { icon: '📝', title: 'Submit Details', desc: 'Provide your birth details and specific intentions for the ceremony', step: 2 },
                  { icon: '📹', title: 'Join Live', desc: 'Participate in real-time via video call and receive blessings', step: 3 },
                  { icon: '📦', title: 'Receive Prasad', desc: 'Get blessed prasad and sacred items delivered to your home', step: 4 }
                ].map((process, i) => (
                  <div key={i} className="text-center group">
                    <div className="relative mb-6 inline-block">
                      <div className="w-32 h-32 bg-white rounded-3xl flex items-center justify-center mx-auto shadow-xl group-hover:shadow-2xl transition-all duration-300 group-hover:scale-110 border-4 border-orange-200">
                        <span className="text-5xl">{process.icon}</span>
                      </div>
                      <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full flex items-center justify-center font-bold text-xl shadow-lg">
                        {process.step}
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{process.title}</h3>
                    <p className="text-gray-600 leading-relaxed px-4">{process.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Temple Details Section */}
        <div ref={templeRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 mb-16 scroll-mt-20">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Temple Details
            </h2>
            <p className="text-gray-600">Sacred site of divine blessings</p>
          </div>

          <div className="bg-white rounded-3xl overflow-hidden shadow-xl border border-orange-100">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="p-10 lg:p-12 flex flex-col justify-center">
                <h3 className="text-3xl font-bold text-gray-900 mb-4">
                  {isExtendedPuja(selectedPuja) && (selectedPuja as ExtendedPujaCard).temple ? 
                    (selectedPuja as ExtendedPujaCard).temple :
                    'Siddha 64 Yogini Temple'
                  }
                </h3>
                
                <p className="text-gray-700 leading-relaxed mb-6">
                  {isExtendedPuja(selectedPuja) && (selectedPuja as ExtendedPujaCard).temple_description ? 
                    (selectedPuja as ExtendedPujaCard).temple_description :
                    'A sacred site of immense spiritual power where divine feminine energy is worshipped through authentic tantric traditions preserved for centuries.'
                  }
                </p>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-gradient-to-br from-orange-50 to-white rounded-xl p-4 border border-orange-100">
                    <div className="text-2xl font-bold text-orange-600">1000+</div>
                    <div className="text-sm text-gray-600">Years Old</div>
                  </div>
                  <div className="bg-gradient-to-br from-orange-50 to-white rounded-xl p-4 border border-orange-100">
                    <div className="text-2xl font-bold text-orange-600">50K+</div>
                    <div className="text-sm text-gray-600">Devotees Yearly</div>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-gradient-to-br from-orange-50 to-white rounded-xl border border-orange-100">
                  <div className="flex-shrink-0 w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                    <span className="text-xl">📍</span>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 mb-1">Location</div>
                    <p className="text-gray-600 text-sm">
                      {isExtendedPuja(selectedPuja) && (selectedPuja as ExtendedPujaCard).temple ? 
                        (selectedPuja as ExtendedPujaCard).temple :
                        'Sacred Temple Road, Ancient District, India'
                      }
                    </p>
                  </div>
                </div>
              </div>

              <div className="relative h-[400px] lg:h-auto">
                {isExtendedPuja(selectedPuja) && (selectedPuja as ExtendedPujaCard).temple_image_url ? (
                  (() => {
                    const templeImageUrl = (selectedPuja as ExtendedPujaCard).temple_image_url || '';
                    console.log('Temple image URL from data:', templeImageUrl);
                    const constructedUrl = constructImageUrl(templeImageUrl);
                    console.log('Constructed temple image URL:', constructedUrl);
                    return (
                      <Image
                        src={constructedUrl}
                        alt={selectedPuja.temple}
                        fill
                        className="object-cover"
                        unoptimized={true}
                      />
                    );
                  })()
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-orange-200 to-orange-400">
                    <span className="text-white text-4xl font-semibold">Temple image here 🛕</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div ref={reviewsRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 scroll-mt-20">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              What Devotees Say
            </h2>
            <p className="text-gray-600">Real experiences from our blessed devotees</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-orange-100 hover:shadow-xl transition-shadow">
              <div className="flex items-center gap-1 text-orange-500 mb-4">
                <span>⭐⭐⭐⭐⭐</span>
              </div>
              <p className="text-gray-700 leading-relaxed mb-6 italic">
                &quot;The puja was conducted with utmost devotion. I could feel the divine energy during the live ceremony. My court case resolved within 2 months. Truly blessed!&quot;
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-200 to-orange-300 rounded-full flex items-center justify-center text-xl font-bold text-orange-700">
                  R
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">Rajesh Kumar</h4>
                  <p className="text-sm text-gray-500">Mumbai, Maharashtra</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg border border-orange-100 hover:shadow-xl transition-shadow">
              <div className="flex items-center gap-1 text-orange-500 mb-4">
                <span>⭐⭐⭐⭐⭐</span>
              </div>
              <p className="text-gray-700 leading-relaxed mb-6 italic">
                &quot;Amazing experience! The priests were knowledgeable and performed every ritual perfectly. I felt a positive shift in my life after this puja. Highly recommend!&quot;
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-200 to-orange-300 rounded-full flex items-center justify-center text-xl font-bold text-orange-700">
                  P
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">Premanand Chauhan</h4>
                  <p className="text-sm text-gray-500">Delhi, NCR</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div ref={faqRef} className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 scroll-mt-20">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-600">Find answers to common questions</p>
          </div>

          <div className="space-y-4">
            {[
              { q: 'How can I participate in the puja?', a: 'You can participate by selecting a package, providing your details, and joining via video call during the ceremony.' },
              { q: 'When will I receive the prasad?', a: 'Blessed prasad and sacred items will be delivered to your doorstep within 7-10 days after the puja completion.' },
              { q: 'Can I customize my puja requirements?', a: 'Yes, you can provide specific intentions and requirements when submitting your details. Our priests will incorporate them into the ceremony.' },
              { q: 'What if I miss the live video call?', a: 'Don\'t worry! We will send you a recorded video of your personalized puja ceremony along with photos.' },
              { q: 'Are the priests experienced?', a: 'Yes, all our priests are highly experienced and trained in authentic Vedic rituals with decades of practice.' }
            ].map((faq, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-md border border-orange-100 hover:shadow-lg transition-shadow">
                <h3 className="font-bold text-gray-900 mb-2 flex items-start gap-3">
                  <span className="text-orange-500">Q.</span>
                  {faq.q}
                </h3>
                <p className="text-gray-600 pl-8">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <div className="bg-gradient-to-r from-orange-500 via-orange-600 to-red-500 rounded-3xl p-12 text-center shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzBoLTEybDYtMTB6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-20"></div>
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Ready to Begin Your Spiritual Journey?
              </h2>
              <p className="text-orange-50 text-lg mb-8 max-w-2xl mx-auto">
                Book your puja today and experience divine blessings through authentic Vedic rituals
              </p>
              <button className="bg-white text-orange-600 font-bold py-4 px-12 rounded-full hover:bg-orange-50 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105">
                BOOK NOW →
              </button>
            </div>
          </div>
        </div>

      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4 text-orange-400">Quick Links</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-orange-400 transition-colors">Home</a></li>
                <li><a href="#" className="hover:text-orange-400 transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-orange-400 transition-colors">All Pujas</a></li>
                <li><a href="#" className="hover:text-orange-400 transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4 text-orange-400">Services</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-orange-400 transition-colors">Online Puja</a></li>
                <li><a href="#" className="hover:text-orange-400 transition-colors">Temple Visits</a></li>
                <li><a href="#" className="hover:text-orange-400 transition-colors">Astrology</a></li>
                <li><a href="#" className="hover:text-orange-400 transition-colors">E-Store</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4 text-orange-400">Connect</h3>
              <ul className="space-y-2 text-gray-400">
                <li className="flex items-center gap-2">
                  <span>📧</span> info@33kotidham.com
                </li>
                <li className="flex items-center gap-2">
                  <span>📱</span> +91 98765 43210
                </li>
                <li className="flex items-center gap-2">
                  <span>📍</span> Gujrat, India
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4 text-orange-400">Follow Us</h3>
              <div className="flex gap-3">
                <a href="#" className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center hover:bg-orange-600 transition-colors">
                  <span className="font-bold">f</span>
                </a>
                <a href="#" className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center hover:bg-orange-600 transition-colors">
                  <span className="font-bold">𝕏</span>
                </a>
                <a href="#" className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center hover:bg-orange-600 transition-colors">
                  <span className="font-bold">in</span>
                </a>
                <a href="#" className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center hover:bg-orange-600 transition-colors">
                  <span className="font-bold">📷</span>
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 33 Koti Dham. All rights reserved. Made with devotion 🙏</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PujaDetailPage;