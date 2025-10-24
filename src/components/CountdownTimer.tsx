'use client';

import React, { useState, useEffect } from 'react';

interface CountdownTimerProps {
  date: string;
  time: string;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ date, time }) => {
  const [timeLeft, setTimeLeft] = useState<{ days: number; hours: number; minutes: number; seconds: number } | null>(null);
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    // Debug log to see what date and time values are being passed
    console.log('CountdownTimer received:', { date, time });
    
    // Combine date and time to create a full datetime string
    const dateTimeString = `${date}T${time}`;
    const targetDate = new Date(dateTimeString).getTime();

    if (isNaN(targetDate)) {
      console.error('Invalid date or time provided:', date, time);
      console.error('DateTime string:', dateTimeString);
      return;
    }

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        clearInterval(interval);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        setIsExpired(true);
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(interval);
  }, [date, time]);

  if (isExpired) {
    return (
      <div className="bg-red-500 text-white text-sm font-bold px-3 py-2 rounded-full shadow-lg animate-pulse transform hover:scale-105 transition-transform duration-200">
        Puja Started
      </div>
    );
  }

  if (!timeLeft) {
    return null;
  }

  // Always show the full format: days, hours, minutes, seconds
  const displayText = `${timeLeft.days}d ${timeLeft.hours}h ${timeLeft.minutes}m ${timeLeft.seconds}s`;

  return (
    <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-sm font-bold px-3 py-2 rounded-full flex items-center gap-2 shadow-lg transform hover:scale-105 transition-transform duration-200">
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <span>
        {displayText}
      </span>
    </div>
  );
};

export default CountdownTimer;