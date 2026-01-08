'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ProductCard from '@/components/cards/ProductCard';
import Button from '@/components/ui/Button';
import { apiService } from '@/services/api';
import { BackendProduct, Product } from '@/types';

const PopularProductsSection: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Transform backend product to frontend Product interface (reused from StorePage)
  const transformProduct = (backendProduct: BackendProduct): Product => {
    // Get the primary image or first image if no primary image is set
    const primaryImage = backendProduct.images.find(img => img.is_primary) || backendProduct.images[0];
    
    // Construct full image URL
    let imageUrl = '/placeholder.jpg';
    if (primaryImage?.image_url) {
      // If it's already a full URL, use it as is
      if (primaryImage.image_url.startsWith('http')) {
        imageUrl = primaryImage.image_url;
      } else {
        // Otherwise construct the full URL
        imageUrl = `https://api.33kotidham.in${primaryImage.image_url.startsWith('/') ? '' : '/'}${primaryImage.image_url}`;
      }
    }
    
    return {
      id: backendProduct.id.toString(),
      name: backendProduct.name,
      description: backendProduct.short_description || backendProduct.slug || '',
      price: parseFloat(backendProduct.selling_price),
      image: imageUrl,
      category: backendProduct.category.name.toLowerCase(),
      inStock: backendProduct.stock_quantity > 0,
      isActive: backendProduct.is_active,
      quantity: backendProduct.stock_quantity,
      createdDate: backendProduct.created_at
    };
  };

  useEffect(() => {
    const fetchPopularProducts = async () => {
      try {
        setLoading(true);
        // Fetch products, just taking first 4 as "popular" for now
        // Ideally backend should support sort by popularity/sales
        const backendProducts = await apiService.getProducts(0, 4);
        const transformedProducts = backendProducts.map(transformProduct);
        setProducts(transformedProducts);
      } catch (err) {
        console.error('Error fetching popular products:', err);
        setError('Failed to load products');
      } finally {
        setLoading(false);
      }
    };

    fetchPopularProducts();
  }, []);

  if (loading) {
     return (
        <section className="relative w-full py-[30px] sm:py-[32px] md:py-[40px] px-[42px] sm:px-[49px] md:px-[56px]">
          <div className="w-full max-w-[1440px] mx-auto">
             <div className="flex justify-center items-center w-full">
                <div className="flex flex-col gap-8 w-full lg:w-5/6">
                   <div className="h-12 bg-gray-200 rounded animate-pulse w-1/3 mx-auto"></div>
                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                      {[1, 2, 3, 4].map(i => (
                         <div key={i} className="h-96 bg-gray-200 rounded-2xl animate-pulse"></div>
                      ))}
                   </div>
                </div>
             </div>
          </div>
        </section>
     );
  }

  if (error || products.length === 0) {
    return null; // Don't show section if error or no products
  }

  return (
    <section className="relative w-full py-[30px] sm:py-[32px] md:py-[40px] px-[20px] sm:px-[49px] md:px-[56px]"> {/* Removed bg-white to let background image show if needed, or match PujaSection style */}
      <Image
        src="/images/img__4.png"
        alt="Background"
        fill
        className="object-cover object-center -z-10"
        priority
      />
      <div className="w-full max-w-[1440px] mx-auto">
        <div className="flex justify-center items-center w-full">
          <div className="flex flex-col justify-start items-center w-full lg:w-5/6 mb-0">
            
            {/* Heading Section */}
            <div className="flex flex-col justify-start items-center w-full mr-[62px] sm:mr-[72px] md:mr-[82px] ml-[62px] sm:ml-[72px] md:ml-[82px]">
              <div className="flex justify-center items-start w-full px-[6px] sm:px-[7px] md:px-[8px]">
                <h2 className="text-[30px] sm:text-[42px] md:text-[48px] font-bold leading-[41px] sm:leading-[48px] md:leading-[54px] text-center text-[#111111] mb-4">
                  Popular Products
                </h2>
              </div>
              <div className="flex flex-col justify-start items-center w-full mt-[-3px] sm:mt-[-3.5px] md:mt-[-4px]">
                <div className="flex justify-center items-center w-auto">
                  <Image
                    src="/images/img_vector_smart_object.png"
                    alt="Decorative Line"
                    width={240}
                    height={14}
                    className="w-[180px] h-[11px] sm:w-[210px] sm:h-[13px] md:w-[240px] md:h-[14px] self-end"
                  />
                </div>
                <div className="flex justify-center items-end w-full px-[8px] sm:px-[9px] md:px-[10px] py-[8px] sm:py-[9px] md:py-[10px] mt-[-5px] sm:mt-[-5.5px] md:mt-[-6px]">
                  <p className="text-[12px] sm:text-[14px] md:text-[16px] font-normal leading-[20px] sm:leading-[23px] md:leading-[26px] text-center text-[#797979] w-full sm:w-4/5 md:w-[54%] mt-[8px] sm:mt-[9px] md:mt-[10px]">
                    Discover our most loved spiritual items, blessed and energized for your well-being.
                  </p>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full mt-8">
              {products.map((product, index) => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  index={index}
                />
              ))}
            </div>

            {/* See All Button */}
            <div className="flex justify-center items-center w-full px-[42px] sm:px-[49px] md:px-[56px] mr-[62px] sm:mr-[72px] md:mr-[82px] mb-[38px] sm:mb-[44px] md:mb-[50px] ml-[62px] sm:ml-[72px] md:ml-[82px] mt-[38px] sm:mt-[44px] md:mt-[50px]">
              <Link href="/store">
                <Button
                  variant="primary"
                  size="md"
                  className="text-[12px] sm:text-[13px] md:text-[14px] font-normal leading-[14px] sm:leading-[15px] md:leading-[17px] text-center capitalize text-white bg-[linear-gradient(0deg,#f4aa36_0%,_#f37335_100%)] rounded-[22px] px-[25px] sm:px-[30px] md:px-[34px] py-[9px] sm:py-[11px] md:py-[12px] hover:shadow-lg transition-shadow duration-200"
                >
                  See all products
                </Button>
              </Link>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default PopularProductsSection;
