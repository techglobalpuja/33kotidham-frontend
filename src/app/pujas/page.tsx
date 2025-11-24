'use client';

import React, { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import GlobalFooter from '@/components/layout/GlobalFooter';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store';
import { fetchPujas } from '@/store/slices/pujaSlice';
import UnifiedPujaCard from '@/components/cards/UnifiedPujaCard';

const AllPujasPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { pujas, isLoading, error } = useSelector((state: RootState) => state.puja);
  

  const [isVisible, setIsVisible] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);
  
  // Sort pujas by created_at date (newest first)
  const sortedPujas = [...pujas].sort((a, b) => 
    new Date(b.created_at || '').getTime() - new Date(a.created_at || '').getTime()
  );


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

  // Fetch pujas on component mount
  useEffect(() => {
    dispatch(fetchPujas());
  }, [dispatch]);

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
  }, [testimonials.length]);



  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50/50 via-yellow-50/30 to-rose-50/50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-orange-500 mx-auto mb-4"></div>
          <p className="text-xl text-orange-600 font-semibold">Loading sacred pujas...</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50/50 via-yellow-50/30 to-rose-50/50 flex items-center justify-center">
        <div className="text-center bg-white/80 backdrop-blur-lg rounded-2xl p-8 shadow-xl max-w-md">
          <div className="text-5xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Error Loading Pujas</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button 
            onClick={() => dispatch(fetchPujas())}
            className="bg-gradient-to-r from-orange-500 to-rose-500 text-white font-bold py-3 px-6 rounded-full hover:from-orange-600 hover:to-rose-600 transition-all duration-300"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

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
      <section className="relative pt-28 pb-10 px-4 sm:px-6 lg:px-8 overflow-hidden">
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
              <span className="bg-gradient-to-r from-rose-600 via-orange-700 to-yellow-600 bg-clip-text text-transparent">
                Sacred Pujas
              </span>
            </h1>
            
            <p className="text-[20px] sm:text-[22px] md:text-[24px] font-normal leading-[32px] sm:leading-[34px] md:leading-[36px] font-['Lato'] max-w-5xl mx-auto text-gray-700 mb-12">
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
          </div>
        </div>
      </section>

      {/* Filters and Content */}
      <section className="pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          
          {/* Enhanced Pujas Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {sortedPujas.map((puja) => (
              <UnifiedPujaCard
                key={puja.id}
                id={puja.id}
                image={puja.image}
                title={puja.title}
                temple={puja.temple}
                sub_heading={puja.sub_heading || ''}
                date={puja.date}
                time={puja.time}
                isNew={puja.isNew}
              />
            ))}
          </div>

          {/* Empty State */}
          {sortedPujas.length === 0 && !isLoading && (
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
      

      <GlobalFooter />
    </div>
  );
};

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

export default AllPujasPage;