'use client';

import React from 'react';
import GlobalFooter from '@/components/layout/GlobalFooter';
import HeroSection from '@/components/sections/HeroSection';
import TrustSection from '@/components/sections/TrustSection';
import PujaSection from '@/components/sections/PujaSection';
import HoroscopeSection from '@/components/sections/HoroscopeSection';
import ProcessSection from '@/components/sections/ProcessSection';
import VideoSection from '@/components/sections/VideoSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
// import ArticlesSection from '@/components/sections/ArticlesSection';
import FeaturedBlogsSection from '@/components/sections/FeaturedBlogsSection';
// import DownloadAppSection from '@/components/sections/DownloadAppSection';
import { HoroscopeCard, ProcessStep, Article } from '@/types';
import { getHoroscopeCards } from '@/utils/horoscope';
// import { FaTemple, FaCalendarAlt } from 'react-icons/fa';

// Define the Testimonial type to match TestimonialsSection expectations
interface TestimonialProps {
  avatar: string;
  name: string;
  role: string;
  rating: number; // This should be a number, not a string
  testimonial: string;
}

export default function HomePage() {
  const horoscopeCards: HoroscopeCard[] = getHoroscopeCards();

  const processSteps: ProcessStep[] = [
    {
      id: '1',
      stepNumber: "1st",
      title: "Journey into the Mysteries of the Cosmos",
      location: "Choose your desired puja or consultation, and share your details to personalize your experience.",
      datetime: "December 29 @ 10:00 am - December 29 @ 4:30 pm"
    },
    {
      id: '2',
      stepNumber: "2nd",
      title: "Shaping Wisdom, Tailored for You",
      location: "Our expert pandits perform your puja as per Vedic procedure, invoking the blessings of the deities on your behalf.",
      datetime: "December 29 @ 10:00 am - December 29 @ 4:30 pm",
      isHighlighted: true
    },
    {
      id: '3',
      stepNumber: "3rd",
      title: "Connect & Witness the Divine",
      location: "Join the ritual live or receive photos/videos of your puja. Experience the sanctity from wherever you are.",
      datetime: "December 29 @ 10:00 am - December 29 @ 4:30 pm"
    },
    {
      id: '4',
      stepNumber: "4th",
      title: "Receive Blessings & Guidance",
      location: "Get prasad and sacred items delivered to your doorstep, along with insights or remedies from our experts.",
      datetime: "December 29 @ 10:00 am - December 29 @ 4:30 pm"
    }
  ];

  const testimonials: TestimonialProps[] = [
    {
      avatar: "/images/img_ellipse_5.png",
      name: "Vikesh Sharma",
      role: "Delhi, India",
      rating: 5, // Changed from string to number
      testimonial: "I joined the Lakshmi Puja through 33KotiDham and could truly feel the divine presence at home. The live experience was seamless and filled with peace."
    },
    {
      avatar: "/images/img_ellipse_5_86x86.png",
      name: "P.K. Chauhan",
      role: "M.P, India",
      rating: 4, // Changed from string to number
      testimonial: "My life changed after I participated in Baglamukhi havan organized by 33KotiDham. I also got Baglamukhi yantra which we keep in mandir area in our house."
    },
    {
      avatar: "/images/img_ellipse_5_1.png",
      name: "Varsha Pandey",
      role: "Delhi, India",
      rating: 5, // Changed from string to number
      testimonial: "The Saraswati Puja helped my daughter excel in her studies. She topped her class and got admission to her dream college. Grateful to the divine!"
    }
  ];

  const articles: Article[] = [
    {
      id: '1',
      image: "/images/img_blog1_jpg.png",
      date: "July 29, 2020",
      author: "By - Author",
      comments: "0 comments",
      title: "Consectetur adipiscing elit sedeius mod tempor incididunt ut labore.",
      excerpt: "Consectetur adipiscing elit, sed desdo eiusmod tempor incididuesdeentiut labore etesde doloesire esdessdes magna aliquapspendisse and the gravida."
    },
    {
      id: '2',
      image: "/images/img_blog1_jpg.png",
      date: "July 29, 2020",
      author: "By - Author",
      comments: "0 comments",
      title: "Consectetur adipiscing elit sedeius mod tempor incididunt ut labore.",
      excerpt: "Consectetur adipiscing elit, sed desdo eiusmod tempor incididuesdeentiut labore etesde doloesire esdessdes magna aliquapspendisse and the gravida."
    },
    {
      id: '3',
      image: "/images/img_blog2_jpg.png",
      date: "July 29, 2020",
      author: "By - Author",
      comments: "0 comments",
      title: "Consectetur adipiscing elit sedeius mod tempor incididunt ut labore.",
      excerpt: "Consectetur adipiscing elit, sed desdo eiusmod tempor incididuesdeentiut labore etesde doloesire esdessdes magna aliquapspendisse and the gravida."
    },
    {
      id: '4',
      image: "/images/img_blog3_jpg.png",
      date: "July 29, 2020",
      author: "By - Author",
      comments: "0 comments",
      title: "Consectetur adipiscing elit sedeius mod tempor incididunt ut labore.",
      excerpt: "Consectetur adipiscing elit, sed desdo eiusmod tempor incididuesdeentiut labore etesde doloesire esdessdes magna aliquapspendisse and the gravida."
    }
  ];

  return (
    <div className="flex flex-col justify-start items-center w-full bg-white overflow-x-hidden">
      <HeroSection />
      <TrustSection />
      <PujaSection />
      <HoroscopeSection horoscopeCards={horoscopeCards} />
      <ProcessSection processSteps={processSteps} />
      <VideoSection />
      <TestimonialsSection testimonials={testimonials} />
      <FeaturedBlogsSection />
      {/* <ArticlesSection articles={articles} /> */}
      {/* <DownloadAppSection /> */}
      <GlobalFooter />
    </div>
  );
}