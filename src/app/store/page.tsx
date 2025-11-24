'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Header from '@/components/layout/Header';
import GlobalFooter from '@/components/layout/GlobalFooter';
import Link from 'next/link';
import { apiService } from '@/services/api';
import { BackendProduct } from '@/types';

interface Product {
  id: string;
  name: string;
  subHeading: string;
  description: string;
  price: number;
  originalPrice?: number;
  images: string[];
  category: string;
  isFeatured: boolean;
  rating: number;
  reviews: number;
  inStock: boolean;
  tags: string[];
}

const StorePage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [isVisible, setIsVisible] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);
  const [cartItems, setCartItems] = useState<string[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Testimonials data
  const testimonials = [
    {
      name: "Meera Joshi",
      location: "Pune, Maharashtra",
      rating: 5,
      text: "The Ganesha idol I purchased is absolutely beautiful! The craftsmanship is excellent and it came blessed from the temple. Highly recommended!",
      product: "Sacred Ganesha Idol",
      image: "/images/testimonial-1.jpg"
    },
    {
      name: "Rajat Gupta",
      location: "Jaipur, Rajasthan",
      rating: 5,
      text: "The Rudraksha mala has brought peace to my meditation practice. The quality is genuine and the energy is amazing. Worth every penny!",
      product: "Rudraksha Mala",
      image: "/images/testimonial-2.jpg"
    },
    {
      name: "Kavya Nair",
      location: "Kerala, India",
      rating: 5,
      text: "Fast delivery and excellent packaging. All products are authentic and of premium quality. This is now my go-to store for spiritual items.",
      product: "Multiple Products",
      image: "/images/testimonial-3.jpg"
    }
  ];

  // Animation trigger on component mount
  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Transform backend product to frontend Product interface
  const transformProduct = (backendProduct: BackendProduct): Product => {
    // Get the primary image or first image if no primary image is set
    const primaryImage = backendProduct.images.find(img => img.is_primary) || backendProduct.images[0];
    
    // Construct full image URL
    let imageUrl = '/placeholder.jpg';
    if (primaryImage?.image_url) {
      // If it's already a full URL, use it as is
      if (primaryImage.image_url.startsWith('http')) {
        imageUrl = primaryImage.image_url;
      } else {
        // Otherwise construct the full URL
        imageUrl = `https://api.33kotidham.in${primaryImage.image_url.startsWith('/') ? '' : '/'}${primaryImage.image_url}`;
      }
    }
    
    return {
      id: backendProduct.id.toString(),
      name: backendProduct.name,
      subHeading: backendProduct.slug || '',
      description: backendProduct.short_description,
      price: parseFloat(backendProduct.selling_price),
      originalPrice: parseFloat(backendProduct.mrp) > parseFloat(backendProduct.selling_price) 
        ? parseFloat(backendProduct.mrp) 
        : undefined,
      images: [imageUrl],
      category: backendProduct.category.name.toLowerCase(),
      isFeatured: backendProduct.is_featured,
      rating: 4.5, // Default rating since it's not in the backend response
      reviews: Math.floor(Math.random() * 100) + 10, // Default reviews since it's not in the backend response
      inStock: backendProduct.stock_quantity > 0,
      tags: []
    };
  };

  // Fetch products and categories from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Fetch products
        const backendProducts = await apiService.getProducts(0, 100);
        const transformedProducts = backendProducts.map(transformProduct);
        setProducts(transformedProducts);
        
        // Fetch categories
        const backendCategories = await apiService.getProductCategories(0, 100, true);
        
        // Transform categories to match the existing structure
        const transformedCategories = [
          { id: 'all', label: 'All Products', count: transformedProducts.length, icon: '🛍️' },
          ...backendCategories.map(cat => ({
            id: cat.id.toString(),
            label: cat.name,
            count: 0, // Will be updated below
            icon: getCategoryIcon(cat.name)
          }))
        ];
        
        // Update category counts
        const categoryCounts: Record<string, number> = {};
        transformedProducts.forEach(product => {
          // Find the category ID that matches the product's category name
          const category = backendCategories.find(cat => 
            cat.name.toLowerCase() === product.category.toLowerCase()
          );
          
          if (category) {
            const categoryId = category.id.toString();
            categoryCounts[categoryId] = (categoryCounts[categoryId] || 0) + 1;
          }
        });
        
        // Update counts in transformed categories
        const updatedCategories = transformedCategories.map(cat => 
          cat.id === 'all' 
            ? { ...cat, count: transformedProducts.length } 
            : { ...cat, count: categoryCounts[cat.id] || 0 }
        );
        
        setCategories(updatedCategories);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load products and categories. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Helper function to get category icons
  const getCategoryIcon = (categoryName: string): string => {
    const categoryIcons: Record<string, string> = {
      'Puja': '🛕',
      'st': '📿',
      'aman': '🥥',
      // Add more category mappings as needed
    };
    
    // Default icons for common categories
    const defaultIcons: Record<string, string> = {
      'idols': '🛕',
      'jewelry': '📿',
      'accessories': '🥥',
      'books': '📚',
      'incense': '🪔',
      'oils': '🪔',
      'puja': '🛕',
      'spiritual': '🕉️'
    };
    
    // Check if we have a specific icon for this category
    const normalizedCategory = categoryName.toLowerCase();
    if (categoryIcons[normalizedCategory]) {
      return categoryIcons[normalizedCategory];
    }
    
    // Check if any default icon matches
    for (const [key, icon] of Object.entries(defaultIcons)) {
      if (normalizedCategory.includes(key)) {
        return icon;
      }
    }
    
    // Default icon
    return '🛍️';
  };

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  // Sacred benefits of spiritual products
  const sacredBenefits = [
    {
      icon: "🛕",
      title: "Authentic Spiritual Items",
      description: "Handcrafted products blessed by experienced priests following traditional rituals",
      color: "from-orange-400 to-red-500"
    },
    {
      icon: "🪔",
      title: "Blessed Puja Items",
      description: "Each item is consecrated with sacred mantras and divine blessings",
      color: "from-yellow-400 to-orange-500"
    },
    {
      icon: "📿",
      title: "Premium Quality",
      description: "Sourced from renowned artisans and sacred places across India",
      color: "from-purple-400 to-pink-500"
    },
    {
      icon: "🕉️",
      title: "Divine Energized",
      description: "Products energized through ancient Vedic practices and rituals",
      color: "from-blue-400 to-indigo-500"
    }
  ];

  // Product categories - will be updated with actual data from API
  const [categories, setCategories] = useState([
    { id: 'all', label: 'All Products', count: 0, icon: '🛍️' },
    { id: 'idols', label: 'Sacred Idols', count: 0, icon: '🛕' },
    { id: 'jewelry', label: 'Spiritual Jewelry', count: 0, icon: '📿' },
    { id: 'accessories', label: 'Puja Accessories', count: 0, icon: '🥥' },
    { id: 'books', label: 'Sacred Books', count: 0, icon: '📚' },
    { id: 'incense', label: 'Incense & Oils', count: 0, icon: '🪔' }
  ]);

  // Mock products data - removed since we're fetching real data from API

  // FAQ data
  const faqs = [
    {
      question: "Are all products blessed and energized?",
      answer: "Yes, all our spiritual products are blessed by qualified priests in authentic temples. Items like idols and jewelry are specifically energized through traditional Vedic rituals before shipping."
    },
    {
      question: "What is your return and exchange policy?",
      answer: "We offer a 15-day return policy for all products. Items must be in original condition. For spiritual reasons, blessed items cannot be returned once opened, but we offer exchange for defective pieces."
    },
    {
      question: "Do you ship internationally?",
      answer: "Yes, we ship worldwide! International shipping takes 7-15 business days. All items are properly packaged to ensure safe delivery. Customs duties may apply based on destination country."
    },
    {
      question: "How do I know if a product is authentic?",
      answer: "All our products come with certificates of authenticity. Precious items like silver jewelry include hallmark certificates. We source directly from certified artisans and temples."
    },
    {
      question: "Can I get products blessed for specific purposes?",
      answer: "Absolutely! We offer special blessing services for specific intentions like prosperity, health, or spiritual growth. Contact our customer service for personalized blessing options."
    }
  ];

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(product => {
        // Find the category that matches the selected category ID
        const categoryMatch = categories.find(cat => cat.id === selectedCategory);
        if (!categoryMatch) return false;
        
        // For the "all" category, we show all products (handled above)
        // For specific categories, we match by category name
        return product.category.toLowerCase() === categoryMatch.label.toLowerCase();
      });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'featured':
        return b.isFeatured ? 1 : -1;
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      case 'name':
        return a.name.localeCompare(b.name);
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

  const addToCart = (productId: string) => {
    setCartItems(prev => [...prev, productId]);
  };

  const isInCart = (productId: string) => {
    return cartItems.includes(productId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30 relative overflow-hidden">
      {/* Modern Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-40 h-40 bg-blue-200/20 rounded-full mix-blend-multiply filter blur-xl animate-float"></div>
        <div className="absolute top-60 right-20 w-60 h-60 bg-purple-200/20 rounded-full mix-blend-multiply filter blur-xl animate-float animation-delay-2000"></div>
        <div className="absolute bottom-40 left-1/3 w-48 h-48 bg-cyan-200/20 rounded-full mix-blend-multiply filter blur-xl animate-float animation-delay-4000"></div>
        
        {/* Tech Pattern Overlay */}
        <div className="absolute inset-0 opacity-3">
          <div className="absolute top-1/4 left-1/4 w-24 h-24 border border-blue-400 rounded-lg rotate-12 animate-pulse"></div>
          <div className="absolute top-1/3 right-1/3 w-16 h-16 border border-purple-400 rounded-full animate-spin-slow"></div>
          <div className="absolute bottom-1/4 right-1/4 w-20 h-20 border border-cyan-400 rotate-45 animate-float"></div>
        </div>
      </div>
      
      <Header />
      
      {/* Enhanced Hero Section */}
      <section className="relative pt-28 pb-0 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Sacred Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-10 left-10 text-6xl text-orange-400 animate-float">ॐ</div>
            <div className="absolute top-20 right-20 text-4xl text-rose-400 animate-pulse">🕊</div>
            <div className="absolute bottom-20 left-1/4 text-5xl text-yellow-400 animate-float animation-delay-2000">🪔</div>
            <div className="absolute bottom-10 right-10 text-3xl text-orange-400 animate-pulse animation-delay-4000">🛕</div>
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
            <h1 className="text-[52px] sm:text-[64px] md:text-[72px] lg:text-[84px] font-bold leading-[60px] sm:leading-[72px] md:leading-[80px] lg:leading-[92px]  mb-8">
              
              <span className="bg-gradient-to-r from-rose-600 via-orange-700 to-yellow-600 bg-clip-text text-transparent">
                Sacred Store
              </span>
            </h1>
            
            <p className="text-[20px] sm:text-[22px] md:text-[24px] font-normal leading-[32px] sm:leading-[34px] md:leading-[36px]  max-w-5xl mx-auto text-gray-700 mb-12">
              Discover authentic spiritual products blessed by experienced priests from sacred temples across India. 
              <br className="hidden sm:block" />
              Each item is carefully curated and energized to bring divine blessings into your life.
            </p>
            
            {/* Sacred Statistics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto mb-12">
              <div className="text-center">
                <div className="text-4xl font-bold text-orange-600 mb-2">500+</div>
                <div className="text-gray-600 font-medium">Sacred Products</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-rose-600 mb-2">100+</div>
                <div className="text-gray-600 font-medium">Temple Blessed</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-yellow-600 mb-2">5000+</div>
                <div className="text-gray-600 font-medium">Happy Customers</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-orange-600 mb-2">25+</div>
                <div className="text-gray-600 font-medium">Years Trust</div>
              </div>
            </div>
            
            {/* CTA Buttons */}
            
          </div>
        </div>
      </section>


      {/* Products Section */}
      <section className="relative py-10 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-orange-50/30 to-rose-50/30">
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
                    <span className="relative z-10 flex items-center gap-2">
                      <span className="text-lg">{category.icon}</span>
                      {category.label} ({category.count})
                    </span>
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
                  <option value="price-low">💰 Price: Low to High</option>
                  <option value="price-high">💰 Price: High to Low</option>
                  <option value="rating">⭐ Rating</option>
                  <option value="name">🅰️ Name</option>
                </select>
              </div>
            </div>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">⚠️</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Error Loading Products</h3>
              <p className="text-gray-600 mb-4">{error}</p>
              <button 
                onClick={() => window.location.reload()}
                className="px-6 py-3 bg-gradient-to-r from-orange-500 to-rose-500 text-white font-bold rounded-2xl hover:from-orange-600 hover:to-rose-600 transition-all duration-300"
              >
                Try Again
              </button>
            </div>
          )}

          {/* Products Grid */}
          {!loading && !error && (
            <>
              {/* Compact Product Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {sortedProducts.map((product, index) => (
                  <div
                    key={product.id}
                    className={`group relative bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-500 border border-gray-100 overflow-hidden transform hover:-translate-y-1 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                    style={{ animationDelay: `${600 + index * 100}ms` }}
                  >
                    
                    {/* Card Link Wrapper */}
                    <Link href={`/store/product/${product.id}`} className="block">
                    {/* Compact Image Section */}
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={product.images[0]}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      
                      {/* Compact Badges */}
                      <div className="absolute top-3 left-3 flex gap-1 z-10">
                        {product.isFeatured && (
                          <span className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-sm">
                            ⭐
                          </span>
                        )}
                        {product.originalPrice && (
                          <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-sm">
                            SALE
                          </span>
                        )}
                      </div>
                      
                      {/* Quick Actions */}
                      <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <div className="flex flex-col gap-1">
                          <button className="p-2 bg-white/90 backdrop-blur-sm rounded-full text-gray-600 hover:bg-red-500 hover:text-white transition-all duration-300 shadow-sm">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                          </button>
                          <button className="p-2 bg-white/90 backdrop-blur-sm rounded-full text-gray-600 hover:bg-blue-500 hover:text-white transition-all duration-300 shadow-sm">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    {/* Compact Content */}
                    <div className="p-4">
                      <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors duration-300 line-clamp-2">
                        {product.name}
                      </h3>
                      <p className="text-gray-600 text-sm mb-3 line-clamp-1">
                        {product.subHeading}
                      </p>
                      
                      {/* Compact Rating */}
                      <div className="flex items-center gap-2 mb-3">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <svg key={i} className={`w-3 h-3 ${i < Math.floor(product.rating) ? 'text-yellow-500' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                            </svg>
                          ))}
                        </div>
                        <span className="text-xs text-gray-500">({product.reviews})</span>
                      </div>
                      
                      {/* Compact Price */}
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <div className="flex items-center gap-1">
                            <span className="text-xl font-bold text-gray-900">{formatPrice(product.price)}</span>
                            {product.originalPrice && (
                              <span className="text-sm text-gray-500 line-through">{formatPrice(product.originalPrice)}</span>
                            )}
                          </div>
                        </div>
                        <div className={`text-xs font-medium ${
                          product.inStock ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {product.inStock ? '✓ In Stock' : '❌ Out of Stock'}
                        </div>
                      </div>
                      
                      {/* Action Buttons */}
                      <div className="flex gap-2">
                        <button 
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            addToCart(product.id);
                            // Redirect to product page after adding to cart
                            window.location.href = `/store/product/${product.id}`;
                          }}
                          disabled={!product.inStock || isInCart(product.id)}
                          className={`flex-1 py-2 px-3 rounded-xl font-medium text-sm transition-all duration-300 ${
                            isInCart(product.id) 
                              ? 'bg-green-500 text-white' 
                              : product.inStock 
                                ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600 transform hover:scale-105' 
                                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                          }`}
                        >
                          {isInCart(product.id) ? (
                            <span className="flex items-center justify-center gap-1">
                              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                              </svg>
                              <span className="text-xs">Added</span>
                            </span>
                          ) : (
                            <span className="flex items-center justify-center gap-1">
                              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M7 4V2C7 1.45 7.45 1 8 1H16C16.55 1 17 1.45 17 2V4H20C20.55 4 21 4.45 21 5S20.55 6 20 6H19V19C19 20.1 18.1 21 17 21H7C5.9 21 5 20.1 5 19V6H4C3.45 6 3 5.55 3 5S3.45 4 4 4H7ZM9 3V4H15V3H9ZM7 6V19H17V6H7Z"/>
                                <path d="M9 8V17H11V8H9ZM13 8V17H15V8H13Z"/>
                              </svg>
                              <span className="text-xs">Add</span>
                            </span>
                          )}
                        </button>
                        <Link 
                          href={`/store/product/${product.id}`}
                          onClick={(e) => e.stopPropagation()}
                          className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-r from-orange-500 to-rose-500 text-white hover:from-orange-600 hover:to-rose-600 transition-all duration-300 transform hover:scale-105"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </Link>
                      </div>
                    </div>
                    </Link>
                  </div>
                ))}
              </div>
              
              {/* Empty State */}
              {sortedProducts.length === 0 && !loading && (
                <div className="text-center py-16">
                  <div className="text-6xl mb-4">🔍</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
                  <p className="text-gray-600">Try adjusting your filters to see more results.</p>
                </div>
              )}
            </>
          )}
          

        </div>
      </section>

      {/* Sacred Benefits Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className={`text-center mb-16 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="mb-6">
              <span className="inline-block px-6 py-2 bg-gradient-to-r from-orange-100 to-rose-100 text-orange-700 rounded-full text-sm font-semibold mb-4">
                ✨ Sacred Collection
              </span>
            </div>
            <h2 className="text-[42px] sm:text-[48px] md:text-[56px] font-bold leading-[48px] sm:leading-[54px] md:leading-[64px] text-gray-800  mb-8">
              <span className="bg-gradient-to-r from-orange-600 to-rose-600 bg-clip-text text-transparent">
                Why Choose Our
              </span>
              <br />
              <span className="bg-gradient-to-r from-rose-600 to-yellow-600 bg-clip-text text-transparent">
                Spiritual Products
              </span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-rose-500 mx-auto mb-8 rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
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
                  <h3 className="text-xl font-bold text-gray-800  mb-4 group-hover:text-orange-700 transition-colors duration-300">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600  leading-relaxed text-sm">
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

      {/* Testimonials Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-yellow-50/30 to-orange-50/30">
        <div className="max-w-7xl mx-auto">
          <div className={`text-center mb-16 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="mb-6">
              <span className="inline-block px-6 py-2 bg-gradient-to-r from-yellow-100 to-orange-100 text-orange-700 rounded-full text-sm font-semibold mb-4">
                💕 Customer Stories
              </span>
            </div>
            <h2 className="text-[42px] sm:text-[48px] md:text-[56px] font-bold leading-[48px] sm:leading-[54px] md:leading-[64px] text-gray-800  mb-8">
              <span className="bg-gradient-to-r from-orange-600 to-rose-600 bg-clip-text text-transparent">
                What Our Devotees
              </span>
              <br />
              <span className="bg-gradient-to-r from-rose-600 to-yellow-600 bg-clip-text text-transparent">
                Say About Us
              </span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-rose-500 mx-auto mb-8 rounded-full"></div>
          </div>
          
          <div className="relative max-w-4xl mx-auto">
            <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-8 md:p-12 border border-white/50 overflow-hidden">
              {/* Sacred Background Pattern */}
              <div className="absolute inset-0 opacity-5">
                <div className="absolute top-4 left-4 text-3xl text-orange-400 animate-float">🕉️</div>
                <div className="absolute top-6 right-6 text-2xl text-rose-400 animate-pulse">🪷</div>
                <div className="absolute bottom-4 left-6 text-2xl text-yellow-400 animate-float animation-delay-2000">🪔</div>
                <div className="absolute bottom-6 right-4 text-3xl text-orange-400 animate-pulse animation-delay-4000">🛕</div>
              </div>
              
              <div className="relative z-10">
                {testimonials.map((testimonial, index) => (
                  <div
                    key={index}
                    className={`transition-all duration-700 ${activeTestimonial === index ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10 absolute inset-0'}`}
                  >
                    <div className="text-center">
                      {/* Rating Stars */}
                      <div className="flex justify-center mb-6">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <svg key={i} className="w-6 h-6 text-yellow-500 mx-1" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                          </svg>
                        ))}
                      </div>
                      
                      {/* Quote */}
                      <blockquote className="text-xl md:text-2xl text-gray-700  italic leading-relaxed mb-8 max-w-3xl mx-auto">
                        {`"`}{testimonial.text}{`"`}
                      </blockquote>
                      
                      {/* Customer Info */}
                      <div className="flex flex-col items-center">
                        <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-rose-500 rounded-full flex items-center justify-center text-white text-xl font-bold mb-4">
                          {testimonial.name.charAt(0)}
                        </div>
                        <h4 className="text-xl font-bold text-gray-800  mb-2">{testimonial.name}</h4>
                        <p className="text-orange-600 font-medium mb-2">{testimonial.location}</p>
                        <p className="text-sm text-gray-600">Purchased: {testimonial.product}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Navigation Dots */}
              <div className="flex justify-center mt-12 space-x-3">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveTestimonial(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      activeTestimonial === index 
                        ? 'bg-gradient-to-r from-orange-500 to-rose-500 w-8' 
                        : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className={`text-center mb-16 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="mb-6">
              <span className="inline-block px-6 py-2 bg-gradient-to-r from-blue-100 to-purple-100 text-purple-700 rounded-full text-sm font-semibold mb-4">
                ❓ Frequently Asked
              </span>
            </div>
            <h2 className="text-[42px] sm:text-[48px] md:text-[56px] font-bold leading-[48px] sm:leading-[54px] md:leading-[64px] text-gray-800  mb-8">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Common Questions
              </span>
              <br />
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                & Divine Answers
              </span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-8 rounded-full"></div>
          </div>
          
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className={`bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg border border-white/50 overflow-hidden transition-all duration-500 hover:shadow-xl ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ animationDelay: `${1000 + index * 100}ms` }}
              >
                <button
                  onClick={() => setExpandedFAQ(expandedFAQ === index ? null : index)}
                  className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-300"
                >
                  <h3 className="text-lg font-bold text-gray-800  pr-8">
                    {faq.question}
                  </h3>
                  <div className={`flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white transition-transform duration-300 ${
                    expandedFAQ === index ? 'rotate-180' : ''
                  }`}>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </button>
                
                <div className={`transition-all duration-500 overflow-hidden ${
                  expandedFAQ === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}>
                  <div className="px-8 pb-6">
                    <p className="text-gray-600  leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      
      
      <GlobalFooter />
    </div>
  );
};

export default StorePage;
