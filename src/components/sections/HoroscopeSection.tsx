'use client';
import React from 'react';
import Image from 'next/image';
import HoroscopeCard from '@/components/cards/HoroscopeCard';

interface HoroscopeCardProps {
  id?: string;
  icon: string;
  name: string;
  dateRange: string;
}

interface HoroscopeSectionProps {
  horoscopeCards: HoroscopeCardProps[];
}

const HoroscopeSection: React.FC<HoroscopeSectionProps> = ({ horoscopeCards }) => (
  <section
    id="horoscope-section" // Add ID for scrolling target
    className="w-full py-[53px] sm:py-[62px] md:py-[70px] px-[42px] sm:px-[49px] md:px-[56px]"
  >
    <div className="w-full max-w-[1440px] mx-auto">
      <div className="flex justify-center items-center w-full">
        <div className="flex justify-center items-center w-full lg:w-2/3 px-[9px] sm:px-[11px] md:px-[12px] mb-[6px] sm:mb-[7px] md:mb-[8px]">
          <div className="flex flex-col justify-start items-center w-full mt-[6px] sm:mt-[7px] md:mt-[8px]">
            <h2 className="text-[36px] sm:text-[42px] md:text-[48px] font-bold leading-[41px] sm:leading-[48px] md:leading-[54px] text-center text-[#111111] font-['Philosopher'] w-auto">
              Horoscope Forecasts
            </h2>
            <Image
              src="/images/img_vector_smart_object.png"
              alt="Decorative Line"
              width={240}
              height={14}
              className="w-[144px] h-[8px] sm:w-[168px] sm:h-[10px] md:w-[192px] md:h-[11px] lg:w-[240px] lg:h-[14px] mt-[5px] sm:mt-[6px] md:mt-[6px]"
            />
            <p className="text-[12px] sm:text-[14px] md:text-[16px] font-normal leading-[20px] sm:leading-[23px] md:leading-[26px] text-center text-[#6d6d6d] font-['Lato'] w-auto mt-[9px] sm:mt-[11px] md:mt-[12px]">
              It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-[15px] sm:gap-[18px] md:gap-[20px] w-full mt-[50px] sm:mt-[58px] md:mt-[66px]">
              {horoscopeCards.map((card, index) => (
                <HoroscopeCard key={index} {...card} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default HoroscopeSection;