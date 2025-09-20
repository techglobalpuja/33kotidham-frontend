'use client';
import React from 'react';
import Image from 'next/image';

interface TestimonialProps {
  avatar: string;
  name: string;
  role: string;
  rating: number;
  testimonial: string;
}

const TestimonialCard: React.FC<TestimonialProps> = ({ 
  avatar, 
  name, 
  role, 
  rating, 
  testimonial 
}) => (
  <div className="flex flex-col gap-6 justify-start items-start w-full max-w-[400px] border border-orange-200 rounded-2xl bg-orange-50 px-8 py-8 relative shadow-sm hover:shadow-lg transition-shadow duration-300">
    
    {/* Quote Icon */}
    <div className="absolute top-6 right-6 opacity-40">
      <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M15 60C11 60 7.5 58.9 4.5 56.7C1.5 54.5 0 51.5 0 47.5C0 40 2 33.5 6 28.5C10 23.5 15.1 20 22 19V28C18 28.7 15 30.5 13 33.5C11 36.5 10 40 10 44H15C17.5 44 19.5 45 21 47C22.5 49 23 51.5 23 54C23 56.5 22.5 58.5 21 60C19.5 61.5 17.5 62 15 62V60ZM52 60C48 60 44.5 58.9 41.5 56.7C38.5 54.5 37 51.5 37 47.5C37 40 39 33.5 43 28.5C47 23.5 52.1 20 59 19V28C55 28.7 52 30.5 50 33.5C48 36.5 47 40 47 44H52C54.5 44 56.5 45 58 47C59.5 49 60 51.5 60 54C60 56.5 59.5 58.5 58 60C56.5 61.5 54.5 62 52 62V60Z" fill="#FB923C"/>
      </svg>
    </div>
    
    {/* User Info */}
    <div className="flex gap-4 justify-start items-center w-full">
      <Image
        src={avatar}
        alt={name}
        width={60}
        height={60}
        className="w-[60px] h-[60px] rounded-full object-cover"
      />
      <div className="flex flex-col justify-start items-start">
        <h3 className="text-lg font-bold text-gray-900 font-['Philosopher']">
          {name}
        </h3>
        <p className="text-sm text-gray-600 font-['Work_Sans']">
          {role}
        </p>
      </div>
    </div>
    
    {/* --- FIX: Changed diamond ends to circles to match the screenshot --- */}
    <div className="flex gap-2 items-center w-full">
      <div className="w-2.5 h-2.5 bg-orange-300 rounded-full"></div>
      <div className="flex-1 h-[1px] bg-orange-300"></div>
      <div className="w-2.5 h-2.5 bg-orange-300 rounded-full"></div>
    </div>
    
    {/* Star Rating */}
    <div className="flex gap-1">
      {[...Array(5)].map((_, i) => (
        <svg key={i} width="18" height="18" viewBox="0 0 24 24" fill="#FB923C" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
        
        
      ))}
    </div>
    
    {/* Testimonial Text */}
    <p className="text-base leading-relaxed text-gray-700 font-['Work_Sans']">
      {testimonial}
    </p>
  </div>
);

export default TestimonialCard;