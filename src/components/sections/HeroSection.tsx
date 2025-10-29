'use client';
import React from 'react';
import Header from '../../components/layout/Header';
import HeroCarousel from '../carousel/HeroCarousel';

const HeroSection: React.FC = () => {
  const heroSlides = [
    {
      id: 1,
      desktopImage: '/images/home/hero1/desktop/2024-11-05T08_05_37.142Z-Panchmukhi Hanuman_Website.png',
      mobileImage: '/images/home/hero1/mobile/2024-11-05T08_05_34.596Z-Panchmukhi Hanuman_Responsive.png',
      alt: 'Panchmukhi Hanuman Puja'
    },
    {
      id: 2,
      desktopImage: '/images/home/hero2/desktop/2024-10-24T13_46_40.726Z-Sarva Karya Siddhi Puja web.png',
      mobileImage: '/images/home/hero2/mobile/2024-10-24T13_46_34.486Z-Baglamukhi Responsive.png',
      alt: 'Sarva Karya Siddhi Puja'
    },
    {
      id: 3,
      desktopImage: '/images/home/hero3/desktop/2024-10-24T13_17_20.561Z-Rahu-Ketu Shanti Puja_Puja web 1.png',
      mobileImage: '/images/home/hero3/mobile/2024-10-24T13_17_14.434Z-rahu ketu mobile response.png',
      alt: 'Rahu-Ketu Shanti Puja'
    }
  ];

  return (
    <section className="w-full md:h-screen h-auto relative overflow-hidden">
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