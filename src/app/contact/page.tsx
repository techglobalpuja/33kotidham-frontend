'use client';

import React, { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const ContactPage: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Contact form submitted:', formData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50/50 via-yellow-50/30 to-rose-50/50 relative overflow-hidden">
      {/* Sacred Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-orange-200/30 rounded-full mix-blend-multiply filter blur-xl animate-float"></div>
        <div className="absolute top-40 right-10 w-80 h-80 bg-rose-200/30 rounded-full mix-blend-multiply filter blur-xl animate-float animation-delay-2000"></div>
        <div className="absolute bottom-20 left-20 w-72 h-72 bg-yellow-200/30 rounded-full mix-blend-multiply filter blur-xl animate-float animation-delay-4000"></div>
      </div>
      
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-28 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="relative max-w-7xl mx-auto text-center">
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="mb-8 flex justify-center">
              <div className="relative p-6 rounded-full bg-gradient-to-br from-orange-200/40 to-rose-200/40 backdrop-blur-sm border border-orange-300/30 shadow-lg">
                <div className="text-6xl text-orange-600 animate-float font-bold">📞</div>
                <div className="absolute inset-0 bg-orange-300/20 rounded-full blur-xl animate-pulse"></div>
              </div>
            </div>
            
            <h1 className="text-[52px] sm:text-[64px] md:text-[72px] font-bold leading-[60px] sm:leading-[72px] md:leading-[80px] font-['Philosopher'] mb-8">
              <span className="bg-gradient-to-r from-orange-700 via-rose-600 to-orange-800 bg-clip-text text-transparent">
                Contact Us
              </span>
              <br />
              <span className="bg-gradient-to-r from-rose-600 via-orange-700 to-yellow-600 bg-clip-text text-transparent">
                संपर्क करें
              </span>
            </h1>
            
            <p className="text-[20px] sm:text-[22px] md:text-[24px] font-normal leading-[32px] sm:leading-[34px] md:leading-[36px] font-['Lato'] max-w-5xl mx-auto text-gray-700 mb-12">
              Have questions about our services? Need guidance for your spiritual journey?
              <br className="hidden sm:block" />
              We're here to help you with all your astrological and spiritual needs.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form & Info Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Contact Form */}
            <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl p-8 border border-white/50">
              <h2 className="text-3xl font-bold text-gray-800 font-['Philosopher'] mb-8 text-center">
                Send us a Message
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-orange-200 rounded-2xl focus:ring-4 focus:ring-orange-200 focus:border-orange-400 text-gray-700 font-medium bg-white/80 backdrop-blur-sm transition-all duration-300"
                      placeholder="Enter your name"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-orange-200 rounded-2xl focus:ring-4 focus:ring-orange-200 focus:border-orange-400 text-gray-700 font-medium bg-white/80 backdrop-blur-sm transition-all duration-300"
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-orange-200 rounded-2xl focus:ring-4 focus:ring-orange-200 focus:border-orange-400 text-gray-700 font-medium bg-white/80 backdrop-blur-sm transition-all duration-300"
                      placeholder="Enter your phone"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Subject *
                    </label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-orange-200 rounded-2xl focus:ring-4 focus:ring-orange-200 focus:border-orange-400 text-gray-700 font-medium bg-white/80 backdrop-blur-sm transition-all duration-300"
                      required
                    >
                      <option value="">Select Subject</option>
                      <option value="astrology">Astrology Consultation</option>
                      <option value="puja">Puja Services</option>
                      <option value="kundli">Kundli Questions</option>
                      <option value="support">Technical Support</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={5}
                    className="w-full px-4 py-3 border-2 border-orange-200 rounded-2xl focus:ring-4 focus:ring-orange-200 focus:border-orange-400 text-gray-700 font-medium bg-white/80 backdrop-blur-sm transition-all duration-300 resize-none"
                    placeholder="Enter your message..."
                    required
                  />
                </div>
                
                <div className="text-center">
                  <button
                    type="submit"
                    className="px-12 py-4 bg-gradient-to-r from-orange-500 to-rose-500 text-white font-bold text-lg rounded-full hover:from-orange-600 hover:to-rose-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-2xl"
                  >
                    Send Message
                  </button>
                </div>
              </form>
            </div>
            
            {/* Contact Information */}
            <div className="space-y-8">
              
              {/* Contact Details */}
              <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl p-8 border border-white/50">
                <h3 className="text-2xl font-bold text-gray-800 font-['Philosopher'] mb-6">
                  Get in Touch
                </h3>
                
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-rose-500 rounded-full flex items-center justify-center text-white text-xl">
                      📍
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800 font-['Philosopher']">Address</h4>
                      <p className="text-gray-600">123 Spiritual Lane, Divine City, Sacred State 110001</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-rose-500 rounded-full flex items-center justify-center text-white text-xl">
                      📞
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800 font-['Philosopher']">Phone</h4>
                      <p className="text-gray-600">+91 9876543210</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-rose-500 rounded-full flex items-center justify-center text-white text-xl">
                      📧
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800 font-['Philosopher']">Email</h4>
                      <p className="text-gray-600">info@globalpuja.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-rose-500 rounded-full flex items-center justify-center text-white text-xl">
                      🕒
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800 font-['Philosopher']">Working Hours</h4>
                      <p className="text-gray-600">Mon - Sun: 6:00 AM - 10:00 PM</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Office Hours */}
              <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl p-8 border border-white/50">
                <h3 className="text-2xl font-bold text-gray-800 font-['Philosopher'] mb-6">
                  Consultation Hours
                </h3>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-gradient-to-r from-orange-50 to-rose-50 rounded-xl">
                    <span className="font-medium text-gray-700">Astrology Consultation</span>
                    <span className="text-orange-600 font-bold">9:00 AM - 6:00 PM</span>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl">
                    <span className="font-medium text-gray-700">Puja Booking</span>
                    <span className="text-orange-600 font-bold">24/7 Available</span>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-gradient-to-r from-rose-50 to-pink-50 rounded-xl">
                    <span className="font-medium text-gray-700">Emergency Support</span>
                    <span className="text-orange-600 font-bold">24/7 Available</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default ContactPage;