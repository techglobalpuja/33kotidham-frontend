'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Puja } from '@/types';

const AllPujasPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [isVisible, setIsVisible] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);

  // Animation trigger on component mount
  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Sacred puja benefits data
  const sacredBenefits = [
    {
      icon: "🕉️",
      title: "Spiritual Purification",
      description: "Cleanse your aura and connect with divine energies through ancient Vedic rituals",
      color: "from-orange-400 to-red-500"
    },
    {
      icon: "🪷",
      title: "Inner Peace",
      description: "Find tranquility and balance through sacred mantras and meditative practices",
      color: "from-purple-400 to-pink-500"
    },
    {
      icon: "💰",
      title: "Prosperity & Abundance",
      description: "Attract wealth and success through divine blessings and cosmic alignment",
      color: "from-yellow-400 to-orange-500"
    },
    {
      icon: "🛡️",
      title: "Divine Protection",
      description: "Receive protection from negative energies and obstacles in your path",
      color: "from-blue-400 to-indigo-500"
    },
    {
      icon: "🧘‍♀️",
      title: "Wisdom & Knowledge",
      description: "Enhance your intellect and gain deeper understanding of life's mysteries",
      color: "from-green-400 to-teal-500"
    },
    {
      icon: "❤️",
      title: "Harmonious Relationships",
      description: "Strengthen bonds with loved ones and attract positive relationships",
      color: "from-pink-400 to-rose-500"
    }
  ];

  // Sacred timings data
  const sacredTimings = [
    {
      time: "ब्रह्म मुहूर्त",
      period: "4:00 AM - 6:00 AM",
      description: "The most auspicious time for spiritual practices and divine connection",
      icon: "🌅"
    },
    {
      time: "प्रातःकाल",
      period: "6:00 AM - 9:00 AM",
      description: "Morning prayers and pujas for prosperity and positive energy",
      icon: "☀️"
    },
    {
      time: "सायंकाल",
      period: "6:00 PM - 8:00 PM",
      description: "Evening devotion for peace and spiritual fulfillment",
      icon: "🌅"
    }
  ];

  // Testimonials data
  const testimonials = [
    {
      name: "Rajesh Kumar",
      location: "Mumbai, Maharashtra",
      rating: 5,
      text: "The Ganesh Puja performed here removed all obstacles from my business. Within 3 months, I saw tremendous growth and success. Truly divine experience!",
      puja: "Ganesh Puja",
      image: "/images/testimonial-1.jpg"
    },
    {
      name: "Priya Sharma",
      location: "Delhi, India",
      rating: 5,
      text: "After participating in the Lakshmi Puja, my family experienced unexpected financial blessings. The priests are genuine and the rituals are authentic.",
      puja: "Lakshmi Puja",
      image: "/images/testimonial-2.jpg"
    },
    {
      name: "Amit Patel",
      location: "Ahmedabad, Gujarat",
      rating: 5,
      text: "The Saraswati Puja helped my daughter excel in her studies. She topped her class and got admission to her dream college. Grateful to the divine!",
      puja: "Saraswati Puja",
      image: "/images/testimonial-3.jpg"
    }
  ];

  // FAQ data
  const faqs = [
    {
      question: "How are the pujas performed?",
      answer: "All our pujas are performed by qualified and experienced priests in authentic temples following traditional Vedic procedures. Each ritual is conducted with proper mantras, offerings, and sacred ceremonies."
    },
    {
      question: "Can I attend the puja virtually?",
      answer: "Yes! We offer live streaming of all pujas so you can participate from anywhere in the world. You'll receive a secure link to join the ceremony and can make offerings virtually."
    },
    {
      question: "What is included in the puja package?",
      answer: "Each package includes the complete puja ceremony, prasad delivery to your address, personalized sankalp (intention setting), and a certificate of participation with photos and videos of the ritual."
    },
    {
      question: "How long does a typical puja take?",
      answer: "Most pujas range from 1-3 hours depending on the complexity of the ritual. Simple pujas take about 1 hour while elaborate ceremonies like Rudrabhishek can take up to 3 hours."
    },
    {
      question: "Is prasad delivered internationally?",
      answer: "Yes, we deliver prasad worldwide. For international deliveries, we use special packaging to maintain freshness and ensure the prasad reaches you in perfect condition."
    }
  ];

  // Mock data - In a real app, this would be fetched from API
  const allPujas: Puja[] = [
    {
      id: '1',
      pujaName: 'Ganesh Puja',
      subHeading: 'Remove Obstacles & Bring Prosperity',
      about: 'Lord Ganesha, the remover of obstacles and patron of arts and sciences, is revered as the deva of intellect and wisdom.',
      date: '2024-01-15',
      time: '06:00',
      pujaImages: ['https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop&crop=center', 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800&h=600&fit=crop&crop=center'],
      templeImage: '/images/siddhivinayak-temple.jpg',
      templeAddress: 'Siddhivinayak Temple, Mumbai, Maharashtra',
      templeDescription: 'The Siddhivinayak Temple is one of the most revered temples dedicated to Lord Ganesha in Mumbai.',
      benefits: [
        { title: 'Obstacle Removal', description: 'Eliminates barriers and challenges in personal and professional life' },
        { title: 'Prosperity & Success', description: 'Attracts wealth, success in business ventures and career growth' }
      ],
      selectedPlanIds: ['1', '2'],
      prasadPrice: 500,
      prasadStatus: true,
      dakshinaPrices: '501,1001,2001,5001',
      dakshinaPricesUSD: '6,12,24,60',
      dakshinaStatus: true,
      manokamanaPrices: '101,251,501,1001',
      manokamanaPricesUSD: '1.5,3,6,12',
      manokamnaStatus: true,
      category: 'prosperity',
      isActive: true,
      isFeatured: true,
      createdDate: '2024-01-15'
    },
    {
      id: '2',
      pujaName: 'Lakshmi Puja',
      subHeading: 'Attract Wealth & Abundance',
      about: 'Divine Lakshmi puja for wealth, abundance and financial prosperity.',
      date: '2024-02-10',
      time: '07:00',
      pujaImages: ['https://images.unsplash.com/photo-1604608672516-a224451d4ad3?w=800&h=600&fit=crop&crop=center'],
      templeImage: '/images/lakshmi-temple.jpg',
      templeAddress: 'Mahalakshmi Temple, Kolhapur, Maharashtra',
      templeDescription: 'Ancient temple dedicated to Goddess Lakshmi, known for bestowing wealth and prosperity.',
      benefits: [
        { title: 'Financial Prosperity', description: 'Attracts wealth and financial abundance' },
        { title: 'Business Success', description: 'Enhances business growth and success' }
      ],
      selectedPlanIds: ['1'],
      prasadPrice: 750,
      prasadStatus: true,
      dakshinaPrices: '501,1001,2001',
      dakshinaPricesUSD: '6,12,24',
      dakshinaStatus: true,
      manokamanaPrices: '201,501,1001',
      manokamanaPricesUSD: '2.5,6,12',
      manokamnaStatus: true,
      category: 'prosperity',
      isActive: true,
      isFeatured: false,
      createdDate: '2024-01-10'
    },
    {
      id: '3',
      pujaName: 'Saraswati Puja',
      subHeading: 'Gain Knowledge & Wisdom',
      about: 'Sacred Saraswati puja for knowledge, wisdom and academic success.',
      date: '2024-02-14',
      time: '06:30',
      pujaImages: ['https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop&crop=center', 'https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=800&h=600&fit=crop&crop=center'],
      templeImage: '/images/saraswati-temple.jpg',
      templeAddress: 'Saraswati Temple, Varanasi, Uttar Pradesh',
      templeDescription: 'Sacred temple on the banks of Ganges, dedicated to Goddess Saraswati.',
      benefits: [
        { title: 'Academic Success', description: 'Enhances learning abilities and academic performance' },
        { title: 'Wisdom & Knowledge', description: 'Increases wisdom and intellectual capacity' }
      ],
      selectedPlanIds: ['1', '2'],
      prasadPrice: 300,
      prasadStatus: true,
      dakshinaPrices: '251,501,1001',
      dakshinaPricesUSD: '3,6,12',
      dakshinaStatus: true,
      manokamanaPrices: '101,201,501',
      manokamanaPricesUSD: '1.5,2.5,6',
      manokamnaStatus: true,
      category: 'education',
      isActive: true,
      isFeatured: true,
      createdDate: '2024-01-08'
    },
    {
      id: '4',
      pujaName: 'Durga Puja',
      subHeading: 'Protection & Divine Strength',
      about: 'Powerful Durga puja for protection, strength and victory over obstacles.',
      date: '2024-02-20',
      time: '05:30',
      pujaImages: ['https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop&crop=center'],
      templeImage: '/images/durga-temple.jpg',
      templeAddress: 'Durga Mandir, Haridwar, Uttarakhand',
      templeDescription: 'Ancient temple in the holy city of Haridwar, dedicated to Goddess Durga.',
      benefits: [
        { title: 'Divine Protection', description: 'Provides protection from negative energies and obstacles' },
        { title: 'Inner Strength', description: 'Develops courage and inner strength' }
      ],
      selectedPlanIds: ['2'],
      prasadPrice: 1000,
      prasadStatus: true,
      dakshinaPrices: '1001,2001,5001',
      dakshinaPricesUSD: '12,24,60',
      dakshinaStatus: true,
      manokamanaPrices: '501,1001,2001',
      manokamanaPricesUSD: '6,12,24',
      manokamnaStatus: true,
      category: 'spiritual',
      isActive: true,
      isFeatured: false,
      createdDate: '2024-01-05'
    },
    {
      id: '5',
      pujaName: 'Shiva Puja',
      subHeading: 'Spiritual Awakening & Peace',
      about: 'Divine Shiva puja for spiritual awakening, inner peace and liberation.',
      date: '2024-02-25',
      time: '04:00',
      pujaImages: ['https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800&h=600&fit=crop&crop=center', 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop&crop=center'],
      templeImage: '/images/shiva-temple.jpg',
      templeAddress: 'Kedarnath Temple, Uttarakhand',
      templeDescription: 'One of the twelve Jyotirlingas, located in the Himalayas.',
      benefits: [
        { title: 'Spiritual Growth', description: 'Accelerates spiritual development and awakening' },
        { title: 'Inner Peace', description: 'Brings deep peace and tranquility' }
      ],
      selectedPlanIds: ['1', '2'],
      prasadPrice: 600,
      prasadStatus: true,
      dakshinaPrices: '501,1001,2001',
      dakshinaPricesUSD: '6,12,24',
      dakshinaStatus: true,
      manokamanaPrices: '301,501,1001',
      manokamanaPricesUSD: '4,6,12',
      manokamnaStatus: true,
      category: 'spiritual',
      isActive: true,
      isFeatured: true,
      createdDate: '2024-01-03'
    },
    {
      id: '6',
      pujaName: 'Vishnu Puja',
      subHeading: 'Harmony & Universal Peace',
      about: 'Sacred Vishnu puja for peace, harmony and universal well-being.',
      date: '2024-03-01',
      time: '06:00',
      pujaImages: ['https://images.unsplash.com/photo-1604608672516-a224451d4ad3?w=800&h=600&fit=crop&crop=center'],
      templeImage: '/images/vishnu-temple.jpg',
      templeAddress: 'Tirupati Temple, Andhra Pradesh',
      templeDescription: 'One of the most visited and richest temples in the world.',
      benefits: [
        { title: 'Peace & Harmony', description: 'Brings peace and harmony in life' },
        { title: 'Universal Well-being', description: 'Promotes overall well-being and happiness' }
      ],
      selectedPlanIds: ['1'],
      prasadPrice: 800,
      prasadStatus: true,
      dakshinaPrices: '1001,2001,5001',
      dakshinaPricesUSD: '12,24,60',
      dakshinaStatus: true,
      manokamanaPrices: '401,801,1001',
      manokamanaPricesUSD: '5,10,12',
      manokamnaStatus: true,
      category: 'general',
      isActive: true,
      isFeatured: false,
      createdDate: '2024-01-01'
    }
  ];

  const categories = [
    { id: 'all', label: 'All Pujas', count: allPujas.length },
    { id: 'prosperity', label: 'Prosperity', count: allPujas.filter(p => p.category === 'prosperity').length },
    { id: 'education', label: 'Education', count: allPujas.filter(p => p.category === 'education').length },
    { id: 'spiritual', label: 'Spiritual', count: allPujas.filter(p => p.category === 'spiritual').length },
    { id: 'health', label: 'Health', count: allPujas.filter(p => p.category === 'health').length },
    { id: 'general', label: 'General', count: allPujas.filter(p => p.category === 'general').length }
  ];

  const filteredPujas = selectedCategory === 'all' 
    ? allPujas 
    : allPujas.filter(puja => puja.category === selectedCategory);

  const sortedPujas = [...filteredPujas].sort((a, b) => {
    switch (sortBy) {
      case 'featured':
        return b.isFeatured ? 1 : -1;
      case 'date':
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      case 'price':
        return a.prasadPrice - b.prasadPrice;
      case 'name':
        return a.pujaName.localeCompare(b.pujaName);
      default:
        return 0;
    }
  });

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50/50 via-yellow-50/30 to-rose-50/50 relative overflow-hidden">
      {/* Sacred Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-orange-200/30 rounded-full mix-blend-multiply filter blur-xl animate-float"></div>
        <div className="absolute top-40 right-10 w-80 h-80 bg-rose-200/30 rounded-full mix-blend-multiply filter blur-xl animate-float animation-delay-2000"></div>
        <div className="absolute bottom-20 left-20 w-72 h-72 bg-yellow-200/30 rounded-full mix-blend-multiply filter blur-xl animate-float animation-delay-4000"></div>
        
        {/* Sacred Pattern Overlay */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 border-2 border-orange-400 rounded-full animate-spin-slow"></div>
          <div className="absolute top-1/3 right-1/3 w-24 h-24 border border-rose-400 rotate-45 animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-20 h-20 border-2 border-yellow-400 rounded-full animate-float"></div>
        </div>
      </div>
      
      <Header />
      
      {/* Enhanced Hero Section */}
      <section className="relative pt-28 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Sacred Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-10 left-10 text-6xl text-orange-400 animate-float">ॐ</div>
            <div className="absolute top-20 right-20 text-4xl text-rose-400 animate-pulse">🕊</div>
            <div className="absolute bottom-20 left-1/4 text-5xl text-yellow-400 animate-float animation-delay-2000">🪔</div>
            <div className="absolute bottom-10 right-10 text-3xl text-orange-400 animate-pulse animation-delay-4000">🕋</div>
          </div>
        </div>
        
        <div className="relative max-w-7xl mx-auto text-center">
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {/* Sacred Om Symbol */}
            <div className="mb-8 flex justify-center">
              <div className="relative p-6 rounded-full bg-gradient-to-br from-orange-200/40 to-rose-200/40 backdrop-blur-sm border border-orange-300/30 shadow-lg">
                <div className="text-6xl text-orange-600 animate-float font-bold" style={{fontFamily: 'serif'}}>ॐ</div>
                <div className="absolute inset-0 bg-orange-300/20 rounded-full blur-xl animate-pulse"></div>
              </div>
            </div>
            
            {/* Main Heading */}
            <h1 className="text-[52px] sm:text-[64px] md:text-[72px] lg:text-[84px] font-bold leading-[60px] sm:leading-[72px] md:leading-[80px] lg:leading-[92px] font-['Philosopher'] mb-8">
              <span className="bg-gradient-to-r from-orange-700 via-rose-600 to-orange-800 bg-clip-text text-transparent">
                पवित्र पूजा
              </span>
              <br />
              <span className="bg-gradient-to-r from-rose-600 via-orange-700 to-yellow-600 bg-clip-text text-transparent">
                Sacred Pujas
              </span>
            </h1>
            
            <p className="text-[20px] sm:text-[22px] md:text-[24px] font-normal leading-[32px] sm:leading-[34px] md:leading-[36px] font-['Lato'] max-w-5xl mx-auto text-gray-700 mb-12">
              Discover the transformative power of authentic Vedic rituals performed by experienced priests in sacred temples. 
              <br className="hidden sm:block" />
              Connect with divine energies and invite blessings into your life through our comprehensive puja services.
            </p>
            
            {/* Sacred Statistics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto mb-12">
              <div className="text-center">
                <div className="text-4xl font-bold text-orange-600 mb-2">10,000+</div>
                <div className="text-gray-600 font-medium">Pujas Performed</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-rose-600 mb-2">50+</div>
                <div className="text-gray-600 font-medium">Sacred Temples</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-yellow-600 mb-2">500+</div>
                <div className="text-gray-600 font-medium">Qualified Priests</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-orange-600 mb-2">25+</div>
                <div className="text-gray-600 font-medium">Years Experience</div>
              </div>
            </div>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button className="group relative px-10 py-4 bg-gradient-to-r from-orange-500 to-rose-500 text-white font-bold text-lg rounded-full overflow-hidden transition-all duration-500 hover:scale-105 shadow-lg hover:shadow-2xl">
                <span className="relative z-10 flex items-center justify-center gap-3">
                  <div className="text-xl">🕊</div>
                  Explore All Pujas
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-rose-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
              
              <button className="group relative px-10 py-4 bg-white/80 backdrop-blur-sm text-orange-600 font-bold text-lg rounded-full border-2 border-orange-300 hover:border-orange-400 transition-all duration-500 hover:scale-105 shadow-md hover:shadow-lg">
                <span className="relative z-10 flex items-center justify-center gap-3">
                  <div className="text-xl">📞</div>
                  Consult Priest
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Filters and Content */}
      <section className="pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          
          {/* Enhanced Filter Tabs */}
          <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl p-8 mb-12 border border-white/50">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
              
              {/* Category Filters */}
              <div className="flex flex-wrap gap-3">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`group relative px-6 py-3 rounded-full text-sm font-bold transition-all duration-300 transform hover:scale-105 ${
                      selectedCategory === category.id
                        ? 'bg-gradient-to-r from-orange-500 to-rose-500 text-white shadow-lg'
                        : 'bg-gradient-to-r from-gray-100 to-gray-50 text-gray-700 hover:from-orange-100 hover:to-rose-100 hover:text-orange-600 hover:shadow-md'
                    }`}
                  >
                    <span className="relative z-10">{category.label} ({category.count})</span>
                    {selectedCategory === category.id && (
                      <div className="absolute inset-0 bg-white/20 rounded-full animate-pulse"></div>
                    )}
                  </button>
                ))}
              </div>
              
              {/* Sort Options */}
              <div className="flex items-center gap-4">
                <span className="text-sm font-bold text-gray-700">🔄 Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-6 py-3 border-2 border-orange-200 rounded-full focus:ring-4 focus:ring-orange-200 focus:border-orange-400 text-sm font-medium bg-white/80 backdrop-blur-sm transition-all duration-300"
                >
                  <option value="featured">⭐ Featured</option>
                  <option value="date">📅 Date</option>
                  <option value="price">💰 Price</option>
                  <option value="name">🅰️ Name</option>
                </select>
              </div>
            </div>
          </div>

          {/* Enhanced Pujas Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {sortedPujas.map((puja, index) => (
              <Link
                key={puja.id}
                href={`/puja/${puja.id}`}
                className="block group"
              >
                <div className={`relative bg-white/90 backdrop-blur-lg rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-700 border border-white/50 overflow-hidden transform hover:scale-105 hover:-translate-y-2 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}
                  style={{ animationDelay: `${1200 + index * 150}ms` }}
                >
                  
                  {/* Enhanced Image Section */}
                  <div className="relative h-72 overflow-hidden">
                    {puja.pujaImages && puja.pujaImages.length > 0 ? (
                      <Image
                        src={puja.pujaImages[0] || 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop&crop=center'}
                        alt={puja.pujaName}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full bg-gradient-to-br from-orange-200/60 to-rose-200/60">
                        <Image
                          src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop&crop=center"
                          alt={puja.pujaName}
                          fill
                          className="object-cover animate-float"
                        />
                      </div>
                    )}
                    
                    {/* Enhanced Overlay Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    {/* Enhanced Badges */}
                    <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
                      {puja.isFeatured && (
                        <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg animate-pulse">
                          ⭐ Featured
                        </span>
                      )}
                      <span className={`text-xs font-bold px-4 py-2 rounded-full shadow-lg backdrop-blur-sm ${
                        puja.category === 'prosperity' ? 'bg-yellow-100/90 text-yellow-800 border border-yellow-300' :
                        puja.category === 'education' ? 'bg-blue-100/90 text-blue-800 border border-blue-300' :
                        puja.category === 'spiritual' ? 'bg-purple-100/90 text-purple-800 border border-purple-300' :
                        puja.category === 'health' ? 'bg-green-100/90 text-green-800 border border-green-300' :
                        'bg-gray-100/90 text-gray-800 border border-gray-300'
                      }`}>
                        {puja.category.charAt(0).toUpperCase() + puja.category.slice(1)}
                      </span>
                    </div>
                    
                    {/* Sacred Symbol Overlay */}
                    <div className="absolute top-4 right-4 text-white/70 text-2xl group-hover:text-white group-hover:scale-110 transition-all duration-500">
                      ॐ
                    </div>
                  </div>
                  
                  {/* Enhanced Content */}
                  <div className="p-8">
                    <h3 className="text-2xl font-bold text-gray-800 font-['Philosopher'] mb-3 group-hover:text-orange-700 transition-colors duration-300">
                      {puja.pujaName}
                    </h3>
                    <p className="text-orange-600 font-bold mb-4 text-lg">
                      {puja.subHeading}
                    </p>
                    
                    {/* Temple Info with Enhanced Styling */}
                    <div className="flex items-start gap-3 text-gray-600 mb-4 p-3 bg-gradient-to-r from-orange-50/50 to-rose-50/50 rounded-xl border border-orange-100/50">
                      <svg className="w-5 h-5 mt-1 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span className="text-sm font-medium">{puja.templeAddress}</span>
                    </div>
                    
                    {/* Enhanced Date and Price Section */}
                    <div className="flex items-center justify-between bg-gradient-to-r from-orange-50 to-rose-50 p-4 rounded-2xl border border-orange-200/50">
                      <div className="flex items-center gap-2 text-gray-700">
                        <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span className="text-sm font-medium">{new Date(puja.date).toLocaleDateString()}</span>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-gray-500 mb-1">Starting from</div>
                        <div className="text-xl font-bold text-orange-600">{formatPrice(puja.prasadPrice)}</div>
                      </div>
                    </div>
                    
                    {/* Interactive Hover Button */}
                    <div className="mt-6 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                      <button className="w-full bg-gradient-to-r from-orange-500 to-rose-500 text-white font-bold py-3 px-6 rounded-2xl hover:from-orange-600 hover:to-rose-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl relative overflow-hidden">
                        <span className="relative z-10 flex items-center justify-center gap-2">
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                          </svg>
                          Book This Puja
                        </span>
                        <div className="absolute inset-0 bg-white opacity-0 hover:opacity-10 transition-opacity duration-300"></div>
                      </button>
                    </div>
                  </div>
                  
                  {/* Enhanced Glow Effects */}
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-orange-400/20 to-rose-400/20 opacity-0 group-hover:opacity-100 blur-2xl transition-all duration-700 -z-10 scale-90 group-hover:scale-100"></div>
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-orange-300/10 to-rose-300/10 opacity-0 group-hover:opacity-100 blur-3xl transition-all duration-1000 -z-20 scale-75 group-hover:scale-110"></div>
                </div>
              </Link>
            ))}
          </div>

          {/* Empty State */}
          {sortedPujas.length === 0 && (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No pujas found</h3>
              <p className="text-gray-600">Try adjusting your filters to see more results.</p>
            </div>
          )}
        </div>
      </section>

      {/* Sacred Benefits Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className={`text-center mb-16 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="mb-6">
              <span className="inline-block px-6 py-2 bg-gradient-to-r from-orange-100 to-rose-100 text-orange-700 rounded-full text-sm font-semibold mb-4">
                ✨ Divine Blessings
              </span>
            </div>
            <h2 className="text-[42px] sm:text-[48px] md:text-[56px] font-bold leading-[48px] sm:leading-[54px] md:leading-[64px] text-gray-800 font-['Philosopher'] mb-8">
              <span className="bg-gradient-to-r from-orange-600 to-rose-600 bg-clip-text text-transparent">
                Sacred Benefits of
              </span>
              <br />
              <span className="bg-gradient-to-r from-rose-600 to-yellow-600 bg-clip-text text-transparent">
                Vedic Pujas
              </span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-rose-500 mx-auto mb-8 rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sacredBenefits.map((benefit, index) => (
              <div
                key={index}
                className={`group relative bg-white/70 backdrop-blur-lg rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-700 border border-white/50 overflow-hidden transform hover:scale-105 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}
                style={{ animationDelay: `${600 + index * 150}ms` }}
              >
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${benefit.color} opacity-0 group-hover:opacity-10 transition-all duration-500 rounded-3xl`}></div>
                
                <div className="relative z-10 text-center">
                  <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-500">{benefit.icon}</div>
                  <h3 className="text-xl font-bold text-gray-800 font-['Philosopher'] mb-4 group-hover:text-orange-700 transition-colors duration-300">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600 font-['Lato'] leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
                
                {/* Hover Glow Effect */}
                <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${benefit.color} opacity-0 group-hover:opacity-20 blur-xl transition-all duration-700 -z-10`}></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sacred Timings Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-orange-50/30 to-rose-50/30">
        <div className="max-w-7xl mx-auto">
          <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-[38px] sm:text-[42px] md:text-[48px] font-bold leading-[44px] sm:leading-[48px] md:leading-[54px] text-gray-800 font-['Philosopher'] mb-6">
              <span className="bg-gradient-to-r from-orange-600 to-rose-600 bg-clip-text text-transparent">
                आदर्श पूजा समय
              </span>
              <br />
              <span className="bg-gradient-to-r from-rose-600 to-yellow-600 bg-clip-text text-transparent">
                Auspicious Timings
              </span>
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {sacredTimings.map((timing, index) => (
              <div
                key={index}
                className={`group relative bg-white/80 backdrop-blur-lg rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-500 border border-orange-200/50 hover:border-orange-300 transform hover:scale-105 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}
                style={{ animationDelay: `${800 + index * 200}ms` }}
              >
                <div className="text-center">
                  <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">{timing.icon}</div>
                  <h3 className="text-xl font-bold text-orange-700 font-['Philosopher'] mb-2">
                    {timing.time}
                  </h3>
                  <div className="text-lg font-semibold text-gray-700 mb-3">{timing.period}</div>
                  <p className="text-gray-600 font-['Lato'] text-sm leading-relaxed">
                    {timing.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Divine Testimonials Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-orange-50/40 to-rose-50/40">
        <div className="max-w-7xl mx-auto">
          <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="mb-6">
              <span className="inline-block px-6 py-2 bg-gradient-to-r from-orange-100 to-rose-100 text-orange-700 rounded-full text-sm font-semibold mb-4">
                🙏 Divine Experiences
              </span>
            </div>
            <h2 className="text-[42px] sm:text-[48px] md:text-[56px] font-bold leading-[48px] sm:leading-[54px] md:leading-[64px] text-gray-800 font-['Philosopher'] mb-8">
              <span className="bg-gradient-to-r from-orange-600 to-rose-600 bg-clip-text text-transparent">
                Devotee Testimonials
              </span>
              <br />
              <span className="bg-gradient-to-r from-rose-600 to-yellow-600 bg-clip-text text-transparent">
                भक्त अनुभव
              </span>
            </h2>
          </div>
          
          <div className="relative max-w-4xl mx-auto">
            <div className="overflow-hidden rounded-3xl bg-white/80 backdrop-blur-lg shadow-2xl border border-white/50">
              <div className="relative h-96 flex items-center">
                {testimonials.map((testimonial, index) => (
                  <div
                    key={index}
                    className={`absolute inset-0 p-12 flex items-center justify-center transition-all duration-700 ${
                      index === activeTestimonial ? 'opacity-100 transform translate-x-0' : 'opacity-0 transform translate-x-full'
                    }`}
                  >
                    <div className="text-center max-w-2xl">
                      <div className="flex justify-center mb-4">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <svg key={i} className="w-6 h-6 text-yellow-500" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                          </svg>
                        ))}
                      </div>
                      <blockquote className="text-lg text-gray-700 font-['Lato'] leading-relaxed mb-6 italic">
                        {`"`}{testimonial.text}{`"`}
                      </blockquote>
                      <div className="text-orange-600 font-semibold mb-2">{testimonial.name}</div>
                      <div className="text-gray-500 text-sm mb-2">{testimonial.location}</div>
                      <div className="inline-block px-4 py-2 bg-gradient-to-r from-orange-100 to-rose-100 text-orange-700 rounded-full text-sm font-medium">
                        {testimonial.puja}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Navigation Dots */}
              <div className="flex justify-center space-x-2 pb-6">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveTestimonial(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === activeTestimonial ? 'bg-orange-500 scale-125' : 'bg-gray-300 hover:bg-orange-300'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive FAQ Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="mb-6">
              <span className="inline-block px-6 py-2 bg-gradient-to-r from-orange-100 to-rose-100 text-orange-700 rounded-full text-sm font-semibold mb-4">
                ❓ Common Questions
              </span>
            </div>
            <h2 className="text-[42px] sm:text-[48px] md:text-[56px] font-bold leading-[48px] sm:leading-[54px] md:leading-[64px] text-gray-800 font-['Philosopher'] mb-8">
              <span className="bg-gradient-to-r from-orange-600 to-rose-600 bg-clip-text text-transparent">
                Frequently Asked
              </span>
              <br />
              <span className="bg-gradient-to-r from-rose-600 to-yellow-600 bg-clip-text text-transparent">
                Questions
              </span>
            </h2>
          </div>
          
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className={`group relative bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 border border-white/50 overflow-hidden ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}
                style={{ animationDelay: `${1000 + index * 150}ms` }}
              >
                <button
                  onClick={() => setExpandedFAQ(expandedFAQ === index ? null : index)}
                  className="w-full p-6 text-left transition-all duration-300 group-hover:bg-orange-50/50"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-gray-800 font-['Philosopher'] group-hover:text-orange-700 transition-colors duration-300 pr-4">
                      {faq.question}
                    </h3>
                    <div className={`flex-shrink-0 w-8 h-8 bg-gradient-to-r from-orange-100 to-rose-100 rounded-full flex items-center justify-center transition-all duration-300 group-hover:from-orange-200 group-hover:to-rose-200 ${
                      expandedFAQ === index ? 'rotate-180' : ''
                    }`}>
                      <svg className="w-4 h-4 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                  
                  <div className={`transition-all duration-500 overflow-hidden ${
                    expandedFAQ === index ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'
                  }`}>
                    <div className="p-4 bg-gradient-to-r from-orange-50/50 to-rose-50/50 rounded-xl border border-orange-100/50">
                      <p className="text-gray-700 font-['Lato'] leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sacred Newsletter Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-orange-600 via-rose-500 to-yellow-500 overflow-hidden">
        {/* Sacred Background Elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 text-8xl text-white animate-float">ॐ</div>
          <div className="absolute top-1/4 right-20 text-6xl text-white animate-pulse animation-delay-2000">🕊</div>
          <div className="absolute bottom-20 left-1/3 text-7xl text-white animate-float animation-delay-4000">🪔</div>
          <div className="absolute bottom-10 right-10 text-5xl text-white animate-pulse animation-delay-6000">🕋</div>
        </div>
        
        <div className="relative max-w-4xl mx-auto text-center">
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-[42px] sm:text-[48px] md:text-[56px] font-bold leading-[48px] sm:leading-[54px] md:leading-[64px] text-white font-['Philosopher'] mb-6">
              Stay Connected with
              <br />
              Divine Blessings
            </h2>
            <p className="text-xl text-white/90 font-['Lato'] mb-8 max-w-2xl mx-auto">
              Subscribe to receive sacred puja notifications, auspicious dates, and spiritual guidance directly to your inbox
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-6 py-4 rounded-full text-gray-700 font-medium focus:outline-none focus:ring-4 focus:ring-white/50 transition-all duration-300"
              />
              <button className="bg-white text-orange-600 font-bold px-8 py-4 rounded-full hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg">
                Subscribe
              </button>
            </div>
            
            <div className="flex items-center justify-center gap-2 mt-6 text-white/80 text-sm">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 1l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
              <span>Join 50,000+ devotees receiving divine guidance</span>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AllPujasPage;