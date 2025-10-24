'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

// Dummy data
const dummyTemples = [
  {
    id: 1,
    name: "Shri Vaishnav Temple",
    description: "A sacred temple dedicated to Lord Vishnu, known for its beautiful architecture and spiritual significance.",
    location: "Vrindavan, Uttar Pradesh",
    image: "/images/temple1.jpg",
  },
  {
    id: 2,
    name: "Divine Shakti Peeth",
    description: "A powerful shrine dedicated to Goddess Shakti, attracting devotees from across the country.",
    location: "Kolkata, West Bengal",
    image: "/images/temple2.jpg",
  },
  {
    id: 3,
    name: "Golden Lotus Temple",
    description: "A magnificent temple with lotus-shaped architecture, dedicated to multiple deities.",
    location: "Haridwar, Uttarakhand",
    image: "/images/temple3.jpg",
  },
  {
    id: 4,
    name: "Sacred Rudra Mandir",
    description: "An ancient temple dedicated to Lord Shiva, known for its powerful Rudra puja ceremonies.",
    location: "Varanasi, Uttar Pradesh",
    image: "/images/temple4.jpg",
  },
];

const dummyChadawas = [
  {
    id: 1,
    name: "Silver Chadar",
    description: "A beautiful silver chadar for offering to deities. Made with pure silver threads and traditional craftsmanship.",
    fullDescription: "Our Silver Chadar is meticulously handcrafted by skilled artisans using traditional techniques passed down through generations. Each thread is carefully woven to create a stunning pattern that shimmers in the light. The silver threads are of the highest quality, ensuring durability and a beautiful shine that lasts. This chadar is perfect for offering to deities during special occasions and pujas. It brings a sense of reverence and devotion to any religious ceremony.",
    price: 1200,
    image: "/images/chadawa1.jpg",
    features: [
      "Pure silver threads",
      "Handcrafted with traditional techniques",
      "Intricate pattern design",
      "Suitable for all religious ceremonies",
      "Durable and long-lasting"
    ]
  },
  {
    id: 2,
    name: "Golden Chadar",
    description: "An exquisite golden chadar with intricate designs. Perfect for special occasions and pujas.",
    fullDescription: "The Golden Chadar is a masterpiece of craftsmanship, featuring elaborate golden patterns that catch the light beautifully. Made with the finest materials and attention to detail, this chadar is perfect for the most important religious ceremonies. Its luxurious appearance makes it an ideal offering for special pujas and festivals.",
    price: 2500,
    image: "/images/chadawa2.jpg",
    features: [
      "24K gold-plated threads",
      "Elaborate pattern design",
      "Luxurious appearance",
      "Perfect for special occasions",
      "Comes with a certificate of authenticity"
    ]
  },
  {
    id: 3,
    name: "Crystal Chadar",
    description: "A shimmering crystal chadar that catches light beautifully. Adds divine sparkle to any puja.",
    fullDescription: "The Crystal Chadar is designed to add a touch of divine sparkle to your puja rituals. Embedded with high-quality crystals that reflect light magnificently, this chadar creates a mesmerizing effect during ceremonies. The crystals are carefully placed to enhance the spiritual ambiance and create a sense of divine presence.",
    price: 1800,
    image: "/images/chadawa3.jpg",
    features: [
      "High-quality crystal embellishments",
      "Light-reflecting properties",
      "Enhances spiritual ambiance",
      "Easy to maintain",
      "Comes in a premium storage box"
    ]
  },
  {
    id: 4,
    name: "Pearl Chadar",
    description: "Elegant pearl chadar with hand-sewn pearls. A symbol of purity and devotion.",
    fullDescription: "The Pearl Chadar represents purity and devotion in its most elegant form. Each pearl is hand-sewn with precision, creating a luxurious texture that feels as beautiful as it looks. This chadar is perfect for those seeking a symbol of spiritual purity and devotion in their religious practices.",
    price: 3200,
    image: "/images/chadawa4.jpg",
    features: [
      "Hand-sewn freshwater pearls",
      "Symbol of purity and devotion",
      "Luxurious texture",
      "Perfect for special ceremonies",
      "Comes with a care guide"
    ]
  },
  {
    id: 5,
    name: "Silk Chadar",
    description: "Luxurious silk chadar with traditional patterns. Soft to touch and visually stunning.",
    fullDescription: "The Silk Chadar combines the natural beauty of silk with traditional patterns to create a luxurious offering. The soft texture feels wonderful against the skin, while the vibrant colors and intricate patterns make it visually stunning. This chadar is perfect for those who appreciate both comfort and beauty in their spiritual practices.",
    price: 1500,
    image: "/images/chadawa5.jpg",
    features: [
      "Premium silk fabric",
      "Traditional pattern designs",
      "Soft and comfortable",
      "Vibrant colors",
      "Lightweight and easy to carry"
    ]
  },
  {
    id: 6,
    name: "Brocade Chadar",
    description: "Rich brocade chadar with golden embroidery. Perfect for festive celebrations.",
    fullDescription: "The Brocade Chadar is a celebration of traditional Indian textile art. The rich brocade fabric is complemented with golden embroidery that adds a regal touch to any ceremony. This chadar is perfect for festive celebrations and special occasions when you want to make a grand offering.",
    price: 2800,
    image: "/images/chadawa6.jpg",
    features: [
      "Rich brocade fabric",
      "Golden embroidery",
      "Perfect for festive occasions",
      "Regal appearance",
      "Comes with a matching pouch"
    ]
  },
];

