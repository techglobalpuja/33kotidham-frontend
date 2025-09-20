'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import { TempleHinduOutlined, CalendarToday } from '@mui/icons-material';

interface PujaCardProps {
  id?: string;
  image: string;
  title: string;
  temple: string;
  description: string;
  date: string;
  isNew?: boolean;
  timer?: boolean;
  shareLabel?: string;
}

const PujaCard: React.FC<PujaCardProps> = ({ 
  id,
  image, 
  title, 
  temple, 
  description, 
  date, 
  isNew = false,
  timer,
  shareLabel 
}) => {
  const [timerDisplay, setTimerDisplay] = useState('00:10:30'); // Sample timer starting at 10 minutes 30 seconds

  useEffect(() => {
    let seconds = 10 * 60 + 30; // Initial seconds (10 minutes 30 seconds)
    const interval = setInterval(() => {
      seconds -= 1;
      if (seconds < 0) {
        clearInterval(interval);
        setTimerDisplay('00:00:00');
      } else {
        const hrs = Math.floor(seconds / 3600);
        const mins = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        setTimerDisplay(
          `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
        );
      }
    }, 1000);

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <div className="flex flex-col justify-start items-center w-full max-w-[420px] border border-[#e7e7e7] rounded-[6px] bg-white hover:shadow-lg transition-shadow duration-300">
      
      {/* Image Section - Clickable */}
      <Link href={id ? `/puja/${id}` : '#'} className="w-full">
        <div className="relative w-full cursor-pointer">
          <div className="relative w-full h-[133px] sm:h-[160px] md:h-[204px]">
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover rounded-t-[6px] hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
            {isNew && (
              <div className="absolute top-[11px] sm:top-[16px] md:top-[22px] left-[11px] sm:left-[16px] md:top-[22px]">
                <span className="text-sm sm:text-base md:text-[16px] font-normal leading-[16px] sm:leading-[18px] md:leading-[20px] text-center capitalize text-white bg-[#f37335] rounded-[4px] px-[10px] sm:px-[12px] md:px-[14px] py-[1px] sm:py-[1.5px] md:py-[2px] font-['Lato']">
                  new
                </span>
              </div>
            )}
            {timer && (
              <div className="absolute top-[11px] sm:top-[16px] md:top-[22px] left-[11px] sm:left-[16px] md:top-[22px]">
                <span className="text-sm sm:text-base md:text-[16px] font-normal leading-[16px] sm:leading-[18px] md:leading-[20px] text-center capitalize text-white bg-[#f37335] rounded-[4px] px-[10px] sm:px-[12px] md:px-[14px] py-[1px] sm:py-[1.5px] md:py-[2px] font-['Lato']">
                  {timerDisplay}
                </span>
              </div>
            )}
            {shareLabel && (
              <div className="absolute bottom-[11px] sm:bottom-[16px] md:bottom-[22px] right-[11px] sm:right-[16px] md:right-[22px]">
                <span className="text-[10px] sm:text-[11px] md:text-[12px] font-normal leading-[12px] sm:leading-[13px] md:leading-[15px] text-left text-white bg-[#38d059] rounded-[4px_0px_4px_0px] px-[12px] sm:px-[14px] md:px-[16px] py-[1px] sm:py-[1.5px] md:py-[2px] font-['Lato']">
                  {shareLabel}
                </span>
              </div>
            )}
          </div>
        </div>
      </Link>
      
      {/* Content Section - Clickable */}
      <Link href={id ? `/puja/${id}` : '#'} className="w-full">
        <div className="flex flex-col gap-[3px] sm:gap-[4px] md:gap-[6px] justify-start items-start w-full px-[10px] sm:px-[12px] md:px-[14px] py-[8px] sm:py-[9px] md:py-[10px] cursor-pointer hover:bg-gray-50 transition-colors duration-200">
          <div className="flex justify-start items-center w-full">
            <h3 className="text-[18px] sm:text-[21px] md:text-[24px] font-bold leading-[20px] sm:leading-[24px] md:leading-[27px] text-left text-[#111111] font-['Philosopher'] mt-[2px] sm:mt-[3px] md:mt-[4px] hover:text-orange-600 transition-colors duration-200">
              {title}
            </h3>
          </div>
          <p className="text-[12px] sm:text-[13px] md:text-[14px] font-normal leading-[14px] sm:leading-[15px] md:leading-[17px] text-left text-[#111111] font-['Lato']">
            <TempleHinduOutlined sx={{ fontSize: 16, color: '#f37335', marginRight: 0.5 }} /> {temple}
          </p>
          <div className="flex justify-start items-center w-full bg-[#fff3ee] px-[6px] sm:px-[7px] md:px-[8px] mb-[10px] sm:mb-[12px] md:mb-[14px]">
            <p className="text-[10px] sm:text-[11px] md:text-[12px] font-normal leading-[14px] sm:leading-[16px] md:leading-[18px] text-center text-[#111111] font-['Lato'] w-full py-1">
              <span>{description.split('. ')[0]}. </span>
              <span>{description.split('. ')[1]}. </span>
            </p>
          </div>
        </div>
      </Link>
      
      {/* Bottom Section with Date and Button */}
      <div className="flex justify-between items-center w-full px-[10px] sm:px-[12px] md:px-[14px] py-[8px] sm:py-[9px] md:py-[10px] border-b border-[#33333319]">
        <span className="text-[12px] sm:text-[13px] md:text-[14px] font-normal leading-[14px] sm:leading-[15px] md:leading-[17px] text-left text-[#111111] font-['Lato'] self-end mb-[3px] sm:mb-[4px] md:mb-[6px]">
          <CalendarToday sx={{ fontSize: 16, color: '#f37335', marginRight: 0.5 }} /> {date}
        </span>
        <Link href={id ? `/puja/${id}` : '#'}>
          <Button
            variant="primary"
            size="sm"
            className="text-[12px] sm:text-[13px] md:text-[14px] font-normal leading-[14px] sm:leading-[15px] md:leading-[17px] text-center capitalize text-white bg-[linear-gradient(0deg,#f4aa36_0%,_#f37335_100%)] rounded-[18px] px-[25px] sm:px-[30px] md:px-[34px] py-[6px] sm:py-[7px] md:py-[8px] font-['Lato'] hover:shadow-lg transition-shadow duration-200"
          >
            Participate Now
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default PujaCard;