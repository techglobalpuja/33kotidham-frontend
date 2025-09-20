'use client';
import React from 'react';
import Image from 'next/image';
import Header from '../../components/layout/Header';

const HeroSection: React.FC = () => {
  const handleBookNowClick = () => {
    const pujaSection = document.getElementById('puja-section');
    if (pujaSection) {
      pujaSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  return (
  <section className="w-full min-h-screen bg-gradient-to-r from-orange-100/20 to-orange-200/40 relative overflow-hidden">
    <div 
      className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-90"
      style={{ backgroundImage: "url('/images/img_image.png')" }}
    />
    <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"> 
      <Header />
      <div className="flex flex-col min-h-[calc(100vh-120px)] sm:min-h-[calc(100vh-100px)]">
        <div className="flex-1 flex items-center pt-16 sm:pt-16 lg:pt-16">
          <div className="w-full max-w-2xl">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight text-gray-900 font-['Philosopher'] mb-4 sm:mb-6">
              Unlock the Power of Your Stars, Illuminate Your Path.
            </h1>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-700 font-['Lato'] mb-6 sm:mb-8 max-w-xl leading-relaxed">
              Cras sed rhoncus risus, non accumsan tortor. Maecenas feugiat ipsum eu ornre uam. Fusce blandit elementum auctor. Nam pulvinar lectus in efficitur phareta.
            </p>
            <button 
              onClick={handleBookNowClick}
              className="inline-flex items-center gap-2 sm:gap-3 bg-gradient-to-r from-orange-400 to-orange-500 text-white font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-full hover:shadow-lg transition-all duration-200 font-['Work_Sans'] uppercase text-xs sm:text-sm cursor-pointer hover:scale-105"
            >
              <Image
                src="/images/img_vector.svg"
                alt="Book Icon"
                width={14}
                height={14}
                className="w-3 h-3 sm:w-4 sm:h-4"
              />
              Book Now
              <Image
                src="/images/img_vector.svg"
                alt="Book Icon"
                width={14}
                height={14}
                className="w-3 h-3 sm:w-4 sm:h-4"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
  );
};

export default HeroSection;