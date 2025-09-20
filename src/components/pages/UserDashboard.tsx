'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useAppSelector, useAppDispatch } from '@/hooks';
import { logout } from '@/store/slices/authSlice';
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
  spiritualInfo: {
    favoriteDeities: string[];
    birthTime?: string;
    birthPlace?: string;
    gotra?: string;
  };
}

const UserDashboard: React.FC = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const [activeTab, setActiveTab] = useState<'overview' | 'profile' | 'pujas' | 'orders' | 'videos' | 'certificates'>('overview');
  const [isEditing, setIsEditing] = useState(false);

  // TEMPORARY: Comment out authentication check for testing
  // TODO: Uncomment when authentication is implemented
  /*
  if (!user?.isAuthenticated) {
    router.push('/');
    return null;
  }
  */

  // Mock user data for testing when no user is authenticated
  const displayUser = user || {
    name: 'Test User',
    email: 'test@example.com',
    mobile: '+91 9876543210',
    isAuthenticated: true
  };

  // Mock data - In real app, this would come from API
  const [userProfile, setUserProfile] = useState<UserProfile>({
    personalInfo: {
      name: displayUser?.name || '',
      email: displayUser?.email || '',
      mobile: displayUser?.mobile || '',
      dateOfBirth: '',
      address: '',
      city: '',
      state: '',
      country: 'India',
      pincode: '',
    },
    spiritualInfo: {
      favoriteDeities: ['Lord Ganesha', 'Goddess Lakshmi'],
      birthTime: '',
      birthPlace: '',
      gotra: '',
    }
  });

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

  const handleLogout = () => {
    dispatch(logout());
    router.push('/');
  };

  const handleProfileUpdate = () => {
    setIsEditing(false);
    // In real app, would save to backend
    console.log('Profile updated:', userProfile);
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100">
      {/* Header */}
      <div className="bg-white shadow-md">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => router.push('/')}
                className="flex items-center gap-2 hover:opacity-80 transition-opacity"
              >
                <Image
                  src="/images/img_group_133653_white_a700.svg"
                  alt="Logo Icon"
                  width={40}
                  height={37}
                  className="w-10 h-9"
                />
                <Image
                  src="/images/img_group_133643.svg"
                  alt="Global Puja"
                  width={120}
                  height={21}
                  className="w-24 h-5"
                />
              </button>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-orange-400 to-orange-500 flex items-center justify-center text-white font-bold">
                  {displayUser?.name?.charAt(0)?.toUpperCase() || 'U'}
                </div>
                <div className="hidden sm:block">
                  <p className="text-sm font-medium text-gray-900">{displayUser?.name}</p>
                  <p className="text-xs text-gray-500">{displayUser?.email}</p>
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
                <h3 className="text-lg font-bold text-gray-900 font-['Philosopher']">{displayUser?.name}</h3>
                <p className="text-sm text-gray-500">Devoted Member</p>
              </div>
              
              <nav className="space-y-2">
                {[
                  { id: 'overview', label: 'Overview', icon: '📊' },
                  { id: 'profile', label: 'My Profile', icon: '👤' },
                  { id: 'pujas', label: 'My Pujas', icon: '🙏' },
                  { id: 'orders', label: 'My Orders', icon: '📦' },
                  { id: 'videos', label: 'Puja Videos', icon: '🎥' },
                  { id: 'certificates', label: 'Certificates', icon: '📜' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id as any)}
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
            
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-2xl font-bold text-gray-900 font-['Philosopher'] mb-6">Dashboard Overview</h2>
                  
                  {/* Stats Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    <div className="bg-gradient-to-r from-green-400 to-green-500 rounded-lg p-4 text-white">
                      <div className="text-2xl font-bold">{userPujas.filter(p => p.status === 'completed').length}</div>
                      <div className="text-sm opacity-90">Completed Pujas</div>
                    </div>
                    <div className="bg-gradient-to-r from-blue-400 to-blue-500 rounded-lg p-4 text-white">
                      <div className="text-2xl font-bold">{userPujas.filter(p => p.status === 'upcoming').length}</div>
                      <div className="text-sm opacity-90">Upcoming Pujas</div>
                    </div>
                    <div className="bg-gradient-to-r from-purple-400 to-purple-500 rounded-lg p-4 text-white">
                      <div className="text-2xl font-bold">{userOrders.length}</div>
                      <div className="text-sm opacity-90">Total Orders</div>
                    </div>
                    <div className="bg-gradient-to-r from-orange-400 to-orange-500 rounded-lg p-4 text-white">
                      <div className="text-2xl font-bold">₹{userPujas.reduce((sum, puja) => sum + puja.amount, 0).toLocaleString()}</div>
                      <div className="text-sm opacity-90">Total Spent</div>
                    </div>
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-xl font-bold text-gray-900 font-['Philosopher'] mb-4">Recent Activity</h3>
                  <div className="space-y-4">
                    {userPujas.slice(0, 3).map((puja) => (
                      <div key={puja.id} className="flex items-center gap-4 p-3 rounded-lg border border-gray-100">
                        <Image
                          src={puja.image}
                          alt={puja.title}
                          width={60}
                          height={60}
                          className="w-15 h-15 rounded-lg object-cover"
                        />
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">{puja.title}</h4>
                          <p className="text-sm text-gray-500">{puja.temple}</p>
                          <p className="text-sm text-gray-500">{new Date(puja.date).toLocaleDateString()}</p>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(puja.status)}`}>
                          {puja.status.charAt(0).toUpperCase() + puja.status.slice(1)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

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
                  >
                    {isEditing ? 'Save Changes' : 'Edit Profile'}
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Personal Information */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 font-['Philosopher'] mb-4">Personal Information</h3>
                    <div className="space-y-4">
                      {Object.entries(userProfile.personalInfo).map(([key, value]) => (
                        <div key={key}>
                          <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">
                            {key.replace(/([A-Z])/g, ' $1').trim()}
                          </label>
                          {isEditing ? (
                            <input
                              type={key === 'email' ? 'email' : key === 'mobile' ? 'tel' : key === 'dateOfBirth' ? 'date' : 'text'}
                              value={value}
                              onChange={(e) => setUserProfile(prev => ({
                                ...prev,
                                personalInfo: { ...prev.personalInfo, [key]: e.target.value }
                              }))}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                            />
                          ) : (
                            <p className="text-gray-900 py-2">{value || 'Not provided'}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Spiritual Information */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 font-['Philosopher'] mb-4">Spiritual Information</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Favorite Deities</label>
                        {isEditing ? (
                          <input
                            type="text"
                            value={userProfile.spiritualInfo.favoriteDeities.join(', ')}
                            onChange={(e) => setUserProfile(prev => ({
                              ...prev,
                              spiritualInfo: { ...prev.spiritualInfo, favoriteDeities: e.target.value.split(', ') }
                            }))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                            placeholder="Separate with commas"
                          />
                        ) : (
                          <div className="flex flex-wrap gap-2">
                            {userProfile.spiritualInfo.favoriteDeities.map((deity, index) => (
                              <span key={index} className="px-2 py-1 bg-orange-100 text-orange-800 rounded-full text-sm">
                                {deity}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                      {Object.entries(userProfile.spiritualInfo).filter(([key]) => key !== 'favoriteDeities').map(([key, value]) => (
                        <div key={key}>
                          <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">
                            {key.replace(/([A-Z])/g, ' $1').trim()}
                          </label>
                          {isEditing ? (
                            <input
                              type={key === 'birthTime' ? 'time' : 'text'}
                              value={value}
                              onChange={(e) => setUserProfile(prev => ({
                                ...prev,
                                spiritualInfo: { ...prev.spiritualInfo, [key]: e.target.value }
                              }))}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                            />
                          ) : (
                            <p className="text-gray-900 py-2">{value || 'Not provided'}</p>
                          )}
                        </div>
                      ))}
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
                        <Image
                          src={puja.image}
                          alt={puja.title}
                          width={80}
                          height={80}
                          className="w-20 h-20 rounded-lg object-cover"
                        />
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

          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;