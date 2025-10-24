'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

// Dummy temple data
const dummyTemples = [
  {
    id: 1,
    name: "Shri Vaishnav Temple",
    description: "A sacred temple dedicated to Lord Vishnu, known for its beautiful architecture and spiritual significance. Located in the heart of Vrindavan, this temple offers a serene environment for all pujas and rituals.",
    fullDescription: "The Shri Vaishnav Temple is a magnificent structure that embodies centuries of spiritual tradition. Built with intricate carvings and detailed craftsmanship, the temple stands as a testament to the devotion of its founders. The main sanctum houses the idol of Lord Vishnu in a reclining posture, symbolizing the cosmic ocean. The temple is particularly famous for its daily rituals and the divine aarti ceremonies that attract devotees throughout the day. The peaceful atmosphere and the fragrance of flowers and incense create a perfect environment for meditation and prayer.",
    location: "Vrindavan, Uttar Pradesh",
    distance: "2.5 km from main shrine",
    rating: 4.9,
    image: "/images/temple1.jpg",
    priests: 12,
    experience: "25+ years average",
    chadawaCount: 24
  },
  {
    id: 2,
    name: "Divine Shakti Peeth",
    description: "A powerful shrine dedicated to Goddess Shakti, attracting devotees from across the country. Known for its divine energy and the expertise of its priests in performing tantric rituals.",
    fullDescription: "The Divine Shakti Peeth is renowned for its powerful spiritual energy and the deep knowledge of its priests in tantric practices. The temple complex features multiple shrines dedicated to different forms of Goddess Shakti, each with its own unique significance. The main idol is made of black stone and is believed to be self-manifested. The temple is especially active during Navratri when thousands of devotees gather to witness the special pujas and cultural programs. The priests here are trained in ancient scriptures and are known for their ability to perform complex rituals with precision.",
    location: "Kolkata, West Bengal",
    distance: "1.2 km from main shrine",
    rating: 4.7,
    image: "/images/temple2.jpg",
    priests: 8,
    experience: "20+ years average",
    chadawaCount: 18
  },
  {
    id: 3,
    name: "Golden Lotus Temple",
    description: "A magnificent temple with lotus-shaped architecture, dedicated to multiple deities. Famous for its grand celebrations during festivals and the wide variety of chadawas available.",
    fullDescription: "The Golden Lotus Temple is an architectural marvel with its distinctive lotus-shaped design that symbolizes purity and spiritual awakening. The temple's golden exterior gleams in the sunlight, making it visible from miles away. Inside, the temple houses idols of multiple deities including Lord Vishnu, Goddess Lakshmi, and Lord Shiva. The temple is particularly famous for its elaborate decorations during Diwali and Holi. The spacious halls can accommodate thousands of devotees, and the temple also has a museum showcasing ancient religious artifacts and manuscripts.",
    location: "Haridwar, Uttarakhand",
    distance: "0.8 km from main shrine",
    rating: 4.8,
    image: "/images/temple3.jpg",
    priests: 15,
    experience: "30+ years average",
    chadawaCount: 32
  },
  {
    id: 4,
    name: "Sacred Rudra Mandir",
    description: "An ancient temple dedicated to Lord Shiva, known for its powerful Rudra puja ceremonies. The temple has a peaceful atmosphere and highly experienced priests specializing in Vedic rituals.",
    fullDescription: "The Sacred Rudra Mandir is one of the oldest temples in the region, with historical records dating back over 500 years. The temple's architecture reflects the ancient Nagara style, with its distinctive curved spire and intricate stone carvings. The main lingam is made of black basalt and is believed to have been installed by Adi Shankaracharya himself. The temple is famous for its daily Rudra abhishekam, a special ritual performed with the chanting of Vedic mantras. The peaceful atmosphere is enhanced by the temple's location near the banks of the holy Ganges, making it a popular destination for spiritual seekers.",
    location: "Varanasi, Uttar Pradesh",
    distance: "3.1 km from main shrine",
    rating: 4.9,
    image: "/images/temple4.jpg",
    priests: 10,
    experience: "28+ years average",
    chadawaCount: 28
  },
];

