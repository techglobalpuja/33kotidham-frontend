'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Product } from '@/types';

interface ProductCardProps {
  product: Product;
  isVisible?: boolean;
  index?: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, isVisible = true, index = 0 }) => {
  const router = useRouter();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };
  


  return (
    <div
      className={`group relative bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-500 border border-gray-100 overflow-hidden transform hover:-translate-y-1 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      
      {/* Card Link Wrapper */}
      <Link href={`/store/product/${product.id}`} className="block">
      {/* Compact Image Section */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={product.image} // Changed from images[0] to image based on type definition
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        
        {/* Compact Badges */}
        <div className="absolute top-3 left-3 flex gap-1 z-10">
          {product.isActive && ( // Using isActive as a proxy for featured if isFeatured is missing in Product type, or just don't show specific badges if not present
             // Note: Product type definition in index.ts doesn't have isFeatured or originalPrice
             // I will stick to available fields in Product interface
            null 
          )}
        </div>
        
        {/* Quick Actions */}
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300">
          <div className="flex flex-col gap-1">
            <button className="p-2 bg-white/90 backdrop-blur-sm rounded-full text-gray-600 hover:bg-red-500 hover:text-white transition-all duration-300 shadow-sm">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* Compact Content */}
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors duration-300 line-clamp-2">
          {product.name}
        </h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-1">
          {product.description}
        </p>
        
        {/* Compact Rating - Placeholder as rating is not in Product type */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <svg key={i} className={`w-3 h-3 ${i < 4 ? 'text-yellow-500' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            ))}
          </div>
          <span className="text-xs text-gray-500">(24)</span>
        </div>
        
        {/* Compact Price */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="flex items-center gap-1">
              <span className="text-xl font-bold text-gray-900">{formatPrice(product.price)}</span>
            </div>
          </div>
          <div className={`text-xs font-medium ${
            product.inStock ? 'text-green-600' : 'text-red-600'
          }`}>
            {product.inStock ? '✓ In Stock' : '❌ Out of Stock'}
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="flex gap-2">
          <button 
            onClick={(e) => {
              e.preventDefault();
              router.push(`/store/product/${product.id}`);
            }}
            className="flex items-center justify-center w-full h-10 rounded-xl bg-gradient-to-r from-orange-500 to-rose-500 text-white hover:from-orange-600 hover:to-rose-600 transition-all duration-300 transform hover:scale-105"
          >
            Buy Now
          </button>
        </div>
      </div>
      </Link>
    </div>
  );
};

export default ProductCard;
