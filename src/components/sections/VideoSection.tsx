'use client';

import React, { useState } from 'react';
import Image from 'next/image';

const VideoSection: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const baseVideoId = 'xB00QteaAsM';
  const baseParams =
    'modestbranding=1&rel=0&showinfo=0&iv_load_policy=3&disablekb=1&fs=0&controls=1&autohide=1';
  const [videoSrc, setVideoSrc] = useState(
    `https://www.youtube-nocookie.com/embed/${baseVideoId}?${baseParams}&autoplay=0`
  );

  const handlePlayClick = () => {
    setIsPlaying(true);
    setVideoSrc(
      `https://www.youtube-nocookie.com/embed/${baseVideoId}?${baseParams}&autoplay=1`
    );
  };

  return (
    <section className="w-full flex justify-center items-center px-[22px] sm:px-[26px] md:px-[30px]">
      <div className="relative w-full border border-[#5c4228] rounded-[30px] bg-[#f37335] mt-[30px] sm:mt-[60px] md:mt-[70px] overflow-hidden">
        {/* keep your 40% height */}
        <div className="relative w-full h-0 pb-[44%] overflow-hidden">
          {!isPlaying ? (
            <div 
              className="absolute top-0 left-0 w-full h-full cursor-pointer group"
              onClick={handlePlayClick}
            >
              <Image
                src={`https://img.youtube.com/vi/${baseVideoId}/maxresdefault.jpg`}
                alt="Video Thumbnail"
                fill
                className="object-cover rounded-[30px]"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <div className="absolute inset-0 flex justify-center items-center bg-black/20 group-hover:bg-black/30 transition-colors duration-300">
                <button
                  className="w-[70px] h-[70px] sm:w-[80px] sm:h-[80px] md:w-[90px] md:h-[90px] bg-[#d84f0d] rounded-full flex justify-center items-center border-4 border-[#fbd0bc] group-hover:bg-[#e65c1a] transition-colors duration-300"
                  aria-label="Play Video"
                >
                  <svg
                    className="w-[20px] h-[20px] sm:w-[25px] sm:h-[25px] md:w-[30px] md:h-[30px] text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </button>
              </div>
            </div>
          ) : (
            <iframe
              src={videoSrc}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; clipboard-write"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              className="absolute top-0 left-0 w-full h-full rounded-[30px] scale-x-[1.5] scale-y-[1.3]" 
            ></iframe>
          )}
        </div>
      </div>
    </section>
  );
};

export default VideoSection;