// Dummy chadawa data
const dummyChadawas = [
  {
    id: 1,
    name: "Silver Chadar",
    description: "A beautiful silver chadar for offering to deities. Made with pure silver threads and traditional craftsmanship.",
    price: "₹1,200",
    image: "/images/chadawa1.jpg",
    rating: 4.8,
    reviews: 124,
  },
  {
    id: 2,
    name: "Golden Chadar",
    description: "An exquisite golden chadar with intricate designs. Perfect for special occasions and pujas.",
    price: "₹2,500",
    image: "/images/chadawa2.jpg",
    rating: 4.9,
    reviews: 89,
  },
  {
    id: 3,
    name: "Crystal Chadar",
    description: "A shimmering crystal chadar that catches light beautifully. Adds divine sparkle to any puja.",
    price: "₹1,800",
    image: "/images/chadawa3.jpg",
    rating: 4.7,
    reviews: 156,
  },
  {
    id: 4,
    name: "Pearl Chadar",
    description: "Elegant pearl chadar with hand-sewn pearls. A symbol of purity and devotion.",
    price: "₹3,200",
    image: "/images/chadawa4.jpg",
    rating: 4.9,
    reviews: 72,
  },
  {
    id: 5,
    name: "Silk Chadar",
    description: "Luxurious silk chadar with traditional patterns. Soft to touch and visually stunning.",
    price: "₹1,500",
    image: "/images/chadawa5.jpg",
    rating: 4.6,
    reviews: 98,
  },
  {
    id: 6,
    name: "Brocade Chadar",
    description: "Rich brocade chadar with golden embroidery. Perfect for festive celebrations.",
    price: "₹2,800",
    image: "/images/chadawa6.jpg",
    rating: 4.8,
    reviews: 112,
  },
];

const TempleDetailPage: React.FC = () => {
  const params = useParams();
  const { templeId } = params;
  
  // Find the temple based on the ID
  const temple = dummyTemples.find(item => item.id === parseInt(templeId as string)) || dummyTemples[0];
  
  const [selectedChadawa, setSelectedChadawa] = useState<number | null>(null);

  // Handle chadawa selection
  const handleChadawaSelect = (chadawaId: number) => {
    setSelectedChadawa(chadawaId === selectedChadawa ? null : chadawaId);
  };

  // Handle checkout (currently unused - will be implemented when checkout flow is added)
  // const handleCheckout = () => {
  //   if (selectedChadawa) {
  //     // In a real app, this would navigate to the checkout page
  //     // For now, we'll just show an alert
  //     alert(`Proceeding to checkout for ${dummyChadawas.find(c => c.id === selectedChadawa)?.name} at ${temple.name}`);
  //   }
  // };

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
                    <span className="font-bold">{temple.rating}</span>
                    <span className="text-xs ml-1">({temple.priests} priests)</span>
                  </div>
                </div>
                
                <div className="flex items-center text-gray-600 mb-6">
                  <svg className="w-5 h-5 mr-2 text-orange-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                  </svg>
                  <span>{temple.location}</span>
                  <span className="mx-2">•</span>
                  <span>{temple.distance}</span>
                </div>
                
                <p className="text-gray-600 mb-6">{temple.description}</p>
                
                <div className="mb-8 p-4 bg-orange-50 rounded-xl border border-orange-200">
                  <h3 className="font-bold text-orange-800 mb-2">Temple Highlights</h3>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <li className="flex items-center">
                      <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700">{temple.experience} average priest experience</span>
                    </li>
                    <li className="flex items-center">
                      <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700">{temple.chadawaCount} different chadawas available</span>
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
            <p className="text-gray-600 leading-relaxed">{temple.fullDescription}</p>
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
              {dummyChadawas.map((chadawa) => (
                <div 
                  key={chadawa.id}
                  onClick={() => handleChadawaSelect(chadawa.id)}
                  className={`group relative bg-white/90 backdrop-blur-lg rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border-2 overflow-hidden cursor-pointer transform hover:-translate-y-2 ${
                    selectedChadawa === chadawa.id 
                      ? 'border-orange-500 ring-4 ring-orange-200' 
                      : 'border-white/50 hover:border-orange-300'
                  }`}
                >
                  <div className="relative h-52 overflow-hidden rounded-t-2xl">
                    <Image
                      src={chadawa.image || '/images/placeholder.jpg'}
                      alt={chadawa.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = '/images/placeholder.jpg';
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
                        <span className="text-xs font-bold">{chadawa.rating}</span>
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">{chadawa.description}</p>
                    
                    <div className="flex justify-between items-center">
                      <div className="text-lg font-bold text-orange-600">{chadawa.price}</div>
                      <div className="text-xs text-gray-500">{chadawa.reviews} reviews</div>
                    </div>
                  </div>
                  
                  {selectedChadawa === chadawa.id && (
                    <div className="absolute inset-0 bg-orange-500/10 rounded-2xl flex items-center justify-center">
                      <div className="bg-orange-500 text-white px-4 py-2 rounded-full font-bold flex items-center">
                        <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Selected
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            {/* Checkout Button */}
            <div className="mt-12 text-center">
              <button
                onClick={() => {
                  if (selectedChadawa) {
                    window.location.href = `/chadawa-store/${templeId}/${selectedChadawa}/checkout`;
                  }
                }}
                disabled={!selectedChadawa}
                className={`px-12 py-4 rounded-2xl text-lg font-bold shadow-lg transform transition-all duration-300 ${
                  selectedChadawa
                    ? 'bg-gradient-to-r from-orange-500 to-rose-500 text-white hover:from-orange-600 hover:to-rose-600 hover:scale-105'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Proceed to Checkout
              </button>
              {!selectedChadawa && (
                <p className="text-gray-500 mt-2 text-sm">Please select a chadawa to proceed</p>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default TempleDetailPage;