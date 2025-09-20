'use client';

import React, { useState } from 'react';

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
      <div className="relative w-full border border-[#5c4228] rounded-[30px] bg-[#f37335] mt-[66px] sm:mt-[77px] md:mt-[88px] overflow-hidden">
        {/* keep your 40% height */}
        <div className="relative w-full h-0 pb-[44%] overflow-hidden">
          <iframe
            src={videoSrc}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; clipboard-write"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            className="absolute top-0 left-0 w-full h-full rounded-[30px] scale-x-[1.5] scale-y-[1.3]" 
          ></iframe>

          {!isPlaying && (
            <div className="absolute inset-0 flex justify-center items-center">
              <button
                onClick={handlePlayClick}
                className="w-[70px] h-[70px] sm:w-[80px] sm:h-[80px] md:w-[90px] md:h-[90px] bg-[#d84f0d] rounded-full flex justify-center items-center border-4 border-[#fbd0bc] hover:bg-[#e65c1a] transition-colors duration-300"
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
          )}
        </div>
      </div>
    </section>
  );
};

export default VideoSection;
