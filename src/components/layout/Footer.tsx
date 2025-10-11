'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import EditText from '@/components/ui/EditText';

const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);

  return (
    <footer className="w-full bg-[#f37335] border-t border-b border-[#5c4228] ">
      <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center w-full mt-[15px] sm:mt-[28px] md:mt-[50px]">
          
          {/* Main Footer Content */}
          <div className="flex flex-col lg:flex-row justify-between items-start w-full mb-6 sm:mb-8 md:mb-12">
            
            {/* Logo and Description Section */}
            <div className="flex flex-col gap-6 sm:gap-8 justify-center items-center w-full lg:w-1/5 mb-8 lg:mb-0">
              <div className="flex justify-center items-center w-full">
                <Image
                  src="/images/logo.webp"
                  alt="Footer Logo Icon"
                  width={160}
                  height={148}
                  className="w-32 h-30 sm:w-40 sm:h-36 md:w-48 md:h-44 object-contain"
                />
              </div>
              <p className="text-sm sm:text-base md:text-[16px] font-normal leading-[20px] sm:leading-[23px] md:leading-[26px] text-center text-white font-['Work_Sans'] w-full max-w-[250px] sm:max-w-[300px]">
                Duis et neque non quam feugiat posuere. In eu vehicula dolor. Etiam faucibucidunt.
              </p>
              <div className="flex gap-3 justify-center items-center w-auto">
                <Image src="/images/img_group.svg" alt="Social 1" width={30} height={30} className="w-[24px] h-[24px] sm:w-[27px] sm:h-[27px] md:w-[30px] md:h-[30px]" />
                <Image src="/images/img_group_deep_orange_900.svg" alt="Social 2" width={30} height={30} className="w-[24px] h-[24px] sm:w-[27px] sm:h-[27px] md:w-[30px] md:h-[30px]" />
                <Image src="/images/img_group_deep_orange_900_30x30.svg" alt="Social 3" width={30} height={30} className="w-[24px] h-[24px] sm:w-[27px] sm:h-[27px] md:w-[30px] md:h-[30px]" />
                <Image src="/images/img_group_30x30.svg" alt="Social 4" width={30} height={30} className="w-[24px] h-[24px] sm:w-[27px] sm:h-[27px] md:w-[30px] md:h-[30px]" />
              </div>
            </div>

            {/* Links Section */}
            <div className="flex flex-col sm:flex-row justify-between items-center lg:items-start self-center w-full lg:w-3/5 gap-8 sm:gap-12 lg:gap-16">
              
              {/* Horoscope Links */}
              <div className="flex flex-col justify-start items-start w-full sm:w-auto text-center sm:text-left">
                <h3 className="text-[20px] sm:text-[27px] md:text-[34px] font-bold leading-[23px] sm:leading-[31px] md:leading-[39px] text-left text-[#111111] font-['Philosopher'] mb-3 sm:mb-4">
                  Horoscope
                </h3>
                <div className="text-sm sm:text-base md:text-[16px] font-normal leading-[34px] sm:leading-[40px] md:leading-[45px] text-left text-white font-['Mulish']">
                  <Link href="/daily-horoscope" className="block hover:text-orange-200 transition-colors duration-200">
                    Daily Horoscope
                  </Link>
                  <Link href="/weekly-horoscope" className="block hover:text-orange-200 transition-colors duration-200">
                    Weekly Horoscope
                  </Link>
                  <Link href="/monthly-horoscope" className="block hover:text-orange-200 transition-colors duration-200">
                    Monthly Horoscope
                  </Link>
                  <Link href="/yearly-horoscope" className="block hover:text-orange-200 transition-colors duration-200">
                    Yearly Horoscope
                  </Link>
                </div>
              </div>

              {/* Useful Links */}
              <div className="flex flex-col gap-1 justify-start items-start w-full sm:w-auto text-center sm:text-left">
                <h3 className="text-[20px] sm:text-[27px] md:text-[34px] font-bold leading-[23px] sm:leading-[31px] md:leading-[39px] text-left text-[#111111] font-['Philosopher'] mb-3 sm:mb-4">
                  Useful links
                </h3>
                <div className="text-sm sm:text-base md:text-[16px] font-normal leading-[34px] sm:leading-[40px] md:leading-[45px] text-left text-white font-['Mulish']">
                  <Link href="/" className="block hover:text-orange-200 transition-colors duration-200">
                    Home
                  </Link>
                  <Link href="/our-services" className="block hover:text-orange-200 transition-colors duration-200">
                    Our Services
                  </Link>
                  <Link href="/about" className="block hover:text-orange-200 transition-colors duration-200">
                    About Us
                  </Link>
                  <Link href="/store" className="block hover:text-orange-200 transition-colors duration-200">
                    Shop
                  </Link>
                </div>
              </div>

              {/* Support Links */}
              <div className="flex flex-col justify-start items-start w-full sm:w-auto text-center sm:text-left">
                <h3 className="text-[20px] sm:text-[27px] md:text-[34px] font-bold leading-[23px] sm:leading-[31px] md:leading-[39px] text-left text-[#111111] font-['Philosopher'] mb-3 sm:mb-4">
                  Support
                </h3>
                <div className="text-sm sm:text-base md:text-[16px] font-normal leading-[34px] sm:leading-[40px] md:leading-[45px] text-left text-white font-['Mulish']">
                  <Link href="/community" className="block hover:text-orange-200 transition-colors duration-200">
                    Community
                  </Link>
                  <Link href="/blog" className="block hover:text-orange-200 transition-colors duration-200">
                    Blog
                  </Link>
                  <Link href="/forums" className="block hover:text-orange-200 transition-colors duration-200">
                    Forums
                  </Link>
                  <Link href="/meetups" className="block hover:text-orange-200 transition-colors duration-200">
                    Meetups
                  </Link>
                </div>
              </div>

              {/* Newsletter Section */}
              
            </div>
          </div>

          {/* Divider Line */}
          <div className="w-full h-[1px] bg-[#f7a278] mt-[29px] sm:mt-[44px] md:mt-[58px]"></div>

          {/* Bottom Footer */}
          <div className="flex flex-col lg:flex-row justify-between items-center w-full mt-4 ml-[5px] sm:ml-[8px] md:ml-[10px] gap-4 lg:gap-0">
            
            {/* Footer Links */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 justify-center items-center self-end lg:self-auto w-auto">
              
              <Link 
                href="/terms-conditions"
                className="text-sm sm:text-base md:text-[16px] font-normal leading-[19px] text-left text-white font-['Work_Sans'] hover:text-orange-200 transition-colors duration-200"
              >
                Terms & Conditions
              </Link>
              <Image
                src="/images/img_group_129707.png"
                alt="Separator"
                width={5}
                height={18}
                className="hidden sm:block w-[4px] h-[14px] sm:w-[5px] sm:h-[18px]"
              />              
              <Link 
                href="/privacy-policy"
                className="text-sm sm:text-base md:text-[16px] font-normal leading-[19px] text-left text-white font-['Work_Sans'] hover:text-orange-200 transition-colors duration-200"
              >
                Privacy Policy
              </Link>
              <Image
                src="/images/img_group_129707.png"
                alt="Separator"
                width={5}
                height={18}
                className="hidden sm:block w-[4px] h-[14px] sm:w-[5px] sm:h-[18px]"
              />
              <Link 
                href="/refund-policy"
                className="text-sm sm:text-base md:text-[16px] font-normal leading-[19px] text-left text-white font-['Work_Sans'] hover:text-orange-200 transition-colors duration-200"
              >
                Refund Policy
              </Link>
              <Image
                src="/images/img_group_129707.png"
                alt="Separator"
                width={5}
                height={18}
                className="hidden sm:block w-[4px] h-[14px] sm:w-[5px] sm:h-[18px]"
              />
              <Link 
                href="/shipping-policy"
                className="text-sm sm:text-base md:text-[16px] font-normal leading-[19px] text-left text-white font-['Work_Sans'] hover:text-orange-200 transition-colors duration-200"
              >
                Shipping Policy
              </Link>
              <Image
                src="/images/img_group_129707.png"
                alt="Separator"
                width={5}
                height={18}
                className="hidden sm:block w-[4px] h-[14px] sm:w-[5px] sm:h-[18px]"
              />
              <Link 
                href="/contact-us"
                className="text-sm sm:text-base md:text-[16px] font-normal leading-[19px] text-left text-white font-['Work_Sans'] hover:text-orange-200 transition-colors duration-200"
              >
                Contact Us
              </Link>
            </div>

            {/* Payment Methods */}
            <div className="flex gap-2 sm:gap-3 md:gap-4 justify-center items-center w-auto">
              <Image
                src="/images/img_group_25140.svg"
                alt="Payment Method 1"
                width={48}
                height={30}
                className="w-[36px] h-[23px] sm:w-[42px] sm:h-[26px] md:w-[48px] md:h-[30px]"
              />
              <div className="flex justify-center items-center border border-[#d09e6f7f] rounded-[14px] bg-[#0f0f0fb2] p-2">
                <Image
                  src="/images/img_clip_path_group.svg"
                  alt="Payment Method 2"
                  width={32}
                  height={10}
                  className="w-[24px] h-[8px] sm:w-[28px] sm:h-[9px] md:w-[32px] md:h-[10px]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;