'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { Puja, Plan } from '@/types';
import Header from '@/components/layout/Header';

const PujaDetailPage: React.FC = () => {
  const params = useParams();
  const router = useRouter();
  const pujaId = params.id as string;
  
  const [puja, setPuja] = useState<Puja | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedDakshinaPrice, setSelectedDakshinaPrice] = useState<number | null>(null);
  const [selectedManokamnaPrice, setSelectedManokamnaPrice] = useState<number | null>(null);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [expandedBenefit, setExpandedBenefit] = useState<number | null>(null);
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

  const pujaProcessSteps = [
    {
      step: 1,
      title: 'Select Puja',
      description: 'In puja selection, first select the puja of your choice.',
      time: 'Instant'
    },
    {
      step: 2,
      title: 'Select Puja Package',
      description: 'After choosing the puja, select the puja pack such as - Individual Puja, Partner Puja or Family Puja.',
      time: '1-2 minutes'
    },
    {
      step: 3,
      title: 'Fill Complete Information',
      description: 'Fill your complete information like name, clan etc. in the given form.',
      time: '2-3 minutes'
    },
    {
      step: 4,
      title: 'Sankalp with Your Name',
      description: 'As per your chosen puja pack, our Pandit ji will include both your and your family\'s names in the Sankalp.',
      time: 'During puja'
    },
    {
      step: 5,
      title: 'Puja Recording & Prasad',
      description: 'A video recording of your puja, including your name sankalp, will be sent to you via WhatsApp in 5 to 7 business days. The prasad from the puja will also be sent to your specified address by post, free of charge.',
      time: '5-7 days'
    }
  ];

  // Mock data - In a real app, this would be fetched from API
  const mockPujas: (Omit<Puja, 'selectedPlans'> & { selectedPlanIds: string[] })[] = [
    {
      id: '1',
      pujaName: 'Sarv Dosh Nivaran Nav Grah Puja',
      subHeading: 'For Success, Happiness, Prosperity, Offspring, and Wealth',
      about: 'Do you know that it is essential to seek the blessings of the 9 planets before starting any auspicious work? The Puranas describe the Navagrahas as the rulers of life and the givers of all kinds of happiness. If you are waiting to begin something auspicious in your life—such as marriage, childbirth, starting a new business, traveling abroad, or pursuing higher education—you must perform the Navagraha Shanti Puja.\n\nAmong the 9 planets, Rahu and Ketu always create confusion, and Saturn can ruin things that are already set. If the Sun is displeased, you will not receive fame. Without Jupiter\'s blessings, prosperity will remain out of reach. If Venus becomes unfavorable for any reason, wealth, luxury, happiness, prosperity, and love will be hard to attain. And if the Moon turns malefic, you will suffer mental distress throughout life.\n\nWhen the positions of these planets turn adverse, you face many challenges in life. That is why you must perform the Navagraha Shanti Puja to protect your life from all directions, attract prosperity, and safeguard your happiness.',
      date: '2025-09-10',
      time: '15:00',
      pujaImages: ['/images/navgrah-puja-1.jpg', '/images/navgrah-puja-2.jpg', '/images/navgrah-puja-3.jpg'],
      templeImage: '/images/navgrah-shani-mandir.jpg',
      templeAddress: 'Navgrah Shani Mandir, Avantika Tirth Kshetra, Ujjain',
      templeDescription: 'This temple in Ujjain is over 2000 years old. Here, the Navagrahas (nine planets) are worshipped in the form of Shiva. Each planet\'s idol is shaped like a Shiva lingam. It is said that this temple was built by King Vikramaditya after experiencing the suffering caused by Saturn, to please Lord Shani. Afterward, he performed special worship of the Navagrahas and established all the Navagrahas in this temple. The temple is highly divine. Devotees come from far and wide to seek blessings from the Navagrahas and pray for their grace. Situated on the Triveni Ghat of the Shipra River, this temple is believed to provide special benefits from the worship of the Navagrahas. In many places, it is believed that worshipping here alleviates more than half of the devotee\'s suffering caused by Saturn at that very moment. Moreover, special worship of the Sun God here leads to the fulfillment of all tasks and ensures complete health improvement.',
      benefits: [
        {
          title: 'Remove Negative Effects of Planets',
          description: 'This grand puja brings peace to all planets. It removes the negative effects of planets like the Sun, Saturn, Rahu, Ketu, Mars, etc., and blesses you with the auspicious energy of all the planets.'
        },
        {
          title: 'Eliminate Kundali Dosha',
          description: 'This puja eliminates doshas in your horoscope, such as Pitru dosha, Manglik dosha, Rahu dosha, or Saturn dosha. It generates positive energy around you.'
        },
        {
          title: 'Removes Unnecessary Fears',
          description: 'If you are troubled by any kind of unnecessary fears, you must participate in the Sarv Dosh Nivaran Grah Shanti Puja. This puja creates a protective shield around you.'
        },
        {
          title: 'Success, Prosperity, and Wealth',
          description: 'If you seek success, prosperity, and wealth, you should definitely perform this special puja of the nine planets. This puja reduces the harmful effects of all the nine planets, including the Sun, and leads to success.'
        }
      ],
      selectedPlanIds: ['1', '2'],
      prasadPrice: 750,
      prasadStatus: true,
      dakshinaPrices: '501,1001,2001,5001',
      dakshinaPricesUSD: '6,12,24,60',
      dakshinaStatus: true,
      manokamanaPrices: '101,251,501,1001',
      manokamanaPricesUSD: '1.5,3,6,12',
      manokamanaStatus: true,
      category: 'prosperity',
      isActive: true,
      isFeatured: true,
      createdDate: '2024-01-15'
    },
    {
      id: '2',
      pujaName: 'Lakshmi Puja',
      subHeading: 'Attract Wealth & Abundance',
      about: 'Divine Lakshmi puja for wealth, abundance and financial prosperity. This sacred ceremony is dedicated to Goddess Lakshmi, the deity of wealth, fortune, and prosperity. The ritual involves traditional prayers, offerings of lotus flowers, and chanting of powerful mantras that attract divine blessings for financial growth.\n\nThe puja includes special offerings like gold, silver coins, and prosperity-enhancing items. The ceremony creates a positive energy field that attracts wealth and removes financial obstacles from your life.\n\nGoddess Lakshmi blesses devotees with not just material wealth but also spiritual abundance, bringing harmony and prosperity to all aspects of life.',
      date: '2025-09-15',
      time: '07:00',
      pujaImages: ['/images/lakshmi-puja-1.jpg', '/images/lakshmi-puja-2.jpg'],
      templeImage: '/images/lakshmi-temple.jpg',
      templeAddress: 'Mahalakshmi Temple, Kolhapur, Maharashtra',
      templeDescription: 'The ancient Mahalakshmi Temple in Kolhapur is one of the most revered Shakti Peethas, known for bestowing wealth and prosperity upon devotees.',
      benefits: [
        {
          title: 'Financial Prosperity',
          description: 'Attracts wealth, money, and financial abundance into your life'
        },
        {
          title: 'Business Success',
          description: 'Enhances business growth, profits, and commercial success'
        },
        {
          title: 'Debt Removal',
          description: 'Helps in clearing debts and financial burdens'
        },
        {
          title: 'Material Abundance',
          description: 'Brings material comforts and luxury into your life'
        }
      ],
      selectedPlanIds: ['1'],
      prasadPrice: 500,
      prasadStatus: true,
      dakshinaPrices: '501,1001,2001',
      dakshinaPricesUSD: '6,12,24',
      dakshinaStatus: true,
      manokamanaPrices: '201,501,1001',
      manokamanaPricesUSD: '2.5,6,12',
      manokamanaStatus: true,
      category: 'prosperity',
      isActive: true,
      isFeatured: false,
      createdDate: '2024-01-10'
    },
    {
      id: '3',
      pujaName: 'Saraswati Puja',
      subHeading: 'Gain Knowledge & Wisdom',
      about: 'Sacred Saraswati puja for knowledge, wisdom and academic success. This divine ceremony is dedicated to Goddess Saraswati, the deity of knowledge, arts, and learning. The ritual enhances intellectual abilities, improves concentration, and brings success in education and creative pursuits.\n\nThe puja includes offerings of white flowers, books, musical instruments, and knowledge-related items. Special mantras are chanted to invoke the blessings of the goddess for wisdom and learning.\n\nStudents, teachers, artists, and professionals benefit greatly from this puja, as it removes obstacles in learning and enhances creative abilities.',
      date: '2025-02-14',
      time: '06:30',
      pujaImages: ['/images/saraswati-puja-1.jpg', '/images/saraswati-puja-2.jpg'],
      templeImage: '/images/saraswati-temple.jpg',
      templeAddress: 'Saraswati Temple, Varanasi, Uttar Pradesh',
      templeDescription: 'This sacred temple on the banks of the Ganges is dedicated to Goddess Saraswati and is particularly powerful for students and seekers of knowledge.',
      benefits: [
        {
          title: 'Academic Excellence',
          description: 'Enhances learning abilities and academic performance'
        },
        {
          title: 'Wisdom & Intelligence',
          description: 'Increases wisdom, intelligence, and decision-making abilities'
        },
        {
          title: 'Creative Enhancement',
          description: 'Boosts creativity and artistic talents'
        },
        {
          title: 'Communication Skills',
          description: 'Improves speaking, writing, and communication abilities'
        }
      ],
      selectedPlanIds: ['1', '2'],
      prasadPrice: 300,
      prasadStatus: true,
      dakshinaPrices: '251,501,1001',
      dakshinaPricesUSD: '3,6,12',
      dakshinaStatus: true,
      manokamanaPrices: '101,201,501',
      manokamanaPricesUSD: '1.5,2.5,6',
      manokamanaStatus: true,
      category: 'education',
      isActive: true,
      isFeatured: true,
      createdDate: '2024-01-08'
    }
  ];

  const mockPlans: Plan[] = [
    {
      id: '1',
      name: 'Basic Puja Package',
      price: 5000,
      image: '/images/basic-plan.jpg',
      category: 'Normal',
      description: {
        feature1: 'Complete puja ceremony with traditional rituals',
        feature2: 'Digital certificate of participation',
        feature3: 'Photo gallery of your puja ceremony',
        feature4: 'Basic prasad delivery to your location'
      },
      isActive: true,
      createdDate: '2024-01-15'
    },
    {
      id: '2',
      name: 'Premium VIP Experience',
      price: 15000,
      image: '/images/vip-plan.jpg',
      category: 'VIP',
      description: {
        feature1: 'Personalized puja ceremony with name inscription',
        feature2: 'Live video streaming of your puja',
        feature3: 'Premium prasad package with blessed items',
        feature4: 'Personal consultation with temple priest'
      },
      isActive: true,
      createdDate: '2024-01-12'
    }
  ];

  useEffect(() => {
    // Simulate API call
    const fetchPuja = async () => {
      setLoading(true);
      try {
        // Find the puja by ID
        const foundPuja = mockPujas.find(p => p.id === pujaId);
        if (foundPuja) {
          // Get the associated plans
          const associatedPlans = mockPlans.filter(plan => 
            foundPuja.selectedPlanIds.includes(plan.id)
          );
          
          const pujaWithPlans: Puja = {
            ...foundPuja,
            selectedPlans: associatedPlans
          };
          
          setPuja(pujaWithPlans);
          if (associatedPlans.length > 0) {
            setSelectedPlan(associatedPlans[0]);
          }
        }
      } catch (error) {
        console.error('Error fetching puja:', error);
      } finally {
        setLoading(false);
      }
    };

    if (pujaId) {
      fetchPuja();
    }
  }, [pujaId]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const getPriceArray = (priceString: string): number[] => {
    return priceString.split(',').map(price => parseInt(price.trim())).filter(price => !isNaN(price));
  };

  const calculateTotal = () => {
    let total = 0;
    if (selectedPlan) total += selectedPlan.price;
    if (puja?.prasadStatus) total += puja.prasadPrice;
    if (selectedDakshinaPrice) total += selectedDakshinaPrice;
    if (selectedManokamnaPrice) total += selectedManokamnaPrice;
    return total;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-purple-50">
        <Header />
        <div className="pt-24 flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
        </div>
      </div>
    );
  }

  if (!puja) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-purple-50">
        <Header />
        <div className="pt-24 flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4 font-['Philosopher']">Puja Not Found</h1>
            <button
              onClick={() => router.push('/')}
              className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition-colors"
            >
              Go Back Home
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
          
          {/* Hero Section - Redesigned to match image */}
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
                      {puja.pujaName}
                    </h1>
                    <p className="text-xl text-orange-600 font-medium mb-6">
                      {puja.subHeading}
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
                        <p className="font-semibold">Wednesday, 10 Sep, 2025</p>
                        <p className="text-sm text-gray-600">3:00 PM</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 text-gray-700">
                      <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                        <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-semibold">Navgrah Shani Mandir, Avantika Tirth Kshetra</p>
                        <p className="text-sm text-gray-600">Ujjain, Madhya Pradesh</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Key Benefits Icons */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-3 bg-white/70 p-4 rounded-lg">
                      <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                        <span className="text-orange-600 text-xl">🛡️</span>
                      </div>
                      <span className="text-sm font-medium text-gray-700">Remove Negative Effects of All Planet</span>
                    </div>
                    <div className="flex items-center gap-3 bg-white/70 p-4 rounded-lg">
                      <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                        <span className="text-orange-600 text-xl">⭐</span>
                      </div>
                      <span className="text-sm font-medium text-gray-700">Eliminate Kundali Dosha</span>
                    </div>
                    <div className="flex items-center gap-3 bg-white/70 p-4 rounded-lg">
                      <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                        <span className="text-orange-600 text-xl">💪</span>
                      </div>
                      <span className="text-sm font-medium text-gray-700">Removes Unnecessary Fears</span>
                    </div>
                    <div className="flex items-center gap-3 bg-white/70 p-4 rounded-lg">
                      <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                        <span className="text-orange-600 text-xl">💰</span>
                      </div>
                      <span className="text-sm font-medium text-gray-700">Success- Prosperity-and Wealth</span>
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
                    {puja.pujaImages && puja.pujaImages.length > 0 ? (
                      <Image
                        src={puja.pujaImages[selectedImageIndex] || '/images/default-puja.jpg'}
                        alt={puja.pujaName}
                        fill
                        className="object-cover"
                        onError={() => setSelectedImageIndex(0)}
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
                      onClick={() => setShowBookingForm(true)}
                      className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-200 shadow-lg backdrop-blur-sm"
                    >
                      Participate Now ₹5,000
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Continuous Sections - Beautiful Layout */}
          <div className="px-6 py-8">
            <div className="max-w-6xl mx-auto space-y-16">
              
              {/* Puja Packages Section */}
              <section id="packages" className="scroll-mt-20">
                <div className="bg-gradient-to-br from-orange-50 via-yellow-50 to-orange-50 rounded-3xl shadow-xl overflow-hidden border border-orange-100">
                  <div className="bg-gradient-to-r from-orange-500 to-red-500 p-8 text-center">
                    <h2 className="text-4xl font-bold text-white font-['Philosopher'] mb-2">Select Your Puja Package</h2>
                    <p className="text-orange-100 text-lg">Choose the perfect package for your spiritual journey</p>
                  </div>
                  <div className="p-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                      {[
                        {
                          title: 'Basic Individual',
                          price: '₹5,000',
                          originalPrice: '₹7,000',
                          features: ['Individual Sankalp', 'Video Recording', 'Digital Certificate', 'Prasad Delivery'],
                          recommended: false,
                          icon: '🙏'
                        },
                        {
                          title: 'Partner Puja',
                          price: '₹8,000',
                          originalPrice: '₹11,000',
                          features: ['Couple Sankalp', 'HD Video Recording', 'Digital Certificate', 'Premium Prasad'],
                          recommended: true,
                          icon: '💑'
                        },
                        {
                          title: 'Family Puja',
                          price: '₹12,000',
                          originalPrice: '₹16,000',
                          features: ['Family Sankalp', 'Live Streaming', 'Digital Certificate', 'Complete Prasad Kit'],
                          recommended: false,
                          icon: '👪'
                        },
                        {
                          title: 'VIP Experience',
                          price: '₹20,000',
                          originalPrice: '₹25,000',
                          features: ['Personal Priest Consultation', 'Live Streaming', 'Premium Certificate', 'Special Prasad Box'],
                          recommended: false,
                          icon: '⭐'
                        }
                      ].map((pkg, index) => (
                        <div key={index} className={`relative bg-white p-6 rounded-2xl border-2 transition-all duration-300 hover:shadow-2xl hover:scale-105 cursor-pointer group ${
                          pkg.recommended ? 'border-orange-500 ring-4 ring-orange-200 shadow-lg' : 'border-gray-200 hover:border-orange-300'
                        }`}>
                          {pkg.recommended && (
                            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                              <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg">
                                🏆 MOST POPULAR
                              </div>
                            </div>
                          )}
                          <div className="text-center">
                            <div className="text-4xl mb-3">{pkg.icon}</div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3 font-['Philosopher']">{pkg.title}</h3>
                            <div className="mb-4">
                              <div className="text-3xl font-bold text-orange-600">{pkg.price}</div>
                              <div className="text-sm text-gray-500 line-through">{pkg.originalPrice}</div>
                            </div>
                            <ul className="space-y-3 text-sm text-gray-600 mb-6">
                              {pkg.features.map((feature, i) => (
                                <li key={i} className="flex items-center justify-center gap-2">
                                  <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                  </svg>
                                  <span>{feature}</span>
                                </li>
                              ))}
                            </ul>
                            <button className={`w-full py-3 px-4 rounded-xl font-semibold transition-all duration-200 ${
                              pkg.recommended 
                                ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white hover:from-orange-600 hover:to-red-600 shadow-lg'
                                : 'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 hover:from-orange-100 hover:to-orange-200 hover:text-orange-600'
                            }`}>
                              {pkg.recommended ? '🔥 Book Now' : 'Select Plan'}
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </section>

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
                            {puja.about.split('\n\n').map((paragraph, index) => (
                              <p key={index} className="first-letter:text-5xl first-letter:font-bold first-letter:text-orange-600 first-letter:float-left first-letter:mr-3 first-letter:mt-1">
                                {paragraph}
                              </p>
                            ))}
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
                                  <div className="font-semibold text-gray-900">Date & Time</div>
                                  <div className="text-sm text-gray-600">Wednesday, 10 Sep, 2025 - 3:00 PM</div>
                                </div>
                              </div>
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                                  <span className="text-orange-600">🛕</span>
                                </div>
                                <div>
                                  <div className="font-semibold text-gray-900">Sacred Location</div>
                                  <div className="text-sm text-gray-600">Navgrah Shani Mandir, Ujjain</div>
                                </div>
                              </div>
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                                  <span className="text-orange-600">⏱️</span>
                                </div>
                                <div>
                                  <div className="font-semibold text-gray-900">Duration</div>
                                  <div className="text-sm text-gray-600">2-3 Hours Complete Ritual</div>
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

              {/* Puja Benefits Section */}
              <section id="benefits" className="scroll-mt-20">
                <div className="bg-gradient-to-br from-green-50 via-emerald-50 to-green-50 rounded-3xl shadow-xl overflow-hidden border border-green-100">
                  <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-8 text-center">
                    <h2 className="text-4xl font-bold text-white font-['Philosopher'] mb-2">Divine Puja Benefits</h2>
                    <p className="text-green-100 text-lg">Transform your life with these powerful spiritual blessings</p>
                  </div>
                  <div className="p-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {puja.benefits.map((benefit, index) => (
                        <div key={index} className="bg-white p-8 rounded-2xl hover:shadow-2xl transition-all duration-300 group cursor-pointer border border-green-100 hover:border-green-300">
                          <div className="flex items-start gap-6">
                            <div className="flex-shrink-0">
                              <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-600 rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                                {index === 0 && <span className="text-3xl">🛡️</span>}
                                {index === 1 && <span className="text-3xl">⭐</span>}
                                {index === 2 && <span className="text-3xl">💪</span>}
                                {index === 3 && <span className="text-3xl">💰</span>}
                              </div>
                            </div>
                            <div className="flex-1">
                              <h3 className="text-2xl font-bold text-gray-900 font-['Philosopher'] mb-4 group-hover:text-green-600 transition-colors">
                                {benefit.title}
                              </h3>
                              <p className="text-gray-700 leading-relaxed text-lg">
                                {benefit.description}
                              </p>
                              <div className="mt-4 flex items-center gap-2 text-green-600 font-medium">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span>Guaranteed Results</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </section>

              {/* Puja Process Section */}
              <section id="process" className="scroll-mt-20">
                <div className="bg-gradient-to-br from-purple-50 via-indigo-50 to-purple-50 rounded-3xl shadow-xl overflow-hidden border border-purple-100">
                  <div className="bg-gradient-to-r from-purple-500 to-indigo-500 p-8 text-center">
                    <h2 className="text-4xl font-bold text-white font-['Philosopher'] mb-2">Sacred Puja Process</h2>
                    <p className="text-purple-100 text-lg">Step-by-step journey to spiritual fulfillment</p>
                  </div>
                  <div className="p-8">
                    <div className="max-w-4xl mx-auto">
                      <div className="space-y-8">
                        {pujaProcessSteps.map((step, index) => (
                          <div key={index} className="flex gap-8 items-start group">
                            <div className="flex-shrink-0">
                              <div className="relative">
                                <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                                  {step.step}
                                </div>
                                {index < pujaProcessSteps.length - 1 && (
                                  <div className="absolute top-20 left-1/2 transform -translate-x-1/2 w-1 h-16 bg-gradient-to-b from-purple-300 to-indigo-300 rounded-full"></div>
                                )}
                              </div>
                            </div>
                            <div className="flex-1 pt-4">
                              <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-purple-100">
                                <h3 className="text-2xl font-bold text-gray-900 font-['Philosopher'] mb-3 group-hover:text-purple-600 transition-colors">
                                  {step.title}
                                </h3>
                                <p className="text-gray-700 leading-relaxed mb-4 text-lg">
                                  {step.description}
                                </p>
                                <div className="flex items-center gap-3">
                                  <span className="inline-flex items-center gap-2 bg-purple-100 text-purple-600 text-sm font-medium px-4 py-2 rounded-full">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    {step.time}
                                  </span>
                                  {index < 2 && (
                                    <span className="text-sm text-gray-500">→ Next Step</span>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Temple Details Section */}
              <section id="temple" className="scroll-mt-20">
                <div className="bg-gradient-to-br from-amber-50 via-orange-50 to-amber-50 rounded-3xl shadow-xl overflow-hidden border border-amber-100">
                  <div className="bg-gradient-to-r from-amber-500 to-orange-500 p-8 text-center">
                    <h2 className="text-4xl font-bold text-white font-['Philosopher'] mb-2">Sacred Temple Details</h2>
                    <p className="text-amber-100 text-lg">Discover the divine heritage and spiritual significance</p>
                  </div>
                  <div className="p-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                      <div className="relative group">
                        <div className="aspect-video rounded-2xl overflow-hidden shadow-2xl">
                          {puja.templeImage ? (
                            <Image
                              src={puja.templeImage}
                              alt={puja.templeAddress}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                          ) : (
                            <div className="flex items-center justify-center h-full bg-gradient-to-br from-amber-200 to-orange-300">
                              <span className="text-amber-600 text-8xl">🛕</span>
                            </div>
                          )}
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
                      </div>
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-3xl font-bold text-amber-600 font-['Philosopher'] mb-4">
                            Navgrah Shani Mandir, Ujjain
                          </h3>
                          <div className="text-gray-700 leading-relaxed space-y-4 text-lg">
                            <p>{puja.templeDescription}</p>
                          </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="bg-white p-4 rounded-xl border border-amber-200">
                            <div className="flex items-center gap-3 mb-2">
                              <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">
                                <span className="text-amber-600">📍</span>
                              </div>
                              <h4 className="font-semibold text-gray-900">Location</h4>
                            </div>
                            <p className="text-sm text-gray-600">Triveni Ghat, Shipra River, Ujjain</p>
                          </div>
                          <div className="bg-white p-4 rounded-xl border border-amber-200">
                            <div className="flex items-center gap-3 mb-2">
                              <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">
                                <span className="text-amber-600">🕰️</span>
                              </div>
                              <h4 className="font-semibold text-gray-900">Heritage</h4>
                            </div>
                            <p className="text-sm text-gray-600">Over 2000 years old</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Recent Puja Section */}
              <section id="recent" className="scroll-mt-20">
                <div className="bg-gradient-to-br from-rose-50 via-pink-50 to-rose-50 rounded-3xl shadow-xl overflow-hidden border border-rose-100">
                  <div className="bg-gradient-to-r from-rose-500 to-pink-500 p-8 text-center">
                    <h2 className="text-4xl font-bold text-white font-['Philosopher'] mb-2">Recent Puja Testimonials</h2>
                    <p className="text-rose-100 text-lg">Hear from devotees who experienced divine blessings</p>
                  </div>
                  <div className="p-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {[
                        {
                          name: 'Anita Sharma',
                          location: 'Mumbai, Maharashtra',
                          rating: 5,
                          testimonial: 'The Navagraha puja was performed with great devotion and precision. I could feel the positive energy immediately and my business challenges started resolving within weeks. Truly divine experience!',
                          date: 'September 5, 2025',
                          avatar: 'AS',
                          benefit: 'Business Growth'
                        },
                        {
                          name: 'Mahender Bansal',
                          location: 'Delhi, India',
                          rating: 5,
                          testimonial: 'Outstanding service from Trilok! The priests were highly knowledgeable and performed the rituals authentically. Regular updates and the prasad quality exceeded expectations.',
                          date: 'September 3, 2025',
                          avatar: 'MB',
                          benefit: 'Spiritual Peace'
                        },
                        {
                          name: 'Priya Kumari',
                          location: 'Bangalore, Karnataka',
                          rating: 5,
                          testimonial: 'My chronic health issues and financial problems improved dramatically after the puja. The negative planetary influences seem to have diminished. Highly recommended for anyone facing similar challenges.',
                          date: 'September 1, 2025',
                          avatar: 'PK',
                          benefit: 'Health & Prosperity'
                        }
                      ].map((testimonial, index) => (
                        <div key={index} className="bg-white p-6 rounded-2xl border border-rose-100 hover:shadow-2xl transition-all duration-300 group">
                          <div className="flex items-center gap-4 mb-4">
                            <div className="w-14 h-14 bg-gradient-to-r from-rose-400 to-pink-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                              {testimonial.avatar}
                            </div>
                            <div className="flex-1">
                              <h4 className="font-bold text-gray-900 text-lg">{testimonial.name}</h4>
                              <p className="text-sm text-gray-600">{testimonial.location}</p>
                              <div className="flex items-center gap-1 mt-1">
                                {[...Array(testimonial.rating)].map((_, i) => (
                                  <svg key={i} className="w-4 h-4 text-yellow-500 fill-current" viewBox="0 0 24 24">
                                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                  </svg>
                                ))}
                              </div>
                            </div>
                          </div>
                          <div className="mb-4">
                            <span className="inline-block bg-rose-100 text-rose-600 text-xs font-medium px-3 py-1 rounded-full mb-3">
                              ✨ {testimonial.benefit}
                            </span>
                            <p className="text-gray-700 italic leading-relaxed">{`"`}{testimonial.testimonial}{`"`}</p>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-500">{testimonial.date}</span>
                            <span className="text-green-600 font-medium flex items-center gap-1">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              Verified
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </section>

              {/* Reviews Section */}
              <section id="reviews" className="scroll-mt-20">
                <div className="bg-gradient-to-br from-indigo-50 via-blue-50 to-indigo-50 rounded-3xl shadow-xl overflow-hidden border border-indigo-100">
                  <div className="bg-gradient-to-r from-indigo-500 to-blue-500 p-8 text-center">
                    <h2 className="text-4xl font-bold text-white font-['Philosopher'] mb-2">Customer Reviews & Ratings</h2>
                    <p className="text-indigo-100 text-lg">What our devotees say about their spiritual journey</p>
                  </div>
                  <div className="p-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                      {/* Reviews List */}
                      <div className="lg:col-span-2 space-y-6">
                        {[
                          {
                            name: 'Anjali Verma',
                            rating: 5,
                            review: 'Exceptional service! The puja was performed with utmost devotion and I received the prasad promptly. The positive changes in my life are remarkable and I feel spiritually uplifted.',
                            date: 'September 8, 2025',
                            verified: true,
                            helpful: 23
                          },
                          {
                            name: 'Suresh Gupta',
                            rating: 5,
                            review: 'The Nav Graha puja helped resolve my Saturn dasha problems effectively. The priests were very knowledgeable and the entire process was transparent. Worth every penny spent.',
                            date: 'September 6, 2025',
                            verified: true,
                            helpful: 18
                          },
                          {
                            name: 'Meera Singh',
                            rating: 4,
                            review: 'Good experience overall. The puja was performed authentically and I received regular updates. The video recording quality could be slightly better, but satisfied with the service.',
                            date: 'September 4, 2025',
                            verified: true,
                            helpful: 12
                          }
                        ].map((review, index) => (
                          <div key={index} className="bg-white p-6 rounded-2xl border border-indigo-100 hover:shadow-lg transition-all duration-300">
                            <div className="flex items-center justify-between mb-4">
                              <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                                  {review.name.charAt(0)}
                                </div>
                                <div>
                                  <h4 className="font-bold text-gray-900">{review.name}</h4>
                                  {review.verified && (
                                    <span className="text-xs text-green-600 flex items-center gap-1">
                                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                      </svg>
                                      Verified Purchase
                                    </span>
                                  )}
                                </div>
                              </div>
                              <span className="text-xs text-gray-500">{review.date}</span>
                            </div>
                            <div className="flex items-center gap-1 text-yellow-500 mb-3">
                              {[...Array(5)].map((_, i) => (
                                <svg key={i} className={`w-5 h-5 ${i < review.rating ? 'fill-current' : 'fill-gray-300'}`} viewBox="0 0 24 24">
                                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                </svg>
                              ))}
                            </div>
                            <p className="text-gray-700 leading-relaxed mb-4">{review.review}</p>
                            <div className="flex items-center justify-between">
                              <button className="text-sm text-indigo-600 hover:text-indigo-700 flex items-center gap-1">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                                </svg>
                                Helpful ({review.helpful})
                              </button>
                              <button className="text-sm text-gray-500 hover:text-gray-700">
                                Reply
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      {/* Rating Summary */}
                      <div className="lg:col-span-1">
                        <div className="bg-white p-8 rounded-2xl border border-indigo-100 sticky top-8">
                          <h3 className="text-2xl font-bold text-gray-900 font-['Philosopher'] mb-6 text-center">Overall Rating</h3>
                          <div className="text-center mb-8">
                            <div className="text-6xl font-bold text-indigo-600 mb-2">4.9</div>
                            <div className="flex items-center justify-center gap-1 text-yellow-500 mb-2">
                              {[...Array(5)].map((_, i) => (
                                <svg key={i} className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                </svg>
                              ))}
                            </div>
                            <p className="text-sm text-gray-600">Based on 247 reviews</p>
                          </div>
                          <div className="space-y-3">
                            {[5, 4, 3, 2, 1].map((stars) => (
                              <div key={stars} className="flex items-center gap-3">
                                <span className="text-sm font-medium w-8">{stars}★</span>
                                <div className="flex-1 bg-gray-200 rounded-full h-3">
                                  <div 
                                    className="bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full h-3 transition-all duration-500" 
                                    style={{ width: `${stars === 5 ? 85 : stars === 4 ? 12 : stars === 3 ? 2 : stars === 2 ? 1 : 0}%` }}
                                  ></div>
                                </div>
                                <span className="text-sm text-gray-600 w-12 text-right">
                                  {stars === 5 ? '85%' : stars === 4 ? '12%' : stars === 3 ? '2%' : stars === 2 ? '1%' : '0%'}
                                </span>
                              </div>
                            ))}
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