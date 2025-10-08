'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { PujaCard } from '@/types';
import Header from '@/components/layout/Header';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store';
import { fetchPujaById } from '@/store/slices/pujaSlice';

const PujaDetailPage: React.FC = () => {
  const params = useParams();
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const pujaId = params.id as string;
  
  const { selectedPuja, isLoading, error } = useSelector((state: RootState) => state.puja);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);

  // Additional data for the enhanced puja page
  const devoteeCount = 140;
  const satisfiedCustomers = '100K+';

  const faqData = [
    {
      question: 'Benefits of worshipping through the trilok app',
      answer: 'Through our app, you get authentic puja performed by qualified priests in sacred temples, with live updates, blessed prasad delivery, and digital certificates. You can participate in powerful rituals from anywhere in the world.'
    },
    {
      question: 'Do I benefit from online worship?',
      answer: 'Yes, absolutely! The divine energy and blessings of puja are not limited by physical distance. When performed with devotion and proper rituals by qualified priests, online worship provides the same spiritual benefits as being physically present.'
    },
    {
      question: 'What if I don\'t know my Gotra and birth star?',
      answer: 'No worries! Our team can help you determine your Gotra and birth star based on your family information. You can also consult with our priests who will guide you through the process during the booking.'
    },
    {
      question: 'What should I do on the day of Puja?',
      answer: 'On the day of puja, maintain a positive mindset, wear clean clothes preferably in auspicious colors, avoid non-vegetarian food, and if possible, observe a simple fast. You can also light a lamp at your home during the puja timing.'
    },
    {
      question: 'How can I get more information?',
      answer: 'You can contact our customer support team through WhatsApp, phone, or email. Our spiritual advisors are available to answer all your questions about the puja process, benefits, and booking procedures.'
    },
    {
      question: 'When will I get the result of the puja?',
      answer: 'The effects of puja can be felt immediately for some, while for others it may take a few days to weeks. The results depend on your faith, the severity of doshas, and divine grace. Most devotees experience positive changes within 15-30 days.'
    }
  ];

  useEffect(() => {
    if (pujaId) {
      dispatch(fetchPujaById(pujaId));
    }
  }, [dispatch, pujaId]);

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-purple-50">
        <Header />
        <div className="pt-24 flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-purple-50">
        <Header />
        <div className="pt-24 flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4 font-['Philosopher']">Error Loading Puja</h1>
            <p className="text-gray-600 mb-4">{error}</p>
            <button
              onClick={() => router.push('/pujas')}
              className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition-colors"
            >
              Go Back to Pujas
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Show not found state
  if (!selectedPuja) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-purple-50">
        <Header />
        <div className="pt-24 flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4 font-['Philosopher']">Puja Not Found</h1>
            <button
              onClick={() => router.push('/pujas')}
              className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition-colors"
            >
              Go Back to Pujas
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Main Content */}
      <main className="pt-20">
        <div className="max-w-7xl mx-auto">
          
          {/* Hero Section */}
          <div className="bg-gradient-to-r from-orange-50 via-orange-100 to-yellow-50 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-10 right-10 w-32 h-32 border-2 border-orange-300 rounded-full"></div>
              <div className="absolute bottom-10 left-10 w-24 h-24 border-2 border-orange-300 rounded-full"></div>
            </div>
            
            <div className="relative px-6 py-12">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                
                {/* Left Content */}
                <div className="space-y-6">
                  <div>
                    <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 font-['Philosopher'] mb-4 leading-tight">
                      {selectedPuja.title}
                    </h1>
                    <p className="text-xl text-orange-600 font-medium mb-6">
                      {selectedPuja.temple}
                    </p>
                  </div>
                  
                  {/* Date, Time, Temple Info */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 text-gray-700">
                      <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                        <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-semibold">{new Date(selectedPuja.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 text-gray-700">
                      <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                        <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-semibold">{selectedPuja.temple}</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Key Benefits Icons */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-3 bg-white/70 p-4 rounded-lg">
                      <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                        <span className="text-orange-600 text-xl">🛡️</span>
                      </div>
                      <span className="text-sm font-medium text-gray-700">Divine Blessings</span>
                    </div>
                    <div className="flex items-center gap-3 bg-white/70 p-4 rounded-lg">
                      <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                        <span className="text-orange-600 text-xl">⭐</span>
                      </div>
                      <span className="text-sm font-medium text-gray-700">Spiritual Growth</span>
                    </div>
                    <div className="flex items-center gap-3 bg-white/70 p-4 rounded-lg">
                      <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                        <span className="text-orange-600 text-xl">💪</span>
                      </div>
                      <span className="text-sm font-medium text-gray-700">Inner Peace</span>
                    </div>
                    <div className="flex items-center gap-3 bg-white/70 p-4 rounded-lg">
                      <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                        <span className="text-orange-600 text-xl">💰</span>
                      </div>
                      <span className="text-sm font-medium text-gray-700">Prosperity</span>
                    </div>
                  </div>
                  
                  {/* Stats */}
                  <div className="bg-white/80 p-6 rounded-xl">
                    <div className="grid grid-cols-2 gap-6">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-orange-600 mb-1">{devoteeCount}</div>
                        <div className="text-sm text-gray-600">Devotees already booked this Puja.</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-purple-600 mb-1">{satisfiedCustomers}</div>
                        <div className="text-sm text-gray-600">satisfied customers</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Right Content - Image */}
                <div className="relative">
                  <div className="relative aspect-square rounded-2xl overflow-hidden shadow-2xl">
                    {selectedPuja.image ? (
                      <Image
                        src={selectedPuja.image}
                        alt={selectedPuja.title}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full bg-gradient-to-br from-orange-200 to-yellow-200">
                        <span className="text-orange-600 text-8xl">🛕</span>
                      </div>
                    )}
                  </div>
                  
                  {/* Quick Book Button - Positioned over image */}
                  <div className="absolute bottom-6 left-6 right-6">
                    <button
                      onClick={() => {}}
                      className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-200 shadow-lg backdrop-blur-sm"
                    >
                      Participate Now ₹{selectedPuja.description.length * 100}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Continuous Sections - Beautiful Layout */}
          <div className="px-6 py-8">
            <div className="max-w-6xl mx-auto space-y-16">
              
              {/* About Puja Section */}
              <section id="about" className="scroll-mt-20">
                <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
                  <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-8 text-center">
                    <h2 className="text-4xl font-bold text-white font-['Philosopher'] mb-2">About This Sacred Puja</h2>
                    <p className="text-blue-100 text-lg">Understanding the divine significance and spiritual benefits</p>
                  </div>
                  <div className="p-8">
                    <div className="prose max-w-none">
                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                        <div className="lg:col-span-2">
                          <div className="text-gray-700 leading-relaxed space-y-6 text-lg">
                            <p className="first-letter:text-5xl first-letter:font-bold first-letter:text-orange-600 first-letter:float-left first-letter:mr-3 first-letter:mt-1">
                              {selectedPuja.description}
                            </p>
                          </div>
                        </div>
                        <div className="lg:col-span-1">
                          <div className="bg-gradient-to-br from-orange-50 to-yellow-50 p-6 rounded-2xl border border-orange-100">
                            <h3 className="text-xl font-bold text-gray-900 font-['Philosopher'] mb-4 text-center">Quick Facts</h3>
                            <div className="space-y-4">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                                  <span className="text-orange-600">🗓️</span>
                                </div>
                                <div>
                                  <div className="font-semibold text-gray-900">Date</div>
                                  <div className="text-sm text-gray-600">{new Date(selectedPuja.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</div>
                                </div>
                              </div>
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                                  <span className="text-orange-600">🛕</span>
                                </div>
                                <div>
                                  <div className="font-semibold text-gray-900">Sacred Location</div>
                                  <div className="text-sm text-gray-600">{selectedPuja.temple}</div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* FAQ Section */}
              <section id="faq" className="scroll-mt-20">
                <div className="bg-gradient-to-br from-teal-50 via-cyan-50 to-teal-50 rounded-3xl shadow-xl overflow-hidden border border-teal-100">
                  <div className="bg-gradient-to-r from-teal-500 to-cyan-500 p-8 text-center">
                    <h2 className="text-4xl font-bold text-white font-['Philosopher'] mb-2">Frequently Asked Questions</h2>
                    <p className="text-teal-100 text-lg">Get answers to common queries about our puja services</p>
                  </div>
                  <div className="p-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                      {/* FAQ Content */}
                      <div className="lg:col-span-2 space-y-4">
                        {faqData.map((faq, index) => (
                          <div key={index} className="bg-white border border-teal-100 rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300">
                            <button
                              onClick={() => setExpandedFAQ(expandedFAQ === index ? null : index)}
                              className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-teal-50 transition-colors group"
                            >
                              <h3 className="font-semibold text-gray-900 pr-4 text-lg group-hover:text-teal-600">{faq.question}</h3>
                              <div className="flex-shrink-0">
                                <svg
                                  className={`w-6 h-6 text-teal-600 transform transition-transform duration-200 ${
                                    expandedFAQ === index ? 'rotate-180' : ''
                                  }`}
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                              </div>
                            </button>
                            {expandedFAQ === index && (
                              <div className="px-6 pb-6 border-t border-teal-100 bg-gradient-to-r from-teal-50 to-cyan-50">
                                <div className="pt-4">
                                  <p className="text-gray-700 leading-relaxed text-lg">{faq.answer}</p>
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                      
                      {/* Decorative Ganesh Card */}
                      <div className="lg:col-span-1 flex items-center justify-center">
                        <div className="relative">
                          <div className="w-full max-w-sm bg-gradient-to-br from-red-500 via-red-600 to-red-700 rounded-3xl p-8 text-center shadow-2xl transform hover:scale-105 transition-transform duration-300">
                            <div className="text-white">
                              <div className="text-9xl mb-6">🐘</div>
                              <h3 className="text-2xl font-bold mb-3 font-['Philosopher']">Lord Ganesha</h3>
                              <p className="text-red-100 text-lg mb-6">Remover of Obstacles</p>
                              <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4">
                                <p className="text-sm text-red-100">
                                  {`"`}Vighneshwaraya Vardaya Kurve Namaha{`"`}
                                </p>
                              </div>
                            </div>
                          </div>
                          {/* Decorative elements */}
                          <div className="absolute -top-4 -right-4 w-8 h-8 bg-yellow-400 rounded-full opacity-80 animate-pulse"></div>
                          <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-orange-400 rounded-full opacity-80 animate-pulse"></div>
                          <div className="absolute top-1/2 -left-8 w-4 h-4 bg-pink-400 rounded-full opacity-60 animate-bounce"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              
              {/* Newsletter Signup */}
              <section className="scroll-mt-20">
                <div className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 rounded-3xl p-12 text-center text-white shadow-2xl">
                  <h3 className="text-4xl font-bold mb-4 font-['Philosopher']">Stay Connected with Divine Blessings</h3>
                  <p className="text-xl mb-8 text-orange-100">Get daily horoscope, guidance, and remedies delivered to your inbox</p>
                  <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
                    <input
                      type="email"
                      placeholder="Enter your email address"
                      className="flex-1 px-6 py-4 rounded-2xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-white/50 text-lg"
                    />
                    <button className="bg-white text-orange-600 font-bold px-8 py-4 rounded-2xl hover:bg-gray-100 transition-colors shadow-lg text-lg">
                      🔔 Subscribe Now
                    </button>
                  </div>
                  <p className="text-sm text-orange-200 mt-4">Join 50,000+ devotees receiving daily spiritual guidance</p>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PujaDetailPage;