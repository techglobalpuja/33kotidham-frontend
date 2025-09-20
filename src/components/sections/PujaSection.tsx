'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import PujaCard from '@/components/cards/PujaCard';

interface PujaCardProps {
  id?: string;
  image: string;
  title: string;
  temple: string;
  description: string;
  date: string;
  isNew?: boolean;
  shareLabel?: string;
}

interface PujaSectionProps {
  pujaCards: PujaCardProps[];
}

const PujaSection: React.FC<PujaSectionProps> = ({ pujaCards }) => (
  <section
    id="puja-section" // Add ID for scrolling target
    className="w-full py-[53px] sm:py-[62px] md:py-[70px] px-[42px] sm:px-[49px] md:px-[56px]"
    style={{
      backgroundImage: "url('/images/img__4.png')",
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
    }}
  >
    <div className="w-full max-w-[1440px] mx-auto">
      <div className="flex justify-center items-center w-full">
        <div className="flex flex-col justify-start items-center w-full lg:w-5/6 mb-[14px] sm:mb-[16px] md:mb-[18px]">
          <div className="flex flex-col justify-start items-center w-full mr-[62px] sm:mr-[72px] md:mr-[82px] ml-[62px] sm:ml-[72px] md:ml-[82px]">
            <div className="flex justify-center items-start w-full px-[6px] sm:px-[7px] md:px-[8px]">
              <h2 className="text-[36px] sm:text-[42px] md:text-[48px] font-bold leading-[41px] sm:leading-[48px] md:leading-[54px] text-center text-[#111111] font-['Philosopher'] mb-[5px] sm:mb-[6px] md:mb-[6px]">
                Participate in Pujas
              </h2>
            </div>
            <div className="flex flex-col justify-start items-center w-full mt-[-3px] sm:mt-[-3.5px] md:mt-[-4px]">
              <div className="flex justify-center items-center w-auto">
                <Image
                  src="/images/img_vector_smart_object.png"
                  alt="Decorative Line"
                  width={240}
                  height={14}
                  className="w-[180px] h-[11px] sm:w-[210px] sm:h-[13px] md:w-[240px] md:h-[14px] self-end"
                />
              </div>
              <div className="flex justify-center items-end w-full px-[8px] sm:px-[9px] md:px-[10px] py-[8px] sm:py-[9px] md:py-[10px] mt-[-5px] sm:mt-[-5.5px] md:mt-[-6px]">
                <p className="text-[12px] sm:text-[14px] md:text-[16px] font-normal leading-[20px] sm:leading-[23px] md:leading-[26px] text-center text-[#797979] font-['Lato'] w-full sm:w-4/5 md:w-[54%] mt-[8px] sm:mt-[9px] md:mt-[10px]">
                  It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum.
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col lg:flex-row gap-[30px] sm:gap-[35px] md:gap-[40px] w-full mt-[5px] sm:mt-[6px] md:mt-[6px]">
            {pujaCards.map((card, index) => (
              <PujaCard key={card.id || index} {...card} />
            ))}
          </div>
          <div className="flex justify-center items-center w-full px-[42px] sm:px-[49px] md:px-[56px] mr-[62px] sm:mr-[72px] md:mr-[82px] mb-[38px] sm:mb-[44px] md:mb-[50px] ml-[62px] sm:ml-[72px] md:ml-[82px] mt-[38px] sm:mt-[44px] md:mt-[50px]">
            <Link href="/pujas">
              <Button
                variant="primary"
                size="md"
                className="text-[12px] sm:text-[13px] md:text-[14px] font-normal leading-[14px] sm:leading-[15px] md:leading-[17px] text-center capitalize text-white bg-[linear-gradient(0deg,#f4aa36_0%,_#f37335_100%)] rounded-[22px] px-[25px] sm:px-[30px] md:px-[34px] py-[9px] sm:py-[11px] md:py-[12px] font-['Lato'] hover:shadow-lg transition-shadow duration-200"
              >
                See all pujas
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default PujaSection;