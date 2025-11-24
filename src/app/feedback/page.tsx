'use client';

import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const FeedbackPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [rating, setRating] = useState(5);
  const [feedback, setFeedback] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, you would send this data to your backend
    console.log({ name, email, phone, rating, feedback });
    setIsSubmitted(true);
    
    // Reset form after submission
    setTimeout(() => {
      setName('');
      setEmail('');
      setPhone('');
      setRating(5);
      setFeedback('');
      setIsSubmitted(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 via-white to-orange-50">
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Share Your Feedback</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We value your opinion! Help us improve our services by sharing your experience with us.
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow-xl border border-orange-100 overflow-hidden">
            <div className="p-8">
              {isSubmitted ? (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h2>
                  <p className="text-gray-600">
                    Your feedback has been submitted successfully. We appreciate your time and input.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-4 py-3 bg-white border border-orange-200 rounded-xl focus:ring-2 focus:ring-orange-300 focus:border-transparent text-gray-800 placeholder-gray-400 shadow-sm transition-all"
                        placeholder="Enter your full name"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-3 bg-white border border-orange-200 rounded-xl focus:ring-2 focus:ring-orange-300 focus:border-transparent text-gray-800 placeholder-gray-400 shadow-sm transition-all"
                        placeholder="Enter your email"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number (Optional)
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-4 py-3 bg-white border border-orange-200 rounded-xl focus:ring-2 focus:ring-orange-300 focus:border-transparent text-gray-800 placeholder-gray-400 shadow-sm transition-all"
                      placeholder="Enter your phone number"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Rating
                    </label>
                    <div className="flex items-center space-x-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setRating(star)}
                          className="text-3xl focus:outline-none"
                        >
                          {star <= rating ? (
                            <span className="text-orange-500">★</span>
                          ) : (
                            <span className="text-gray-300">☆</span>
                          )}
                        </button>
                      ))}
                      <span className="ml-2 text-gray-600">{rating} out of 5 stars</span>
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="feedback" className="block text-sm font-medium text-gray-700 mb-2">
                      Your Feedback
                    </label>
                    <textarea
                      id="feedback"
                      value={feedback}
                      onChange={(e) => setFeedback(e.target.value)}
                      rows={5}
                      className="w-full px-4 py-3 bg-white border border-orange-200 rounded-xl focus:ring-2 focus:ring-orange-300 focus:border-transparent text-gray-800 placeholder-gray-400 shadow-sm transition-all"
                      placeholder="Please share your experience with us..."
                      required
                    ></textarea>
                  </div>
                  
                  <div className="flex items-center">
                    <button
                      type="submit"
                      className="bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold py-3 px-8 rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
                    >
                      Submit Feedback
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
          
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-lg border border-orange-100">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Suggestions</h3>
              <p className="text-gray-600">
                Have ideas to improve our services? We&#39;re all ears!
              </p>
            </div>
            
            <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-lg border border-orange-100">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Compliments</h3>
              <p className="text-gray-600">
                Loved our service? Let us know what you enjoyed most!
              </p>
            </div>
            
            <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-lg border border-orange-100">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Issues</h3>
              <p className="text-gray-600">
                Facing problems? Help us identify and fix them.
              </p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default FeedbackPage;
