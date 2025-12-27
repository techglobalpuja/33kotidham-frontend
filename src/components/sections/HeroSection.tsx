'use client';
import React from 'react';
import Header from '@/components/layout/Header';
import HeroCarousel from '@/components/carousel/HeroCarousel';

const HeroSection: React.FC = () => {
  const heroSlides = [
    {
      id: 1,
      desktopImage: '/images/home/hero1/desktop/hero_slide_1.webp',
      mobileImage: '/images/home/hero1/mobile/hero_slide_1_mobile.webp',
      alt: 'Maa Baglamukhi Puja'
    },
    {
      id: 2,
      desktopImage: '/images/home/hero2/desktop/hero_slide_2.webp',
      mobileImage: '/images/home/hero2/mobile/hero_slide_2_mobile.webp',
      alt: 'Kundali Dosh Nivaran Shani Puja'
    },
    {
      id: 3,
      desktopImage: '/images/home/hero3/desktop/hero_slide_3 (2).webp',
      mobileImage: '/images/home/hero3/mobile/hero_slide_3_mobile.webp',
      alt: 'Rahu-Ketu Shanti Puja'
    }
  ];

  return (
    <section className="w-full h-[60vh] md:h-screen relative overflow-hidden">
      <HeroCarousel slides={heroSlides} />
      <div className="absolute top-0 left-0 right-0 z-20">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Header />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;