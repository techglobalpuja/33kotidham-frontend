'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import GlobalFooter from '@/components/layout/GlobalFooter';
import { apiService } from '@/services/api';
import { BackendProductDetail } from '@/types';

// Define product type
interface Product {
  id: string;
  name: string;
  subHeading: string;
  description: string;
  fullDescription: string;
  price: number;
  originalPrice?: number;
  images: string[];
  category: string;
  isFeatured: boolean;
  rating: number;
  reviews: number;
  inStock: boolean;
  tags: string[];
  // Fields for tabs
  benefits: string[];
  howToUse: string[];
  installation: string[];
  // Additional fields for product details
  sku?: string;
  weight?: string;
  dimensions?: string;
  material?: string;
  metaDescription?: string;
  allowCod?: boolean;
  totalSales?: number;
  createdAt?: string;
  updatedAt?: string;
}

// Define interface for related products
interface RelatedProduct {
  id: string;
  name: string;
  price: number;
  image: string;
  rating: number;
}

const ProductDetailPage = ({ params }: { params: { id: string } }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState('description');
  const [cartItems, setCartItems] = useState<string[]>([]);
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<RelatedProduct[]>([]);

  // Transform backend product to frontend Product interface
  const transformProduct = (backendProduct: BackendProductDetail): Product => {
    // Get all images
    const images = backendProduct.images.map(img => {
      // Construct full image URL
      if (img.image_url.startsWith('http')) {
        return img.image_url;
      } else {
        return `https://api.33kotidham.in${img.image_url.startsWith('/') ? '' : '/'}${img.image_url}`;
      }
    });

    // Parse tags from comma-separated string
    const tags = backendProduct.tags ? backendProduct.tags.split(',').map(tag => tag.trim()) : [];

    return {
      id: backendProduct.id.toString(),
      name: backendProduct.name,
      subHeading: backendProduct.slug || '',
      description: backendProduct.short_description,
      fullDescription: backendProduct.long_description || backendProduct.short_description,
      price: parseFloat(backendProduct.selling_price),
      originalPrice: parseFloat(backendProduct.mrp) > parseFloat(backendProduct.selling_price) 
        ? parseFloat(backendProduct.mrp) 
        : undefined,
      images: images.length > 0 ? images : ['/placeholder.jpg'],
      category: backendProduct.category.name.toLowerCase(),
      isFeatured: backendProduct.is_featured,
      rating: 4.5, // Default rating since it's not in the backend response
      reviews: Math.floor(Math.random() * 100) + 10, // Default reviews since it's not in the backend response
      inStock: backendProduct.stock_quantity > 0,
      tags: tags,
      benefits: [], // These would need to be extracted from the description or added to the backend
      howToUse: [], // These would need to be extracted from the description or added to the backend
      installation: [], // These would need to be extracted from the description or added to the backend
      // Additional fields
      sku: backendProduct.sku,
      weight: backendProduct.weight,
      dimensions: backendProduct.dimensions,
      material: backendProduct.material,
      metaDescription: backendProduct.meta_description,
      allowCod: backendProduct.allow_cod,
      totalSales: backendProduct.total_sales,
      createdAt: backendProduct.created_at,
      updatedAt: backendProduct.updated_at
    };
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Fetch the product by ID
        const productId = parseInt(params.id);
        if (isNaN(productId)) {
          throw new Error('Invalid product ID');
        }
        
        // Fetch the main product
        const backendProduct = await apiService.getProductById(productId);
        const transformedProduct = transformProduct(backendProduct);
        setProduct(transformedProduct);
        
        // Fetch related products (all products except the current one)
        const allBackendProducts = await apiService.getProducts(0, 100);
        const relatedBackendProducts = allBackendProducts
          .filter(p => p.id !== productId) // Exclude the current product
          .slice(0, 3); // Limit to 3 related products
        
        const transformedRelatedProducts = relatedBackendProducts.map(p => ({
          id: p.id.toString(),
          name: p.name,
          price: parseFloat(p.selling_price),
          // Get the primary image or first image if no primary image is set
          image: p.images && p.images.length > 0 
            ? (() => {
                const primaryImage = p.images.find(img => img.is_primary);
                const image = primaryImage || p.images[0];
                // Construct full image URL
                if (image.image_url.startsWith('http')) {
                  return image.image_url;
                } else {
                  return `https://api.33kotidham.in${image.image_url.startsWith('/') ? '' : '/'}${image.image_url}`;
                }
              })()
            : '/placeholder.jpg',
          rating: 4.5 // Default rating since it's not in the backend response
        }));
        
        setRelatedProducts(transformedRelatedProducts);
      } catch (err: unknown) {
        console.error('Error fetching product:', err);
        setError(err instanceof Error ? err.message : 'Failed to load product. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [params.id]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const addToCart = (productId: string) => {
    setCartItems(prev => [...prev, productId]);
    alert('Product added to cart!');
  };

  const buyNow = () => {
    alert('Proceeding to checkout!');
  };

  const isInCart = (productId: string) => {
    return cartItems.includes(productId);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50/50 via-yellow-50/30 to-rose-50/50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50/50 via-yellow-50/30 to-rose-50/50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Error Loading Product</h1>
          <p className="text-gray-600 mb-8">{error}</p>
          <Link 
            href="/store" 
            className="px-6 py-3 bg-gradient-to-r from-orange-500 to-rose-500 text-white font-bold rounded-2xl hover:from-orange-600 hover:to-rose-600 transition-all duration-300"
          >
            Back to Store
          </Link>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50/50 via-yellow-50/30 to-rose-50/50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Product Not Found</h1>
          <p className="text-gray-600 mb-8">The product you&#39;re looking for doesn&#39;t exist or has been removed.</p>
          <Link 
            href="/store" 
            className="px-6 py-3 bg-gradient-to-r from-orange-500 to-rose-500 text-white font-bold rounded-2xl hover:from-orange-600 hover:to-rose-600 transition-all duration-300"
          >
            Back to Store
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50/50 via-yellow-50/30 to-rose-50/50">
      <Header />
      
      {/* Breadcrumb */}
      <section className="pt-28 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <nav className="flex items-center text-sm text-gray-500 mb-8">
            <Link href="/" className="hover:text-orange-600">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/store" className="hover:text-orange-600">Store</Link>
            <span className="mx-2">/</span>
            <span className="text-orange-600 font-medium">{product.name}</span>
          </nav>
        </div>
      </section>

      {/* Product Detail Section */}
      <section className="pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Images */}
            <div className="space-y-6">
              <div className="relative h-96 rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src={product.images[selectedImage]}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>
              
              <div className="grid grid-cols-4 gap-4">
                {product.images.map((image, index) => (
                  <div 
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative h-24 rounded-xl overflow-hidden cursor-pointer border-2 transition-all duration-300 ${
                      selectedImage === index 
                        ? 'border-orange-500 ring-4 ring-orange-200' 
                        : 'border-white/50 hover:border-orange-300'
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
            
            {/* Product Info */}
            <div>
              <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl p-8 border border-white/50">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-800 font-['Philosopher']">{product.name}</h1>
                    <p className="text-lg text-orange-600 mt-2">{product.subHeading}</p>
                  </div>
                  <div className="flex items-center bg-orange-100 text-orange-800 px-3 py-1 rounded-full">
                    <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                    <span className="font-bold">{product.rating}</span>
                    <span className="text-xs ml-1">({product.reviews} reviews)</span>
                  </div>
                </div>
                
                <div className="mb-6">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl font-bold text-gray-900">{formatPrice(product.price)}</span>
                    {product.originalPrice && (
                      <span className="text-xl text-gray-500 line-through">{formatPrice(product.originalPrice)}</span>
                    )}
                    {product.originalPrice && (
                      <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-sm font-bold">
                        {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                      </span>
                    )}
                  </div>
                  <div className={`text-sm font-medium mt-2 ${
                    product.inStock ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {product.inStock ? '✓ In Stock - Ready to ship' : '❌ Out of Stock'}
                  </div>
                </div>
                
                <div className="mb-8">
                  <p className="text-gray-600">{product.description}</p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <button 
                    onClick={() => addToCart(product.id)}
                    disabled={!product.inStock || isInCart(product.id)}
                    className={`flex-1 px-6 py-4 rounded-xl font-medium text-sm transition-all duration-300 ${
                      isInCart(product.id) 
                        ? 'bg-green-500 text-white' 
                        : product.inStock 
                          ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600 transform hover:scale-105' 
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    {isInCart(product.id) ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                        </svg>
                        Added
                      </span>
                    ) : (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M7 4V2C7 1.45 7.45 1 8 1H16C16.55 1 17 1.45 17 2V4H20C20.55 4 21 4.45 21 5S20.55 6 20 6H19V19C19 20.1 18.1 21 17 21H7C5.9 21 5 20.1 5 19V6H4C3.45 6 3 5.55 3 5S3.45 4 4 4H7ZM9 3V4H15V3H9ZM7 6V19H17V6H7Z"/>
                          <path d="M9 8V17H11V8H9ZM13 8V17H15V8H13Z"/>
                        </svg>
                        Add to Cart
                      </span>
                    )}
                  </button>
                  <button 
                    onClick={buyNow}
                    className="flex-1 px-6 py-4 bg-gradient-to-r from-orange-500 to-rose-500 text-white font-bold rounded-xl hover:from-orange-600 hover:to-rose-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
                  >
                    Buy Now
                  </button>
                </div>
                
                <div className="border-t border-gray-200 pt-6">
                  <div className="flex items-center text-gray-600 mb-4">
                    <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Free shipping on orders above ₹1999</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>7-day easy returns</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Product Details Tabs */}
          <div className="mt-12 bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl border border-white/50 overflow-hidden">
            <div className="border-b border-gray-200">
              <nav className="flex flex-wrap -mb-px">
                <button
                  onClick={() => setActiveTab('description')}
                  className={`px-6 py-4 text-sm font-bold border-b-2 transition-colors duration-300 ${
                    activeTab === 'description'
                      ? 'border-orange-500 text-orange-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Description
                </button>
                <button
                  onClick={() => setActiveTab('benefits')}
                  className={`px-6 py-4 text-sm font-bold border-b-2 transition-colors duration-300 ${
                    activeTab === 'benefits'
                      ? 'border-orange-500 text-orange-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Benefits
                </button>
                <button
                  onClick={() => setActiveTab('details')}
                  className={`px-6 py-4 text-sm font-bold border-b-2 transition-colors duration-300 ${
                    activeTab === 'details'
                      ? 'border-orange-500 text-orange-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Product Details
                </button>
              </nav>
            </div>
            
            <div className="p-8">
              {activeTab === 'description' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">Product Description</h2>
                  <div className="text-gray-600 mb-6 leading-relaxed whitespace-pre-line">
                    {product.fullDescription}
                  </div>
                </div>
              )}
              
              {activeTab === 'benefits' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">Benefits</h2>
                  <div className="text-gray-600 mb-6 leading-relaxed">
                    {product.description || "Benefits information will be available soon."}
                  </div>
                </div>
              )}
              
              {activeTab === 'details' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">Product Details</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-center">
                        <div className="w-32 text-gray-500 font-medium">Category</div>
                        <div className="text-gray-800 capitalize">{product.category}</div>
                      </div>
                      <div className="flex items-center">
                        <div className="w-32 text-gray-500 font-medium">Stock Status</div>
                        <div className={`font-medium ${product.inStock ? 'text-green-600' : 'text-red-600'}`}>
                          {product.inStock ? 'In Stock' : 'Out of Stock'}
                        </div>
                      </div>
                      {product.tags && product.tags.length > 0 && (
                        <div className="flex items-start">
                          <div className="w-32 text-gray-500 font-medium">Tags</div>
                          <div className="flex flex-wrap gap-2">
                            {product.tags.map((tag: string, index: number) => (
                              <span key={index} className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm">
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center">
                        <div className="w-32 text-gray-500 font-medium">Price</div>
                        <div className="text-gray-800 font-bold">{formatPrice(product.price)}</div>
                      </div>
                      {product.originalPrice && (
                        <div className="flex items-center">
                          <div className="w-32 text-gray-500 font-medium">Original Price</div>
                          <div className="text-gray-500 line-through">{formatPrice(product.originalPrice)}</div>
                        </div>
                      )}
                      {product.originalPrice && (
                        <div className="flex items-center">
                          <div className="w-32 text-gray-500 font-medium">You Save</div>
                          <div className="text-green-600 font-bold">
                            {formatPrice(product.originalPrice - product.price)} 
                            <span className="text-sm"> ({Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% off)</span>
                          </div>
                        </div>
                      )}
                      <div className="flex items-center">
                        <div className="w-32 text-gray-500 font-medium">Rating</div>
                        <div className="flex items-center">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <svg 
                                key={i} 
                                className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'text-yellow-500' : 'text-gray-300'}`} 
                                fill="currentColor" 
                                viewBox="0 0 24 24"
                              >
                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                              </svg>
                            ))}
                          </div>
                          <span className="ml-2 text-gray-800">{product.rating} ({product.reviews} reviews)</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* FAQ Section */}
          <div className="mt-12 bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl p-8 border border-white/50">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {[
                {
                  question: 'How long does it take to see results?',
                  answer: 'Many users report positive changes within 7-21 days of proper installation and worship. However, results may vary based on individual circumstances and consistency of practice.'
                },
                {
                  question: 'Is the product already energized?',
                  answer: 'Yes, all our products are energized (Mantra Siddha) by experienced priests following traditional Vedic rituals before shipping.'
                },
                {
                  question: 'Can I return the product if I\'m not satisfied?',
                  answer: 'We offer a 15-day return policy for all products. Items must be in original condition. For spiritual reasons, blessed items cannot be returned once opened, but we offer exchange for defective pieces.'
                },
                {
                  question: 'Do you offer international shipping?',
                  answer: 'Yes, we ship worldwide! International shipping takes 7-15 business days. All items are properly packaged to ensure safe delivery.'
                }
              ].map((faq, index) => (
                <div 
                  key={index} 
                  className="border border-gray-200 rounded-xl overflow-hidden"
                >
                  <button
                    onClick={() => setExpandedFAQ(expandedFAQ === index ? null : index)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-orange-50 transition-colors duration-300"
                  >
                    <h3 className="font-bold text-gray-800">{faq.question}</h3>
                    <div className={`flex-shrink-0 w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center transition-transform duration-300 ${
                      expandedFAQ === index ? 'rotate-180' : ''
                    }`}>
                      <svg className="w-4 h-4 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </button>
                  
                  <div className={`transition-all duration-300 overflow-hidden ${
                    expandedFAQ === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}>
                    <div className="px-6 pb-4">
                      <p className="text-gray-600">{faq.answer}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Related Products */}
          <div className="mt-12">
            <h2 className="text-3xl font-bold text-gray-800 text-center mb-4 font-['Philosopher']">
              Related Products
            </h2>
            <p className="text-gray-600 text-center mb-12 max-w-3xl mx-auto">
              Explore our collection of other powerful spiritual products.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {relatedProducts
                .filter((item) => item.id !== product.id) // Don't show the current product
                .slice(0, 3) // Show only 3 related products
                .map((item) => (
                <div 
                  key={item.id}
                  className="group relative bg-white/90 backdrop-blur-lg rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-white/50 overflow-hidden cursor-pointer transform hover:-translate-y-2"
                >
                  <div className="relative h-48 overflow-hidden rounded-t-2xl">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                  
                  <div className="p-5">
                    <h3 className="text-lg font-bold text-gray-800 group-hover:text-orange-600 transition-colors duration-300 mb-2">
                      {item.name}
                    </h3>
                    
                    <div className="flex items-center mb-3">
                      {[...Array(5)].map((_, i) => (
                        <svg 
                          key={i} 
                          className={`w-4 h-4 ${i < Math.floor(item.rating) ? 'text-yellow-500' : 'text-gray-300'}`} 
                          fill="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                        </svg>
                      ))}
                      <span className="text-xs text-gray-500 ml-1">({item.rating})</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div className="text-lg font-bold text-orange-600">{formatPrice(item.price)}</div>
                      <Link 
                        href={`/store/product/${item.id}`}
                        className="px-3 py-1 bg-gradient-to-r from-orange-500 to-rose-500 text-white text-sm font-bold rounded-full hover:from-orange-600 hover:to-rose-600 transition-all duration-300"
                      >
                        View
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <GlobalFooter />
    </div>
  );
};

export default ProductDetailPage;