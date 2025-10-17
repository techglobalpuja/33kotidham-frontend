'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Header from '@/components/layout/Header';

const CustomCheckoutPage: React.FC = () => {
    const params = useParams();
    const router = useRouter();
    const pujaId = params.id as string;

    // Mock puja data
    const pujaData = {
        id: pujaId,
        title: 'Navagraha Shanti Puja',
        temple: 'Shri Mahakaleshwar Temple, Ujjain',
        date: 'October 15, 2025',
        image: '/placeholder.jpg',
        price: 5000,
        description: 'A powerful ritual to pacify the negative influences of the nine planets and bring harmony, peace, and prosperity to your life.'
    };

    // Chadhwas data
    const chadhwas = [
        {
            id: 1,
            name: 'Flowers',
            description: 'Fresh flower bouquet for divine offering',
            price: 200,
            image: '/images/chadhwas/flowers.jpg',
            icon: '🌸',
            selected: true
        },
        {
            id: 2,
            name: 'Incense Sticks',
            description: 'Premium sandalwood incense sticks',
            price: 150,
            image: '/images/chadhwas/incense.jpg',
            icon: '�',
            selected: true
        },
        {
            id: 3,
            name: 'Brass Lamp',
            description: 'Traditional brass diya with oil',
            price: 300,
            image: '/images/chadhwas/lamp.jpg',
            icon: '🪔',
            selected: true
        },
        {
            id: 4,
            name: 'Sweets',
            description: 'Assorted traditional sweets',
            price: 250,
            image: '/images/chadhwas/sweets.jpg',
            icon: '🍬',
            selected: false
        },
        {
            id: 5,
            name: 'Coconut',
            description: 'Fresh coconut for sacred ritual',
            price: 100,
            image: '/images/chadhwas/coconut.jpg',
            icon: '🥥',
            selected: true
        },
        {
            id: 6,
            name: 'Banana',
            description: 'Fresh banana for divine offering',
            price: 50,
            image: '/images/chadhwas/banana.jpg',
            icon: '🍌',
            selected: false
        },
        {
            id: 7,
            name: 'Rice',
            description: 'Sacred rice for rituals',
            price: 150,
            image: '/images/chadhwas/rice.jpg',
            icon: '🍚',
            selected: false
        },
        {
            id: 8,
            name: 'Milk',
            description: 'Fresh milk for offerings',
            price: 120,
            image: '/images/chadhwas/milk.jpg',
            icon: '🥛',
            selected: false
        }
    ];

    // Form states
    const [formData, setFormData] = useState({
        fullName: '',
        whatsappNumber: '',
        gotra: '',
        dontKnowGotra: false,
        dakshina: ''
    });

    const [selectedChadhwas, setSelectedChadhwas] = useState(
        chadhwas.filter(chadhwa => chadhwa.selected)
    );
    const [isProcessing, setIsProcessing] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;

        if (type === 'checkbox' && name === 'dontKnowGotra') {
            setFormData(prev => ({
                ...prev,
                dontKnowGotra: checked,
                gotra: checked ? '' : prev.gotra
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const toggleChadhwa = (chadhwa: typeof chadhwas[0]) => {
        setSelectedChadhwas(prev => {
            const isSelected = prev.some(c => c.id === chadhwa.id);
            if (isSelected) {
                return prev.filter(c => c.id !== chadhwa.id);
            } else {
                return [...prev, chadhwa];
            }
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsProcessing(true);
        // Simulate processing
        setTimeout(() => {
            router.push(`/puja/${pujaId}/checkout/custom/success`);
        }, 1500);
    };

    // Calculate total
    const chadhwaTotal = selectedChadhwas.reduce((sum, chadhwa) => sum + chadhwa.price, 0);
    const serviceFee = 500;
    const gst = (pujaData.price + chadhwaTotal + serviceFee) * 0.18;
    const totalAmount = pujaData.price + chadhwaTotal + serviceFee + gst;

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
            <Header />

            <main className="pt-24 pb-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-10">
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 font-['Philosopher'] mb-3">Complete Your Puja Booking</h1>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Add sacred offerings and complete your puja reservation
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Left Column - Puja Details */}
                        <div className="space-y-8">
                            <div className="bg-white rounded-2xl shadow-lg p-6 border border-orange-100">
                                <div className="flex items-center justify-between mb-5">
                                    <h2 className="text-xl font-bold text-gray-900 font-['Philosopher']">Puja Details</h2>
                                    <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                                        1
                                    </div>
                                </div>

                                <div className="flex flex-col sm:flex-row gap-6">
                                    <div className="relative w-32 h-32 rounded-xl overflow-hidden shadow-md flex-shrink-0">
                                        <Image
                                            src={pujaData.image}
                                            alt={pujaData.title}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>

                                    <div className="flex-1">
                                        <h3 className="text-xl font-bold text-gray-900 font-['Philosopher'] mb-2">{pujaData.title}</h3>
                                        <p className="text-orange-600 font-medium mb-2">{pujaData.temple}</p>
                                        <p className="text-gray-600 text-sm mb-4">{pujaData.description}</p>

                                        <div className="flex flex-wrap gap-2">
                                            <div className="flex items-center gap-1 bg-orange-50 px-3 py-1 rounded-full">
                                                <svg className="w-4 h-4 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                </svg>
                                                <span className="text-sm">{pujaData.date}</span>
                                            </div>
                                            <div className="flex items-center gap-1 bg-orange-50 px-3 py-1 rounded-full">
                                                <svg className="w-4 h-4 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                                <span className="text-sm">3:00 PM</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Form Section */}
                            <div className="bg-white rounded-2xl shadow-lg p-6 border border-orange-100">
                                <div className="flex items-center justify-between mb-5">
                                    <h2 className="text-xl font-bold text-gray-900 font-['Philosopher']">Personal Details</h2>
                                    <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                                        2
                                    </div>
                                </div>

                                <form onSubmit={handleSubmit} className="space-y-5">
                                    <div>
                                        <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                                            Full Name *
                                        </label>
                                        <input
                                            type="text"
                                            id="fullName"
                                            name="fullName"
                                            value={formData.fullName}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                                            placeholder="Enter your full name"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="whatsappNumber" className="block text-sm font-medium text-gray-700 mb-1">
                                            WhatsApp Number *
                                        </label>
                                        <input
                                            type="tel"
                                            id="whatsappNumber"
                                            name="whatsappNumber"
                                            value={formData.whatsappNumber}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                                            placeholder="Enter your WhatsApp number"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="gotra" className="block text-sm font-medium text-gray-700 mb-1">
                                            Gotra (Optional)
                                        </label>
                                        <input
                                            type="text"
                                            id="gotra"
                                            name="gotra"
                                            value={formData.dontKnowGotra ? '' : formData.gotra}
                                            onChange={handleInputChange}
                                            disabled={formData.dontKnowGotra}
                                            className={`w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all ${formData.dontKnowGotra ? 'bg-gray-100 cursor-not-allowed' : ''
                                                }`}
                                            placeholder="Enter your gotra"
                                        />
                                        <div className="flex items-center mt-2">
                                            <input
                                                type="checkbox"
                                                id="dontKnowGotra"
                                                name="dontKnowGotra"
                                                checked={formData.dontKnowGotra}
                                                onChange={handleInputChange}
                                                className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                                            />
                                            <label htmlFor="dontKnowGotra" className="ml-2 text-sm text-gray-600">
                                                I don't know my Gotra
                                            </label>
                                        </div>
                                    </div>

                                    <div className="pt-4">
                                        <button
                                            type="submit"
                                            disabled={isProcessing}
                                            className={`w-full py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all shadow-lg flex items-center justify-center ${isProcessing ? 'opacity-75 cursor-not-allowed' : ''
                                                }`}
                                        >
                                            {isProcessing ? (
                                                <>
                                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                    </svg>
                                                    Processing Payment...
                                                </>
                                            ) : (
                                                `Proceed to Pay ₹${totalAmount.toLocaleString()}`
                                            )}
                                        </button>

                                        <button
                                            type="button"
                                            onClick={() => router.back()}
                                            className="w-full mt-3 py-3 bg-gray-100 text-gray-700 font-bold rounded-xl hover:bg-gray-200 transition-all"
                                        >
                                            ← Back to Puja Details
                                        </button>
                                    </div>
                                </form>

                                {/* Selected Plan Section */}
                                {/* <div className="mt-8 pt-6 border-t border-gray-200">
                                    <h3 className="text-xl font-bold text-gray-900 font-['Philosopher'] mb-4">Selected Puja Plan</h3>
                                    <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-2xl p-5 border border-orange-100">
                                        <div className="flex items-center gap-4">
                                            <div className="text-3xl">🧘</div>
                                            <div className="flex-1">
                                                <h4 className="font-bold text-gray-900 text-lg">Navagraha Shanti Puja</h4>
                                                <p className="text-orange-600 font-bold text-xl">₹{pujaData.price.toLocaleString()}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div> */}
                            </div>
                            <div className="bg-white rounded-2xl shadow-lg p-6 border border-orange-100">
                                <div className="flex items-center justify-between mb-5">
                                    <h2 className="text-xl font-bold text-gray-900 font-['Philosopher']">Selected Puja Plan</h2>
                                    <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                                        3
                                    </div>
                                </div>
                                <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-2xl p-5 border border-orange-100">
                                    <div className="flex items-center gap-4">
                                        <div className="text-3xl">🧘</div>
                                        <div className="flex-1">
                                            <h4 className="font-bold text-gray-900 text-lg">Navagraha Shanti Puja</h4>
                                            <p className="text-orange-600 font-bold text-xl">₹{pujaData.price.toLocaleString()}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-2xl shadow-lg p-6 border border-green-100">
                                <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                                    <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    What to Expect
                                </h3>
                                <ul className="space-y-2 text-sm text-gray-600">
                                    <li className="flex items-start gap-2">
                                        <svg className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span>Confirmation message on WhatsApp within 15 minutes</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <svg className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span>Puja performed by qualified priests at {pujaData.temple}</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <svg className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span>Prasad delivery within 7-10 business days</span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* Right Column - Chadhwas Selection */}
                        <div className="space-y-8">
                            <div className="bg-white rounded-2xl shadow-lg p-6 border border-orange-100">
                                <div className="flex items-center justify-between mb-5">
                                    <h2 className="text-xl font-bold text-gray-900 font-['Philosopher']">Sacred Offerings (Chadhwas)</h2>
                                    <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                                        4
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                                    {chadhwas.map((chadhwa) => (
                                        <div
                                            key={chadhwa.id}
                                            className={`border-2 rounded-xl p-4 cursor-pointer transition-all duration-200 ${selectedChadhwas.some(c => c.id === chadhwa.id)
                                                    ? 'border-orange-500 bg-orange-50 ring-2 ring-orange-200'
                                                    : 'border-gray-200 hover:border-orange-300'
                                                }`}
                                            onClick={() => toggleChadhwa(chadhwa)}
                                        >
                                            <div className="flex items-start gap-4">
                                                <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                                                    <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-full flex items-center justify-center">
                                                        <span className="text-2xl">{chadhwa.icon}</span>
                                                    </div>
                                                </div>
                                                <div className="flex-1">
                                                    <h4 className="font-bold text-gray-900">{chadhwa.name}</h4>
                                                    <p className="text-xs text-gray-600 mt-1">{chadhwa.description}</p>
                                                    <div className="flex items-center justify-between mt-2">
                                                        <span className="text-orange-600 font-bold">₹{chadhwa.price}</span>
                                                        {selectedChadhwas.some(c => c.id === chadhwa.id) ? (
                                                            <div className="w-5 h-5 bg-orange-500 rounded-full flex items-center justify-center">
                                                                <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                                </svg>
                                                            </div>
                                                        ) : (
                                                            <div className="w-5 h-5 border-2 border-gray-300 rounded-full"></div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Dakshina to Pandit */}
                                <div className="mt-6 pt-4 border-t border-orange-200">
                                    <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                                        <span className="text-orange-500">💰</span>
                                        Dakshina to Pandit (Optional)
                                    </h4>
                                    <div className="bg-orange-50 rounded-lg p-4">
                                        <div className="flex items-center gap-3">
                                            <div className="flex-1">
                                                <label htmlFor="dakshina" className="block text-sm font-medium text-gray-700 mb-1">
                                                    Amount (₹)
                                                </label>
                                                <input
                                                    type="number"
                                                    id="dakshina"
                                                    name="dakshina"
                                                    value={formData.dakshina}
                                                    onChange={handleInputChange}
                                                    min="0"
                                                    placeholder="Enter amount"
                                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                                                />
                                            </div>
                                            <div className="text-right">
                                                <p className="text-sm text-gray-600">Additional</p>
                                                <p className="text-lg font-bold text-orange-600">
                                                    ₹{formData.dakshina ? parseInt(formData.dakshina).toLocaleString() : '0'}
                                                </p>
                                            </div>
                                        </div>
                                        <p className="text-xs text-gray-500 mt-2">
                                            Your generous contribution to the priest for performing the puja
                                        </p>
                                    </div>
                                </div>

                                <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl p-5">
                                    <h3 className="font-bold text-gray-900 mb-4">Order Summary</h3>

                                    <div className="space-y-3 mb-4">
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Puja Price</span>
                                            <span className="font-medium">₹{pujaData.price.toLocaleString()}</span>
                                        </div>

                                        {selectedChadhwas.map((chadhwa) => (
                                            <div key={chadhwa.id} className="flex justify-between">
                                                <span className="text-gray-600">{chadhwa.name}</span>
                                                <span className="font-medium">₹{chadhwa.price.toLocaleString()}</span>
                                            </div>
                                        ))}

                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Service Fee</span>
                                            <span className="font-medium">₹{serviceFee.toLocaleString()}</span>
                                        </div>

                                        <div className="flex justify-between">
                                            <span className="text-gray-600">GST (18%)</span>
                                            <span className="font-medium">₹{gst.toFixed(0)}</span>
                                        </div>

                                        {formData.dakshina && parseInt(formData.dakshina) > 0 && (
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">Dakshina to Pandit</span>
                                                <span className="font-medium">₹{parseInt(formData.dakshina).toLocaleString()}</span>
                                            </div>
                                        )}

                                        <div className="flex justify-between pt-3 border-t border-gray-200">
                                            <span className="font-bold">Total Amount</span>
                                            <span className="font-bold text-orange-600">
                                                ₹{(
                                                    pujaData.price +
                                                    chadhwaTotal +
                                                    serviceFee +
                                                    gst +
                                                    (formData.dakshina ? parseInt(formData.dakshina) : 0)
                                                ).toLocaleString()}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="text-xs text-gray-500 mt-4">
                                        <p>All offerings are personally presented by qualified priests during the puja ceremony.</p>
                                    </div>
                                </div>
                            </div>


                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default CustomCheckoutPage;