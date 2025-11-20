'use client';

import React from 'react';
import UnifiedPujaCard from '@/components/cards/UnifiedPujaCard';

interface PujaCardProps {
  id?: string;
  image: string;
  title: string;
  temple: string;
  description: string;
  date: string;
  time?: string; // Add time prop
  isNew?: boolean;
  timer?: boolean;
  shareLabel?: string;
}

const PujaCard: React.FC<PujaCardProps> = ({ 
  id,
  image, 
  title, 
  temple, 
  description, 
  date, 
  time, // Destructure time prop
  isNew = false
  // Removed unused timer and shareLabel props
}) => {
  // For backward compatibility, we'll use the home variant of the unified card
  // Note: The timer and shareLabel props are not implemented in the unified card
  // but could be added if needed in the future
  
  return (
    <UnifiedPujaCard
      id={id || '0'}
      image={image}
      title={title}
      temple={temple}
      description={description}
      date={date}
      time={time} // Pass time prop
      isNew={isNew}
      variant="home"
    />
  );
};

export default PujaCard;