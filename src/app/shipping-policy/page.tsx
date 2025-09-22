'use client';

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';

const ShippingPolicyPage: React.FC = () => {
  const router = useRouter();

  const handleBackToHome = () => {
    router.push('/');
  };

  return (
    <div className="flex flex-col justify-start items-center w-full bg-white overflow-x-hidden">
      {/* Header with background */}
      <section 
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
            <div className="flex flex-col justify-start items-center w-full lg:w-3/4 mb-[14px] sm:mb-[16px] md:mb-[18px]">
              <div className="flex flex-col justify-start items-center w-full mr-[62px] sm:mr-[72px] md:mr-[82px] ml-[62px] sm:ml-[72px] md:ml-[82px]">
                <div className="flex justify-center items-start w-full px-[6px] sm:px-[7px] md:px-[8px]">
                  <div className="flex flex-col justify-start items-center w-full mt-[6px] sm:mt-[7px] md:mt-[8px]">
                    <h1 className="text-[36px] sm:text-[42px] md:text-[48px] font-bold leading-[41px] sm:leading-[48px] md:leading-[54px] text-center text-[#111111] font-['Philosopher'] w-auto">
                      Shipping Policy
                    </h1>
                    <Image
                      src="/images/img_vector_smart_object.png"
                      alt="Decorative Line"
                      width={240}
                      height={14}
                      className="w-[180px] h-[11px] sm:w-[210px] sm:h-[12px] md:w-[240px] md:h-[14px] mt-[16px] sm:mt-[19px] md:mt-[21px]"
                    />
                    <p className="text-[15px] sm:text-[18px] md:text-[20px] font-normal leading-[18px] sm:leading-[21px] md:leading-[24px] text-center text-[#6d6d6d] font-['Lato'] w-auto mt-[16px] sm:mt-[19px] md:mt-[21px]">
                      Shipping guidelines for 33KotiDham products
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Shipping Policy Content */}
      <section className="w-full py-[40px] sm:py-[50px] md:py-[60px] px-[20px] sm:px-[40px] md:px-[60px]">
        <div className="w-full max-w-[1200px] mx-auto">
          <div className="flex flex-col gap-8 text-left">
            
            {/* Product Deliveries */}
            <div className="terms-section">
              <h2 className="text-[24px] sm:text-[28px] md:text-[32px] font-bold leading-[28px] sm:leading-[32px] md:leading-[38px] text-[#111111] font-['Philosopher'] mb-4">
                Product Deliveries (Shivlings, Yantras, Kits, etc)
              </h2>
              <ul className="list-disc ml-6 space-y-2 text-[14px] sm:text-[16px] md:text-[18px] font-normal leading-[22px] sm:leading-[24px] md:leading-[28px] text-[#333333] font-['Lato']">
                <li>Dispatch timeline: Orders are dispatched within 2–4 business days of confirmation.</li>
                <li>Delivery window: Estimated delivery within 5–10 business days, depending on location.</li>
                <li>Tracking: Users receive a tracking link via WhatsApp and app notification once the product is shipped.</li>
                <li>Packaging: All items are securely packed with spiritual sanctity and eco-friendly materials.</li>
              </ul>
            </div>

            {/* Serviceable Locations */}
            <div className="terms-section">
              <h2 className="text-[24px] sm:text-[28px] md:text-[32px] font-bold leading-[28px] sm:leading-[32px] md:leading-[38px] text-[#111111] font-['Philosopher'] mb-4">
                Serviceable Locations
              </h2>
              <ul className="list-disc ml-6 space-y-2 text-[14px] sm:text-[16px] md:text-[18px] font-normal leading-[22px] sm:leading-[24px] md:leading-[28px] text-[#333333] font-['Lato']">
                <li>We deliver across India, including tier-1, tier-2, and tier-3 cities.</li>
                <li>For remote or non-serviceable pin codes, users will be notified at checkout.</li>
              </ul>
            </div>

            {/* Unboxing Requirement */}
            <div className="terms-section">
              <h2 className="text-[24px] sm:text-[28px] md:text-[32px] font-bold leading-[28px] sm:leading-[32px] md:leading-[38px] text-[#111111] font-['Philosopher'] mb-4">
                Unboxing Requirement
              </h2>
              <ul className="list-disc ml-6 space-y-2 text-[14px] sm:text-[16px] md:text-[18px] font-normal leading-[22px] sm:leading-[24px] md:leading-[28px] text-[#333333] font-['Lato']">
                <li>Mandatory unboxing video must be recorded at the time of delivery.</li>
                <li>This video is required for any return or refund claim due to damage or incorrect item.</li>
              </ul>
            </div>

            {/* Delivery Issues */}
            <div className="terms-section">
              <h2 className="text-[24px] sm:text-[28px] md:text-[32px] font-bold leading-[28px] sm:leading-[32px] md:leading-[38px] text-[#111111] font-['Philosopher'] mb-4">
                Delivery Issues
              </h2>
              <ul className="list-disc ml-6 space-y-2 text-[14px] sm:text-[16px] md:text-[18px] font-normal leading-[22px] sm:leading-[24px] md:leading-[28px] text-[#333333] font-['Lato']">
                <li>If the product is delayed beyond 15 days, users may raise a support request.</li>
                <li>In case of lost shipments, 33KotiDham will either resend the item or offer a full refund, subject to verification.</li>
              </ul>
            </div>

            {/* Shipping Support */}
            <div className="terms-section">
              <h2 className="text-[24px] sm:text-[28px] md:text-[32px] font-bold leading-[28px] sm:leading-[32px] md:leading-[38px] text-[#111111] font-['Philosopher'] mb-4">
                Shipping Support
              </h2>
              <ul className="list-disc ml-6 space-y-2 text-[14px] sm:text-[16px] md:text-[18px] font-normal leading-[22px] sm:leading-[24px] md:leading-[28px] text-[#333333] font-['Lato']">
                <li>WhatsApp: Message “Shipping” with Order ID</li>
                <li>Email: <a href="" className="text-[#f37335] hover:underline"></a></li>
              </ul>
            </div>

            {/* Back to Home Button */}
            <div className="flex justify-center mt-8">
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
      </section>
    </div>
  );
};

export default ShippingPolicyPage;