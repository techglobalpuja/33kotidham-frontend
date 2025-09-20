'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import EditText from '@/components/ui/EditText';

const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);

  const handleEmailSubmit = () => {
    if (email && agreeTerms) {
      console.log('Newsletter subscription:', email);
      // Handle newsletter subscription
    }
  };

  return (
    <footer className="w-full bg-[#f37335] border-t border-b border-[#5c4228] pt-4 pb-4">
      <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center w-full mt-[65px] sm:mt-[98px] md:mt-[130px]">
          
          {/* Main Footer Content */}
          <div className="flex flex-col lg:flex-row justify-between items-start w-full mb-8 sm:mb-12 md:mb-16">
            
            {/* Logo and Description Section */}
            <div className="flex flex-col gap-4 sm:gap-5 justify-start items-start w-full lg:w-1/5 mb-8 lg:mb-0">
              <div className="flex gap-3 justify-start items-center w-auto">
                <Image
                  src="/images/img_group_133653_white_a700.svg"
                  alt="Footer Logo Icon"
                  width={56}
                  height={52}
                  className="w-[28px] h-[26px] sm:w-[42px] sm:h-[39px] md:w-[56px] md:h-[52px]"
                />
                <Image
                  src="/images/img_group_133643.svg"
                  alt="Footer Logo Text"
                  width={174}
                  height={30}
                  className="w-[87px] h-[15px] sm:w-[131px] sm:h-[23px] md:w-[174px] md:h-[30px]"
                />
              </div>
              <p className="text-sm sm:text-base md:text-[16px] font-normal leading-[20px] sm:leading-[23px] md:leading-[26px] text-left text-white font-['Work_Sans'] w-full">
                Duis et neque non quam feugiat posuere. In eu vehicula dolor. Etiam faucibucidunt.
              </p>
              <div className="flex gap-3 justify-start items-center w-auto">
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
              <div className="flex flex-col gap-3 justify-start items-start self-start w-full sm:w-auto lg:w-1/3">
                <h3 className="text-[20px] sm:text-[27px] md:text-[34px] font-bold leading-[23px] sm:leading-[31px] md:leading-[39px] text-left text-[#111111] font-['Philosopher']">
                  Newsletter
                </h3>
                <div className="flex flex-col gap-4 sm:gap-5 md:gap-6 justify-start items-start w-full">
                  <EditText
                    placeholder="Your email*"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    className="w-full"
                    rightIcon={
                      <Image
                        src="/images/img_vector_white_a700.svg"
                        alt="Email Icon"
                        width={16}
                        height={14}
                        className="w-[12px] h-[11px] sm:w-[14px] sm:h-[12px] md:w-[16px] md:h-[14px]"
                      />
                    }
                  />
                  <div className="flex gap-2 justify-start items-center w-auto">
                    <button
                      onClick={() => setAgreeTerms(!agreeTerms)}
                      className={`w-[14px] h-[14px] sm:w-[16px] sm:h-[16px] md:w-[18px] md:h-[18px] border border-[#5c4228] rounded-[8px] ${agreeTerms ? 'bg-[#f37335]' : 'bg-[#fff3ee]'} transition-colors duration-200`}
                    >
                      {agreeTerms && (
                        <svg className="w-full h-full text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </button>
                    <p className="text-sm sm:text-base md:text-[16px] font-normal leading-[20px] sm:leading-[23px] md:leading-[26px] text-left text-[#111111] font-['Work_Sans']">
                      <span>I agree with the </span>
                      <span>terms & conditions</span>
                    </p>
                  </div>
                </div>
              </div>
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
              <div className="flex justify-center items-center shadow-[0px_4px_4px_#888888ff] border border-[#d09e6f7f] rounded-[14px] bg-[#0f0f0fb2] p-2">
                <Image
                  src="/images/img_clip_path_group.svg"
                  alt="Payment Method 2"
                  width={32}
                  height={10}
                  className="w-[24px] h-[8px] sm:w-[28px] sm:h-[9px] md:w-[32px] md:h-[10px]"
                />
              </div>
              <div className="flex justify-center items-center shadow-[0px_4px_4px_#888888ff] border border-[#d09e6f7f] rounded-[14px] bg-[#0f0f0fb2] p-2">
                <Image
                  src="/images/img_clip_path_group_blue_800.svg"
                  alt="Payment Method 3"
                  width={36}
                  height={8}
                  className="w-[27px] h-[6px] sm:w-[32px] sm:h-[7px] md:w-[36px] md:h-[8px]"
                />
              </div>
              <div className="flex justify-center items-center shadow-[0px_4px_4px_#888888ff] border border-[#d09e6f7f] rounded-[14px] bg-[#0f0f0fb2] p-2">
                <Image
                  src="/images/img_clip_path_group_white_a700.svg"
                  alt="Payment Method 4"
                  width={34}
                  height={16}
                  className="w-[26px] h-[12px] sm:w-[30px] sm:h-[14px] md:w-[34px] md:h-[16px]"
                />
              </div>
              <Image
                src="/images/img_group_25144.svg"
                alt="Payment Method 5"
                width={50}
                height={30}
                className="w-[38px] h-[23px] sm:w-[44px] sm:h-[26px] md:w-[50px] md:h-[30px]"
              />
              <div className="flex justify-center items-center shadow-[0px_4px_4px_#888888ff] border border-[#d09e6f7f] rounded-[14px] bg-[#0f0f0fb2] p-2">
                <Image
                  src="/images/img_clip_path_group_black_900_01.svg"
                  alt="Payment Method 6"
                  width={52}
                  height={14}
                  className="w-[39px] h-[11px] sm:w-[46px] sm:h-[12px] md:w-[52px] md:h-[14px] self-end"
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