'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import CountdownTimer from '@/components/CountdownTimer';

// Define the benefit interface
export interface BackendPujaBenefit {
  id: number;
  benefit_title: string;
  benefit_description: string;
  puja_id: number;
  created_at: string;
}

interface UnifiedPujaCardProps {
  id: string;
  image: string;
  title: string;
  temple: string;
  description: string;
  date: string;
  time?: string; // Add time prop
  isNew?: boolean;
  variant?: 'home' | 'listing';
  benefits?: BackendPujaBenefit[];
  created_at?: string; // Add created_at for launch date/time
}

const UnifiedPujaCard: React.FC<UnifiedPujaCardProps> = ({ 
  id,
  image, 
  title, 
  temple, 
  description, 
  date, 
  time, // Destructure time prop
  isNew = false,
  variant = 'home',
  benefits = [],
  created_at
}) => {
  // Debug log to see if time prop is being passed
  console.log('UnifiedPujaCard props:', { id, title, time, variant });
  // Function to format date with day of the week
  const formatDateWithDay = (dateString: string) => {
    try {
      const dateObj = new Date(dateString);
      const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      const dayName = dayNames[dateObj.getDay()];
      const formattedDate = dateObj.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
      });
      return `${dayName}, ${formattedDate}`;
    } catch (error) {
      // If there's an error parsing the date, return the original date string
      return dateString;
    }
  };

  // Function to generate WhatsApp share URL
  const getWhatsAppShareUrl = () => {
    try {
      const pujaUrl = `https://33kotidham.in/puja/${id}`;
      const message = `Check out this puja: ${title} at ${temple}. More details at: ${pujaUrl}`;
      return `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`;
    } catch (error) {
      console.error('Error generating WhatsApp share URL:', error);
      return '#';
    }
  };

  // Function to handle WhatsApp share click
  const handleWhatsAppShare = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
    e.preventDefault();
    const shareUrl = getWhatsAppShareUrl();
    
    if (shareUrl !== '#' && typeof window !== 'undefined') {
      // Try to open in a new window/tab
      const newWindow = window.open(shareUrl, '_blank');
      
      // If popup blocking prevents opening, try alternative approach
      if (!newWindow) {
        window.location.href = shareUrl;
      }
    }
  };

  if (variant === 'listing') {
    return (
      <div className="group relative bg-white/90 backdrop-blur-lg rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-700 border border-white/50 overflow-hidden transform hover:scale-105 hover:-translate-y-2">
        {/* Image Section */}
        <div className="relative h-72 overflow-hidden">
          <Image
            src={image || '/images/placeholder.jpg'}
            alt={title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-700"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = '/images/placeholder.jpg';
            }}
          />
          
          {/* Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          {/* Badges */}
          <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
            {isNew && (
              <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg animate-pulse">
                ⭐ New
              </span>
            )}
            <span className="text-xs font-bold px-4 py-2 rounded-full shadow-lg backdrop-blur-sm bg-gray-100/90 text-gray-800 border border-gray-300">
              Puja
            </span>
          </div>
          
          {/* WhatsApp Share Icon - Top Right */}
          <a 
            href={getWhatsAppShareUrl()} 
            onClick={handleWhatsAppShare}
            target="_blank" 
            rel="noopener noreferrer"
            className="absolute top-4 right-4 bg-green-500 text-white rounded-full p-2 shadow-lg hover:bg-green-600 transition-all duration-200 z-10 flex items-center gap-1 group/whatsapp"
          >
            <svg className="w-5 h-5 group-hover/whatsapp:opacity-0 transition-opacity duration-200" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.480-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.297-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.361.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/whatsapp:opacity-100 transition-opacity duration-200 text-sm font-medium">
              Share
            </span>
          </a>
        </div>
        
        {/* Content */}
        <div className="p-8">
          <h3 className="text-2xl font-bold text-gray-800 font-['Philosopher'] mb-3 group-hover:text-orange-700 transition-colors duration-300">
            {title}
          </h3>
          <p className="text-orange-600 font-bold mb-4 text-lg">
            {temple}
          </p>
          
          {/* Temple Info */}
          <div className="flex items-start gap-3 text-gray-600 mb-4 p-3 bg-gradient-to-r from-orange-50/50 to-rose-50/50 rounded-xl border border-orange-100/50">
            <svg className="w-5 h-5 mt-1 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="text-sm font-medium">{temple}</span>
          </div>
          
          {/* Date and Price Section */}
          <div className="flex items-center justify-between bg-gradient-to-r from-orange-50 to-rose-50 p-4 rounded-2xl border border-orange-200/50">
            <div className="flex items-center gap-2 text-gray-700">
              <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="text-sm font-medium">{formatDateWithDay(date)}</span>
            </div>
            <div className="text-right">
              <div className="text-xs text-gray-500 mb-1">Starting from</div>
              <div className="text-xl font-bold text-orange-600">₹ {description.length * 100}</div>
            </div>
          </div>
          
          {/* Button */}
          <div className="mt-6">
            <Link href={`/puja/${id}`}>
              <Button
                variant="primary"
                className="w-full bg-gradient-to-r from-orange-500 to-rose-500 text-white font-bold py-3 px-6 rounded-2xl hover:from-orange-600 hover:to-rose-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl relative overflow-hidden"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                  Book This Puja
                </span>
              </Button>
            </Link>
          </div>
        </div>
        
        {/* Glow Effects */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-orange-400/20 to-rose-400/20 opacity-0 group-hover:opacity-100 blur-2xl transition-all duration-700 -z-10 scale-90 group-hover:scale-100"></div>
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-orange-300/10 to-rose-300/10 opacity-0 group-hover:opacity-100 blur-3xl transition-all duration-1000 -z-20 scale-75 group-hover:scale-110"></div>
      </div>
    );
  }

  // Home variant (simpler design)
  // Create a comma-separated list of benefit titles
  const benefitsText = benefits && benefits.length > 0 
    ? benefits.map(b => b.benefit_title).join(', ') 
    : '';

  return (
    <div className="flex flex-col justify-start items-center w-full max-w-[420px] border border-[#e7e7e7] rounded-[6px] bg-white hover:shadow-lg transition-shadow duration-300">
      {/* Image Section - Clickable */}
      <Link href={`/puja/${id}`} className="w-full">
        <div className="relative w-full cursor-pointer">
          <div className="relative w-full h-[133px] sm:h-[160px] md:h-[204px]">
            <Image
              src={image || '/placeholder.jpg'}
              alt={title}
              fill
              className="object-cover rounded-t-[6px] hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              unoptimized={true}
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = '/placeholder.jpg';
              }}
            />
            <div className="absolute top-[11px] sm:top-[16px] md:top-[22px] left-[11px] sm:left-[16px] md:top-[22px] flex flex-col gap-1 z-10">
              {isNew && (
                <span className="text-sm sm:text-base md:text-[16px] font-normal leading-[16px] sm:leading-[18px] md:leading-[20px] text-center capitalize text-white bg-[#f37335] rounded-[4px] px-[10px] sm:px-[12px] md:px-[14px] py-[1px] sm:py-[1.5px] md:py-[2px] font-['Lato']">
                  new
                </span>
              )}
              {/* Add countdown timer if time is provided - positioned at top left */}
              {time && (
                <div translate="no">
                  <CountdownTimer date={date} time={time} />
                </div>
              )}
            </div>
            {/* WhatsApp Share Icon - Top Right */}
            <button 
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleWhatsAppShare(e);
                window.open(getWhatsAppShareUrl(), '_blank', 'noopener,noreferrer');
              }}
              className="absolute top-[11px] sm:top-[16px] md:top-[22px] right-[11px] sm:right-[16px] md:right-[22px] bg-green-500 text-white rounded-full p-1.5 sm:p-2 shadow-lg hover:bg-green-600 transition-all duration-200 z-10 flex items-center gap-1 group/whatsapp"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5 group-hover/whatsapp:opacity-0 transition-opacity duration-200" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.480-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.297-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.361.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/whatsapp:opacity-100 transition-opacity duration-200 text-xs sm:text-sm font-medium">
                Share
              </span>
            </button>
          </div>
        </div>
      </Link>
      
      {/* Content Section - Clickable */}
      <Link href={`/puja/${id}`} className="w-full">
        <div className="flex flex-col gap-[3px] sm:gap-[4px] md:gap-[10px] justify-start items-start w-full px-[10px] sm:px-[12px] md:px-[14px] py-[8px] sm:py-[9px] md:py-[10px] cursor-pointer hover:bg-gray-50 transition-colors duration-200">
          <div className="flex justify-start items-center w-full">
            <h3 className="text-[18px] sm:text-[21px] md:text-[24px] font-bold leading-[20px] sm:leading-[24px] md:leading-[27px] text-left text-[#111111] font-['Philosopher'] mt-[2px] sm:mt-[3px] md:mt-[4px] hover:text-orange-600 transition-colors duration-200">
              {title}
            </h3>
          </div>
          <p className="text-[12px] sm:text-[13px] md:text-[14px] font-normal leading-[14px] sm:leading-[15px] md:leading-[17px] text-left text-[#111111] font-['Lato']">
            <svg className="inline w-4 h-4 text-orange-500 mr-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/>
            </svg> {temple}
          </p>
          <div className="flex justify-start items-center w-full bg-[#fff3ee] px-[6px] sm:px-[7px] md:px-[8px]">
            <p className="text-[10px] sm:text-[11px] md:text-[12px] font-normal leading-[14px] sm:leading-[16px] md:leading-[18px] text-center text-[#111111] font-['Lato'] w-full py-1">
              {/* Display benefits in the description area */}
              {benefitsText || `${description.split('. ')[0]}. ${description.split('. ')[1]}.`}
            </p>
          </div>
        </div>
      </Link>
      
      {/* Bottom Section with Date and Button */}
      <div className="flex justify-between items-center w-full px-[10px] sm:px-[12px] md:px-[14px] py-[8px] sm:py-[9px] md:py-[10px] border-b border-[#33333319]">
        <div className="flex flex-col">
          <span className="text-[13px] sm:text-[14px] md:text-[16px] font-normal leading-[14px] sm:leading-[15px] md:leading-[17px] text-left text-[#111111] font-['Lato'] self-end mb-[3px] sm:mb-[4px] md:mb-[6px]">
            <svg className="inline w-4 h-4 text-orange-500 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg> {formatDateWithDay(date)}
          </span>
        </div>
        <Link href={`/puja/${id}`}>
          <Button
            variant="primary"
            size="sm"
            className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-sm font-bold px-6 py-2 sm:px-6 sm:py-2 md:px-6 md:py-2 rounded-full flex items-center gap-2 shadow-lg transform hover:scale-105 transition-transform duration-200"
          >
            Participate Now
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default UnifiedPujaCard;