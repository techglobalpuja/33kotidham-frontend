'use client';
import React from 'react';
import Image from 'next/image';
import Button from '@/components/ui/Button';
import ArticleCard from '@/components/cards/ArticleCard';

interface ArticleCardProps {
  image: string;
  date: string;
  author: string;
  comments: string;
  title: string;
  excerpt: string;
}

interface ArticlesSectionProps {
  articles: ArticleCardProps[];
}

const ArticlesSection: React.FC<ArticlesSectionProps> = ({ articles }) => (
  <section className="w-full py-16 px-8 bg-white">
    <div className="w-full max-w-7xl mx-auto">
      <div className="flex flex-col items-center text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-900 font-['Philosopher'] mb-4">
          Latest Articles
        </h2>
        <div className="flex items-center justify-center mb-4">
          <Image
            src="/images/img_vector_smart_object.png"
            alt="Decorative Line"
            width={240}
            height={14}
            className="w-60 h-auto"
          />
        </div>
        <p className="text-gray-600 font-['Lato'] max-w-2xl leading-relaxed">
          It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum .
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {articles.map((article, index) => (
          <ArticleCard key={index} {...article} />
        ))}
      </div>
      
      <div className="flex justify-center">
        <Button
          variant="primary"
          size="md"
          className="bg-gradient-to-r from-orange-400 to-orange-500 text-white px-8 py-3 rounded-full font-['Lato'] hover:shadow-lg transition-shadow"
        >
          view more
        </Button>
      </div>
    </div>
  </section>
);

export default ArticlesSection;