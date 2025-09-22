'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import ProcessStep from '@/components/cards/ProcessStep';

interface ProcessStepProps {
  stepNumber: string;
  title: string;
  location: string;
  datetime: string;
  isHighlighted?: boolean;
  imageSrc?: string; // Made optional since it's auto-assigned
}

interface ProcessSectionProps {
  processSteps: ProcessStepProps[];
}

const ProcessSection: React.FC<ProcessSectionProps> = ({ processSteps }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Define the image paths for each step
  const imagePaths = [
    '/images/img__2.png',
    '/images/ganapati-temple.jpg',
    '/images/img_image copy.png',
    '/images/img__2.png',
  ];

  return (
    <section 
      className="w-full py-[68px] sm:py-[79px] md:py-[90px]"
      style={{
        backgroundImage: "url('/images/img_background.svg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 md:px-16 lg:px-[160px] xl:px-[160px]">
        <div className="flex justify-center items-center w-full mt-[39px] sm:mt-[46px] md:mt-[52px]">
          <div className="flex flex-col justify-start items-start w-full">
            <h2 className="text-[36px] sm:text-[42px] md:text-[48px] font-bold leading-[41px] sm:leading-[48px] md:leading-[54px] text-left text-[#111111] font-['Philosopher'] w-auto">
              Our Puja Process
            </h2>
            <p className="text-[15px] sm:text-[18px] md:text-[20px] font-normal leading-[18px] sm:leading-[21px] md:leading-[24px] text-left text-[#6d6d6d] font-['Lato'] w-auto">
              Morbi aliquet risus sem, vel varius purus consectetur ac. Ut placerat massa.
            </p>
            <div className="flex flex-col justify-start items-center w-full mt-8 sm:mt-12 md:mt-[62px]">
              <div className="flex flex-col w-full gap-4 sm:gap-6 md:gap-[30px]">
                {processSteps.map((step, index) => (
                  <div 
                    key={index} 
                    className="relative"
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  >
                    <ProcessStep 
                      {...step} 
                      imageSrc={imagePaths[index % imagePaths.length]} // Assign image based on index
                    />
                    <div 
                      className={`absolute right-2 sm:right-4 md:right-[44px] top-0 bottom-0 z-[99999] transition-opacity duration-300 hidden sm:block ${
                        hoveredIndex === index ? 'opacity-100' : 'opacity-0'
                      }`}
                    >
                      <Image
                        src={imagePaths[index % imagePaths.length]} // Use the corresponding image
                        alt={`Process Illustration ${index + 1}`}
                        width={350}
                        height={220}
                        className="w-[200px] h-[145px] sm:w-[280px] sm:h-[203px] md:w-[451px] md:h-[326px] lg:w-[350px] lg:h-[220px] rounded-[20px] transform rotate-6 transition-transform duration-300"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;