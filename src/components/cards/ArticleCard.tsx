'use client';
import React from 'react';
import Image from 'next/image';
import Button from '@/components/ui/Button';

interface ArticleCardProps {
  image: string;
  date: string;
  author: string;
  comments: string;
  title: string;
  excerpt: string;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ 
  image, 
  date, 
  author, 
  comments, 
  title, 
  excerpt 
}) => (
  <div className="flex flex-col w-full max-w-sm bg-white rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
    {/* Image with date badge */}
    <div className="relative">
      <Image
        src={image}
        alt={title}
        width={400}
        height={240}
        className="w-full h-60 object-cover"
      />
      <div className="absolute bottom-4 left-4">
        <div className="bg-gradient-to-r from-orange-400 to-orange-500 text-white px-4 py-2 rounded-full text-sm font-medium">
          {date}
        </div>
      </div>
    </div>
    
    {/* Content */}
    <div className="p-6">
      {/* Author and comments */}
      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
        <div className="flex items-center gap-2">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-orange-400">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
          </svg>
          <span>By - {author}</span>
        </div>
        <div className="flex items-center gap-2">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-orange-400">
            <path d="M21.99 4c0-1.1-.89-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4-.01-18zM18 14H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/>
          </svg>
          <span>{comments}</span>
        </div>
      </div>
      
      {/* Title */}
      <h3 className="text-xl font-bold text-gray-900 font-['Philosopher'] mb-3 leading-tight">
        {title}
      </h3>
      
      {/* Excerpt */}
      <p className="text-gray-600 font-['Lato'] leading-relaxed">
        {excerpt}
      </p>
    </div>
  </div>
);

export default ArticleCard;