'use client';

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';

const RefundPolicyPage: React.FC = () => {
  const router = useRouter();

  const handleBackToHome = () => {
    router.push('/');
  };

  return (
    <section 
      className="w-full min-h-screen flex items-center justify-center py-[53px] sm:py-[62px] md:py-[70px] px-[42px] sm:px-[49px] md:px-[56px]"
      style={{
        backgroundImage: "url('/images/img__4.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="w-full max-w-[1440px] mx-auto">
        <div className="flex justify-center items-center w-full">
          <div className="flex flex-col justify-start items-center w-full lg:w-3/4 mb-[14px] sm:mb-[16px] md:mb-[18px]">
            <div className="flex flex-col justify-start items-center w-full mr-[62px] sm:mr-[72px] md:mr-[82px] ml-[62px] sm:ml-[72px] md:ml-[82px]">
              <div className="flex justify-center items-start w-full px-[6px] sm:px-[7px] md:px-[8px]">
                <h2 className="text-[36px] sm:text-[42px] md:text-[48px] font-bold leading-[41px] sm:leading-[48px] md:leading-[54px] text-center text-[#111111] font-['Philosopher'] mb-[5px] sm:mb-[6px] md:mb-[6px]">
                  Refund Policy
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
                <div className="flex flex-col justify-start items-start w-full px-[8px] sm:px-[9px] md:px-[10px] py-[8px] sm:py-[9px] md:py-[10px] mt-[-5px] sm:mt-[-5.5px] md:mt-[-6px]">
                  <h3 className="text-[18px] sm:text-[20px] md:text-[22px] font-semibold text-[#111111] font-['Lato'] mb-[8px]">Spiritual Services (Puja, Chadawa, Hawan, Jaap)</h3>
                  <ul className="text-[12px] sm:text-[14px] md:text-[16px] font-normal leading-[20px] sm:leading-[23px] md:leading-[26px] text-[#797979] font-['Lato'] list-disc pl-[20px]">
                    <li>No cancellations or refunds: All spiritual bookings are final and nonrefundable.</li>
                    <li>Rescheduling allowed:
                      <ul className="list-disc pl-[20px]">
                        <li>Must be requested at least 24 hours before the scheduled time.</li>
                        <li>Rescheduling is allowed once per booking, within 7 days of the original date.</li>
                        <li>Subject to availability and confirmation by Trilok’s team.</li>
                      </ul>
                    </li>
                  </ul>

                  <h3 className="text-[18px] sm:text-[20px] md:text-[22px] font-semibold text-[#111111] font-['Lato'] mt-[16px] mb-[8px]">Products (Shivlings, Yantras, Kits, etc)</h3>
                  <ul className="text-[12px] sm:text-[14px] md:text-[16px] font-normal leading-[20px] sm:leading-[23px] md:leading-[26px] text-[#797979] font-['Lato'] list-disc pl-[20px]">
                    <li>Return eligibility:
                      <ul className="list-disc pl-[20px]">
                        <li>Only accepted for damaged or incorrect items.</li>
                        <li>Mandatory unboxing video must be provided within 24 hours of the delivery to raise the return request.</li>
                        <li>No returns will be accepted without this video proof.</li>
                      </ul>
                    </li>
                    <li>Return window: Within 7 days of delivery.</li>
                    <li>Refund timeline: Processed within 5–7 business days after verification and will be credited within 3-4 business days.</li>
                  </ul>

                  <h3 className="text-[18px] sm:text-[20px] md:text-[22px] font-semibold text-[#111111] font-['Lato'] mt-[16px] mb-[8px]">App Features & Coin Rewards</h3>
                  <ul className="text-[12px] sm:text-[14px] md:text-[16px] font-normal leading-[20px] sm:leading-[23px] md:leading-[26px] text-[#797979] font-['Lato'] list-disc pl-[20px]">
                    <li>Digital purchases (e.g., FliptheCard, premium features) are nonrefundable.</li>
                    <li>Coin errors: Must be reported within 48 hours for review.</li>
                  </ul>

                  <h3 className="text-[18px] sm:text-[20px] md:text-[22px] font-semibold text-[#111111] font-['Lato'] mt-[16px] mb-[8px]">Payment Errors</h3>
                  <ul className="text-[12px] sm:text-[14px] md:text-[16px] font-normal leading-[20px] sm:leading-[23px] md:leading-[26px] text-[#797979] font-['Lato'] list-disc pl-[20px]">
                    <li>Duplicate transactions are autorefunded within 3–5 business days.</li>
                    <li>Manual support available via app or WhatsApp.</li>
                  </ul>

                  <h3 className="text-[18px] sm:text-[20px] md:text-[22px] font-semibold text-[#111111] font-['Lato'] mt-[16px] mb-[8px]">How to Reschedule or Report Issues</h3>
                  <ul className="text-[12px] sm:text-[14px] md:text-[16px] font-normal leading-[20px] sm:leading-[23px] md:leading-[26px] text-[#797979] font-['Lato'] list-disc pl-[20px]">
                    <li>WhatsApp: Message “Reschedule” or “Product Issue” with Booking ID and video.</li>
                    <li>Email: </li>
                  </ul>
                </div>
              </div>
            </div>
            {/* Visual Element for Appeal */}
            <div className="flex justify-center mt-[30px] sm:mt-[35px] md:mt-[40px]">
              <Image
                src="/images/img_group_8.svg"
                alt="Policy Icon"
                width={200}
                height={200}
                className="w-[150px] h-[150px] sm:w-[175px] sm:h-[175px] md:w-[200px] md:h-[200px]"
              />
            </div>
            <div className="flex justify-center items-center w-full px-[42px] sm:px-[49px] md:px-[56px] mr-[62px] sm:mr-[72px] md:mr-[82px] mb-[38px] sm:mb-[44px] md:mb-[50px] ml-[62px] sm:ml-[72px] md:ml-[82px] mt-[38px] sm:mt-[44px] md:mt-[50px]">
              <Button
                variant="primary"
                size="md"
                className="text-[12px] sm:text-[13px] md:text-[14px] font-normal leading-[14px] sm:leading-[15px] md:leading-[17px] text-center capitalize text-white bg-[linear-gradient(0deg,#f4aa36_0%,_#f37335_100%)] rounded-[22px] px-[25px] sm:px-[30px] md:px-[34px] py-[9px] sm:py-[11px] md:py-[12px] font-['Lato']"
                onClick={handleBackToHome}
              >
                Back to Home
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RefundPolicyPage;