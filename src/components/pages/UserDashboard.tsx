'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useAppSelector, useAppDispatch } from '@/hooks';
import { logout, fetchUserInfo, updateUserInfo } from '@/store/slices/authSlice';
import Button from '@/components/ui/Button';

// User Dashboard Interface Types
interface UserPuja {
  id: string;
  title: string;
  temple: string;
  date: string;
  time: string;
  status: 'completed' | 'upcoming' | 'processing';
  amount: number;
  image: string;
  videoUrl?: string;
  certificateUrl?: string;
}

interface UserOrder {
  id: string;
  orderNumber: string;
  date: string;
  items: Array<{
    name: string;
    quantity: number;
    price: number;
    image: string;
  }>;
  total: number;
  status: 'delivered' | 'shipped' | 'processing' | 'cancelled';
  trackingNumber?: string;
}

interface UserProfile {
  personalInfo: {
    name: string;
    email: string;
    mobile: string;
    dateOfBirth?: string;
    address?: string;
    city?: string;
    state?: string;
    country?: string;
    pincode?: string;
  };
  spiritualInfo?: {
    favoriteDeities: string[];
    birthTime?: string;
    birthPlace?: string;
    gotra?: string;
  };
}

const UserDashboard: React.FC = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { user, isLoading } = useAppSelector((state) => state.auth);
  const [activeTab, setActiveTab] = useState<'profile' | 'pujas' | 'orders' | 'videos'>('profile');
  const [isEditing, setIsEditing] = useState(false);

  // Fetch user info when component mounts
  useEffect(() => {
    dispatch(fetchUserInfo());
  }, [dispatch]);

  // Handle authentication - redirect if not authenticated
  useEffect(() => {
    // Only run on client-side
    if (typeof window !== 'undefined') {
      // If we have user object but not authenticated, redirect to home
      if (user && user.isAuthenticated === false) {
        router.push('/');
      }
      // If no user object at all and not loading, redirect to home
      if (!user && !isLoading) {
        router.push('/');
      }
    }
  }, [user, isLoading, router]);

  // Mock data - In real app, this would come from API
  const userPujas: UserPuja[] = [
    {
      id: '1',
      title: 'Das Mahavidya Mahaurja Yagya',
      temple: 'Siddha Mahavidya Temple',
      date: '2024-01-15',
      time: '06:00 AM',
      status: 'completed',
      amount: 2100,
      image: '/images/img__1.png',
      videoUrl: '/videos/puja-1.mp4',
      certificateUrl: '/certificates/cert-1.pdf'
    },
    {
      id: '2',
      title: 'Ganesha Puja',
      temple: 'Siddhivinayak Temple',
      date: '2024-02-20',
      time: '07:30 AM',
      status: 'upcoming',
      amount: 1500,
      image: '/images/img__2.png'
    },
    {
      id: '3',
      title: 'Lakshmi Puja',
      temple: 'Golden Temple',
      date: '2024-01-20',
      time: '05:00 AM',
      status: 'processing',
      amount: 3000,
      image: '/images/img__1.png'
    }
  ];

  const userOrders: UserOrder[] = [
    {
      id: '1',
      orderNumber: 'GP2024001',
      date: '2024-01-10',
      items: [
        { name: 'Rudraksha Mala', quantity: 1, price: 500, image: '/images/rudraksha.jpg' },
        { name: 'Spiritual Books Set', quantity: 2, price: 300, image: '/images/books.jpg' }
      ],
      total: 800,
      status: 'delivered',
      trackingNumber: 'GP123456789'
    }
  ];

  // Initialize user profile with actual user data
  const [userProfile, setUserProfile] = useState<UserProfile>({
    personalInfo: {
      name: user?.name || '',
      email: user?.email || '',
      mobile: user?.mobile || '',
    },
  });

  // Update user profile when user data changes
  useEffect(() => {
    if (user) {
      setUserProfile(prev => ({
        ...prev,
        personalInfo: {
          ...prev.personalInfo,
          name: user.name || prev.personalInfo.name,
          email: user.email || prev.personalInfo.email,
          mobile: user.mobile || prev.personalInfo.mobile,
        }
      }));
    }
  }, [user]);

  const handleLogout = () => {
    dispatch(logout());
    router.push('/');
  };

  const handleProfileUpdate = async () => {
    try {
      // Dispatch the update action with the profile data
      await dispatch(updateUserInfo({
        name: userProfile.personalInfo.name,
        email: userProfile.personalInfo.email,
        mobile: userProfile.personalInfo.mobile,
      })).unwrap();
      
      setIsEditing(false);
      // Show success message or handle UI updates
      console.log('Profile updated successfully');
    } catch (error) {
      // Handle error (show message to user)
      console.error('Failed to update profile:', error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
      case 'delivered':
        return 'text-green-600 bg-green-100';
      case 'upcoming':
      case 'shipped':
        return 'text-blue-600 bg-blue-100';
      case 'processing':
        return 'text-yellow-600 bg-yellow-100';
      case 'cancelled':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  // Show loading state - but still render all hooks
  if (isLoading && !user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  // Handle unauthenticated users - but still render all hooks
  if (user && user.isAuthenticated === false) {
    // Navigation will be handled by useEffect
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Redirecting to homepage...</p>
        </div>
      </div>
    );
  }

  // Use actual user data
  const displayUser = user;

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100">
      {/* Header */}
      <div className="bg-white shadow-md">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-6">
              {/* Logo - Click to go home */}
              <button 
                onClick={() => router.push('/')}
                className="flex items-center gap-2 hover:opacity-80 transition-opacity"
              >
                <Image
                  src="/images/logo.webp"
                  alt="33KotiDham"
                  width={120}
                  height={32}
                  className="h-8 w-auto"
                  priority
                />
              </button>
              
              {/* Navigation Links */}
              <nav className="hidden md:flex items-center gap-4">
                <button
                  onClick={() => router.push('/')}
                  className="text-sm font-medium text-gray-700 hover:text-orange-500 transition-colors"
                >
                  Home
                </button>
                <button
                  onClick={() => router.push('/pujas')}
                  className="text-sm font-medium text-gray-700 hover:text-orange-500 transition-colors"
                >
                  Puja Services
                </button>
                <button
                  onClick={() => router.push('/horoscope')}
                  className="text-sm font-medium text-gray-700 hover:text-orange-500 transition-colors"
                >
                  Horoscope
                </button>
                <button
                  onClick={() => router.push('/blog')}
                  className="text-sm font-medium text-gray-700 hover:text-orange-500 transition-colors"
                >
                  Blog
                </button>
              </nav>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-orange-400 to-orange-500 flex items-center justify-center text-white font-bold">
                  {displayUser?.name?.charAt(0)?.toUpperCase() || 'U'}
                </div>
                <div className="hidden sm:block">
                  <p className="text-sm font-medium text-gray-900">{displayUser?.name || displayUser?.email || 'User'}</p>
                  <p className="text-xs text-gray-500">{displayUser?.email || ''}</p>
                </div>
              </div>
              <Button
                variant="primary"
                size="sm"
                onClick={handleLogout}
                className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white"
              >
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="text-center mb-6">
                <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-r from-orange-400 to-orange-500 flex items-center justify-center text-white text-2xl font-bold mb-3">
                  {displayUser?.name?.charAt(0)?.toUpperCase() || 'U'}
                </div>
                <h3 className="text-lg font-bold text-gray-900 font-['Philosopher']">{displayUser?.name || displayUser?.email || 'User'}</h3>
                <p className="text-sm text-gray-500">Devoted Member</p>
                {isLoading && (
                  <p className="text-xs text-orange-500 mt-1">Loading user info...</p>
                )}
              </div>
              
              <nav className="space-y-2">
                {[
                  { id: 'profile', label: 'My Profile', icon: '👤' },
                  { id: 'pujas', label: 'My Pujas', icon: '🙏' },
                  { id: 'orders', label: 'My Orders', icon: '📦' },
                  { id: 'videos', label: 'Puja Videos', icon: '🎥' },
                  // { id: 'certificates', label: 'Certificates', icon: '📜' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id as 'profile' | 'pujas' | 'orders' | 'videos')}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left font-['Lato'] transition-colors ${
                      activeTab === item.id
                        ? 'bg-gradient-to-r from-orange-400 to-orange-500 text-white'
                        : 'text-gray-700 hover:bg-orange-50'
                    }`}
                  >
                    <span className="text-lg">{item.icon}</span>
                    <span className="font-medium">{item.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3">
            
           

            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 font-['Philosopher']">My Profile</h2>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => isEditing ? handleProfileUpdate() : setIsEditing(true)}
                    className="bg-gradient-to-r from-orange-400 to-orange-500"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Saving...' : isEditing ? 'Save Changes' : 'Edit Profile'}
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Personal Information */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 font-['Philosopher'] mb-4">Personal Information</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                        {isEditing ? (
                          <input
                            type="text"
                            value={userProfile.personalInfo.name}
                            onChange={(e) => setUserProfile(prev => ({
                              ...prev,
                              personalInfo: { ...prev.personalInfo, name: e.target.value }
                            }))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                          />
                        ) : (
                          <p className="text-gray-900 py-2">{displayUser?.name || 'Not provided'}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        {isEditing ? (
                          <input
                            type="email"
                            value={userProfile.personalInfo.email}
                            onChange={(e) => setUserProfile(prev => ({
                              ...prev,
                              personalInfo: { ...prev.personalInfo, email: e.target.value }
                            }))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                          />
                        ) : (
                          <p className="text-gray-900 py-2">{displayUser?.email || 'Not provided'}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Mobile</label>
                        {isEditing ? (
                          <input
                            type="tel"
                            value={userProfile.personalInfo.mobile}
                            onChange={(e) => setUserProfile(prev => ({
                              ...prev,
                              personalInfo: { ...prev.personalInfo, mobile: e.target.value }
                            }))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                          />
                        ) : (
                          <p className="text-gray-900 py-2">{displayUser?.mobile || 'Not provided'}</p>
                        )}
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            )}

            {/* Pujas Tab */}
            {activeTab === 'pujas' && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-900 font-['Philosopher'] mb-6">My Pujas</h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {userPujas.map((puja) => (
                    <div key={puja.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex gap-4">
                        {/* <Image
                          src={puja.image}
                          alt={puja.title}
                          width={80}
                          height={80}
                          className="w-20 h-20 rounded-lg object-cover"
                        /> */}
                        <div className="w-20 h-20 rounded-lg bg-gray-200"></div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 font-['Philosopher']">{puja.title}</h3>
                          <p className="text-sm text-gray-600">{puja.temple}</p>
                          <p className="text-sm text-gray-500">
                            {new Date(puja.date).toLocaleDateString()} at {puja.time}
                          </p>
                          <p className="text-lg font-bold text-orange-600">₹{puja.amount.toLocaleString()}</p>
                          <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium mt-2 ${getStatusColor(puja.status)}`}>
                            {puja.status.charAt(0).toUpperCase() + puja.status.slice(1)}
                          </span>
                        </div>
                      </div>
                      {(puja.videoUrl || puja.certificateUrl) && (
                        <div className="flex gap-2 mt-4">
                          {puja.videoUrl && (
                            <Button variant="primary" size="sm" className="text-xs">
                              View Video
                            </Button>
                          )}
                          {puja.certificateUrl && (
                            <Button variant="primary" size="sm" className="text-xs bg-green-600 hover:bg-green-700">
                              Download Certificate
                            </Button>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Orders Tab */}
            {activeTab === 'orders' && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-900 font-['Philosopher'] mb-6">My Orders</h2>
                <div className="space-y-6">
                  {userOrders.map((order) => (
                    <div key={order.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="font-semibold text-gray-900">Order #{order.orderNumber}</h3>
                          <p className="text-sm text-gray-500">Placed on {new Date(order.date).toLocaleDateString()}</p>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </span>
                      </div>
                      <div className="space-y-2">
                        {order.items.map((item, index) => (
                          <div key={index} className="flex justify-between items-center">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-gray-200 rounded"></div>
                              <div>
                                <p className="font-medium">{item.name}</p>
                                <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                              </div>
                            </div>
                            <p className="font-medium">₹{item.price.toLocaleString()}</p>
                          </div>
                        ))}
                      </div>
                      <div className="border-t pt-4 mt-4 flex justify-between items-center">
                        <div>
                          {order.trackingNumber && (
                            <p className="text-sm text-gray-500">Tracking: {order.trackingNumber}</p>
                          )}
                        </div>
                        <p className="text-lg font-bold">Total: ₹{order.total.toLocaleString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Videos Tab */}
            {activeTab === 'videos' && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-900 font-['Philosopher'] mb-6">Puja Videos</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {userPujas.filter(puja => puja.videoUrl).map((puja) => (
                    <div key={puja.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="aspect-video bg-gray-200 rounded-lg mb-3 flex items-center justify-center">
                        <div className="text-center">
                          <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-2">
                            <span className="text-white text-2xl">▶</span>
                          </div>
                          <p className="text-sm text-gray-600">Puja Video</p>
                        </div>
                      </div>
                      <h3 className="font-semibold text-gray-900">{puja.title}</h3>
                      <p className="text-sm text-gray-500">{new Date(puja.date).toLocaleDateString()}</p>
                      <Button
                        variant="primary"
                        size="sm"
                        className="mt-3 w-full bg-gradient-to-r from-orange-400 to-orange-500"
                        onClick={() => console.log('Play video:', puja.videoUrl)}
                      >
                        Watch Video
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Certificates Tab */}
            {/* 
            {activeTab === 'certificates' && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-900 font-['Philosopher'] mb-6">Puja Certificates</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {userPujas.filter(puja => puja.certificateUrl).map((puja) => (
                    <div key={puja.id} className="border border-gray-200 rounded-lg p-4 text-center">
                      <div className="w-20 h-24 bg-gradient-to-b from-orange-100 to-orange-200 rounded-lg mx-auto mb-3 flex items-center justify-center">
                        <span className="text-orange-600 text-3xl">📜</span>
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-1">{puja.title}</h3>
                      <p className="text-sm text-gray-500 mb-3">{new Date(puja.date).toLocaleDateString()}</p>
                      <Button
                        variant="primary"
                        size="sm"
                        className="w-full bg-gradient-to-r from-green-500 to-green-600"
                        onClick={() => console.log('Download certificate:', puja.certificateUrl)}
                      >
                        Download
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
            */}

          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;