'use client';
import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface HoroscopeCardProps {
  id?: string;
  icon: string;
  name: string;
  dateRange: string;
  onClick?: () => void;
}

const HoroscopeCard: React.FC<HoroscopeCardProps> = ({ id, icon, name, dateRange, onClick }) => {
  const router = useRouter();
  
  const handleClick = () => {
    if (onClick) {
      onClick();
    } else if (id) {
      router.push(`/horoscope/${id.toLowerCase()}`);
    }
  };
  
  return (
    <div 
      onClick={handleClick}
      className="flex justify-start items-center w-full border border-[#e7e7e7] rounded-[10px] bg-white shadow-[-2px_0px_28px_#0000000c] px-[15px] sm:px-[18px] md:px-[20px] py-[15px] sm:px-[18px] md:py-[20px] group relative overflow-hidden transition-all duration-300 ease-in-out hover:shadow-lg hover:scale-105 cursor-pointer"
    >
      <div className="absolute inset-0 w-full h-full rounded-[10px] bg-gradient-to-r from-orange-400 to-orange-500 opacity-0 transition-all duration-300 ease-in-out transform scale-95 group-hover:opacity-100 group-hover:scale-100" />
      <div className="flex flex-col gap-[10px] sm:gap-[12px] md:gap-[14px] justify-start items-center w-full relative z-10">
        <div className="flex justify-start items-center w-auto shadow-[-2px_0px_15px_#0000000f] bg-white rounded-[28px] p-[8px] sm:p-[9px] md:p-[10px] group-hover:shadow-lg transition-shadow duration-300">
          <Image
            src={icon}
            alt={name}
            width={30}
            height={34}
            className="w-[24px] h-[27px] sm:w-[27px] sm:h-[31px] md:w-[30px] md:h-[34px]"
          />
        </div>
        <div className="flex flex-col justify-start items-center w-full">
          <div className="flex justify-center items-center w-auto px-[32px] sm:px-[37px] md:px-[42px]">
            <h3 className="text-[16px] sm:text-[18px] md:text-[20px] font-bold leading-[18px] sm:leading-[21px] md:leading-[23px] text-center text-[#111111] font-['Philosopher'] group-hover:text-white transition-colors duration-300">
              {name}
            </h3>
          </div>
          <div className="flex justify-center items-center w-full">
            <p className="text-[12px] sm:text-[13px] md:text-[14px] font-normal leading-[14px] sm:leading-[15px] md:leading-[17px] text-center text-[#797979] font-['Lato'] group-hover:text-white/90 transition-colors duration-300">
              {dateRange}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HoroscopeCard;