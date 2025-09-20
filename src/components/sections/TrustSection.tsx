'use client';
import React from 'react';
import Image from 'next/image';

const TrustSection: React.FC = () => (
  <section className="w-full py-20 px-4 sm:px-6 lg:px-8 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/images/img__0x0.png')" }}>
    <div className="w-full max-w-[1440px] mx-auto">
      <div className="flex flex-col gap-[38px] sm:gap-[44px] md:gap-[50px] justify-center items-center w-full">
        <Image
          src="/images/img_trust_icon_1.png"
          alt="Trust Icon"
          width={106}
          height={114}
          className="w-[80px] h-[86px] sm:w-[93px] sm:h-[100px] md:w-[106px] md:h-[114px]"
        />
        <div className="flex flex-col gap-[15px] sm:gap-[18px] md:gap-[20px] justify-start items-center w-auto px-[42px] sm:px-[49px] md:px-[56px]">
          <h2 className="text-[36px] sm:text-[42px] md:text-[48px] font-bold leading-[41px] sm:leading-[48px] md:leading-[54px] text-center text-black font-['Philosopher'] mt-[6px] sm:mt-[7px] md:mt-[8px]">
            Trusted by Millions of Devotees
          </h2>
          <p className="text-[15px] sm:text-[18px] md:text-[20px] font-normal leading-[18px] sm:leading-[21px] md:leading-[24px] text-center text-black font-['Lato'] w-auto">
            Enabled LIVE Pujas for 1,000,000+ Happy Devotees by partnering with 1000+ Temples and 3000+ Vedic Pandits of Bharat
          </p>
        </div>
      </div>
    </div>
  </section>
);

export default TrustSection;