// Additional chadawas for add-ons
const additionalChadawas = [
  {
    id: 7,
    name: "Mini Silver Chadar",
    description: "A smaller version of our popular silver chadar, perfect for personal use.",
    price: 600,
    image: "/images/chadawa7.jpg",
  },
  {
    id: 8,
    name: "Golden Threaded Diya",
    description: "Traditional diya with golden threading, perfect for lighting during pujas.",
    price: 450,
    image: "/images/chadawa8.jpg",
  },
  {
    id: 9,
    name: "Sandalwood Incense Set",
    description: "Premium sandalwood incense sticks for a divine fragrance during rituals.",
    price: 350,
    image: "/images/chadawa9.jpg",
  },
  {
    id: 10,
    name: "Rudraksha Garland",
    description: "Sacred rudraksha beads strung together for spiritual protection.",
    price: 800,
    image: "/images/chadawa10.jpg",
  },
];

const CheckoutPage: React.FC = () => {
  const params = useParams();
  const { templeId, chadawaId } = params;
  
  // Find the chadawa and temple based on the IDs
  const chadawa = dummyChadawas.find(item => item.id === parseInt(chadawaId as string)) || dummyChadawas[0];
  const temple = dummyTemples.find(item => item.id === parseInt(templeId as string)) || dummyTemples[0];
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    specialInstructions: '',
  });
  
  const [selectedAddons, setSelectedAddons] = useState<number[]>([]);
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddonToggle = (addonId: number) => {
    setSelectedAddons(prev => 
      prev.includes(addonId) 
        ? prev.filter(id => id !== addonId) 
        : [...prev, addonId]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      alert('Order placed successfully! You will receive a confirmation email shortly.');
    }, 2000);
  };

  // Calculate total
  const chadawaPrice = chadawa.price;
  const addonsPrice = additionalChadawas
    .filter(addon => selectedAddons.includes(addon.id))
    .reduce((total, addon) => total + addon.price, 0);
  
  const total = chadawaPrice + addonsPrice;

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
            <Link href={`/chadawa-store/${templeId}`} className="hover:text-orange-600">{temple.name}</Link>
            <span className="mx-2">/</span>
            <span className="text-orange-600 font-medium">Checkout</span>
          </nav>
        </div>
      </section>

      {/* Checkout Section */}
      <section className="pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 text-center mb-2 font-['Philosopher']">
            Complete Your Offering
          </h1>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Review your chadawa selection and provide your details to complete the offering process
          </p>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl p-6 border border-white/50 sticky top-32">
                <h2 className="text-xl font-bold text-gray-800 mb-6">Order Summary</h2>
                
                {/* Main Chadawa */}
                <div className="flex items-center mb-6 pb-6 border-b border-gray-200">
                  <div className="relative w-20 h-20 rounded-xl overflow-hidden">
                    <Image
                      src={chadawa.image || '/images/placeholder.jpg'}
                      alt={chadawa.name}
                      fill
                      className="object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = '/images/placeholder.jpg';
                      }}
                    />
                  </div>
                  <div className="ml-4 flex-1">
                    <h3 className="font-bold text-gray-800">{chadawa.name}</h3>
                    <p className="text-sm text-gray-600 line-clamp-2">{chadawa.description}</p>
                    <div className="mt-2 text-lg font-bold text-orange-600">₹{chadawa.price}</div>
                  </div>
                </div>
                
                {/* Temple */}
                <div className="mb-6 pb-6 border-b border-gray-200">
                  <h3 className="font-bold text-gray-800 mb-3">Temple</h3>
                  <div className="flex items-center">
                    <div className="relative w-12 h-12 rounded-lg overflow-hidden">
                      <Image
                        src={temple.image || '/images/placeholder.jpg'}
                        alt={temple.name}
                        fill
                        className="object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = '/images/placeholder.jpg';
                        }}
                      />
                    </div>
                    <div className="ml-3">
                      <div className="font-bold text-gray-800">{temple.name}</div>
                      <div className="text-sm text-gray-600">{temple.location}</div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">{temple.description}</p>
                </div>
                
                {/* Add-ons */}
                {selectedAddons.length > 0 && (
                  <div className="mb-6 pb-6 border-b border-gray-200">
                    <h3 className="font-bold text-gray-800 mb-3">Add-ons</h3>
                    <div className="space-y-3">
                      {additionalChadawas
                        .filter(addon => selectedAddons.includes(addon.id))
                        .map(addon => (
                          <div key={addon.id} className="flex justify-between">
                            <span className="text-gray-600">{addon.name}</span>
                            <span className="font-medium">₹{addon.price}</span>
                          </div>
                        ))}
                    </div>
                  </div>
                )}
                
                {/* Pricing */}
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Chadawa Price</span>
                    <span className="font-medium">₹{chadawaPrice}</span>
                  </div>
                  {selectedAddons.length > 0 && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Add-ons</span>
                      <span className="font-medium">₹{addonsPrice}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-gray-600">Temple Offering Fee</span>
                    <span className="font-medium">₹100</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Processing Fee</span>
                    <span className="font-medium">₹50</span>
                  </div>
                  <div className="flex justify-between pt-3 border-t border-gray-200">
                    <span className="text-lg font-bold text-gray-800">Total</span>
                    <span className="text-lg font-bold text-orange-600">₹{total + 150}</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Checkout Form */}
            <div className="lg:col-span-2">
              <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl p-6 border border-white/50">
                <form onSubmit={handleSubmit}>
                  {/* Personal Information */}
                  <div className="mb-8">
                    <h2 className="text-xl font-bold text-gray-800 mb-4">Personal Information</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                        <input
                          type="text"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors duration-300"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors duration-300"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors duration-300"
                          required
                        />
                      </div>
                    </div>
                  </div>
                  
                  {/* Address Information */}
                  <div className="mb-8">
                    <h2 className="text-xl font-bold text-gray-800 mb-4">Delivery Address</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Street Address</label>
                        <input
                          type="text"
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors duration-300"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                        <input
                          type="text"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors duration-300"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                        <input
                          type="text"
                          name="state"
                          value={formData.state}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors duration-300"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">ZIP Code</label>
                        <input
                          type="text"
                          name="zipCode"
                          value={formData.zipCode}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors duration-300"
                          required
                        />
                      </div>
                    </div>
                  </div>
                  
                  {/* Special Instructions */}
                  <div className="mb-8">
                    <h2 className="text-xl font-bold text-gray-800 mb-4">Special Instructions</h2>
                    <textarea
                      name="specialInstructions"
                      value={formData.specialInstructions}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors duration-300"
                      placeholder="Any special requests for the puja ceremony..."
                    ></textarea>
                  </div>
                  
                  {/* Add-ons Selection */}
                  <div className="mb-8">
                    <h2 className="text-xl font-bold text-gray-800 mb-4">Enhance Your Offering</h2>
                    <p className="text-gray-600 mb-4">Select additional items to make your offering more complete</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {additionalChadawas.map((addon) => (
                        <div 
                          key={addon.id}
                          onClick={() => handleAddonToggle(addon.id)}
                          className={`border-2 rounded-2xl p-4 cursor-pointer transition-all duration-300 ${
                            selectedAddons.includes(addon.id)
                              ? 'border-orange-500 bg-orange-50 ring-4 ring-orange-100'
                              : 'border-gray-200 hover:border-orange-300'
                          }`}
                        >
                          <div className="flex items-center">
                            <div className="relative w-16 h-16 rounded-lg overflow-hidden mr-4">
                              <Image
                                src={addon.image || '/images/placeholder.jpg'}
                                alt={addon.name}
                                fill
                                className="object-cover"
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement;
                                  target.src = '/images/placeholder.jpg';
                                }}
                              />
                            </div>
                            <div className="flex-1">
                              <div className="font-bold text-gray-800">{addon.name}</div>
                              <div className="text-sm text-gray-600 line-clamp-1">{addon.description}</div>
                              <div className="text-lg font-bold text-orange-600 mt-1">₹{addon.price}</div>
                            </div>
                            {selectedAddons.includes(addon.id) && (
                              <div className="w-6 h-6 rounded-full bg-orange-500 flex items-center justify-center">
                                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Payment Method */}
                  <div className="mb-8">
                    <h2 className="text-xl font-bold text-gray-800 mb-4">Payment Method</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div 
                        onClick={() => setPaymentMethod('upi')}
                        className={`border-2 rounded-2xl p-4 cursor-pointer transition-all duration-300 ${
                          paymentMethod === 'upi' 
                            ? 'border-orange-500 bg-orange-50 ring-4 ring-orange-100' 
                            : 'border-gray-200 hover:border-orange-300'
                        }`}
                      >
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center mr-3">
                            <svg className="w-6 h-6 text-orange-600" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                            </svg>
                          </div>
                          <div>
                            <div className="font-bold text-gray-800">UPI</div>
                            <div className="text-sm text-gray-600">Google Pay, PhonePe, etc.</div>
                          </div>
                        </div>
                      </div>
                      
                      <div 
                        onClick={() => setPaymentMethod('card')}
                        className={`border-2 rounded-2xl p-4 cursor-pointer transition-all duration-300 ${
                          paymentMethod === 'card' 
                            ? 'border-orange-500 bg-orange-50 ring-4 ring-orange-100' 
                            : 'border-gray-200 hover:border-orange-300'
                        }`}
                      >
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center mr-3">
                            <svg className="w-6 h-6 text-orange-600" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z"/>
                            </svg>
                          </div>
                          <div>
                            <div className="font-bold text-gray-800">Credit/Debit Card</div>
                            <div className="text-sm text-gray-600">Visa, Mastercard, etc.</div>
                          </div>
                        </div>
                      </div>
                      
                      <div 
                        onClick={() => setPaymentMethod('netbanking')}
                        className={`border-2 rounded-2xl p-4 cursor-pointer transition-all duration-300 ${
                          paymentMethod === 'netbanking' 
                            ? 'border-orange-500 bg-orange-50 ring-4 ring-orange-100' 
                            : 'border-gray-200 hover:border-orange-300'
                        }`}
                      >
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center mr-3">
                            <svg className="w-6 h-6 text-orange-600" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M4 10.44l3.62 3.18c.37.34.94.34 1.31 0L12.56 10.44l3.63 3.18c.37.34.94.34 1.31 0L20 10.44V18c0 1.1-.9 2-2 2H6c-1.1 0-2-.9-2-2v-7.56z"/>
                              <path d="M20 6v2.44l-3.63 3.18c-.37.34-.94.34-1.31 0L11.44 8.44 7.81 11.62c-.37.34-.94.34-1.31 0L4 8.44V6c0-1.1.9-2 2-2h12c1.1 0 2 .9 2 2z"/>
                            </svg>
                          </div>
                          <div>
                            <div className="font-bold text-gray-800">Net Banking</div>
                            <div className="text-sm text-gray-600">All Indian banks</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Payment Details */}
                  {paymentMethod === 'card' && (
                    <div className="mb-8 bg-gray-50 rounded-2xl p-6">
                      <h3 className="text-lg font-bold text-gray-800 mb-4">Card Details</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
                          <input
                            type="text"
                            placeholder="1234 5678 9012 3456"
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors duration-300"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                          <input
                            type="text"
                            placeholder="MM/YY"
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors duration-300"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
                          <input
                            type="text"
                            placeholder="123"
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors duration-300"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {/* Terms and Conditions */}
                  <div className="mb-8">
                    <div className="flex items-start">
                      <input
                        type="checkbox"
                        id="terms"
                        className="mt-1 mr-3 h-5 w-5 text-orange-600 rounded focus:ring-orange-500"
                        required
                      />
                      <label htmlFor="terms" className="text-gray-700">
                        I agree to the <Link href="/terms-conditions" className="text-orange-600 hover:underline">Terms & Conditions</Link> and <Link href="/privacy-policy" className="text-orange-600 hover:underline">Privacy Policy</Link>. I understand that this is a religious offering and the puja will be performed as per traditional rituals.
                      </label>
                    </div>
                  </div>
                  
                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isProcessing}
                    className={`w-full py-4 rounded-2xl text-lg font-bold shadow-lg transform transition-all duration-300 ${
                      isProcessing
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-gradient-to-r from-orange-500 to-rose-500 text-white hover:from-orange-600 hover:to-rose-600 hover:scale-105'
                    }`}
                  >
                    {isProcessing ? (
                      <div className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing Payment...
                      </div>
                    ) : (
                      `Pay ₹${total + 150} & Confirm Offering`
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CheckoutPage;