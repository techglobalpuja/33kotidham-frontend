'use client';
import React, { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import UnifiedPujaCard from '@/components/cards/UnifiedPujaCard';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { fetchPujas } from '@/store/slices/pujaSlice';

const PujaSection: React.FC = () => {
  const dispatch = useAppDispatch();
  const { pujas, isLoading, error } = useAppSelector((state) => state.puja);

  useEffect(() => {
    // Fetch pujas when component mounts
    dispatch(fetchPujas());
  }, [dispatch]);

  // Show only first 3 pujas
  const limitedPujas = pujas.slice(0, 3);

  if (isLoading) {
    return (
      <section
        id="puja-section"
        className="relative w-full py-[53px] sm:py-[62px] md:py-[70px] px-[42px] sm:px-[49px] md:px-[56px]"
      >
        <Image
          src="/images/img__4.png"
          alt="Background"
          fill
          className="object-cover object-center -z-10"
          priority
        />
        <div className="w-full max-w-[1440px] mx-auto">
          <div className="flex justify-center items-center w-full">
            <div className="flex flex-col justify-start items-center w-full lg:w-5/6 mb-[14px] sm:mb-[16px] md:mb-[18px]">
              <div className="flex flex-col justify-start items-center w-full mr-[62px] sm:mr-[72px] md:mr-[82px] ml-[62px] sm:ml-[72px] md:ml-[82px]">
                <div className="flex justify-center items-start w-full px-[6px] sm:px-[7px] md:px-[8px]">
                  <h2 className="text-[36px] sm:text-[42px] md:text-[48px] font-bold leading-[41px] sm:leading-[48px] md:leading-[54px] text-center text-[#111111]  mb-[5px] sm:mb-[6px] md:mb-[6px]">
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
                    <p className="text-[12px] sm:text-[16px] md:text-[18px] font-normal leading-[20px] sm:leading-[23px] md:leading-[26px] text-center text-[#797979]  w-full sm:w-4/5 md:w-[54%] mt-[8px] sm:mt-[9px] md:mt-[10px]">
                      Join sacred rituals live from holy temples and participate in pujas designed to bring balance, prosperity, and divine grace into your life.
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col lg:flex-row gap-[30px] sm:gap-[35px] md:gap-[40px] w-full mt-[5px] sm:mt-[6px] md:mt-[6px]">
                {/* Loading skeletons */}
                {[1, 2, 3].map((item) => (
                  <div key={item} className="bg-gray-200 rounded-lg h-96 w-full animate-pulse"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section
        id="puja-section"
        className="relative w-full py-[53px] sm:py-[62px] md:py-[70px] px-[42px] sm:px-[49px] md:px-[56px]"
      >
        <Image
          src="/images/img__4.png"
          alt="Background"
          fill
          className="object-cover object-center -z-10"
          priority
        />
        <div className="w-full max-w-[1440px] mx-auto">
          <div className="flex justify-center items-center w-full">
            <div className="flex flex-col justify-start items-center w-full lg:w-5/6 mb-[14px] sm:mb-[16px] md:mb-[18px]">
              <div className="text-red-500 text-center py-10">
                <p>Error loading pujas: {error}</p>
                <button 
                  onClick={() => dispatch(fetchPujas())}
                  className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Retry
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="puja-section" // Add ID for scrolling target
      className="relative w-full py-[53px] sm:py-[62px] md:py-[70px] px-[42px] sm:px-[49px] md:px-[56px]"
    >
      <Image
        src="/images/img__4.png"
        alt="Background"
        fill
        className="object-cover object-center -z-10"
        priority
      />
      <div className="w-full max-w-[1440px] mx-auto">
        <div className="flex justify-center items-center w-full">
          <div className="flex flex-col justify-start items-center w-full lg:w-5/6 mb-[14px] sm:mb-[16px] md:mb-[18px]">
            <div className="flex flex-col justify-start items-center w-full mr-[62px] sm:mr-[72px] md:mr-[82px] ml-[62px] sm:ml-[72px] md:ml-[82px]">
              <div className="flex justify-center items-start w-full px-[6px] sm:px-[7px] md:px-[8px]">
                <h2 className="text-[36px] sm:text-[42px] md:text-[48px] font-bold leading-[41px] sm:leading-[48px] md:leading-[54px] text-center text-[#111111]  mb-[5px] sm:mb-[6px] md:mb-[6px]">
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
                  <p className="text-[12px] sm:text-[14px] md:text-[16px] font-normal leading-[20px] sm:leading-[23px] md:leading-[26px] text-center text-[#797979]  w-full sm:w-4/5 md:w-[54%] mt-[8px] sm:mt-[9px] md:mt-[10px]">
                    Join sacred rituals live from holy temples and participate in pujas designed to bring balance, prosperity, and divine grace into your life.
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-col lg:flex-row gap-[30px] sm:gap-[35px] md:gap-[40px] w-full mt-[5px] sm:mt-[6px] md:mt-[6px]">
              {limitedPujas.map((puja) => (
                <UnifiedPujaCard 
                  key={puja.id} 
                  id={puja.id}
                  image={puja.image}
                  title={puja.title}
                  temple={puja.temple}
                  sub_heading={puja.sub_heading || puja.description}
                  date={puja.date}
                  time={puja.time}
                  isNew={puja.isNew}
                />
              ))}
            </div>
            <div className="flex justify-center items-center w-full px-[42px] sm:px-[49px] md:px-[56px] mr-[62px] sm:mr-[72px] md:mr-[82px] mb-[38px] sm:mb-[44px] md:mb-[50px] ml-[62px] sm:ml-[72px] md:ml-[82px] mt-[38px] sm:mt-[44px] md:mt-[50px]">
              <Link href="/pujas">
                <Button
                  variant="primary"
                  size="md"
                  className="text-[12px] sm:text-[13px] md:text-[14px] font-normal leading-[14px] sm:leading-[15px] md:leading-[17px] text-center capitalize text-white bg-[linear-gradient(0deg,#f4aa36_0%,_#f37335_100%)] rounded-[22px] px-[25px] sm:px-[30px] md:px-[34px] py-[9px] sm:py-[11px] md:py-[12px]  hover:shadow-lg transition-shadow duration-200"
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
};

export default PujaSection;
