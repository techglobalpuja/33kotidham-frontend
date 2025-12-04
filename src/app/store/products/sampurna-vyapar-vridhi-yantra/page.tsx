'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import GlobalFooter from '@/components/layout/GlobalFooter';

const SampurnaVyaparVridhiYantraPage: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('8x8 inches');
  const [quantity, setQuantity] = useState(1);
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState('description');

  // Product images
  const productImages = [
    '/images/yantra-main.jpg',
    '/images/yantra-detail.jpg',
    '/images/yantra-size.jpg',
    '/images/yantra-installation.jpg'
  ];

  // Product details
  const productDetails = {
    name: 'Sampurna Vyapar Vridhi Yantra',
    subtitle: 'Complete Business Growth Yantra',
    price: 2499,
    originalPrice: 3499,
    rating: 4.9,
    reviews: 127,
    inStock: true,
    category: 'Spiritual/Religious Yantra - Business Growth & Prosperity'
  };

  // Yantras included
  const yantrasIncluded = [
    'Vyapar Vriddhi Yantra (center)',
    'Shree Yantra',
    'Sampoorna Maha Lakshmi Yantra',
    'Geeta Yantra',
    'Lord Ganesha representation',
    'Other supporting yantras for wealth and prosperity'
  ];

  // Benefits
  const benefits = [
    'Increases business sales, profits, and turnover',
    'Removes obstacles and problems in business/career',
    'Attracts customers and opportunities',
    'Protection from negative energies, evil eye, and black magic',
    'Blessing from Lord Ganesha (remover of obstacles) and Goddess Lakshmi (wealth)',
    'Helps with debt relief and financial stability',
    'Suitable for new business ventures',
    'Beneficial for all professions, not just business owners'
  ];

  // How to use
  const howToUse = [
    'Place facing East or North-East direction in office/shop/home',
    'Keep at a high, clean position away from visitors',
    'Offer daily incense and sandal paste',
    'Chant the Beej Mantra: "ॐ श्रीं ह्रीं क्लीं महालक्ष्मै नम:" (11 or 21 times)',
    'Perform regular worship for best results'
  ];

  // Installation instructions
  const installationInstructions = [
    'Purify with cow urine, Ganga water, and raw milk before installation',
    'Install on Wednesday morning after bath',
    'Light a lamp and offer yellow flowers',
    'Can be placed in office, shop, showroom, factory, or home puja room'
  ];

  // Available sizes
  const sizes = [
    '6 inches',
    '8x8 inches',
    '10.5 inches',
    '12 inches'
  ];

  // Customer reviews
  const reviews = [
    {
      name: 'Rajesh Kumar',
      rating: 5,
      date: '2023-10-15',
      comment: 'Very helpful for business growth. I noticed an increase in customers from day 1!',
      verified: true
    },
    {
      name: 'Raj Sharma',
      rating: 5,
      date: '2023-09-22',
      comment: 'Beautiful addition to my workspace. Noticed a positive shift in energy immediately.',
      verified: true
    },
    {
      name: 'Amit Patel',
      rating: 4,
      date: '2023-08-30',
      comment: 'Exceeded my expectations. My business has seen steady growth since installation.',
      verified: true
    }
  ];

  // FAQ
  const faqs = [
    {
      question: 'How long does it take to see results?',
      answer: 'Many users report positive changes within 7-21 days of proper installation and worship. However, results may vary based on individual circumstances and consistency of practice.'
    },
    {
      question: 'Is the yantra already energized?',
      answer: 'Yes, all our yantras are energized (Mantra Siddha) by experienced priests following traditional Vedic rituals before shipping.'
    },
    {
      question: 'Can I use this yantra for my profession too?',
      answer: 'Absolutely! While named for business growth, this yantra is beneficial for all professions, including service jobs, freelancing, and creative work.'
    },
    {
      question: 'What material is it made of?',
      answer: 'The yantra is typically made on golden paper or brass/metal with gold finish, framed for easy installation.'
    },
    {
      question: 'Do you offer international shipping?',
      answer: 'Yes, we ship worldwide! International shipping takes 7-15 business days. All items are properly packaged to ensure safe delivery.'
    }
  ];

  // Related products
  const relatedProducts = [
    {
      id: '1',
      name: 'Shree Yantra',
      price: 1899,
      image: '/images/shree-yantra.jpg',
      rating: 4.8
    },
    {
      id: '2',
      name: 'Lakshmi Kubera Yantra',
      price: 2199,
      image: '/images/lakshmi-kubera-yantra.jpg',
      rating: 4.7
    },
    {
      id: '3',
      name: 'Ganesh Yantra',
      price: 1699,
      image: '/images/ganesh-yantra.jpg',
      rating: 4.9
    },
    {
      id: '4',
      name: 'Saraswati Yantra',
      price: 1999,
      image: '/images/saraswati-yantra.jpg',
      rating: 4.6
    }
  ];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const addToCart = () => {
    // Add to cart functionality would go here
    alert('Product added to cart!');
  };

  const buyNow = () => {
    // Buy now functionality would go here
    alert('Proceeding to checkout!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50/50 via-yellow-50/30 to-rose-50/50">
      <Header />
      
      {/* Breadcrumb */}
      <section className="pt-28 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <nav className="flex items-center text-sm text-gray-500 mb-8">
            <Link href="/" className="hover:text-orange-600">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/store" className="hover:text-orange-600">Store</Link>
            <span className="mx-2">/</span>
            <span className="text-orange-600 font-medium">Sampurna Vyapar Vridhi Yantra</span>
          </nav>
        </div>
      </section>

      {/* Product Detail Section */}
      <section className="pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Images */}
            <div className="space-y-6">
              <div className="relative h-96 rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src={productImages[selectedImage]}
                  alt={productDetails.name}
                  fill
                  className="object-cover"
                />
              </div>
              
              <div className="grid grid-cols-4 gap-4">
                {productImages.map((image, index) => (
                  <div 
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative h-24 rounded-xl overflow-hidden cursor-pointer border-2 transition-all duration-300 ${
                      selectedImage === index 
                        ? 'border-orange-500 ring-4 ring-orange-200' 
                        : 'border-white/50 hover:border-orange-300'
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`${productDetails.name} ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
            
            {/* Product Info */}
            <div>
              <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl p-8 border border-white/50">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-800 font-['Philosopher']">{productDetails.name}</h1>
                    <p className="text-lg text-orange-600 mt-2">{productDetails.subtitle}</p>
                  </div>
                  <div className="flex items-center bg-orange-100 text-orange-800 px-3 py-1 rounded-full">
                    <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                    <span className="font-bold">{productDetails.rating}</span>
                    <span className="text-xs ml-1">({productDetails.reviews} reviews)</span>
                  </div>
                </div>
                
                <div className="mb-6">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl font-bold text-gray-900">{formatPrice(productDetails.price)}</span>
                    {productDetails.originalPrice && (
                      <span className="text-xl text-gray-500 line-through">{formatPrice(productDetails.originalPrice)}</span>
                    )}
                    {productDetails.originalPrice && (
                      <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-sm font-bold">
                        {Math.round(((productDetails.originalPrice - productDetails.price) / productDetails.originalPrice) * 100)}% OFF
                      </span>
                    )}
                  </div>
                  <div className={`text-sm font-medium mt-2 ${
                    productDetails.inStock ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {productDetails.inStock ? '✓ In Stock - Ready to ship' : '❌ Out of Stock'}
                  </div>
                </div>
                
                <div className="mb-8">
                  <h3 className="font-bold text-gray-800 mb-3">Size</h3>
                  <div className="flex flex-wrap gap-3">
                    {sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-4 py-2 rounded-full border transition-all duration-300 ${
                          selectedSize === size
                            ? 'bg-gradient-to-r from-orange-500 to-rose-500 text-white border-orange-500'
                            : 'bg-white text-gray-700 border-gray-300 hover:border-orange-300'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="mb-8">
                  <h3 className="font-bold text-gray-800 mb-3">Quantity</h3>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center border border-gray-300 rounded-full">
                      <button 
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="px-4 py-2 text-gray-600 hover:text-orange-600"
                      >
                        -
                      </button>
                      <span className="px-4 py-2">{quantity}</span>
                      <button 
                        onClick={() => setQuantity(quantity + 1)}
                        className="px-4 py-2 text-gray-600 hover:text-orange-600"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <button 
                    onClick={addToCart}
                    className="flex-1 px-6 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold rounded-2xl hover:from-blue-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
                  >
                    Add to Cart
                  </button>
                  <button 
                    onClick={buyNow}
                    className="flex-1 px-6 py-4 bg-gradient-to-r from-orange-500 to-rose-500 text-white font-bold rounded-2xl hover:from-orange-600 hover:to-rose-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
                  >
                    Buy Now
                  </button>
                </div>
                
                <div className="border-t border-gray-200 pt-6">
                  <div className="flex items-center text-gray-600 mb-4">
                    <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Free shipping on orders above ₹1999</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>7-day easy returns</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Product Details Tabs */}
          <div className="mt-12 bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl border border-white/50 overflow-hidden">
            <div className="border-b border-gray-200">
              <nav className="flex flex-wrap -mb-px">
                <button
                  onClick={() => setActiveTab('description')}
                  className={`px-6 py-4 text-sm font-bold border-b-2 transition-colors duration-300 ${
                    activeTab === 'description'
                      ? 'border-orange-500 text-orange-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Description
                </button>
                <button
                  onClick={() => setActiveTab('benefits')}
                  className={`px-6 py-4 text-sm font-bold border-b-2 transition-colors duration-300 ${
                    activeTab === 'benefits'
                      ? 'border-orange-500 text-orange-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Benefits
                </button>
                <button
                  onClick={() => setActiveTab('usage')}
                  className={`px-6 py-4 text-sm font-bold border-b-2 transition-colors duration-300 ${
                    activeTab === 'usage'
                      ? 'border-orange-500 text-orange-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  How to Use
                </button>
                <button
                  onClick={() => setActiveTab('reviews')}
                  className={`px-6 py-4 text-sm font-bold border-b-2 transition-colors duration-300 ${
                    activeTab === 'reviews'
                      ? 'border-orange-500 text-orange-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Reviews ({productDetails.reviews})
                </button>
              </nav>
            </div>
            
            <div className="p-8">
              {activeTab === 'description' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">Product Description</h2>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    The Sampurna Vyapar Vridhi Yantra is a sacred mystical instrument used for business growth, prosperity, and success. 
                    &#34;Vyapar&#34; means business and &#34;Vriddhi&#34; means growth/increase. This yantra is designed to increase sales, turnover, and profits in business or profession.
                  </p>
                  
                  <div className="mb-8">
                    <h3 className="text-xl font-bold text-gray-800 mb-4">Key Features</h3>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <li className="flex items-start">
                        <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-600">Sacred geometric pattern with intricate designs</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-600">Typically features a central Vyapar Vriddhi Yantra surrounded by 12 supportive smaller yantras (total 13 yantras)</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-600">Made on golden paper or brass/metal with gold finish</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-600">Framed for easy installation</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-600">Common sizes: 6 inches, 8x8 inches, 10.5 inches, or larger</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-600">Energized/Mantra Siddha (blessed with mantras)</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="mb-8">
                    <h3 className="text-xl font-bold text-gray-800 mb-4">Yantras Included in Sampoorna Version</h3>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {yantrasIncluded.map((yantra, index) => (
                        <li key={index} className="flex items-start">
                          <svg className="w-5 h-5 text-orange-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-gray-600">{yantra}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
              
              {activeTab === 'benefits' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">Benefits of Sampurna Vyapar Vridhi Yantra</h2>
                  <ul className="space-y-4">
                    {benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start">
                        <div className="flex-shrink-0 w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center mr-4">
                          <span className="text-orange-600 font-bold">{index + 1}</span>
                        </div>
                        <span className="text-gray-600 text-lg">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              {activeTab === 'usage' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">How to Use</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-xl font-bold text-gray-800 mb-4">Daily Practice</h3>
                      <ul className="space-y-3">
                        {howToUse.map((step, index) => (
                          <li key={index} className="flex items-start">
                            <div className="flex-shrink-0 w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center mr-3 mt-0.5">
                              <span className="text-white text-xs font-bold">{index + 1}</span>
                            </div>
                            <span className="text-gray-600">{step}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-bold text-gray-800 mb-4">Installation Instructions</h3>
                      <ul className="space-y-3">
                        {installationInstructions.map((step, index) => (
                          <li key={index} className="flex items-start">
                            <div className="flex-shrink-0 w-6 h-6 bg-rose-500 rounded-full flex items-center justify-center mr-3 mt-0.5">
                              <span className="text-white text-xs font-bold">{index + 1}</span>
                            </div>
                            <span className="text-gray-600">{step}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
              
              {activeTab === 'reviews' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">Customer Reviews</h2>
                  <div className="space-y-6">
                    {reviews.map((review, index) => (
                      <div key={index} className="border-b border-gray-200 pb-6 last:border-0 last:pb-0">
                        <div className="flex justify-between mb-2">
                          <h4 className="font-bold text-gray-800">{review.name}</h4>
                          <span className="text-sm text-gray-500">{review.date}</span>
                        </div>
                        <div className="flex items-center mb-3">
                          {[...Array(5)].map((_, i) => (
                            <svg 
                              key={i} 
                              className={`w-5 h-5 ${i < review.rating ? 'text-yellow-500' : 'text-gray-300'}`} 
                              fill="currentColor" 
                              viewBox="0 0 24 24"
                            >
                              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                            </svg>
                          ))}
                          {review.verified && (
                            <span className="ml-3 text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                              Verified Purchase
                            </span>
                          )}
                        </div>
                        <p className="text-gray-600">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-8 text-center">
                    <button className="px-6 py-3 bg-gradient-to-r from-orange-500 to-rose-500 text-white font-bold rounded-2xl hover:from-orange-600 hover:to-rose-600 transition-all duration-300">
                      Write a Review
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* FAQ Section */}
          <div className="mt-12 bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl p-8 border border-white/50">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div 
                  key={index} 
                  className="border border-gray-200 rounded-xl overflow-hidden"
                >
                  <button
                    onClick={() => setExpandedFAQ(expandedFAQ === index ? null : index)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-orange-50 transition-colors duration-300"
                  >
                    <h3 className="font-bold text-gray-800">{faq.question}</h3>
                    <div className={`flex-shrink-0 w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center transition-transform duration-300 ${
                      expandedFAQ === index ? 'rotate-180' : ''
                    }`}>
                      <svg className="w-4 h-4 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </button>
                  
                  <div className={`transition-all duration-300 overflow-hidden ${
                    expandedFAQ === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}>
                    <div className="px-6 pb-4">
                      <p className="text-gray-600">{faq.answer}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Related Products */}
          <div className="mt-12">
            <h2 className="text-3xl font-bold text-gray-800 text-center mb-4 font-['Philosopher']">
              Related Products
            </h2>
            <p className="text-gray-600 text-center mb-12 max-w-3xl mx-auto">
              Explore our collection of other powerful yantras for different aspects of life and prosperity.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {relatedProducts.map((product) => (
                <div 
                  key={product.id}
                  className="group relative bg-white/90 backdrop-blur-lg rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-white/50 overflow-hidden cursor-pointer transform hover:-translate-y-2"
                >
                  <div className="relative h-48 overflow-hidden rounded-t-2xl">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                  
                  <div className="p-5">
                    <h3 className="text-lg font-bold text-gray-800 group-hover:text-orange-600 transition-colors duration-300 mb-2">
                      {product.name}
                    </h3>
                    
                    <div className="flex items-center mb-3">
                      {[...Array(5)].map((_, i) => (
                        <svg 
                          key={i} 
                          className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-yellow-500' : 'text-gray-300'}`} 
                          fill="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                        </svg>
                      ))}
                      <span className="text-xs text-gray-500 ml-1">({product.rating})</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div className="text-lg font-bold text-orange-600">{formatPrice(product.price)}</div>
                      <button className="px-3 py-1 bg-gradient-to-r from-orange-500 to-rose-500 text-white text-sm font-bold rounded-full hover:from-orange-600 hover:to-rose-600 transition-all duration-300">
                        View
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <GlobalFooter />
    </div>
  );
};

export default SampurnaVyaparVridhiYantraPage;