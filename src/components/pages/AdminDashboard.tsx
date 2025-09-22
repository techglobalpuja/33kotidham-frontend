'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { AdminStats, PujaFormData, ChawadaItem, AdminUser, ContentUpload, PlanFormData, Plan, ChawadaFormData, ProductFormData, Product } from '@/types';
import Button from '@/components/ui/Button';
import EditText from '@/components/ui/EditText';

interface AdminDashboardProps {}

const AdminDashboard: React.FC<AdminDashboardProps> = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('overview');
  const [isLoading, setIsLoading] = useState(false);

  // Mock admin stats data
  const adminStats: AdminStats = {
    totalUsers: 12847,
    totalPujas: 156,
    totalEarnings: 2847593,
    totalOrders: 3456,
    monthlyGrowth: {
      users: 12.5,
      pujas: 8.3,
      earnings: 15.7,
      orders: 11.2
    }
  };

  // Mock puja form data
  const [pujaForm, setPujaForm] = useState<PujaFormData>({
    // Puja Section
    pujaName: '',
    subHeading: '',
    about: '',
    date: '',
    time: '',
    pujaImages: [],
    
    // Temple Section
    templeImage: '',
    templeAddress: '',
    templeDescription: '',
    
    // Puja Benefits
    benefits: [
      { title: '', description: '' },
      { title: '', description: '' },
      { title: '', description: '' },
      { title: '', description: '' }
    ],
    
    // Plan Details
    selectedPlanIds: [], // Changed to array for multi-select
    
    // Prasad
    prasadPrice: 0,
    prasadStatus: false,
    
    // Dakshina
    dakshinaPrices: '', // Changed to string for comma-separated values
    dakshinaPricesUSD: '', // Changed to string for comma-separated values
    dakshinaStatus: false,
    
    // Manokamna Parchi
    manokamanaPrices: '', // Changed to string for comma-separated values
    manokamanaPricesUSD: '', // Changed to string for comma-separated values
    manokamnaStatus: false,
    
    // General
    category: 'general',
    isActive: true,
    isFeatured: false
  });

  // Puja management sub-tab state
  const [pujaSubTab, setPujaSubTab] = useState<'all' | 'add'>('all');
  // Add view mode state for puja list
  const [pujaViewMode, setPujaViewMode] = useState<'grid' | 'table'>('grid');

  // Plan dropdown state
  const [planDropdownOpen, setPlanDropdownOpen] = useState(false);

  // Plan management sub-tab state
  const [planSubTab, setPlanSubTab] = useState<'all' | 'add'>('all');

  // Chawada management sub-tab state
  const [chawadaSubTab, setChawadaSubTab] = useState<'all' | 'add'>('all');

  // Product management sub-tab state
  const [productSubTab, setProductSubTab] = useState<'all' | 'add'>('all');

  // Mock plan form data
  const [planForm, setPlanForm] = useState<PlanFormData>({
    name: '',
    price: 0,
    image: '',
    category: 'Normal',
    description: {
      feature1: '',
      feature2: '',
      feature3: '',
      feature4: ''
    },
    isActive: true
  });

  // Image upload state
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');

  // Puja images state (max 6)
  const [selectedPujaImages, setSelectedPujaImages] = useState<File[]>([]);
  const [pujaImagePreviews, setPujaImagePreviews] = useState<string[]>([]);

  // Temple image state
  const [selectedTempleImage, setSelectedTempleImage] = useState<File | null>(null);
  const [templeImagePreview, setTempleImagePreview] = useState<string>('');

  // Chawada form data
  const [chawadaForm, setChawadaForm] = useState<ChawadaFormData>({
    name: '',
    price: 0,
    image: '',
    description: '',
    isActive: true
  });

  // Chawada image upload state
  const [selectedChawadaImage, setSelectedChawadaImage] = useState<File | null>(null);
  const [chawadaImagePreview, setChawadaImagePreview] = useState<string>('');

  // Product form data
  const [productForm, setProductForm] = useState<ProductFormData>({
    name: '',
    price: 0,
    image: '',
    description: '',
    isActive: true
  });

  // Product image upload state
  const [selectedProductImage, setSelectedProductImage] = useState<File | null>(null);
  const [productImagePreview, setProductImagePreview] = useState<string>('');

  // Mock existing pujas data
  const [existingPujas] = useState([
    {
      id: '1',
      pujaName: 'Ganesh Puja',
      subHeading: 'Remove Obstacles & Bring Prosperity',
      templeAddress: 'Siddhivinayak Temple, Mumbai',
      category: 'prosperity',
      prasadPrice: 500,
      dakshinaPrice: 1500,
      manokamnaPrice: 251,
      about: 'Complete Ganesh puja for removing obstacles and bringing prosperity to your life',
      isActive: true,
      isFeatured: true,
      pujaImages: ['/images/ganesh-puja-1.jpg', '/images/ganesh-puja-2.jpg'],
      createdDate: '2024-01-15',
      selectedPlan: 'Premium VIP Experience'
    },
    {
      id: '2',
      pujaName: 'Lakshmi Puja',
      subHeading: 'Attract Wealth & Abundance',
      templeAddress: 'Mahalakshmi Temple, Kolhapur',
      category: 'prosperity',
      prasadPrice: 750,
      dakshinaPrice: 2500,
      manokamnaPrice: 351,
      about: 'Divine Lakshmi puja for wealth, abundance and financial prosperity',
      isActive: true,
      isFeatured: false,
      pujaImages: ['/images/lakshmi-puja-1.jpg'],
      createdDate: '2024-01-10',
      selectedPlan: 'Basic Puja Package'
    },
    {
      id: '3',
      pujaName: 'Saraswati Puja',
      subHeading: 'Gain Knowledge & Wisdom',
      templeAddress: 'Saraswati Temple, Varanasi',
      category: 'education',
      prasadPrice: 300,
      dakshinaPrice: 1000,
      manokamnaPrice: 201,
      about: 'Sacred Saraswati puja for knowledge, wisdom and academic success',
      isActive: true,
      isFeatured: false,
      pujaImages: ['/images/saraswati-puja-1.jpg', '/images/saraswati-puja-2.jpg', '/images/saraswati-puja-3.jpg'],
      createdDate: '2024-01-08',
      selectedPlan: 'Standard Family Package'
    },
    {
      id: '4',
      pujaName: 'Durga Puja',
      subHeading: 'Protection & Divine Strength',
      templeAddress: 'Durga Mandir, Haridwar',
      category: 'spiritual',
      prasadPrice: 1000,
      dakshinaPrice: 3500,
      manokamnaPrice: 501,
      about: 'Powerful Durga puja for protection, strength and victory over obstacles',
      isActive: false,
      isFeatured: true,
      pujaImages: ['/images/durga-puja-1.jpg'],
      createdDate: '2024-01-05',
      selectedPlan: 'Exclusive VIP Darshan'
    },
    {
      id: '5',
      pujaName: 'Shiva Puja',
      subHeading: 'Spiritual Awakening & Peace',
      templeAddress: 'Kedarnath Temple, Uttarakhand',
      category: 'spiritual',
      prasadPrice: 600,
      dakshinaPrice: 2000,
      manokamnaPrice: 301,
      about: 'Divine Shiva puja for spiritual awakening, inner peace and liberation',
      isActive: true,
      isFeatured: false,
      pujaImages: ['/images/shiva-puja-1.jpg', '/images/shiva-puja-2.jpg'],
      createdDate: '2024-01-03',
      selectedPlan: 'Premium VIP Experience'
    },
    {
      id: '6',
      pujaName: 'Vishnu Puja',
      subHeading: 'Harmony & Universal Peace',
      templeAddress: 'Tirupati Temple, Andhra Pradesh',
      category: 'general',
      prasadPrice: 800,
      dakshinaPrice: 2800,
      manokamnaPrice: 401,
      about: 'Sacred Vishnu puja for peace, harmony and universal well-being',
      isActive: true,
      isFeatured: false,
      pujaImages: ['/images/vishnu-puja-1.jpg'],
      createdDate: '2024-01-01',
      selectedPlan: 'Basic Puja Package'
    }
  ]);

  // Mock existing plans data
  const [existingPlans] = useState<Plan[]>([
    {
      id: '1',
      name: 'Basic Puja Package',
      price: 5000,
      image: '/images/basic-plan.jpg',
      category: 'Normal',
      description: {
        feature1: 'Complete puja ceremony',
        feature2: 'Digital certificate',
        feature3: 'Photo gallery',
        feature4: 'Basic prasad delivery'
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
        feature1: 'Personalized puja ceremony',
        feature2: 'Live video streaming',
        feature3: 'Premium prasad package',
        feature4: 'Personal consultation'
      },
      isActive: true,
      createdDate: '2024-01-12'
    },
    {
      id: '3',
      name: 'Standard Family Package',
      price: 8000,
      image: '/images/family-plan.jpg',
      category: 'Normal',
      description: {
        feature1: 'Family-oriented puja',
        feature2: 'Multiple deity worship',
        feature3: 'Family photos included',
        feature4: 'Extended prasad delivery'
      },
      isActive: true,
      createdDate: '2024-01-10'
    },
    {
      id: '4',
      name: 'Exclusive VIP Darshan',
      price: 25000,
      image: '/images/exclusive-plan.jpg',
      category: 'VIP',
      description: {
        feature1: 'Private temple access',
        feature2: 'One-on-one with priest',
        feature3: 'Luxury accommodation',
        feature4: 'Personal spiritual guide'
      },
      isActive: false,
      createdDate: '2024-01-08'
    }
  ]);

  // Mock chawada items data
  const [chawadaItems] = useState<ChawadaItem[]>([
    {
      id: '1',
      name: 'Sacred Rudraksha Mala',
      description: 'Original 108 beads Rudraksha mala blessed in temple for spiritual growth and protection',
      price: 2500,
      image: '/images/rudraksha.jpg',
      category: 'spiritual',
      inStock: true,
      quantity: 25
    },
    {
      id: '2', 
      name: 'Gomti Chakra Set',
      description: 'Set of 11 original Gomti chakras for prosperity and good fortune in business',
      price: 850,
      image: '/images/gomti.jpg',
      category: 'prosperity',
      inStock: true,
      quantity: 40
    },
    {
      id: '3',
      name: 'Brass Diya Set',
      description: 'Traditional brass diyas for daily puja and festival celebrations',
      price: 1200,
      image: '/images/brass-diya.jpg',
      category: 'puja-items',
      inStock: true,
      quantity: 30
    },
    {
      id: '4',
      name: 'Crystal Shivling',
      description: 'Pure crystal Shivling for meditation and spiritual practices',
      price: 3500,
      image: '/images/crystal-shivling.jpg',
      category: 'spiritual',
      inStock: false,
      quantity: 0
    },
    {
      id: '5',
      name: 'Sandalwood Mala',
      description: 'Authentic sandalwood prayer beads for chanting and meditation',
      price: 1800,
      image: '/images/sandalwood-mala.jpg',
      category: 'spiritual',
      inStock: true,
      quantity: 15
    }
  ]);

  // Blog management state
  const [blogSubTab, setBlogSubTab] = useState<'all' | 'add'>('all');
  
  // Blog form data
  const [blogForm, setBlogForm] = useState({
    title: '',
    excerpt: '',
    content: '',
    author: '',
    category: 'spiritual',
    tags: '',
    image: '',
    isActive: true
  });
  
  // Blog image upload state
  const [selectedBlogImage, setSelectedBlogImage] = useState<File | null>(null);
  const [blogImagePreview, setBlogImagePreview] = useState<string>('');

  // Mock blog items data
  const [blogItems] = useState([
    {
      id: '1',
      title: 'The Power of Mantras in Daily Life',
      excerpt: 'Discover how chanting mantras can transform your daily routine and bring positive energy.',
      content: 'Detailed content about mantras...',
      author: 'Admin',
      category: 'spiritual',
      tags: 'mantras, spirituality, daily practice',
      image: '/images/blog1.jpg',
      isActive: true,
      createdDate: '2024-01-15',
      views: 1250
    },
    {
      id: '2',
      title: 'Astrological Remedies for Career Growth',
      excerpt: 'Learn about effective astrological remedies to boost your career prospects.',
      content: 'Detailed content about career remedies...',
      author: 'Admin',
      category: 'astrology',
      tags: 'career, astrology, remedies',
      image: '/images/blog2.jpg',
      isActive: true,
      createdDate: '2024-01-10',
      views: 980
    },
    {
      id: '3',
      title: 'Benefits of Regular Puja Practices',
      excerpt: 'Understanding the spiritual and psychological benefits of maintaining regular puja practices.',
      content: 'Detailed content about puja benefits...',
      author: 'Admin',
      category: 'puja',
      tags: 'puja, benefits, spirituality',
      image: '/images/blog3.jpg',
      isActive: true,
      createdDate: '2024-01-05',
      views: 1520
    }
  ]);

  // Mock products data
  const [products] = useState<Product[]>([
    {
      id: '1',
      name: 'Premium Puja Kit',
      description: 'Complete puja kit with all essential items for daily worship and special ceremonies',
      price: 1500,
      image: '/images/puja-kit.jpg',
      category: 'puja-essentials',
      inStock: true,
      quantity: 50,
      isActive: true,
      createdDate: '2024-01-20'
    },
    {
      id: '2',
      name: 'Handcrafted Incense Sticks',
      description: 'Aromatic incense sticks made from natural ingredients for spiritual ambiance',
      price: 350,
      image: '/images/incense.jpg',
      category: 'aromatics',
      inStock: true,
      quantity: 100,
      isActive: true,
      createdDate: '2024-01-18'
    },
    {
      id: '3',
      name: 'Sacred Yantra Collection',
      description: 'Authentic copper yantras for meditation and positive energy enhancement',
      price: 2800,
      image: '/images/yantra.jpg',
      category: 'spiritual-tools',
      inStock: true,
      quantity: 20,
      isActive: true,
      createdDate: '2024-01-15'
    },
    {
      id: '4',
      name: 'Temple Bell Set',
      description: 'Traditional brass temple bells with rich melodious sound for puja rituals',
      price: 950,
      image: '/images/temple-bells.jpg',
      category: 'puja-essentials',
      inStock: false,
      quantity: 0,
      isActive: true,
      createdDate: '2024-01-12'
    },
    {
      id: '5',
      name: 'Holy Water Containers',
      description: 'Elegant brass kalash and containers for storing holy water and offerings',
      price: 1200,
      image: '/images/kalash.jpg',
      category: 'containers',
      inStock: true,
      quantity: 35,
      isActive: true,
      createdDate: '2024-01-10'
    },
    {
      id: '6',
      name: 'Meditation Cushion Set',
      description: 'Comfortable organic cotton cushions for meditation and yoga practice',
      price: 800,
      image: '/images/cushions.jpg',
      category: 'meditation',
      inStock: true,
      quantity: 25,
      isActive: false,
      createdDate: '2024-01-08'
    }
  ]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('hi-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const getGrowthColor = (growth: number) => {
    return growth >= 0 ? 'text-green-600' : 'text-red-600';
  };

  // Handle image upload
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      
      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        // In a real app, you would upload to a server and get back a URL
        // For now, we'll just use a placeholder URL
        setPlanForm(prev => ({ ...prev, image: `/uploads/plans/${file.name}` }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Reset image upload
  const resetImageUpload = () => {
    setSelectedImage(null);
    setImagePreview('');
    setPlanForm(prev => ({ ...prev, image: '' }));
  };

  // Handle chawada image upload
  const handleChawadaImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedChawadaImage(file);
      
      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setChawadaImagePreview(reader.result as string);
        setChawadaForm(prev => ({ ...prev, image: `/uploads/chawada/${file.name}` }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Reset chawada image upload
  const resetChawadaImageUpload = () => {
    setSelectedChawadaImage(null);
    setChawadaImagePreview('');
    setChawadaForm(prev => ({ ...prev, image: '' }));
  };

  // Handle product image upload
  const handleProductImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedProductImage(file);
      
      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setProductImagePreview(reader.result as string);
        setProductForm(prev => ({ ...prev, image: `/uploads/products/${file.name}` }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle puja images upload (max 6)
  const handlePujaImagesUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    if (selectedPujaImages.length + files.length > 6) {
      alert('Maximum 6 images allowed');
      return;
    }
    
    const newImages = [...selectedPujaImages, ...files];
    setSelectedPujaImages(newImages);
    
    // Create preview URLs
    const newPreviews = [...pujaImagePreviews];
    files.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        newPreviews.push(reader.result as string);
        setPujaImagePreviews([...newPreviews]);
      };
      reader.readAsDataURL(file);
    });
    
    // Update form data
    const imageUrls = newImages.map(file => `/uploads/pujas/${file.name}`);
    setPujaForm(prev => ({ ...prev, pujaImages: imageUrls }));
  };

  // Remove puja image
  const removePujaImage = (index: number) => {
    const newImages = selectedPujaImages.filter((_, i) => i !== index);
    const newPreviews = pujaImagePreviews.filter((_, i) => i !== index);
    setSelectedPujaImages(newImages);
    setPujaImagePreviews(newPreviews);
    
    const imageUrls = newImages.map(file => `/uploads/pujas/${file.name}`);
    setPujaForm(prev => ({ ...prev, pujaImages: imageUrls }));
  };

  // Handle temple image upload
  const handleTempleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedTempleImage(file);
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setTempleImagePreview(reader.result as string);
        setPujaForm(prev => ({ ...prev, templeImage: `/uploads/temples/${file.name}` }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Reset temple image upload
  const resetTempleImageUpload = () => {
    setSelectedTempleImage(null);
    setTempleImagePreview('');
    setPujaForm(prev => ({ ...prev, templeImage: '' }));
  };

  // Calculate USD price (assuming 1 USD = 83 INR)
  const convertToUSD = (inrAmount: number) => {
    return Math.round((inrAmount / 83) * 100) / 100;
  };

  // Handle blog image upload
  const handleBlogImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedBlogImage(file);
      
      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setBlogImagePreview(reader.result as string);
        setBlogForm(prev => ({ ...prev, image: `/uploads/blogs/${file.name}` }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Reset blog image upload
  const resetBlogImageUpload = () => {
    setSelectedBlogImage(null);
    setBlogImagePreview('');
    setBlogForm(prev => ({ ...prev, image: '' }));
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (planDropdownOpen && !target.closest('.plan-dropdown-container')) {
        setPlanDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [planDropdownOpen]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-md border-b border-orange-200">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => router.push('/')}
                className="flex items-center gap-2 text-orange-600 hover:text-orange-700 transition-colors duration-200"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                <span className="font-medium">Back to Site</span>
              </button>
              <div className="h-6 w-px bg-gray-300"></div>
              <h1 className="text-2xl font-bold text-gray-900 font-['Philosopher']">Admin Dashboard</h1>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-gradient-to-r from-purple-100 to-orange-100 px-4 py-2 rounded-full">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-orange-500 flex items-center justify-center text-white text-sm font-bold">
                  A
                </div>
                <span className="text-sm font-medium text-gray-700">Admin User</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8 overflow-x-auto">
            {[
              { id: 'overview', name: 'Overview', icon: '📊' },
              { id: 'pujas', name: 'Manage Pujas', icon: '🛕' },
              { id: 'plans', name: 'Manage Plans', icon: '📋' },
              { id: 'products', name: 'Products', icon: '📦' },
              { id: 'users', name: 'Users', icon: '👥' },
              { id: 'chawada', name: 'Chawada Store', icon: '🛍️' },
              { id: 'orders', name: 'Orders', icon: '📦' },
              { id: 'blogs', name: 'Blogs', icon: '📝' },
              { id: 'content', name: 'Content', icon: '📁' },
              { id: 'analytics', name: 'Analytics', icon: '📈' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                  activeTab === tab.id
                    ? 'border-orange-500 text-orange-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <span className="flex items-center gap-2">
                  <span>{tab.icon}</span>
                  <span>{tab.name}</span>
                </span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl shadow-lg p-6 border border-orange-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Users</p>
                    <p className="text-2xl font-bold text-gray-900">{adminStats.totalUsers.toLocaleString()}</p>
                    <p className={`text-sm ${getGrowthColor(adminStats.monthlyGrowth.users)}`}>
                      +{adminStats.monthlyGrowth.users}% this month
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6 border border-orange-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Pujas</p>
                    <p className="text-2xl font-bold text-gray-900">{adminStats.totalPujas}</p>
                    <p className={`text-sm ${getGrowthColor(adminStats.monthlyGrowth.pujas)}`}>
                      +{adminStats.monthlyGrowth.pujas}% this month
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6 border border-orange-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Earnings</p>
                    <p className="text-2xl font-bold text-gray-900">{formatCurrency(adminStats.totalEarnings)}</p>
                    <p className={`text-sm ${getGrowthColor(adminStats.monthlyGrowth.earnings)}`}>
                      +{adminStats.monthlyGrowth.earnings}% this month
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6 border border-orange-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Orders</p>
                    <p className="text-2xl font-bold text-gray-900">{adminStats.totalOrders.toLocaleString()}</p>
                    <p className={`text-sm ${getGrowthColor(adminStats.monthlyGrowth.orders)}`}>
                      +{adminStats.monthlyGrowth.orders}% this month
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-orange-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <button
                  onClick={() => setActiveTab('pujas')}
                  className="p-4 bg-gradient-to-r from-orange-100 to-orange-200 rounded-lg hover:from-orange-200 hover:to-orange-300 transition-all duration-200 group"
                >
                  <div className="text-center">
                    <div className="w-8 h-8 mx-auto mb-2 text-orange-600 group-hover:scale-110 transition-transform duration-200">
                      🛕
                    </div>
                    <p className="text-sm font-medium text-gray-900">Add Puja</p>
                  </div>
                </button>
                
                <button
                  onClick={() => setActiveTab('plans')}
                  className="p-4 bg-gradient-to-r from-indigo-100 to-indigo-200 rounded-lg hover:from-indigo-200 hover:to-indigo-300 transition-all duration-200 group"
                >
                  <div className="text-center">
                    <div className="w-8 h-8 mx-auto mb-2 text-indigo-600 group-hover:scale-110 transition-transform duration-200">
                      📋
                    </div>
                    <p className="text-sm font-medium text-gray-900">Add Plan</p>
                  </div>
                </button>
                
                <button
                  onClick={() => setActiveTab('products')}
                  className="p-4 bg-gradient-to-r from-emerald-100 to-emerald-200 rounded-lg hover:from-emerald-200 hover:to-emerald-300 transition-all duration-200 group"
                >
                  <div className="text-center">
                    <div className="w-8 h-8 mx-auto mb-2 text-emerald-600 group-hover:scale-110 transition-transform duration-200">
                      📦
                    </div>
                    <p className="text-sm font-medium text-gray-900">Add Product</p>
                  </div>
                </button>
                
                <button
                  onClick={() => setActiveTab('chawada')}
                  className="p-4 bg-gradient-to-r from-purple-100 to-purple-200 rounded-lg hover:from-purple-200 hover:to-purple-300 transition-all duration-200 group"
                >
                  <div className="text-center">
                    <div className="w-8 h-8 mx-auto mb-2 text-purple-600 group-hover:scale-110 transition-transform duration-200">
                      🛍️
                    </div>
                    <p className="text-sm font-medium text-gray-900">Add Product</p>
                  </div>
                </button>
                
                <button
                  onClick={() => setActiveTab('users')}
                  className="p-4 bg-gradient-to-r from-blue-100 to-blue-200 rounded-lg hover:from-blue-200 hover:to-blue-300 transition-all duration-200 group"
                >
                  <div className="text-center">
                    <div className="w-8 h-8 mx-auto mb-2 text-blue-600 group-hover:scale-110 transition-transform duration-200">
                      👥
                    </div>
                    <p className="text-sm font-medium text-gray-900">Manage Users</p>
                  </div>
                </button>
                
                <button
                  onClick={() => setActiveTab('content')}
                  className="p-4 bg-gradient-to-r from-green-100 to-green-200 rounded-lg hover:from-green-200 hover:to-green-300 transition-all duration-200 group"
                >
                  <div className="text-center">
                    <div className="w-8 h-8 mx-auto mb-2 text-green-600 group-hover:scale-110 transition-transform duration-200">
                      📁
                    </div>
                    <p className="text-sm font-medium text-gray-900">Upload Content</p>
                  </div>
                </button>
              </div>
            </div>
          </div>
        )}        

        {/* Other tabs */}
        {activeTab === 'pujas' && (
              <div className="space-y-6">
                {/* Puja Management Sub-tabs */}
                <div className="bg-white rounded-xl shadow-lg border border-orange-100">
                  <div className="border-b border-gray-200">
                    <nav className="flex space-x-8 px-6">
                      <button
                        onClick={() => setPujaSubTab('all')}
                        className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                          pujaSubTab === 'all'
                            ? 'border-orange-500 text-orange-600'
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <span>📋</span>
                          <span>All Pujas ({existingPujas.length})</span>
                        </span>
                      </button>
                      <button
                        onClick={() => setPujaSubTab('add')}
                        className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                          pujaSubTab === 'add'
                            ? 'border-orange-500 text-orange-600'
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <span>➕</span>
                          <span>Add New Puja</span>
                        </span>
                      </button>
                    </nav>
                  </div>

                  {/* All Pujas Section */}
                  {pujaSubTab === 'all' && (
                    <div className="p-6">
                      <div className="flex justify-between items-center mb-6">
                        <div>
                          <h2 className="text-xl font-semibold text-gray-900 font-['Philosopher']">All Pujas</h2>
                          <p className="text-sm text-gray-600 mt-1">Manage your existing puja offerings</p>
                        </div>
                        <div className="flex gap-3">
                          <button className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 text-sm">
                            Export List
                          </button>
                          <button 
                            onClick={() => setPujaSubTab('add')}
                            className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 text-sm"
                          >
                            Add New Puja
                          </button>
                        </div>
                      </div>

                      {/* Filters and Search */}
                      <div className="flex flex-wrap gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
                        <div className="flex-1 min-w-64">
                          <input
                            type="text"
                            placeholder="Search pujas..."
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
                          />
                        </div>
                        <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm">
                          <option value="all">All Categories</option>
                          <option value="general">General</option>
                          <option value="prosperity">Prosperity</option>
                          <option value="health">Health</option>
                          <option value="education">Education</option>
                          <option value="spiritual">Spiritual</option>
                        </select>
                        <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm">
                          <option value="all">All Status</option>
                          <option value="active">Active</option>
                          <option value="inactive">Inactive</option>
                        </select>
                        
                        {/* View Mode Toggle Buttons */}
                        <div className="flex bg-white border border-gray-300 rounded-lg overflow-hidden">
                          <button
                            onClick={() => setPujaViewMode('grid')}
                            className={`px-3 py-2 text-sm font-medium transition-colors duration-200 flex items-center gap-2 ${
                              pujaViewMode === 'grid'
                                ? 'bg-orange-500 text-white'
                                : 'text-gray-700 hover:bg-gray-100'
                            }`}
                            title="Grid View"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                            </svg>
                            <span className="hidden sm:inline">Grid</span>
                          </button>
                          <button
                            onClick={() => setPujaViewMode('table')}
                            className={`px-3 py-2 text-sm font-medium transition-colors duration-200 flex items-center gap-2 border-l border-gray-300 ${
                              pujaViewMode === 'table'
                                ? 'bg-orange-500 text-white'
                                : 'text-gray-700 hover:bg-gray-100'
                            }`}
                            title="Table View"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 14h18M8 6h13M8 18h13M3 6h2m0 0v12m0-12v12" />
                            </svg>
                            <span className="hidden sm:inline">Table</span>
                          </button>
                        </div>
                      </div>

                      {/* Pujas Display - Grid or Table View */}
                      {pujaViewMode === 'grid' ? (
                        /* Pujas Grid */
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                          {existingPujas.map((puja) => (
                            <div key={puja.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-all duration-200 bg-white">
                              <div className="aspect-video bg-gradient-to-br from-orange-100 to-orange-200 rounded-lg mb-4 flex items-center justify-center relative overflow-hidden">
                                {puja.pujaImages && puja.pujaImages.length > 0 ? (
                                  <div className="relative w-full h-full">
                                    <div className="w-full h-full bg-orange-100 rounded-lg flex items-center justify-center">
                                      <span className="text-orange-600 text-3xl">🛕</span>
                                    </div>
                                    <div className="absolute bottom-1 right-1 bg-black bg-opacity-60 text-white text-xs px-1 py-0.5 rounded">
                                      {puja.pujaImages.length} img{puja.pujaImages.length > 1 ? 's' : ''}
                                    </div>
                                  </div>
                                ) : (
                                  <span className="text-orange-600 text-3xl">🛕</span>
                                )}
                                {puja.isFeatured && (
                                  <div className="absolute top-2 right-2 bg-yellow-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                                    ⭐ Featured
                                  </div>
                                )}
                                <div className={`absolute top-2 left-2 text-xs px-2 py-1 rounded-full font-medium ${
                                  puja.isActive ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
                                }`}>
                                  {puja.isActive ? '● Active' : '● Inactive'}
                                </div>
                              </div>
                              
                              <div className="space-y-2">
                                <div className="flex justify-between items-start">
                                  <h4 className="font-semibold text-gray-900 text-lg font-['Philosopher'] leading-tight">{puja.pujaName}</h4>
                                  <div className="text-right">
                                    <div className="text-xs text-gray-500">Dakshina</div>
                                    <span className="text-orange-600 font-bold text-lg">₹{puja.dakshinaPrice.toLocaleString()}</span>
                                  </div>
                                </div>
                                
                                <p className="text-sm text-orange-600 font-medium">{puja.subHeading}</p>
                                <p className="text-sm text-gray-600 font-medium">📍 {puja.templeAddress}</p>
                                
                                <div className="flex items-center gap-2">
                                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                                    puja.category === 'prosperity' ? 'bg-yellow-100 text-yellow-800' :
                                    puja.category === 'education' ? 'bg-blue-100 text-blue-800' :
                                    puja.category === 'spiritual' ? 'bg-purple-100 text-purple-800' :
                                    puja.category === 'health' ? 'bg-green-100 text-green-800' :
                                    'bg-gray-100 text-gray-800'
                                  }`}>
                                    {puja.category.charAt(0).toUpperCase() + puja.category.slice(1)}
                                  </span>
                                  <span className="text-xs text-gray-500">📋 {puja.selectedPlan}</span>
                                </div>
                                
                                <p className="text-sm text-gray-600 line-clamp-2">{puja.about}</p>
                                
                                {/* Pricing Details */}
                                <div className="grid grid-cols-3 gap-2 text-xs border-t pt-2 mt-3">
                                  <div className="text-center">
                                    <div className="text-gray-500">Prasad</div>
                                    <div className="font-medium text-green-600">₹{puja.prasadPrice}</div>
                                  </div>
                                  <div className="text-center">
                                    <div className="text-gray-500">Dakshina</div>
                                    <div className="font-medium text-orange-600">₹{puja.dakshinaPrice}</div>
                                  </div>
                                  <div className="text-center">
                                    <div className="text-gray-500">Manokamna</div>
                                    <div className="font-medium text-purple-600">₹{puja.manokamnaPrice}</div>
                                  </div>
                                </div>
                                
                                <div className="text-xs text-gray-500 border-t pt-2 mt-3">
                                  Created: {new Date(puja.createdDate).toLocaleDateString()}
                                </div>
                              </div>
                              
                              <div className="flex gap-2 mt-4 pt-3 border-t border-gray-100">
                                <button className="flex-1 bg-blue-50 hover:bg-blue-100 text-blue-600 py-2 px-3 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center justify-center gap-1">
                                  <span>✏️</span> Edit
                                </button>
                                <button className="flex-1 bg-gray-50 hover:bg-gray-100 text-gray-600 py-2 px-3 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center justify-center gap-1">
                                  <span>👁️</span> View
                                </button>
                                <button className="bg-red-50 hover:bg-red-100 text-red-600 py-2 px-3 rounded-lg text-sm font-medium transition-colors duration-200">
                                  🗑️
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        /* Pujas Table */
                        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                          <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                              <thead className="bg-gray-50">
                                <tr>
                                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Puja Details
                                  </th>
                                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Category
                                  </th>
                                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Temple
                                  </th>
                                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Pricing
                                  </th>
                                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Status
                                  </th>
                                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                  </th>
                                </tr>
                              </thead>
                              <tbody className="bg-white divide-y divide-gray-200">
                                {existingPujas.map((puja) => (
                                  <tr key={puja.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                      <div className="flex items-center">
                                        <div className="flex-shrink-0 h-12 w-12">
                                          <div className="h-12 w-12 bg-gradient-to-br from-orange-100 to-orange-200 rounded-lg flex items-center justify-center">
                                            <span className="text-orange-600 text-lg">🛕</span>
                                          </div>
                                        </div>
                                        <div className="ml-4">
                                          <div className="text-sm font-medium text-gray-900 font-['Philosopher']">{puja.pujaName}</div>
                                          <div className="text-sm text-orange-600">{puja.subHeading}</div>
                                          <div className="text-xs text-gray-500">Created: {new Date(puja.createdDate).toLocaleDateString()}</div>
                                        </div>
                                      </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                        puja.category === 'prosperity' ? 'bg-yellow-100 text-yellow-800' :
                                        puja.category === 'education' ? 'bg-blue-100 text-blue-800' :
                                        puja.category === 'spiritual' ? 'bg-purple-100 text-purple-800' :
                                        puja.category === 'health' ? 'bg-green-100 text-green-800' :
                                        'bg-gray-100 text-gray-800'
                                      }`}>
                                        {puja.category.charAt(0).toUpperCase() + puja.category.slice(1)}
                                      </span>
                                      <div className="text-xs text-gray-500 mt-1">📋 {puja.selectedPlan}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                      <div className="text-sm text-gray-900">
                                        <div className="flex items-center">
                                          <span className="text-gray-500 mr-1">📍</span>
                                          <span className="truncate max-w-32">{puja.templeAddress}</span>
                                        </div>
                                      </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                      <div className="space-y-1">
                                        <div className="flex justify-between text-xs">
                                          <span className="text-gray-500">Prasad:</span>
                                          <span className="font-medium text-green-600">₹{puja.prasadPrice}</span>
                                        </div>
                                        <div className="flex justify-between text-xs">
                                          <span className="text-gray-500">Dakshina:</span>
                                          <span className="font-medium text-orange-600">₹{puja.dakshinaPrice}</span>
                                        </div>
                                        <div className="flex justify-between text-xs">
                                          <span className="text-gray-500">Manokamna:</span>
                                          <span className="font-medium text-purple-600">₹{puja.manokamnaPrice}</span>
                                        </div>
                                      </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                      <div className="flex flex-col space-y-1">
                                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                          puja.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                        }`}>
                                          {puja.isActive ? '● Active' : '● Inactive'}
                                        </span>
                                        {puja.isFeatured && (
                                          <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">
                                            ⭐ Featured
                                          </span>
                                        )}
                                      </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                      <div className="flex space-x-2">
                                        <button className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-100" title="Edit">
                                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                          </svg>
                                        </button>
                                        <button className="text-gray-600 hover:text-gray-900 p-1 rounded hover:bg-gray-100" title="View">
                                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                          </svg>
                                        </button>
                                        <button className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-100" title="Delete">
                                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                          </svg>
                                        </button>
                                      </div>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      )}

                      {/* Pagination */}
                      <div className="flex justify-center items-center gap-2 mt-8">
                        <button className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200 disabled:opacity-50" disabled>
                          ←
                        </button>
                        <button className="px-3 py-2 bg-orange-500 text-white rounded-lg">1</button>
                        <button className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200">2</button>
                        <button className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200">3</button>
                        <button className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                          →
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Add New Puja Section */}
                  {pujaSubTab === 'add' && (
                    <div className="p-6">
                      <div className="mb-6">
                        <h2 className="text-xl font-semibold text-gray-900 font-['Philosopher']">Create New Puja</h2>
                        <p className="text-sm text-gray-600 mt-1">Complete puja setup with all required details</p>
                      </div>
                      
                      <form className="space-y-8">
                        {/* Section 1: Puja Details */}
                        <div className="bg-gradient-to-r from-orange-50 to-orange-100 p-6 rounded-xl border border-orange-200">
                          <h3 className="text-lg font-semibold text-orange-800 mb-4 font-['Philosopher'] flex items-center gap-2">
                            <span className="text-2xl">🛕</span>
                            1. Puja Details
                          </h3>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <EditText
                              label="Puja Name"
                              placeholder="Enter puja name"
                              value={pujaForm.pujaName}
                              onChange={(value) => setPujaForm(prev => ({ ...prev, pujaName: value }))}
                              required
                            />
                            
                            <EditText
                              label="Sub Heading"
                              placeholder="Enter puja sub heading"
                              value={pujaForm.subHeading}
                              onChange={(value) => setPujaForm(prev => ({ ...prev, subHeading: value }))}
                              required
                            />
                          </div>

                          <div className="mt-6">
                            <label className="block text-sm font-medium text-gray-700 mb-2">About Puja</label>
                            <textarea
                              value={pujaForm.about}
                              onChange={(e) => setPujaForm(prev => ({ ...prev, about: e.target.value }))}
                              rows={4}
                              className="w-full px-4 py-3 border border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                              placeholder="Enter detailed description about the puja"
                              required
                            />
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                              <input
                                type="date"
                                value={pujaForm.date}
                                onChange={(e) => setPujaForm(prev => ({ ...prev, date: e.target.value }))}
                                className="w-full px-4 py-3 border border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                required
                              />
                            </div>
                            
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Time</label>
                              <input
                                type="time"
                                value={pujaForm.time}
                                onChange={(e) => setPujaForm(prev => ({ ...prev, time: e.target.value }))}
                                className="w-full px-4 py-3 border border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                required
                              />
                            </div>
                          </div>

                          {/* Puja Images Upload */}
                          <div className="mt-6">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Puja Images (Max 6)</label>
                            <div className="space-y-4">
                              <div className="relative">
                                <input
                                  type="file"
                                  id="pujaImagesUpload"
                                  accept="image/*"
                                  multiple
                                  onChange={handlePujaImagesUpload}
                                  className="hidden"
                                  disabled={selectedPujaImages.length >= 6}
                                />
                                <label
                                  htmlFor="pujaImagesUpload"
                                  className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer transition-colors duration-200 ${
                                    selectedPujaImages.length >= 6 
                                      ? 'border-gray-300 bg-gray-100 cursor-not-allowed' 
                                      : 'border-orange-300 bg-orange-50 hover:bg-orange-100'
                                  }`}
                                >
                                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    <svg className={`w-8 h-8 mb-2 ${
                                      selectedPujaImages.length >= 6 ? 'text-gray-400' : 'text-orange-400'
                                    }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                    </svg>
                                    <p className={`mb-1 text-sm font-medium ${
                                      selectedPujaImages.length >= 6 ? 'text-gray-500' : 'text-orange-600'
                                    }`}>
                                      {selectedPujaImages.length >= 6 ? 'Maximum limit reached' : 'Click to upload images'}
                                    </p>
                                    <p className={`text-xs ${
                                      selectedPujaImages.length >= 6 ? 'text-gray-400' : 'text-orange-500'
                                    }`}>
                                      {selectedPujaImages.length}/6 images selected
                                    </p>
                                  </div>
                                </label>
                              </div>
                              
                              {/* Image Previews */}
                              {pujaImagePreviews.length > 0 && (
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                  {pujaImagePreviews.map((preview, index) => (
                                    <div key={index} className="relative group">
                                      <img
                                        src={preview}
                                        alt={`Puja ${index + 1}`}
                                        className="w-full h-24 object-cover rounded-lg border border-gray-200"
                                      />
                                      <button
                                        type="button"
                                        onClick={() => removePujaImage(index)}
                                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600 transition-colors duration-200"
                                      >
                                        ×
                                      </button>
                                      <div className="absolute bottom-1 left-1 bg-black bg-opacity-60 text-white text-xs px-1 py-0.5 rounded">
                                        {selectedPujaImages[index]?.name.slice(0, 8)}...
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Section 2: Temple Details */}
                        <div className="bg-gradient-to-r from-indigo-50 to-indigo-100 p-6 rounded-xl border border-indigo-200">
                          <h3 className="text-lg font-semibold text-indigo-800 mb-4 font-['Philosopher'] flex items-center gap-2">
                            <span className="text-2xl">🏦</span>
                            2. Temple Details
                          </h3>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Temple Image</label>
                              <div className="space-y-4">
                                <div className="relative">
                                  <input
                                    type="file"
                                    id="templeImageUpload"
                                    accept="image/*"
                                    onChange={handleTempleImageUpload}
                                    className="hidden"
                                  />
                                  <label
                                    htmlFor="templeImageUpload"
                                    className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-indigo-300 rounded-lg cursor-pointer bg-indigo-50 hover:bg-indigo-100 transition-colors duration-200"
                                  >
                                    {templeImagePreview ? (
                                      <div className="relative w-full h-full">
                                        <img
                                          src={templeImagePreview}
                                          alt="Temple preview"
                                          className="w-full h-full object-cover rounded-lg"
                                        />
                                        <div className="absolute inset-0 bg-black bg-opacity-40 rounded-lg flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-200">
                                          <span className="text-white text-sm font-medium">Click to change</span>
                                        </div>
                                      </div>
                                    ) : (
                                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                        <svg className="w-8 h-8 mb-2 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                        </svg>
                                        <p className="mb-1 text-sm text-indigo-600 font-medium">
                                          <span>Upload Temple Image</span>
                                        </p>
                                        <p className="text-xs text-indigo-500">PNG, JPG, JPEG up to 10MB</p>
                                      </div>
                                    )}
                                  </label>
                                </div>
                                
                                {selectedTempleImage && (
                                  <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                                    <div className="flex items-center gap-3">
                                      <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center">
                                        <svg className="w-4 h-4 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                      </div>
                                      <div>
                                        <p className="text-sm font-medium text-gray-900">{selectedTempleImage.name}</p>
                                        <p className="text-xs text-gray-500">{(selectedTempleImage.size / 1024 / 1024).toFixed(2)} MB</p>
                                      </div>
                                    </div>
                                    <button
                                      type="button"
                                      onClick={resetTempleImageUpload}
                                      className="text-red-600 hover:text-red-700 p-1 rounded-full hover:bg-red-100 transition-colors duration-200"
                                    >
                                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                      </svg>
                                    </button>
                                  </div>
                                )}
                              </div>
                            </div>
                            
                            <EditText
                              label="Temple Address"
                              placeholder="Enter complete temple address"
                              value={pujaForm.templeAddress}
                              onChange={(value) => setPujaForm(prev => ({ ...prev, templeAddress: value }))}
                              required
                            />
                          </div>

                          <div className="mt-6">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Temple Description</label>
                            <textarea
                              value={pujaForm.templeDescription}
                              onChange={(e) => setPujaForm(prev => ({ ...prev, templeDescription: e.target.value }))}
                              rows={4}
                              className="w-full px-4 py-3 border border-indigo-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                              placeholder="Enter temple description, history, and significance"
                              required
                            />
                          </div>
                        </div>

                        {/* Section 3: Puja Benefits */}
                        <div className="bg-gradient-to-r from-green-50 to-green-100 p-6 rounded-xl border border-green-200">
                          <h3 className="text-lg font-semibold text-green-800 mb-4 font-['Philosopher'] flex items-center gap-2">
                            <span className="text-2xl">✨</span>
                            3. Puja Benefits
                          </h3>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {pujaForm.benefits.map((benefit, index) => (
                              <div key={index} className="bg-white p-4 rounded-lg border border-green-200">
                                <h4 className="font-medium text-green-700 mb-3">Benefit {index + 1}</h4>
                                <div className="space-y-3">
                                  <EditText
                                    label="Title"
                                    placeholder={`Enter benefit ${index + 1} title`}
                                    value={benefit.title}
                                    onChange={(value) => {
                                      const newBenefits = [...pujaForm.benefits];
                                      newBenefits[index].title = value;
                                      setPujaForm(prev => ({ ...prev, benefits: newBenefits }));
                                    }}
                                    required
                                  />
                                  
                                  <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                                    <textarea
                                      value={benefit.description}
                                      onChange={(e) => {
                                        const newBenefits = [...pujaForm.benefits];
                                        newBenefits[index].description = e.target.value;
                                        setPujaForm(prev => ({ ...prev, benefits: newBenefits }));
                                      }}
                                      rows={3}
                                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                                      placeholder={`Enter benefit ${index + 1} description`}
                                      required
                                    />
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Section 4: Plan Details */}
                        <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-6 rounded-xl border border-purple-200">
                          <h3 className="text-lg font-semibold text-purple-800 mb-4 font-['Philosopher'] flex items-center gap-2">
                            <span className="text-2xl">📋</span>
                            4. Plan Details
                          </h3>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Select Plans (Multiple Selection)</label>
                            <div className="relative plan-dropdown-container">
                              {/* Custom Multi-Select Dropdown */}
                              <div className="relative">
                                <button
                                  type="button"
                                  onClick={() => setPlanDropdownOpen(!planDropdownOpen)}
                                  className="w-full px-4 py-3 border border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white text-left flex items-center justify-between hover:border-purple-300 transition-colors duration-200"
                                >
                                  <span className="text-gray-700">
                                    {pujaForm.selectedPlanIds.length === 0
                                      ? 'Select plans...'
                                      : `${pujaForm.selectedPlanIds.length} plan${pujaForm.selectedPlanIds.length > 1 ? 's' : ''} selected`
                                    }
                                  </span>
                                  <svg
                                    className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${
                                      planDropdownOpen ? 'rotate-180' : ''
                                    }`}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                  </svg>
                                </button>

                                {/* Dropdown Options */}
                                {planDropdownOpen && (
                                  <div className="absolute z-10 w-full mt-1 bg-white border border-purple-200 rounded-lg shadow-lg max-h-64 overflow-y-auto">
                                    {existingPlans.map((plan) => {
                                      const isSelected = pujaForm.selectedPlanIds.includes(plan.id);
                                      return (
                                        <div
                                          key={plan.id}
                                          onClick={() => {
                                            setPujaForm(prev => ({
                                              ...prev,
                                              selectedPlanIds: isSelected
                                                ? prev.selectedPlanIds.filter(id => id !== plan.id)
                                                : [...prev.selectedPlanIds, plan.id]
                                            }));
                                          }}
                                          className={`px-4 py-3 cursor-pointer hover:bg-purple-50 border-b border-gray-100 last:border-b-0 transition-colors duration-200 ${
                                            isSelected ? 'bg-purple-100' : ''
                                          }`}
                                        >
                                          <div className="flex items-center justify-between">
                                            <div className="flex-1">
                                              <div className="flex items-center gap-3">
                                                <div className={`w-4 h-4 rounded border-2 flex items-center justify-center ${
                                                  isSelected
                                                    ? 'bg-purple-500 border-purple-500'
                                                    : 'border-gray-300'
                                                }`}>
                                                  {isSelected && (
                                                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                      <path
                                                        fillRule="evenodd"
                                                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                        clipRule="evenodd"
                                                      />
                                                    </svg>
                                                  )}
                                                </div>
                                                <div>
                                                  <p className="font-medium text-gray-900">{plan.name}</p>
                                                  <p className="text-sm text-gray-600">
                                                    ₹{plan.price.toLocaleString()} • {plan.category}
                                                  </p>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      );
                                    })}
                                  </div>
                                )}
                              </div>
                              <p className="text-xs text-gray-500 mt-1">Click on the dropdown to select multiple plans</p>
                            </div>
                            
                            {/* Selected Plans Display */}
                            {pujaForm.selectedPlanIds.length > 0 && (
                              <div className="mt-4 space-y-3">
                                <div className="flex items-center justify-between">
                                  <h4 className="font-medium text-purple-700">Selected Plans ({pujaForm.selectedPlanIds.length})</h4>
                                  <button
                                    type="button"
                                    onClick={() => setPujaForm(prev => ({ ...prev, selectedPlanIds: [] }))}
                                    className="text-sm text-red-600 hover:text-red-700 font-medium"
                                  >
                                    Clear All
                                  </button>
                                </div>
                                
                                {/* Compact Selected Plans Tags */}
                                <div className="flex flex-wrap gap-2 mb-3">
                                  {pujaForm.selectedPlanIds.map((planId) => {
                                    const selectedPlan = existingPlans.find(p => p.id === planId);
                                    if (!selectedPlan) return null;
                                    return (
                                      <div key={planId} className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-medium">
                                        <span>{selectedPlan.name}</span>
                                        <button
                                          type="button"
                                          onClick={() => {
                                            setPujaForm(prev => ({
                                              ...prev,
                                              selectedPlanIds: prev.selectedPlanIds.filter(id => id !== planId)
                                            }));
                                          }}
                                          className="w-4 h-4 bg-purple-500 text-white rounded-full flex items-center justify-center text-xs hover:bg-purple-600 transition-colors"
                                          title="Remove plan"
                                        >
                                          ×
                                        </button>
                                      </div>
                                    );
                                  })}
                                </div>
                                
                                {/* Detailed Selected Plans */}
                                <div className="grid gap-3">
                                  {pujaForm.selectedPlanIds.map((planId) => {
                                    const selectedPlan = existingPlans.find(p => p.id === planId);
                                    if (!selectedPlan) return null;
                                    return (
                                      <div key={planId} className="p-4 bg-white rounded-lg border border-purple-200 relative">
                                        <button
                                          type="button"
                                          onClick={() => {
                                            setPujaForm(prev => ({
                                              ...prev,
                                              selectedPlanIds: prev.selectedPlanIds.filter(id => id !== planId)
                                            }));
                                          }}
                                          className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs hover:bg-red-600 transition-colors"
                                          title="Remove plan"
                                        >
                                          ×
                                        </button>
                                        <div className="pr-8">
                                          <h5 className="font-medium text-purple-700 mb-2">{selectedPlan.name}</h5>
                                          <div className="text-sm text-gray-600 space-y-1">
                                            <p>• {selectedPlan.description.feature1}</p>
                                            <p>• {selectedPlan.description.feature2}</p>
                                            <p>• {selectedPlan.description.feature3}</p>
                                            <p>• {selectedPlan.description.feature4}</p>
                                          </div>
                                          <div className="mt-2 text-sm flex items-center gap-2">
                                            <span className="font-medium">Price: </span>
                                            <span className="text-purple-600 font-bold">₹{selectedPlan.price.toLocaleString()}</span>
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                              selectedPlan.category === 'VIP' ? 'bg-yellow-100 text-yellow-800' : 'bg-blue-100 text-blue-800'
                                            }`}>
                                              {selectedPlan.category}
                                            </span>
                                          </div>
                                        </div>
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Section 5: Prasad */}
                        <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 p-6 rounded-xl border border-yellow-200">
                          <h3 className="text-lg font-semibold text-yellow-800 mb-4 font-['Philosopher'] flex items-center gap-2">
                            <span className="text-2xl">🍯</span>
                            5. Prasad
                          </h3>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Prasad Price (₹)</label>
                              <input
                                type="number"
                                placeholder="Enter prasad price"
                                value={pujaForm.prasadPrice.toString()}
                                onChange={(e) => setPujaForm(prev => ({ ...prev, prasadPrice: parseInt(e.target.value) || 0 }))}
                                className="w-full px-4 py-3 border border-yellow-200 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                              />
                            </div>
                            
                            <div className="flex items-center gap-4 mt-8">
                              <label className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  checked={pujaForm.prasadStatus}
                                  onChange={(e) => setPujaForm(prev => ({ ...prev, prasadStatus: e.target.checked }))}
                                  className="w-5 h-5 text-yellow-600 border-gray-300 rounded focus:ring-yellow-500"
                                />
                                <span className="text-sm font-medium text-gray-700">Active Prasad Service</span>
                              </label>
                            </div>
                          </div>
                        </div>

                        {/* Section 6: Dakshina */}
                        <div className="bg-gradient-to-r from-red-50 to-red-100 p-6 rounded-xl border border-red-200">
                          <h3 className="text-lg font-semibold text-red-800 mb-4 font-['Philosopher'] flex items-center gap-2">
                            <span className="text-2xl">💰</span>
                            6. Dakshina
                          </h3>
                          
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Dakshina Prices (₹)</label>
                              <input
                                type="text"
                                placeholder="e.g., 101,201,310,500"
                                value={pujaForm.dakshinaPrices}
                                onChange={(e) => setPujaForm(prev => ({ ...prev, dakshinaPrices: e.target.value }))}
                                className="w-full px-4 py-3 border border-red-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                              />
                              <p className="text-xs text-gray-500 mt-1">Enter comma-separated values for multiple price options</p>
                            </div>
                            
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Dakshina Prices (USD)</label>
                              <input
                                type="text"
                                placeholder="e.g., 1.5,2.5,4.0,6.0"
                                value={pujaForm.dakshinaPricesUSD}
                                onChange={(e) => setPujaForm(prev => ({ ...prev, dakshinaPricesUSD: e.target.value }))}
                                className="w-full px-4 py-3 border border-red-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                              />
                              <p className="text-xs text-gray-500 mt-1">Optional: Manual USD pricing (comma-separated)</p>
                            </div>
                            
                            <div className="flex items-center gap-4 mt-8">
                              <label className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  checked={pujaForm.dakshinaStatus}
                                  onChange={(e) => setPujaForm(prev => ({ ...prev, dakshinaStatus: e.target.checked }))}
                                  className="w-5 h-5 text-red-600 border-gray-300 rounded focus:ring-red-500"
                                />
                                <span className="text-sm font-medium text-gray-700">Active Dakshina</span>
                              </label>
                            </div>
                          </div>
                          
                          <div className="mt-4 p-3 bg-white rounded-lg border border-red-200">
                            <p className="text-sm text-gray-600">
                              <span className="font-medium">Note: </span>
                              <span className="text-red-600">No automatic conversion - you can manually set both INR and USD prices</span>
                            </p>
                          </div>
                        </div>

                        {/* Section 7: Manokamna Parchi */}
                        <div className="bg-gradient-to-r from-pink-50 to-pink-100 p-6 rounded-xl border border-pink-200">
                          <h3 className="text-lg font-semibold text-pink-800 mb-4 font-['Philosopher'] flex items-center gap-2">
                            <span className="text-2xl">📜</span>
                            7. Manokamna Parchi
                          </h3>
                          
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Manokamna Prices (₹)</label>
                              <input
                                type="text"
                                placeholder="e.g., 51,101,151,251"
                                value={pujaForm.manokamanaPrices}
                                onChange={(e) => setPujaForm(prev => ({ ...prev, manokamanaPrices: e.target.value }))}
                                className="w-full px-4 py-3 border border-pink-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                              />
                              <p className="text-xs text-gray-500 mt-1">Enter comma-separated values for multiple price options</p>
                            </div>
                            
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Manokamna Prices (USD)</label>
                              <input
                                type="text"
                                placeholder="e.g., 0.75,1.25,2.0,3.0"
                                value={pujaForm.manokamanaPricesUSD}
                                onChange={(e) => setPujaForm(prev => ({ ...prev, manokamanaPricesUSD: e.target.value }))}
                                className="w-full px-4 py-3 border border-pink-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                              />
                              <p className="text-xs text-gray-500 mt-1">Optional: Manual USD pricing (comma-separated)</p>
                            </div>
                            
                            <div className="flex items-center gap-4 mt-8">
                              <label className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  checked={pujaForm.manokamnaStatus}
                                  onChange={(e) => setPujaForm(prev => ({ ...prev, manokamnaStatus: e.target.checked }))}
                                  className="w-5 h-5 text-pink-600 border-gray-300 rounded focus:ring-pink-500"
                                />
                                <span className="text-sm font-medium text-gray-700">Active Manokamna</span>
                              </label>
                            </div>
                          </div>
                          
                          <div className="mt-4 p-3 bg-white rounded-lg border border-pink-200">
                            <p className="text-sm text-gray-600">
                              <span className="font-medium">Note: </span>
                              <span className="text-pink-600">Manokamna Parchi allows devotees to write their wishes and prayers. No automatic conversion - you can manually set both INR and USD prices</span>
                            </p>
                          </div>
                        </div>

                        {/* General Settings & Form Actions */}
                        <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-6 rounded-xl border border-gray-200">
                          <h3 className="text-lg font-semibold text-gray-800 mb-4 font-['Philosopher'] flex items-center gap-2">
                            <span className="text-2xl">⚙️</span>
                            General Settings
                          </h3>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                              <select
                                value={pujaForm.category}
                                onChange={(e) => setPujaForm(prev => ({ ...prev, category: e.target.value }))}
                                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                              >
                                <option value="general">General</option>
                                <option value="prosperity">Prosperity</option>
                                <option value="health">Health</option>
                                <option value="education">Education</option>
                                <option value="marriage">Marriage</option>
                                <option value="spiritual">Spiritual</option>
                              </select>
                            </div>
                            
                            <div className="flex items-center gap-6 mt-8">
                              <label className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  checked={pujaForm.isActive}
                                  onChange={(e) => setPujaForm(prev => ({ ...prev, isActive: e.target.checked }))}
                                  className="w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
                                />
                                <span className="text-sm font-medium text-gray-700">Active</span>
                              </label>
                              
                              <label className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  checked={pujaForm.isFeatured}
                                  onChange={(e) => setPujaForm(prev => ({ ...prev, isFeatured: e.target.checked }))}
                                  className="w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
                                />
                                <span className="text-sm font-medium text-gray-700">Featured</span>
                              </label>
                            </div>
                          </div>
                        </div>

                        <div className="flex gap-4">
                          <Button className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-8 py-3 rounded-lg font-medium">
                            Create Puja
                          </Button>
                          <Button
                            type="button"
                            onClick={() => {
                              setPujaForm({
                                pujaName: '',
                                subHeading: '',
                                about: '',
                                date: '',
                                time: '',
                                pujaImages: [],
                                templeImage: '',
                                templeAddress: '',
                                templeDescription: '',
                                benefits: [
                                  { title: '', description: '' },
                                  { title: '', description: '' },
                                  { title: '', description: '' },
                                  { title: '', description: '' }
                                ],
                                selectedPlanIds: [],
                                prasadPrice: 0,
                                prasadStatus: false,
                                dakshinaPrices: '',
                                dakshinaPricesUSD: '',
                                dakshinaStatus: false,
                                manokamanaPrices: '',
                                manokamanaPricesUSD: '',
                                manokamnaStatus: false,
                                category: 'general',
                                isActive: true,
                                isFeatured: false
                              });
                              setSelectedPujaImages([]);
                              setPujaImagePreviews([]);
                              resetTempleImageUpload();
                            }}
                            className="bg-gray-500 hover:bg-gray-600 text-white px-8 py-3 rounded-lg font-medium"
                          >
                            Reset
                          </Button>
                        </div>
                      </form>
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'plans' && (
              <div className="space-y-6">
                {/* Plan Management Sub-tabs */}
                <div className="bg-white rounded-xl shadow-lg border border-orange-100">
                  <div className="border-b border-gray-200">
                    <nav className="flex space-x-8 px-6">
                      <button
                        onClick={() => setPlanSubTab('all')}
                        className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                          planSubTab === 'all'
                            ? 'border-indigo-500 text-indigo-600'
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <span>📋</span>
                          <span>All Plans ({existingPlans.length})</span>
                        </span>
                      </button>
                      <button
                        onClick={() => setPlanSubTab('add')}
                        className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                          planSubTab === 'add'
                            ? 'border-indigo-500 text-indigo-600'
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <span>➕</span>
                          <span>Add New Plan</span>
                        </span>
                      </button>
                    </nav>
                  </div>

                  {/* All Plans Section */}
                  {planSubTab === 'all' && (
                    <div className="p-6">
                      <div className="flex justify-between items-center mb-6">
                        <div>
                          <h2 className="text-xl font-semibold text-gray-900 font-['Philosopher']">All Plans</h2>
                          <p className="text-sm text-gray-600 mt-1">Manage your subscription plans</p>
                        </div>
                        <div className="flex gap-3">
                          <button className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 text-sm">
                            Export Plans
                          </button>
                          <button 
                            onClick={() => setPlanSubTab('add')}
                            className="bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 text-sm"
                          >
                            Add New Plan
                          </button>
                        </div>
                      </div>

                      {/* Filters and Search */}
                      <div className="flex flex-wrap gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
                        <div className="flex-1 min-w-64">
                          <input
                            type="text"
                            placeholder="Search plans..."
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
                          />
                        </div>
                        <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm">
                          <option value="all">All Categories</option>
                          <option value="Normal">Normal</option>
                          <option value="VIP">VIP</option>
                        </select>
                        <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm">
                          <option value="all">All Status</option>
                          <option value="active">Active</option>
                          <option value="inactive">Inactive</option>
                        </select>
                      </div>

                      {/* Plans Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {existingPlans.map((plan) => (
                          <div key={plan.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-all duration-200 bg-white">
                            <div className="aspect-video bg-gradient-to-br from-indigo-100 to-purple-200 rounded-lg mb-4 flex items-center justify-center relative overflow-hidden">
                              <span className="text-indigo-600 text-3xl">📋</span>
                              <div className={`absolute top-2 right-2 text-xs px-2 py-1 rounded-full font-medium ${
                                plan.category === 'VIP' ? 'bg-yellow-500 text-white' : 'bg-blue-500 text-white'
                              }`}>
                                {plan.category === 'VIP' ? '⭐ VIP' : '👤 Normal'}
                              </div>
                              <div className={`absolute top-2 left-2 text-xs px-2 py-1 rounded-full font-medium ${
                                plan.isActive ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
                              }`}>
                                {plan.isActive ? '● Active' : '● Inactive'}
                              </div>
                            </div>
                            
                            <div className="space-y-3">
                              <div className="flex justify-between items-start">
                                <h4 className="font-semibold text-gray-900 text-lg font-['Philosopher'] leading-tight">{plan.name}</h4>
                                <span className="text-indigo-600 font-bold text-xl">₹{plan.price.toLocaleString()}</span>
                              </div>
                              
                              <div className="space-y-2">
                                <h5 className="text-sm font-medium text-gray-700">Features:</h5>
                                <ul className="space-y-1">
                                  <li className="text-sm text-gray-600 flex items-center gap-2">
                                    <span className="text-green-500">✓</span>
                                    {plan.description.feature1}
                                  </li>
                                  <li className="text-sm text-gray-600 flex items-center gap-2">
                                    <span className="text-green-500">✓</span>
                                    {plan.description.feature2}
                                  </li>
                                  <li className="text-sm text-gray-600 flex items-center gap-2">
                                    <span className="text-green-500">✓</span>
                                    {plan.description.feature3}
                                  </li>
                                  <li className="text-sm text-gray-600 flex items-center gap-2">
                                    <span className="text-green-500">✓</span>
                                    {plan.description.feature4}
                                  </li>
                                </ul>
                              </div>
                              
                              <div className="text-xs text-gray-500 border-t pt-2 mt-3">
                                Created: {new Date(plan.createdDate).toLocaleDateString()}
                              </div>
                            </div>
                            
                            <div className="flex gap-2 mt-4 pt-3 border-t border-gray-100">
                              <button className="flex-1 bg-blue-50 hover:bg-blue-100 text-blue-600 py-2 px-3 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center justify-center gap-1">
                                <span>✏️</span> Edit
                              </button>
                              <button className="flex-1 bg-gray-50 hover:bg-gray-100 text-gray-600 py-2 px-3 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center justify-center gap-1">
                                <span>👁️</span> View
                              </button>
                              <button className="bg-red-50 hover:bg-red-100 text-red-600 py-2 px-3 rounded-lg text-sm font-medium transition-colors duration-200">
                                🗑️
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Pagination */}
                      <div className="flex justify-center items-center gap-2 mt-8">
                        <button className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200 disabled:opacity-50" disabled>
                          ←
                        </button>
                        <button className="px-3 py-2 bg-indigo-500 text-white rounded-lg">1</button>
                        <button className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200">2</button>
                        <button className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                          →
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Add New Plan Section */}
                  {planSubTab === 'add' && (
                    <div className="p-6">
                      <div className="mb-6">
                        <h2 className="text-xl font-semibold text-gray-900 font-['Philosopher']">Create New Plan</h2>
                        <p className="text-sm text-gray-600 mt-1">Add a new subscription plan to your platform</p>
                      </div>
                      
                      <form className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <EditText
                            label="Plan Name"
                            placeholder="Enter plan name"
                            value={planForm.name}
                            onChange={(value) => setPlanForm(prev => ({ ...prev, name: value }))}
                            required
                          />
                          
                          <EditText
                            label="Price (₹)"
                            type="number"
                            placeholder="Enter price"
                            value={planForm.price.toString()}
                            onChange={(value) => setPlanForm(prev => ({ ...prev, price: parseInt(value) || 0 }))}
                            required
                          />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                            <select
                              value={planForm.category}
                              onChange={(e) => setPlanForm(prev => ({ ...prev, category: e.target.value as 'Normal' | 'VIP' }))}
                              className="w-full px-4 py-3 border border-indigo-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            >
                              <option value="Normal">Normal</option>
                              <option value="VIP">VIP</option>
                            </select>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Plan Image</label>
                            <div className="space-y-4">
                              {/* Image Upload Box */}
                              <div className="relative">
                                <input
                                  type="file"
                                  id="planImageUpload"
                                  accept="image/*"
                                  onChange={handleImageUpload}
                                  className="hidden"
                                />
                                <label
                                  htmlFor="planImageUpload"
                                  className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-indigo-300 rounded-lg cursor-pointer bg-indigo-50 hover:bg-indigo-100 transition-colors duration-200"
                                >
                                  {imagePreview ? (
                                    <div className="relative w-full h-full">
                                      <img
                                        src={imagePreview}
                                        alt="Plan preview"
                                        className="w-full h-full object-cover rounded-lg"
                                      />
                                      <div className="absolute inset-0 bg-black bg-opacity-40 rounded-lg flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-200">
                                        <span className="text-white text-sm font-medium">Click to change</span>
                                      </div>
                                    </div>
                                  ) : (
                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                      <svg className="w-8 h-8 mb-2 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                      </svg>
                                      <p className="mb-1 text-sm text-indigo-600 font-medium">
                                        <span>Click to upload</span>
                                      </p>
                                      <p className="text-xs text-indigo-500">PNG, JPG, JPEG up to 10MB</p>
                                    </div>
                                  )}
                                </label>
                              </div>
                              
                              {/* Image Info and Remove Button */}
                              {selectedImage && (
                                <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                                  <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center">
                                      <svg className="w-4 h-4 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                      </svg>
                                    </div>
                                    <div>
                                      <p className="text-sm font-medium text-gray-900">{selectedImage.name}</p>
                                      <p className="text-xs text-gray-500">{(selectedImage.size / 1024 / 1024).toFixed(2)} MB</p>
                                    </div>
                                  </div>
                                  <button
                                    type="button"
                                    onClick={resetImageUpload}
                                    className="text-red-600 hover:text-red-700 p-1 rounded-full hover:bg-red-100 transition-colors duration-200"
                                  >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                  </button>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <h3 className="text-lg font-medium text-gray-900 font-['Philosopher']">Plan Features</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <EditText
                              label="Feature 1"
                              placeholder="Enter first feature"
                              value={planForm.description.feature1}
                              onChange={(value) => setPlanForm(prev => ({
                                ...prev,
                                description: { ...prev.description, feature1: value }
                              }))}
                              required
                            />
                            
                            <EditText
                              label="Feature 2"
                              placeholder="Enter second feature"
                              value={planForm.description.feature2}
                              onChange={(value) => setPlanForm(prev => ({
                                ...prev,
                                description: { ...prev.description, feature2: value }
                              }))}
                              required
                            />
                            
                            <EditText
                              label="Feature 3"
                              placeholder="Enter third feature"
                              value={planForm.description.feature3}
                              onChange={(value) => setPlanForm(prev => ({
                                ...prev,
                                description: { ...prev.description, feature3: value }
                              }))}
                              required
                            />
                            
                            <EditText
                              label="Feature 4"
                              placeholder="Enter fourth feature"
                              value={planForm.description.feature4}
                              onChange={(value) => setPlanForm(prev => ({
                                ...prev,
                                description: { ...prev.description, feature4: value }
                              }))}
                              required
                            />
                          </div>
                        </div>

                        <div className="flex items-center gap-6">
                          <label className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              checked={planForm.isActive}
                              onChange={(e) => setPlanForm(prev => ({ ...prev, isActive: e.target.checked }))}
                              className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                            />
                            <span className="text-sm font-medium text-gray-700">Active</span>
                          </label>
                        </div>

                        <div className="flex gap-4">
                          <Button className="bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white px-8 py-3 rounded-lg font-medium">
                            Create Plan
                          </Button>
                          <Button
                            type="button"
                            onClick={() => {
                              setPlanForm({
                                name: '',
                                price: 0,
                                image: '',
                                category: 'Normal',
                                description: {
                                  feature1: '',
                                  feature2: '',
                                  feature3: '',
                                  feature4: ''
                                },
                                isActive: true
                              });
                              resetImageUpload();
                            }}
                            className="bg-gray-500 hover:bg-gray-600 text-white px-8 py-3 rounded-lg font-medium"
                          >
                            Reset
                          </Button>
                        </div>
                      </form>
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'users' && (
              <div className="bg-white rounded-xl shadow-lg border border-orange-100">
                <div className="p-6 border-b border-gray-200">
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold text-gray-900 font-['Philosopher']">User Management</h2>
                    <button className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200">
                      Add User
                    </button>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[1, 2, 3, 4, 5, 6].map((user) => (
                      <div key={user} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <span className="text-blue-600 font-medium">U{user}</span>
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900">User {user}</h4>
                            <p className="text-sm text-gray-600">user{user}@example.com</p>
                          </div>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-green-600 bg-green-100 px-2 py-1 rounded">Active</span>
                          <div className="flex gap-2">
                            <button className="text-blue-600 hover:bg-blue-100 p-1 rounded">✏️</button>
                            <button className="text-red-600 hover:bg-red-100 p-1 rounded">🗑️</button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'products' && (
              <div className="space-y-6">
                {/* Products Management Sub-tabs */}
                <div className="bg-white rounded-xl shadow-lg border border-orange-100">
                  <div className="border-b border-gray-200">
                    <nav className="flex space-x-8 px-6">
                      <button
                        onClick={() => setProductSubTab('all')}
                        className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                          productSubTab === 'all'
                            ? 'border-emerald-500 text-emerald-600'
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <span>📦</span>
                          <span>All Products ({products.length})</span>
                        </span>
                      </button>
                      <button
                        onClick={() => setProductSubTab('add')}
                        className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                          productSubTab === 'add'
                            ? 'border-emerald-500 text-emerald-600'
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <span>➕</span>
                          <span>Add New Product</span>
                        </span>
                      </button>
                    </nav>
                  </div>

                  {/* All Products Section */}
                  {productSubTab === 'all' && (
                    <div className="p-6">
                      <div className="flex justify-between items-center mb-6">
                        <div>
                          <h2 className="text-xl font-semibold text-gray-900 font-['Philosopher']">All Products</h2>
                          <p className="text-sm text-gray-600 mt-1">Manage your product inventory</p>
                        </div>
                        <div className="flex gap-3">
                          <button className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 text-sm">
                            Export Products
                          </button>
                          <button 
                            onClick={() => setProductSubTab('add')}
                            className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 text-sm"
                          >
                            Add New Product
                          </button>
                        </div>
                      </div>

                      {/* Filters and Search */}
                      <div className="flex flex-wrap gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
                        <div className="flex-1 min-w-64">
                          <input
                            type="text"
                            placeholder="Search products..."
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm"
                          />
                        </div>
                        <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm">
                          <option value="all">All Categories</option>
                          <option value="puja-essentials">Puja Essentials</option>
                          <option value="aromatics">Aromatics</option>
                          <option value="spiritual-tools">Spiritual Tools</option>
                          <option value="containers">Containers</option>
                          <option value="meditation">Meditation</option>
                        </select>
                        <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm">
                          <option value="all">All Status</option>
                          <option value="active">Active</option>
                          <option value="inactive">Inactive</option>
                        </select>
                      </div>

                      {/* Products Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {products.map((product) => (
                          <div key={product.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-all duration-200 bg-white">
                            <div className="aspect-square bg-gradient-to-br from-emerald-100 to-teal-200 rounded-lg mb-4 flex items-center justify-center relative overflow-hidden">
                              <span className="text-emerald-600 text-3xl">📦</span>
                              <div className={`absolute top-2 right-2 text-xs px-2 py-1 rounded-full font-medium ${
                                product.inStock ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
                              }`}>
                                {product.inStock ? '● In Stock' : '● Out of Stock'}
                              </div>
                              <div className={`absolute top-2 left-2 text-xs px-2 py-1 rounded-full font-medium ${
                                product.isActive ? 'bg-emerald-500 text-white' : 'bg-gray-500 text-white'
                              }`}>
                                {product.isActive ? '● Active' : '● Inactive'}
                              </div>
                              {product.quantity > 0 && (
                                <div className="absolute bottom-2 left-2 bg-blue-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                                  Qty: {product.quantity}
                                </div>
                              )}
                            </div>
                            
                            <div className="space-y-2">
                              <div className="flex justify-between items-start">
                                <h4 className="font-semibold text-gray-900 text-lg font-['Philosopher'] leading-tight">{product.name}</h4>
                                <span className="text-emerald-600 font-bold text-lg">₹{product.price.toLocaleString()}</span>
                              </div>
                              
                              <p className="text-sm text-gray-600 line-clamp-3">{product.description}</p>
                              
                              <div className="flex items-center gap-2">
                                <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                                  product.category === 'puja-essentials' ? 'bg-orange-100 text-orange-800' :
                                  product.category === 'aromatics' ? 'bg-purple-100 text-purple-800' :
                                  product.category === 'spiritual-tools' ? 'bg-indigo-100 text-indigo-800' :
                                  product.category === 'containers' ? 'bg-yellow-100 text-yellow-800' :
                                  product.category === 'meditation' ? 'bg-green-100 text-green-800' :
                                  'bg-gray-100 text-gray-800'
                                }`}>
                                  {product.category?.charAt(0).toUpperCase() + product.category?.slice(1).replace('-', ' ')}
                                </span>
                              </div>
                              
                              <div className="text-xs text-gray-500 border-t pt-2 mt-3">
                                Created: {new Date(product.createdDate).toLocaleDateString()}
                              </div>
                            </div>
                            
                            <div className="flex gap-2 mt-4 pt-3 border-t border-gray-100">
                              <button className="flex-1 bg-blue-50 hover:bg-blue-100 text-blue-600 py-2 px-3 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center justify-center gap-1">
                                <span>✏️</span> Edit
                              </button>
                              <button className="flex-1 bg-gray-50 hover:bg-gray-100 text-gray-600 py-2 px-3 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center justify-center gap-1">
                                <span>👁️</span> View
                              </button>
                              <button className="bg-red-50 hover:bg-red-100 text-red-600 py-2 px-3 rounded-lg text-sm font-medium transition-colors duration-200">
                                🗑️
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Pagination */}
                      <div className="flex justify-center items-center gap-2 mt-8">
                        <button className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200 disabled:opacity-50" disabled>
                          ←
                        </button>
                        <button className="px-3 py-2 bg-emerald-500 text-white rounded-lg">1</button>
                        <button className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200">2</button>
                        <button className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                          →
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Add New Product Section */}
                  {productSubTab === 'add' && (
                    <div className="p-6">
                      <div className="mb-6">
                        <h2 className="text-xl font-semibold text-gray-900 font-['Philosopher']">Add New Product</h2>
                        <p className="text-sm text-gray-600 mt-1">Add a new product to your inventory</p>
                      </div>
                      
                      <form className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <EditText
                            label="Product Name"
                            placeholder="Enter product name"
                            value={productForm.name}
                            onChange={(value) => setProductForm(prev => ({ ...prev, name: value }))}
                            required
                          />
                          
                          <EditText
                            label="Price (₹)"
                            type="number"
                            placeholder="Enter price"
                            value={productForm.price.toString()}
                            onChange={(value) => setProductForm(prev => ({ ...prev, price: parseInt(value) || 0 }))}
                            required
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Product Image</label>
                          <div className="space-y-4">
                            {/* Image Upload Box */}
                            <div className="relative">
                              <input
                                type="file"
                                id="productImageUpload"
                                accept="image/*"
                                onChange={handleProductImageUpload}
                                className="hidden"
                              />
                              <label
                                htmlFor="productImageUpload"
                                className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-emerald-300 rounded-lg cursor-pointer bg-emerald-50 hover:bg-emerald-100 transition-colors duration-200"
                              >
                                {productImagePreview ? (
                                  <div className="relative w-full h-full">
                                    <img
                                      src={productImagePreview}
                                      alt="Product preview"
                                      className="w-full h-full object-cover rounded-lg"
                                    />
                                    <div className="absolute inset-0 bg-black bg-opacity-40 rounded-lg flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-200">
                                      <span className="text-white text-sm font-medium">Click to change</span>
                                    </div>
                                  </div>
                                ) : (
                                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    <svg className="w-8 h-8 mb-2 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                    </svg>
                                    <p className="mb-1 text-sm text-emerald-600 font-medium">
                                      <span>Click to upload</span>
                                    </p>
                                    <p className="text-xs text-emerald-500">PNG, JPG, JPEG up to 10MB</p>
                                  </div>
                                )}
                              </label>
                            </div>
                            
                            {/* Image Info and Remove Button */}
                            {selectedProductImage && (
                              <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                                <div className="flex items-center gap-3">
                                  <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                                    <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                  </div>
                                  <div>
                                    <p className="text-sm font-medium text-gray-900">{selectedProductImage.name}</p>
                                    <p className="text-xs text-gray-500">{(selectedProductImage.size / 1024 / 1024).toFixed(2)} MB</p>
                                  </div>
                                </div>
                                <button
                                  type="button"
                                  onClick={resetProductImageUpload}
                                  className="text-red-600 hover:text-red-700 p-1 rounded-full hover:bg-red-100 transition-colors duration-200"
                                >
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                  </svg>
                                </button>
                              </div>
                            )}
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                          <textarea
                            value={productForm.description}
                            onChange={(e) => setProductForm(prev => ({ ...prev, description: e.target.value }))}
                            rows={4}
                            className="w-full px-4 py-3 border border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                            placeholder="Enter detailed description of the product"
                            required
                          />
                        </div>

                        <div className="flex items-center gap-6">
                          <label className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              checked={productForm.isActive}
                              onChange={(e) => setProductForm(prev => ({ ...prev, isActive: e.target.checked }))}
                              className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
                            />
                            <span className="text-sm font-medium text-gray-700">Available for Sale</span>
                          </label>
                        </div>

                        <div className="flex gap-4">
                          <Button className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white px-8 py-3 rounded-lg font-medium">
                            Add Product
                          </Button>
                          <Button
                            type="button"
                            onClick={() => {
                              setProductForm({
                                name: '',
                                price: 0,
                                image: '',
                                description: '',
                                isActive: true
                              });
                              resetProductImageUpload();
                            }}
                            className="bg-gray-500 hover:bg-gray-600 text-white px-8 py-3 rounded-lg font-medium"
                          >
                            Reset
                          </Button>
                        </div>
                      </form>
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'chawada' && (
              <div className="space-y-6">
                {/* Chawada Management Sub-tabs */}
                <div className="bg-white rounded-xl shadow-lg border border-orange-100">
                  <div className="border-b border-gray-200">
                    <nav className="flex space-x-8 px-6">
                      <button
                        onClick={() => setChawadaSubTab('all')}
                        className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                          chawadaSubTab === 'all'
                            ? 'border-purple-500 text-purple-600'
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <span>🛍️</span>
                          <span>All Chawada ({chawadaItems.length})</span>
                        </span>
                      </button>
                      <button
                        onClick={() => setChawadaSubTab('add')}
                        className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                          chawadaSubTab === 'add'
                            ? 'border-purple-500 text-purple-600'
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <span>➕</span>
                          <span>Add New Chawada</span>
                        </span>
                      </button>
                    </nav>
                  </div>

                  {/* All Chawada Section */}
                  {chawadaSubTab === 'all' && (
                    <div className="p-6">
                      <div className="flex justify-between items-center mb-6">
                        <div>
                          <h2 className="text-xl font-semibold text-gray-900 font-['Philosopher']">All Chawada Items</h2>
                          <p className="text-sm text-gray-600 mt-1">Manage your spiritual store inventory</p>
                        </div>
                        <div className="flex gap-3">
                          <button className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 text-sm">
                            Export Items
                          </button>
                          <button 
                            onClick={() => setChawadaSubTab('add')}
                            className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 text-sm"
                          >
                            Add New Item
                          </button>
                        </div>
                      </div>

                      {/* Filters and Search */}
                      <div className="flex flex-wrap gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
                        <div className="flex-1 min-w-64">
                          <input
                            type="text"
                            placeholder="Search chawada items..."
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                          />
                        </div>
                        <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm">
                          <option value="all">All Categories</option>
                          <option value="spiritual">Spiritual</option>
                          <option value="prosperity">Prosperity</option>
                          <option value="puja-items">Puja Items</option>
                        </select>
                        <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm">
                          <option value="all">All Status</option>
                          <option value="inStock">In Stock</option>
                          <option value="outOfStock">Out of Stock</option>
                        </select>
                      </div>

                      {/* Chawada Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {chawadaItems.map((item) => (
                          <div key={item.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-all duration-200 bg-white">
                            <div className="aspect-square bg-gradient-to-br from-purple-100 to-pink-200 rounded-lg mb-4 flex items-center justify-center relative overflow-hidden">
                              <span className="text-purple-600 text-3xl">🛍️</span>
                              <div className={`absolute top-2 right-2 text-xs px-2 py-1 rounded-full font-medium ${
                                item.inStock ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
                              }`}>
                                {item.inStock ? '● In Stock' : '● Out of Stock'}
                              </div>
                              {item.quantity > 0 && (
                                <div className="absolute top-2 left-2 bg-blue-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                                  Qty: {item.quantity}
                                </div>
                              )}
                            </div>
                            
                            <div className="space-y-2">
                              <div className="flex justify-between items-start">
                                <h4 className="font-semibold text-gray-900 text-lg font-['Philosopher'] leading-tight">{item.name}</h4>
                                <span className="text-purple-600 font-bold text-lg">₹{item.price.toLocaleString()}</span>
                              </div>
                              
                              <p className="text-sm text-gray-600 line-clamp-3">{item.description}</p>
                              
                              <div className="flex items-center gap-2">
                                <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                                  item.category === 'spiritual' ? 'bg-purple-100 text-purple-800' :
                                  item.category === 'prosperity' ? 'bg-yellow-100 text-yellow-800' :
                                  item.category === 'puja-items' ? 'bg-orange-100 text-orange-800' :
                                  'bg-gray-100 text-gray-800'
                                }`}>
                                  {item.category.charAt(0).toUpperCase() + item.category.slice(1).replace('-', ' ')}
                                </span>
                              </div>
                            </div>
                            
                            <div className="flex gap-2 mt-4 pt-3 border-t border-gray-100">
                              <button className="flex-1 bg-blue-50 hover:bg-blue-100 text-blue-600 py-2 px-3 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center justify-center gap-1">
                                <span>✏️</span> Edit
                              </button>
                              <button className="flex-1 bg-gray-50 hover:bg-gray-100 text-gray-600 py-2 px-3 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center justify-center gap-1">
                                <span>👁️</span> View
                              </button>
                              <button className="bg-red-50 hover:bg-red-100 text-red-600 py-2 px-3 rounded-lg text-sm font-medium transition-colors duration-200">
                                🗑️
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Pagination */}
                      <div className="flex justify-center items-center gap-2 mt-8">
                        <button className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200 disabled:opacity-50" disabled>
                          ←
                        </button>
                        <button className="px-3 py-2 bg-purple-500 text-white rounded-lg">1</button>
                        <button className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200">2</button>
                        <button className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                          →
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Add New Chawada Section */}
                  {chawadaSubTab === 'add' && (
                    <div className="p-6">
                      <div className="mb-6">
                        <h2 className="text-xl font-semibold text-gray-900 font-['Philosopher']">Add New Chawada Item</h2>
                        <p className="text-sm text-gray-600 mt-1">Add a new spiritual item to your store</p>
                      </div>
                      
                      <form className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <EditText
                            label="Chawada Name"
                            placeholder="Enter item name"
                            value={chawadaForm.name}
                            onChange={(value) => setChawadaForm(prev => ({ ...prev, name: value }))}
                            required
                          />
                          
                          <EditText
                            label="Price (₹)"
                            type="number"
                            placeholder="Enter price"
                            value={chawadaForm.price.toString()}
                            onChange={(value) => setChawadaForm(prev => ({ ...prev, price: parseInt(value) || 0 }))}
                            required
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Chawada Image</label>
                          <div className="space-y-4">
                            {/* Image Upload Box */}
                            <div className="relative">
                              <input
                                type="file"
                                id="chawadaImageUpload"
                                accept="image/*"
                                onChange={handleChawadaImageUpload}
                                className="hidden"
                              />
                              <label
                                htmlFor="chawadaImageUpload"
                                className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-purple-300 rounded-lg cursor-pointer bg-purple-50 hover:bg-purple-100 transition-colors duration-200"
                              >
                                {chawadaImagePreview ? (
                                  <div className="relative w-full h-full">
                                    <img
                                      src={chawadaImagePreview}
                                      alt="Chawada preview"
                                      className="w-full h-full object-cover rounded-lg"
                                    />
                                    <div className="absolute inset-0 bg-black bg-opacity-40 rounded-lg flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-200">
                                      <span className="text-white text-sm font-medium">Click to change</span>
                                    </div>
                                  </div>
                                ) : (
                                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    <svg className="w-8 h-8 mb-2 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                    </svg>
                                    <p className="mb-1 text-sm text-purple-600 font-medium">
                                      <span>Click to upload</span>
                                    </p>
                                    <p className="text-xs text-purple-500">PNG, JPG, JPEG up to 10MB</p>
                                  </div>
                                )}
                              </label>
                            </div>
                            
                            {/* Image Info and Remove Button */}
                            {selectedChawadaImage && (
                              <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                                <div className="flex items-center gap-3">
                                  <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                                    <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                  </div>
                                  <div>
                                    <p className="text-sm font-medium text-gray-900">{selectedChawadaImage.name}</p>
                                    <p className="text-xs text-gray-500">{(selectedChawadaImage.size / 1024 / 1024).toFixed(2)} MB</p>
                                  </div>
                                </div>
                                <button
                                  type="button"
                                  onClick={resetChawadaImageUpload}
                                  className="text-red-600 hover:text-red-700 p-1 rounded-full hover:bg-red-100 transition-colors duration-200"
                                >
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                  </svg>
                                </button>
                              </div>
                            )}
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                          <textarea
                            value={chawadaForm.description}
                            onChange={(e) => setChawadaForm(prev => ({ ...prev, description: e.target.value }))}
                            rows={4}
                            className="w-full px-4 py-3 border border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            placeholder="Enter detailed description of the chawada item"
                            required
                          />
                        </div>

                        <div className="flex items-center gap-6">
                          <label className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              checked={chawadaForm.isActive}
                              onChange={(e) => setChawadaForm(prev => ({ ...prev, isActive: e.target.checked }))}
                              className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                            />
                            <span className="text-sm font-medium text-gray-700">Available for Sale</span>
                          </label>
                        </div>

                        <div className="flex gap-4">
                          <Button className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white px-8 py-3 rounded-lg font-medium">
                            Add Chawada Item
                          </Button>
                          <Button
                            type="button"
                            onClick={() => {
                              setChawadaForm({
                                name: '',
                                price: 0,
                                image: '',
                                description: '',
                                isActive: true
                              });
                              resetChawadaImageUpload();
                            }}
                            className="bg-gray-500 hover:bg-gray-600 text-white px-8 py-3 rounded-lg font-medium"
                          >
                            Reset
                          </Button>
                        </div>
                      </form>
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'orders' && (
              <div className="bg-white rounded-xl shadow-lg p-6 border border-orange-100">
                <h2 className="text-xl font-semibold text-gray-900 mb-6 font-['Philosopher']">Order Management</h2>
                
                <div className="space-y-4">
                  {[1, 2, 3, 4, 5].map((order) => (
                    <div key={order} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                            <span className="text-green-600 font-medium">#{order}</span>
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900">Order GP00{order}234</h4>
                            <p className="text-sm text-gray-600">Ganesh Puja - Customer {order}</p>
                            <p className="text-xs text-gray-500">Placed on Jan {order + 10}, 2024</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-gray-900">₹{(order * 1000 + 500).toLocaleString()}</p>
                          <span className="inline-block px-2 py-1 rounded text-xs bg-green-100 text-green-600">Completed</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'content' && (
              <div className="bg-white rounded-xl shadow-lg p-6 border border-orange-100">
                <h2 className="text-xl font-semibold text-gray-900 mb-6 font-['Philosopher']">Content Management</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-orange-400 transition-colors cursor-pointer">
                    <div className="text-4xl mb-4">📹</div>
                    <h3 className="font-medium text-gray-900 mb-2">Upload Videos</h3>
                    <p className="text-sm text-gray-600">Drag and drop puja videos or click to browse</p>
                  </div>
                  
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-orange-400 transition-colors cursor-pointer">
                    <div className="text-4xl mb-4">📄</div>
                    <h3 className="font-medium text-gray-900 mb-2">Upload Certificates</h3>
                    <p className="text-sm text-gray-600">Drag and drop certificates or click to browse</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[1, 2, 3, 4].map((content) => (
                    <div key={content} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="aspect-video bg-gray-100 rounded-lg mb-3 flex items-center justify-center">
                        <span className="text-gray-400 text-2xl">📁</span>
                      </div>
                      <h4 className="font-medium text-gray-900 mb-1">Content {content}</h4>
                      <p className="text-sm text-gray-600 mb-2">Uploaded on Jan {content + 5}, 2024</p>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-500">Video - 24MB</span>
                        <button className="text-blue-600 hover:bg-blue-100 p-1 rounded">👁️</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'blogs' && (
              <div className="space-y-6">
                {/* Blog Management Sub-tabs */}
                <div className="bg-white rounded-xl shadow-lg border border-orange-100">
                  <div className="border-b border-gray-200">
                    <nav className="flex space-x-8 px-6">
                      <button
                        onClick={() => setBlogSubTab('all')}
                        className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                          blogSubTab === 'all'
                            ? 'border-purple-500 text-purple-600'
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <span>📋</span>
                          <span>All Blogs ({blogItems.length})</span>
                        </span>
                      </button>
                      <button
                        onClick={() => setBlogSubTab('add')}
                        className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                          blogSubTab === 'add'
                            ? 'border-purple-500 text-purple-600'
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <span>➕</span>
                          <span>Add New Blog</span>
                        </span>
                      </button>
                    </nav>
                  </div>

                  {/* All Blogs Section */}
                  {blogSubTab === 'all' && (
                    <div className="p-6">
                      <div className="flex justify-between items-center mb-6">
                        <div>
                          <h2 className="text-xl font-semibold text-gray-900 font-['Philosopher']">All Blogs</h2>
                          <p className="text-sm text-gray-600 mt-1">Manage your blog posts</p>
                        </div>
                        <div className="flex gap-3">
                          <button className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 text-sm">
                            Export Blogs
                          </button>
                          <button 
                            onClick={() => setBlogSubTab('add')}
                            className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 text-sm"
                          >
                            Add New Blog
                          </button>
                        </div>
                      </div>

                      {/* Filters and Search */}
                      <div className="flex flex-wrap gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
                        <div className="flex-1 min-w-64">
                          <input
                            type="text"
                            placeholder="Search blogs..."
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                          />
                        </div>
                        <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm">
                          <option value="all">All Categories</option>
                          <option value="spiritual">Spiritual</option>
                          <option value="astrology">Astrology</option>
                          <option value="puja">Puja</option>
                          <option value="remedies">Remedies</option>
                        </select>
                        <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm">
                          <option value="all">All Status</option>
                          <option value="active">Active</option>
                          <option value="inactive">Inactive</option>
                        </select>
                      </div>

                      {/* Blogs Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {blogItems.map((blog) => (
                          <div key={blog.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-all duration-200 bg-white">
                            <div className="aspect-video bg-gradient-to-br from-purple-100 to-pink-200 rounded-lg mb-4 flex items-center justify-center relative overflow-hidden">
                              <span className="text-purple-600 text-3xl">📝</span>
                              <div className={`absolute top-2 right-2 text-xs px-2 py-1 rounded-full font-medium ${
                                blog.isActive ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
                              }`}>
                                {blog.isActive ? '● Active' : '● Inactive'}
                              </div>
                              <div className="absolute bottom-2 left-2 bg-blue-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                                {blog.views} views
                              </div>
                            </div>
                            
                            <div className="space-y-2">
                              <div className="flex justify-between items-start">
                                <h4 className="font-semibold text-gray-900 text-lg font-['Philosopher'] leading-tight">{blog.title}</h4>
                              </div>
                              
                              <p className="text-sm text-gray-600 line-clamp-3">{blog.excerpt}</p>
                              
                              <div className="flex items-center gap-2">
                                <span className="text-xs text-gray-500">By {blog.author}</span>
                                <span className="text-xs text-gray-400">•</span>
                                <span className="text-xs text-gray-500">{new Date(blog.createdDate).toLocaleDateString()}</span>
                              </div>
                              
                              <div className="flex items-center gap-2">
                                <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                                  blog.category === 'spiritual' ? 'bg-purple-100 text-purple-800' :
                                  blog.category === 'astrology' ? 'bg-yellow-100 text-yellow-800' :
                                  blog.category === 'puja' ? 'bg-orange-100 text-orange-800' :
                                  blog.category === 'remedies' ? 'bg-green-100 text-green-800' :
                                  'bg-gray-100 text-gray-800'
                                }`}>
                                  {blog.category.charAt(0).toUpperCase() + blog.category.slice(1)}
                                </span>
                              </div>
                            </div>
                            
                            <div className="flex gap-2 mt-4 pt-3 border-t border-gray-100">
                              <button className="flex-1 bg-blue-50 hover:bg-blue-100 text-blue-600 py-2 px-3 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center justify-center gap-1">
                                <span>✏️</span> Edit
                              </button>
                              <button className="flex-1 bg-gray-50 hover:bg-gray-100 text-gray-600 py-2 px-3 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center justify-center gap-1">
                                <span>👁️</span> View
                              </button>
                              <button className="bg-red-50 hover:bg-red-100 text-red-600 py-2 px-3 rounded-lg text-sm font-medium transition-colors duration-200">
                                🗑️
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Pagination */}
                      <div className="flex justify-center items-center gap-2 mt-8">
                        <button className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200 disabled:opacity-50" disabled>
                          ←
                        </button>
                        <button className="px-3 py-2 bg-purple-500 text-white rounded-lg">1</button>
                        <button className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200">2</button>
                        <button className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                          →
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Add New Blog Section */}
                  {blogSubTab === 'add' && (
                    <div className="p-6">
                      <div className="mb-6">
                        <h2 className="text-xl font-semibold text-gray-900 font-['Philosopher']">Add New Blog</h2>
                        <p className="text-sm text-gray-600 mt-1">Create a new blog post</p>
                      </div>
                      
                      <form className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <EditText
                            label="Blog Title"
                            placeholder="Enter blog title"
                            value={blogForm.title}
                            onChange={(value) => setBlogForm(prev => ({ ...prev, title: value }))}
                            required
                          />
                          
                          <EditText
                            label="Author"
                            placeholder="Enter author name"
                            value={blogForm.author}
                            onChange={(value) => setBlogForm(prev => ({ ...prev, author: value }))}
                            required
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Blog Image</label>
                          <div className="space-y-4">
                            {/* Image Upload Box */}
                            <div className="relative">
                              <input
                                type="file"
                                id="blogImageUpload"
                                accept="image/*"
                                onChange={handleBlogImageUpload}
                                className="hidden"
                              />
                              <label
                                htmlFor="blogImageUpload"
                                className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-purple-300 rounded-lg cursor-pointer bg-purple-50 hover:bg-purple-100 transition-colors duration-200"
                              >
                                {blogImagePreview ? (
                                  <div className="relative w-full h-full">
                                    <img
                                      src={blogImagePreview}
                                      alt="Blog preview"
                                      className="w-full h-full object-cover rounded-lg"
                                    />
                                    <div className="absolute inset-0 bg-black bg-opacity-40 rounded-lg flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-200">
                                      <span className="text-white text-sm font-medium">Click to change</span>
                                    </div>
                                  </div>
                                ) : (
                                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    <svg className="w-8 h-8 mb-2 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                    </svg>
                                    <p className="mb-1 text-sm text-purple-600 font-medium">
                                      <span>Click to upload</span>
                                    </p>
                                    <p className="text-xs text-purple-500">PNG, JPG, JPEG up to 10MB</p>
                                  </div>
                                )}
                              </label>
                            </div>
                            
                            {/* Image Info and Remove Button */}
                            {selectedBlogImage && (
                              <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                                <div className="flex items-center gap-3">
                                  <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                                    <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                  </div>
                                  <div>
                                    <p className="text-sm font-medium text-gray-900">{selectedBlogImage.name}</p>
                                    <p className="text-xs text-gray-500">{(selectedBlogImage.size / 1024 / 1024).toFixed(2)} MB</p>
                                  </div>
                                </div>
                                <button
                                  type="button"
                                  onClick={resetBlogImageUpload}
                                  className="text-red-600 hover:text-red-700 p-1 rounded-full hover:bg-red-100 transition-colors duration-200"
                                >
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                  </svg>
                                </button>
                              </div>
                            )}
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Excerpt</label>
                          <textarea
                            value={blogForm.excerpt}
                            onChange={(e) => setBlogForm(prev => ({ ...prev, excerpt: e.target.value }))}
                            rows={3}
                            className="w-full px-4 py-3 border border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            placeholder="Enter a short excerpt for the blog post"
                            required
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
                          <textarea
                            value={blogForm.content}
                            onChange={(e) => setBlogForm(prev => ({ ...prev, content: e.target.value }))}
                            rows={8}
                            className="w-full px-4 py-3 border border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            placeholder="Enter the full blog content"
                            required
                          />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                            <select
                              value={blogForm.category}
                              onChange={(e) => setBlogForm(prev => ({ ...prev, category: e.target.value }))}
                              className="w-full px-4 py-3 border border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            >
                              <option value="spiritual">Spiritual</option>
                              <option value="astrology">Astrology</option>
                              <option value="puja">Puja</option>
                              <option value="remedies">Remedies</option>
                            </select>
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Tags (comma separated)</label>
                            <input
                              type="text"
                              value={blogForm.tags}
                              onChange={(e) => setBlogForm(prev => ({ ...prev, tags: e.target.value }))}
                              className="w-full px-4 py-3 border border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                              placeholder="Enter tags separated by commas"
                            />
                          </div>
                        </div>

                        <div className="flex items-center gap-6">
                          <label className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              checked={blogForm.isActive}
                              onChange={(e) => setBlogForm(prev => ({ ...prev, isActive: e.target.checked }))}
                              className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                            />
                            <span className="text-sm font-medium text-gray-700">Publish Blog</span>
                          </label>
                        </div>

                        <div className="flex gap-4">
                          <Button className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white px-8 py-3 rounded-lg font-medium">
                            Publish Blog
                          </Button>
                          <Button
                            type="button"
                            onClick={() => {
                              setBlogForm({
                                title: '',
                                excerpt: '',
                                content: '',
                                author: '',
                                category: 'spiritual',
                                tags: '',
                                image: '',
                                isActive: true
                              });
                              resetBlogImageUpload();
                            }}
                            className="bg-gray-500 hover:bg-gray-600 text-white px-8 py-3 rounded-lg font-medium"
                          >
                            Reset
                          </Button>
                        </div>
                      </form>
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'analytics' && (
              <div className="bg-white rounded-xl shadow-lg p-6 border border-orange-100">
                <h2 className="text-xl font-semibold text-gray-900 mb-6 font-['Philosopher']">Analytics & Reports</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="border border-gray-200 rounded-lg p-6">
                    <h3 className="font-medium text-gray-900 mb-4">Revenue Analytics</h3>
                    <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                      <span className="text-gray-400">📊 Revenue Chart</span>
                    </div>
                  </div>
                  
                  <div className="border border-gray-200 rounded-lg p-6">
                    <h3 className="font-medium text-gray-900 mb-4">User Growth</h3>
                    <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                      <span className="text-gray-400">📈 Growth Chart</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
      </div>
    </div>
  );
};

export default AdminDashboard;