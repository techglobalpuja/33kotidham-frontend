'use client';
import React from 'react';
import Image from 'next/image';

interface ProcessStepProps {
  stepNumber: string;
  title: string;
  location: string;
  datetime: string;
  isHighlighted?: boolean;
  imageSrc?: string;
}

const ProcessStep: React.FC<ProcessStepProps> = ({ 
  stepNumber, 
  title, 
  location, 
  datetime, 
  isHighlighted = false,
  imageSrc
}) => (
  <div className={`flex gap-4 sm:gap-6 md:gap-[28px] justify-start items-center w-full border rounded-[20px] sm:rounded-[30px] px-4 sm:px-6 md:px-[25px] py-4 sm:py-6 md:py-[25px] ${
    isHighlighted 
      ? 'border-[#fbd0bc] bg-[linear-gradient(90deg,#f4aa36_0%,_#f37335_100%)]' 
      : 'border-[#f37335] bg-[#fff3ee]'
  }`}>
    <div className={`flex flex-col gap-1 sm:gap-2 md:gap-[4px] justify-center items-center w-[60px] sm:w-[90px] md:w-[150px] rounded-[15px] sm:rounded-[20px] px-3 sm:px-5 md:px-[20px] py-3 sm:py-5 md:py-[20px] ${
      isHighlighted 
        ? 'bg-white' :'bg-[linear-gradient(90deg,#f4aa36_0%,_#f37335_100%)]'
    }`}>
      <span className="text-[24px] sm:text-[36px] md:text-[48px] font-bold leading-[28px] sm:leading-[41px] md:leading-[54px] text-center text-black font-['Philosopher']">
        <span>{stepNumber.charAt(0)}</span>
        <span className="text-[24px] sm:text-[36px] md:text-[48px] font-bold leading-[32px] sm:leading-[54px] md:leading-[72px] text-center text-black font-['Philosopher']">
          {stepNumber.slice(1)}
        </span>
      </span>
      <span className="text-[10px] sm:text-[12px] md:text-[14px] font-semibold leading-[12px] sm:leading-[14px] md:leading-[17px] text-center uppercase text-black font-['Work_Sans']">
        Step
      </span>
    </div>
    <div className="flex flex-col gap-2 sm:gap-3 md:gap-[14px] justify-start items-start w-full">
      <h3 className={`text-[18px] sm:text-[24px] md:text-[34px] font-bold leading-[22px] sm:leading-[28px] md:leading-[39px] text-left font-['Philosopher'] ${
        isHighlighted ? 'text-[#111111]' : 'text-[#111111]'
      }`}>
        {title}
      </h3>
      <div className="flex justify-start items-center w-full">
        <Image
          src="/images/img_vector_16x14.png"
          alt="Location"
          width={14}
          height={16}
          className="w-[10px] h-[12px] sm:w-[12px] sm:h-[14px] md:w-[14px] md:h-[16px] flex-shrink-0"
        />
        <span className={`text-[12px] sm:text-[14px] md:text-[16px] font-normal leading-[14px] sm:leading-[16px] md:leading-[19px] text-left font-['Work_Sans'] ml-2 sm:ml-3 md:ml-[14px] ${
          isHighlighted ? 'text-[#111111]' : 'text-[#333333]'
        }`}>
          {location}
        </span>
      </div>
      <div className="flex justify-start items-start w-full">
        <Image
          src="/images/img_group_131038.png"
          alt="DateTime"
          width={20}
          height={16}
          className="w-[14px] h-[11px] sm:w-[16px] sm:h-[13px] md:w-[20px] md:h-[16px] flex-shrink-0 mt-0.5"
        />
        <span className={`text-[12px] sm:text-[14px] md:text-[16px] font-normal leading-[14px] sm:leading-[16px] md:leading-[19px] text-left font-['Work_Sans'] self-start ml-2 sm:ml-3 md:ml-[10px] ${
          isHighlighted ? 'text-[#111111]' : 'text-[#333333]'
        }`}>
          {datetime}
        </span>
      </div>
    </div>
  </div>
);

export default ProcessStep;