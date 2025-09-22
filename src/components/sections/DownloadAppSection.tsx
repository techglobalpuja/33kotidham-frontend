'use client';
import React from 'react';
import Image from 'next/image';

const DownloadAppSection: React.FC = () => (
  <section className="w-full">
    <Image
      src="/images/img_image_.png"
      alt="Download App"
      width={1920}
      height={898}
      className="w-full h-[449px] sm:h-[674px] md:h-[898px] object-cover"
    />
  </section>
);

export default DownloadAppSection;