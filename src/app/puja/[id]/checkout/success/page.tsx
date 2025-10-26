'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Header from '@/components/layout/Header';
import { apiService } from '@/services/api';
import { BookingResponse } from '@/types';

const CustomCheckoutSuccessPage: React.FC = () => {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const pujaId = params.id as string;
  
  const [booking, setBooking] = useState<BookingResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Get booking details from URL parameters
  const bookingId = searchParams.get('bookingId');
  const paymentId = searchParams.get('paymentId');
  const orderId = searchParams.get('orderId');
  
  useEffect(() => {
    const fetchBookingDetails = async () => {
      if (!bookingId) {
        setError('Booking ID not found');
        setIsLoading(false);
        return;
      }

      try {
        const bookingData = await apiService.getBookingById(parseInt(bookingId));
        setBooking(bookingData);
        console.log('Booking details:', bookingData);
      } catch (err) {
        console.error('Error fetching booking details:', err);
        setError('Failed to load booking details');
      } finally {
        setIsLoading(false);
      }
    };

    fetchBookingDetails();
  }, [bookingId]);
  
  const handleContinue = () => {
    router.push('/');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
        <Header />
        
        <main className="pt-24 pb-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 font-['Philosopher'] mb-3">Loading...</h1>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
        <Header />
        
        <main className="pt-24 pb-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 font-['Philosopher'] mb-3">Error</h1>
              <p className="text-gray-600">{error}</p>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // Helper function to format date
  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
  };

const formatTime = (timeString: string | null) => {
  if (!timeString) return 'N/A';
  const today = new Date().toISOString().split('T')[0]; // e.g. "2025-10-27"
  const date = new Date(`${today}T${timeString}`); // Combine date + time
  return date.toLocaleTimeString('en-IN', { 
    hour: '2-digit', 
    minute: '2-digit', 
    hour12: true 
  });
};


  // Calculate total amount
  const calculateTotal = () => {
    let total = 0;
    if (booking?.plan) {
      total += parseFloat(booking.plan.discounted_price);
    }
    booking?.booking_chadawas?.forEach((bc) => {
      if (bc.chadawa) {
        total += parseFloat(bc.chadawa.price);
      }
    });
    return total.toFixed(2);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Success Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-6">
              <div className="w-24 h-24 bg-gradient-to-r from-green-400 to-green-500 rounded-full flex items-center justify-center shadow-lg">
                <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 font-['Philosopher'] mb-3">
              🙏 Booking Confirmed!
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Your puja booking has been successfully confirmed. May the divine blessings be with you!
            </p>
          </div>

          {/* Booking Reference Card */}
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl shadow-xl p-6 mb-6 text-white">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <p className="text-orange-100 text-sm mb-1">Booking ID</p>
                <p className="text-2xl font-bold font-['Philosopher']">#{booking?.id}</p>
              </div>
              <div className="text-right">
                <p className="text-orange-100 text-sm mb-1">Status</p>
                <span className="inline-flex items-center gap-2 bg-green-500 px-4 py-2 rounded-full font-semibold">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {booking?.status?.toUpperCase()}
                </span>
              </div>
            </div>
          </div>

          {/* Puja Details Card */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border border-orange-100">
            <h2 className="text-2xl font-bold text-gray-900 font-['Philosopher'] mb-6 flex items-center gap-2">
              <span className="text-orange-500">🕉️</span>
              Puja Details
            </h2>
            
            <div className="space-y-4">
              <div className="border-l-4 border-orange-500 pl-4">
                <h3 className="text-xl font-bold text-gray-900 font-['Philosopher'] mb-2">
                  {booking?.puja?.name || 'N/A'}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {booking?.puja?.description || 'No description available'}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <div className="bg-orange-50 rounded-xl p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                      <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 font-medium">Puja Date</p>
                      <p className="font-bold text-gray-900">{formatDate(booking?.puja?.date|| null)}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-orange-50 rounded-xl p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                      <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 font-medium">Time</p>
                      <p className="font-bold text-gray-900">{ formatTime(booking?.puja?.time|| null)}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-orange-50 rounded-xl p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                      <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 font-medium">Temple</p>
                      <p className="font-bold text-gray-900 text-sm">{booking?.puja?.temple_address || 'N/A'}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-orange-50 rounded-xl p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                      <span className="text-orange-600 font-bold">॥</span>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 font-medium">Gotra</p>
                      <p className="font-bold text-gray-900">{booking?.gotra || 'N/A'}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Selected Plan Card */}
          {booking?.plan && (
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border border-orange-100">
              <h2 className="text-2xl font-bold text-gray-900 font-['Philosopher'] mb-6 flex items-center gap-2">
                <span className="text-orange-500">✨</span>
                Selected Plan
              </h2>
              
              <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl p-6">
                <div className="flex items-start justify-between flex-wrap gap-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 font-['Philosopher'] mb-2">
                      {booking.plan.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                      {booking.plan.description}
                    </p>
                    <div className="flex items-center gap-3">
                      {booking.plan.actual_price !== booking.plan.discounted_price && (
                        <span className="text-gray-400 line-through text-lg">
                          ₹{parseFloat(booking.plan.actual_price).toFixed(2)}
                        </span>
                      )}
                      <span className="text-3xl font-bold text-orange-600">
                        ₹{parseFloat(booking.plan.discounted_price).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Chadawas Card */}
          {booking?.booking_chadawas && booking.booking_chadawas.length > 0 && (
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border border-orange-100">
              <h2 className="text-2xl font-bold text-gray-900 font-['Philosopher'] mb-6 flex items-center gap-2">
                <span className="text-orange-500">🪔</span>
                Chadawas (Offerings)
              </h2>
              
              <div className="space-y-4">
                {booking.booking_chadawas.map((bc, index) => (
                  bc.chadawa && (
                    <div key={bc.id || index} className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-5 border border-orange-200">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <h4 className="font-bold text-gray-900 text-lg mb-1">
                            {bc.chadawa.name}
                          </h4>
                          <p className="text-gray-600 text-sm mb-2">
                            {bc.chadawa.description}
                          </p>
                          {bc.note && (
                            <div className="bg-white/70 rounded-lg p-3 mt-2">
                              <p className="text-xs text-gray-500 font-medium mb-1">Note:</p>
                              <p className="text-sm text-gray-700">{bc.note}</p>
                            </div>
                          )}
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-orange-600">
                            ₹{parseFloat(bc.chadawa.price).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </div>
                  )
                ))}
              </div>
            </div>
          )}

          {/* Contact Information Card */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border border-orange-100">
            <h2 className="text-2xl font-bold text-gray-900 font-['Philosopher'] mb-6 flex items-center gap-2">
              <span className="text-orange-500">📱</span>
              Contact Information
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-orange-50 rounded-xl p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-medium">Mobile Number</p>
                    <p className="font-bold text-gray-900">{booking?.mobile_number || 'N/A'}</p>
                  </div>
                </div>
              </div>

              <div className="bg-orange-50 rounded-xl p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-orange-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-medium">WhatsApp Number</p>
                    <p className="font-bold text-gray-900">{booking?.whatsapp_number || booking?.mobile_number || 'N/A'}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Summary Card */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl shadow-lg p-6 mb-6 border-2 border-green-200">
            <h2 className="text-2xl font-bold text-gray-900 font-['Philosopher'] mb-6 flex items-center gap-2">
              <span className="text-green-500">💰</span>
              Payment Summary
            </h2>
            
            <div className="space-y-3 mb-4">
              {booking?.plan && (
                <div className="flex justify-between items-center pb-3 border-b border-green-200">
                  <span className="text-gray-700">Plan: {booking.plan.name}</span>
                  <span className="font-semibold text-gray-900">₹{parseFloat(booking.plan.discounted_price).toFixed(2)}</span>
                </div>
              )}
              
              {booking?.booking_chadawas && booking.booking_chadawas.map((bc, index) => (
                bc.chadawa && (
                  <div key={bc.id || index} className="flex justify-between items-center pb-3 border-b border-green-200">
                    <span className="text-gray-700">Chadawa: {bc.chadawa.name}</span>
                    <span className="font-semibold text-gray-900">₹{parseFloat(bc.chadawa.price).toFixed(2)}</span>
                  </div>
                )
              ))}
            </div>
            
            <div className="flex justify-between items-center pt-4 border-t-2 border-green-300">
              <span className="text-xl font-bold text-gray-900">Total Amount Paid</span>
              <span className="text-3xl font-bold text-green-600">₹{calculateTotal()}</span>
            </div>
            
            <div className="mt-4 bg-white/70 rounded-xl p-4">
              <p className="text-sm text-green-700 flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Payment Verified Successfully • Order ID: {orderId || 'N/A'}
              </p>
              {paymentId && (
                <p className="text-xs text-gray-500 mt-2">Payment ID: {paymentId}</p>
              )}
            </div>
          </div>

          {/* What to Expect Next */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl shadow-lg p-6 mb-6 border border-blue-200">
            <h3 className="text-xl font-bold text-gray-900 font-['Philosopher'] mb-4 flex items-center gap-2">
              <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              What to Expect Next
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-4">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-blue-600 font-bold">1</span>
                </div>
                <div>
                  <p className="font-semibold text-gray-900 mb-1">WhatsApp Confirmation</p>
                  <p className="text-gray-600 text-sm">You will receive a confirmation message on WhatsApp with complete puja details within 15 minutes</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-blue-600 font-bold">2</span>
                </div>
                <div>
                  <p className="font-semibold text-gray-900 mb-1">Puja Performance</p>
                  <p className="text-gray-600 text-sm">Our experienced priest will perform the puja on the scheduled date and time with complete rituals</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-blue-600 font-bold">3</span>
                </div>
                <div>
                  <p className="font-semibold text-gray-900 mb-1">Prasad & Recording Delivery</p>
                  <p className="text-gray-600 text-sm">Prasad and puja recording will be delivered to your address within 7-10 business days</p>
                </div>
              </li>
            </ul>
          </div>
            
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => router.push('/dashboard')}
              className="flex-1 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all duration-300 shadow-lg"
            >
              View My Bookings
            </button>
            <button
              onClick={handleContinue}
              className="flex-1 py-4 bg-white text-gray-700 font-bold rounded-xl border-2 border-orange-300 hover:bg-orange-50 transition-all"
            >
              Book More Pujas
            </button>
          </div>
          
          <div className="text-center text-sm text-gray-500 mt-5">
            <p>Need help? Contact our support team at support@33kotidham.com or +91 9876543210</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CustomCheckoutSuccessPage;