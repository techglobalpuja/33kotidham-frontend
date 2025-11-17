'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import GlobalFooter from '@/components/layout/GlobalFooter';

// Mock product data - in a real app this would come from an API
const getProductById = (id: string) => {
  const products: any = {
    '1': {
      id: '1',
      name: 'Sacred Ganesha Idol',
      subHeading: 'Handcrafted Brass Murti',
      description: 'Beautiful handcrafted Ganesha idol made from pure brass, blessed by temple priests. This sacred idol is crafted with intricate details and is perfect for home or office worship. The idol is energized with traditional Vedic mantras to bring prosperity and remove obstacles from your life.',
      fullDescription: 'The Sacred Ganesha Idol is a masterpiece of traditional Indian craftsmanship. Made from high-quality brass, this idol captures every detail of Lord Ganesha\'s divine form. The idol is handcrafted by skilled artisans who have been creating religious artifacts for generations.\n\nEach idol is carefully blessed by experienced priests in authentic temples following traditional rituals. The energization process involves chanting of sacred mantras and performing puja ceremonies to invoke divine blessings.\n\nKey Features:\n- Made from 100% pure brass\n- Handcrafted with intricate details\n- Energized by qualified priests\n- Perfect for home or office worship\n- Comes with a wooden stand\n- Dimensions: 6 inches (H) x 4 inches (W)\n\nBenefits:\n- Removes obstacles and brings success\n- Brings prosperity and good fortune\n- Promotes wisdom and knowledge\n- Creates a peaceful and positive environment\n- Ideal for daily prayers and meditation',
      price: 2499,
      originalPrice: 3499,
      images: [
        'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=600&fit=crop',
        'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=600&fit=crop',
        'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=600&fit=crop'
      ],
      category: 'idols',
      isFeatured: true,
      rating: 4.8,
      reviews: 127,
      inStock: true,
      tags: ['blessed', 'handcrafted', 'brass'],
      benefits: [
        'Removes obstacles and brings success',
        'Brings prosperity and good fortune',
        'Promotes wisdom and knowledge',
        'Creates a peaceful and positive environment',
        'Ideal for daily prayers and meditation'
      ],
      howToUse: [
        'Place the idol on a clean, elevated surface',
        'Light a diya or candle daily',
        'Offer flowers, fruits, and sweets',
        'Chant the Ganesh mantra: "Om Gam Ganapataye Namaha"',
        'Perform aarti twice daily for best results'
      ],
      installation: [
        'Clean the idol with water before first use',
        'Place facing North or East direction',
        'Keep in a clean and sacred space',
        'Avoid placing in bedrooms or bathrooms'
      ]
    },
    '2': {
      id: '2',
      name: 'Rudraksha Mala',
      subHeading: '108 Beads Premium Quality',
      description: 'Authentic Rudraksha mala with 108 beads, energized for meditation and spiritual practices. This sacred mala is made from genuine Rudraksha seeds and is blessed by experienced priests for maximum spiritual benefits.',
      fullDescription: 'The Rudraksha Mala is a powerful spiritual tool used for meditation, prayer, and energy healing. Each bead is carefully selected and strung together with a sacred thread. The mala is energized through traditional rituals to enhance its spiritual properties.\\n\\nRudraksha beads are known for their healing properties and are believed to bring peace, prosperity, and spiritual growth to the wearer. They are especially beneficial for meditation and mindfulness practices.\\n\\nKey Features:\\n- 108 genuine Rudraksha beads\\n- Authentic seeds sourced from Nepal\\n- Energized with sacred mantras\\n- Comes with a silk pouch for storage\\n- Hand-knotted with sacred thread\\n- Includes a detailed guidebook\\n\\nBenefits:\\n- Enhances focus and concentration\\n- Reduces stress and anxiety\\n- Promotes inner peace and calm\\n- Balances the body\'s energy centers\\n- Supports spiritual growth and awakening',
      price: 1899,
      originalPrice: 2499,
      images: [
        'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=600&h=600&fit=crop',
        'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=600&h=600&fit=crop',
        'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=600&h=600&fit=crop'
      ],
      category: 'jewelry',
      isFeatured: true,
      rating: 4.9,
      reviews: 89,
      inStock: true,
      tags: ['authentic', 'energized', 'meditation'],
      benefits: [
        'Enhances focus and concentration',
        'Reduces stress and anxiety',
        'Promotes inner peace and calm',
        'Balances the body\'s energy centers',
        'Supports spiritual growth and awakening'
      ],
      howToUse: [
        'Hold the mala in your right hand',
        'Start with the bead next to the guru bead',
        'Recite your mantra with each bead',
        'Complete one round of 108 recitations',
        'Store in the provided silk pouch when not in use'
      ],
      installation: [
        'Cleanse the mala with sacred water',
        'Chant the bija mantra 108 times',
        'Keep in a clean and sacred space',
        'Avoid wearing during inauspicious activities'
      ]
    },
    '3': {
      id: '3',
      name: 'Bhagavad Gita',
      subHeading: 'Sanskrit with Hindi Translation',
      description: 'Complete Bhagavad Gita with Sanskrit shlokas and Hindi translation in premium binding. This edition includes commentary by renowned scholars and is perfect for spiritual study and daily reference.',
      fullDescription: 'The Bhagavad Gita is one of the most revered spiritual texts in Hinduism. This premium edition presents the original Sanskrit verses along with a clear Hindi translation and detailed commentary. The book is beautifully bound with high-quality materials and is designed for both study and daily reference.\\n\\nThis edition includes:\\n- Original Sanskrit shlokas\\n- Hindi translation for easy understanding\\n- Commentary by renowned spiritual scholars\\n- Glossary of important terms\\n- Index for quick reference\\n- Premium quality paper and binding\\n\\nKey Features:\\n- Authentic Sanskrit text\\n- Clear Hindi translation\\n- Scholarly commentary\\n- Premium quality binding\\n- Gold leaf embossed cover\\n- Bookmark ribbon included\\n\\nBenefits:\\n- Deepens spiritual understanding\\n- Provides guidance for life\'s challenges\\n- Enhances knowledge of Vedic philosophy\\n- Perfect for daily study and reflection\\n- Makes a thoughtful gift for spiritual seekers',
      price: 899,
      originalPrice: 1299,
      images: [
        'https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=600&h=600&fit=crop',
        'https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=600&h=600&fit=crop',
        'https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=600&h=600&fit=crop'
      ],
      category: 'books',
      isFeatured: false,
      rating: 4.7,
      reviews: 156,
      inStock: true,
      tags: ['sanskrit', 'translation', 'premium'],
      benefits: [
        'Deepens spiritual understanding',
        'Provides guidance for life\'s challenges',
        'Enhances knowledge of Vedic philosophy',
        'Perfect for daily study and reflection',
        'Makes a thoughtful gift for spiritual seekers'
      ],
      howToUse: [
        'Read one chapter daily for 18 days',
        'Contemplate the meaning of each shloka',
        'Apply the teachings in daily life',
        'Keep in a clean and sacred space',
        'Refer to commentary for deeper understanding'
      ],
      installation: [
        'Place on a clean altar or shelf',
        'Light a diya or candle while reading',
        'Offer flowers or incense before reading',
        'Maintain respect and reverence while handling'
      ]
    },
    '4': {
      id: '4',
      name: 'Lakshmi Diya Set',
      subHeading: 'Brass Oil Lamps Set of 5',
      description: 'Traditional brass diyas for Lakshmi puja and Diwali celebrations, set of 5 pieces. These beautiful diyas are handcrafted and perfect for creating a divine atmosphere during prayers and festivals.',
      fullDescription: 'The Lakshmi Diya Set includes five beautifully crafted brass oil lamps that are perfect for Lakshmi puja and Diwali celebrations. Each diya is handcrafted by skilled artisans using traditional techniques and is designed to create a divine atmosphere during prayers and festivals.\\n\\nThese diyas are made from high-quality brass and feature intricate designs that reflect traditional Indian artistry. The set includes five matching diyas that can be arranged in various patterns to create a stunning display.\\n\\nKey Features:\\n- Set of 5 brass diyas\\n- Handcrafted with intricate designs\\n- Traditional Indian artistry\\n- Perfect for Lakshmi puja and Diwali\\n- Comes in a decorative box\\n- Easy to clean and maintain\\n\\nBenefits:\\n- Creates a divine atmosphere during prayers\\n- Attracts prosperity and good fortune\\n- Perfect for Diwali and other festivals\\n- Enhances the beauty of your puja setup\\n- Makes a thoughtful gift for special occasions',
      price: 799,
      images: [
        'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=600&fit=crop',
        'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=600&fit=crop',
        'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=600&fit=crop'
      ],
      category: 'accessories',
      isFeatured: false,
      rating: 4.6,
      reviews: 73,
      inStock: true,
      tags: ['traditional', 'brass', 'diwali'],
      benefits: [
        'Creates a divine atmosphere during prayers',
        'Attracts prosperity and good fortune',
        'Perfect for Diwali and other festivals',
        'Enhances the beauty of your puja setup',
        'Makes a thoughtful gift for special occasions'
      ],
      howToUse: [
        'Fill with ghee or oil before lighting',
        'Place in a row or decorative pattern',
        'Light during Lakshmi puja or Diwali',
        'Keep away from flammable materials',
        'Clean after each use for longevity'
      ],
      installation: [
        'Arrange in a clean and elevated space',
        'Place on a puja altar or decorative tray',
        'Ensure stability to prevent tipping',
        'Keep away from curtains or other items'
      ]
    },
    '5': {
      id: '5',
      name: 'Sacred Dhoop Sticks',
      subHeading: 'Natural Ingredients, 50 Sticks',
      description: 'Premium dhoop sticks made from natural ingredients, perfect for daily prayers. These sacred dhoop sticks are made from traditional recipes and are ideal for creating a peaceful atmosphere during meditation and worship.',
      fullDescription: 'The Sacred Dhoop Sticks are made from natural ingredients using traditional recipes that have been passed down through generations. These premium dhoop sticks are perfect for daily prayers, meditation, and creating a peaceful atmosphere in your home or workspace.\\n\\nEach stick is carefully crafted to ensure a consistent burn and pleasant fragrance. The natural ingredients are sourced from sacred places and are processed without harmful chemicals.\\n\\nKey Features:\\n- Pack of 50 premium dhoop sticks\\n- Made from 100% natural ingredients\\n- Traditional recipes and methods\\n- Pleasant and long-lasting fragrance\\n- Burns evenly and consistently\\n- Eco-friendly and sustainable\\n\\nBenefits:\\n- Creates a peaceful and sacred atmosphere\\n- Enhances focus during meditation\\n- Purifies the environment\\n- Ideal for daily prayers and rituals\\n- Natural and chemical-free',
      price: 299,
      originalPrice: 399,
      images: [
        'https://images.unsplash.com/photo-1604608672516-a224451d4ad3?w=600&h=600&fit=crop',
        'https://images.unsplash.com/photo-1604608672516-a224451d4ad3?w=600&h=600&fit=crop',
        'https://images.unsplash.com/photo-1604608672516-a224451d4ad3?w=600&h=600&fit=crop'
      ],
      category: 'incense',
      isFeatured: false,
      rating: 4.5,
      reviews: 92,
      inStock: true,
      tags: ['natural', 'daily prayers', 'premium'],
      benefits: [
        'Creates a peaceful and sacred atmosphere',
        'Enhances focus during meditation',
        'Purifies the environment',
        'Ideal for daily prayers and rituals',
        'Natural and chemical-free'
      ],
      howToUse: [
        'Light the tip of the dhoop stick',
        'Allow it to burn for 10-15 seconds',
        'Blow out the flame and place in a dhoop holder',
        'Ensure proper ventilation in the room',
        'Replace when fragrance fades'
      ],
      installation: [
        'Use in a well-ventilated area',
        'Place in a proper dhoop holder',
        'Keep away from flammable materials',
        'Ensure the holder is heat resistant'
      ]
    },
    '6': {
      id: '6',
      name: 'Silver Om Pendant',
      subHeading: 'Pure Silver 925',
      description: 'Elegant Om pendant crafted in pure silver 925, comes with chain. This sacred pendant is blessed by priests and is perfect for daily wear to attract positive energy and spiritual protection.',
      fullDescription: 'The Silver Om Pendant is a beautiful representation of the sacred Om symbol, crafted in pure silver 925. This elegant pendant is designed to attract positive energy and provide spiritual protection to the wearer. The pendant is blessed by experienced priests following traditional rituals.\\n\\nThe Om symbol represents the essence of the ultimate reality and consciousness. Wearing this pendant is believed to bring peace, harmony, and spiritual growth to the wearer.\\n\\nKey Features:\\n- Crafted in pure silver 925\\n- Elegant Om symbol design\\n- Blessed by qualified priests\\n- Comes with a silver chain\\n- Adjustable chain length\\n- Hallmark certification included\\n\\nBenefits:\\n- Attracts positive energy\\n- Provides spiritual protection\\n- Promotes inner peace and harmony\\n- Enhances spiritual awareness\\n- Makes a meaningful gift',
      price: 3499,
      originalPrice: 4499,
      images: [
        'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=600&fit=crop',
        'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=600&fit=crop',
        'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=600&fit=crop'
      ],
      category: 'jewelry',
      isFeatured: true,
      rating: 4.9,
      reviews: 67,
      inStock: true,
      tags: ['silver', 'elegant', 'chain included'],
      benefits: [
        'Attracts positive energy',
        'Provides spiritual protection',
        'Promotes inner peace and harmony',
        'Enhances spiritual awareness',
        'Makes a meaningful gift'
      ],
      howToUse: [
        'Wear daily for maximum benefits',
        'Clean with silver cleaning solution',
        'Remove during physical activities',
        'Store in the provided pouch when not in use',
        'Offer prayers while wearing for enhanced effect'
      ],
      installation: [
        'Cleanse with sacred water before first use',
        'Chant the Om mantra 108 times',
        'Wear with reverence and respect',
        'Avoid wearing during inauspicious times'
      ]
    },
    '7': {
      id: '7',
      name: 'Sampurna Vyapar Vridhi Yantra',
      subHeading: 'Complete Business Growth Yantra',
      description: 'Sacred mystical instrument for business growth, prosperity, and success. Energized with mantras.',
      fullDescription: 'The Sampurna Vyapar Vridhi Yantra is a sacred mystical instrument used for business growth, prosperity, and success. "Vyapar" means business and "Vriddhi" means growth/increase. This yantra is designed to increase sales, turnover, and profits in business or profession.\\n\\nKey Features:\\n- Sacred geometric pattern with intricate designs\\n- Typically features a central Vyapar Vriddhi Yantra surrounded by 12 supportive smaller yantras (total 13 yantras)\\n- Made on golden paper or brass/metal with gold finish\\n- Framed for easy installation\\n- Common sizes: 6 inches, 8x8 inches, 10.5 inches, or larger\\n- Energized/Mantra Siddha (blessed with mantras)\\n\\nYantras Included in Sampoorna Version:\\n1. Vyapar Vriddhi Yantra (center)\\n2. Shree Yantra\\n3. Sampoorna Maha Lakshmi Yantra\\n4. Geeta Yantra\\n5. Lord Ganesha representation\\n6. Other supporting yantras for wealth and prosperity\\n\\nBenefits:\\n- Increases business sales, profits, and turnover\\n- Removes obstacles and problems in business/career\\n- Attracts customers and opportunities\\n- Protection from negative energies, evil eye, and black magic\\n- Blessing from Lord Ganesha (remover of obstacles) and Goddess Lakshmi (wealth)\\n- Helps with debt relief and financial stability\\n- Suitable for new business ventures\\n- Beneficial for all professions, not just business owners',
      price: 2499,
      originalPrice: 3499,
      images: ['/images/yantra-main.jpg', '/images/yantra-detail.jpg', '/images/yantra-size.jpg'],
      category: 'accessories',
      isFeatured: true,
      rating: 4.9,
      reviews: 127,
      inStock: true,
      tags: ['business', 'prosperity', 'energized', 'yantra'],
      benefits: [
        'Increases business sales, profits, and turnover',
        'Removes obstacles and problems in business/career',
        'Attracts customers and opportunities',
        'Protection from negative energies, evil eye, and black magic',
        'Blessing from Lord Ganesha (remover of obstacles) and Goddess Lakshmi (wealth)',
        'Helps with debt relief and financial stability',
        'Suitable for new business ventures',
        'Beneficial for all professions, not just business owners'
      ],
      howToUse: [
        'Place facing East or North-East direction in office/shop/home',
        'Keep at a high, clean position away from visitors',
        'Offer daily incense and sandal paste',
        'Chant the Beej Mantra: "ॐ श्रीं ह्रीं क्लीं महालक्ष्मै नम:" (11 or 21 times)',
        'Perform regular worship for best results'
      ],
      installation: [
        'Purify with cow urine, Ganga water, and raw milk before installation',
        'Install on Wednesday morning after bath',
        'Light a lamp and offer yellow flowers',
        'Can be placed in office, shop, showroom, factory, or home puja room'
      ]
    }
  };
  
  return products[id] || null;
};

const ProductDetailPage = ({ params }: { params: { id: string } }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('standard');
  const [quantity, setQuantity] = useState(1);
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState('description');
  const [cartItems, setCartItems] = useState<string[]>([]);

  const product = getProductById(params.id);

  // Related products (same category)
  const relatedProducts = [
    {
      id: '1',
      name: 'Sacred Ganesha Idol',
      price: 2499,
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=600&fit=crop',
      rating: 4.8
    },
    {
      id: '2',
      name: 'Rudraksha Mala',
      price: 1899,
      image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=600&h=600&fit=crop',
      rating: 4.9
    },
    {
      id: '6',
      name: 'Silver Om Pendant',
      price: 3499,
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=600&fit=crop',
      rating: 4.9
    },
    {
      id: '7',
      name: 'Sampurna Vyapar Vridhi Yantra',
      price: 2499,
      image: '/images/yantra-main.jpg',
      rating: 4.9
    }
  ];

  // FAQ
  const faqs = [
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
  ];

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50/50 via-yellow-50/30 to-rose-50/50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Product Not Found</h1>
          <p className="text-gray-600 mb-8">The product you're looking for doesn't exist or has been removed.</p>
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
                {product.images.map((image: string, index: number) => (
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
                  onClick={() => setActiveTab('usage')}
                  className={`px-6 py-4 text-sm font-bold border-b-2 transition-colors duration-300 ${
                    activeTab === 'usage'
                      ? 'border-orange-500 text-orange-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  How to Use
                </button>
                <button
                  onClick={() => setActiveTab('reviews')}
                  className={`px-6 py-4 text-sm font-bold border-b-2 transition-colors duration-300 ${
                    activeTab === 'reviews'
                      ? 'border-orange-500 text-orange-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Reviews ({product.reviews})
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
                  <ul className="space-y-4">
                    {product.benefits.map((benefit: string, index: number) => (
                      <li key={index} className="flex items-start">
                        <div className="flex-shrink-0 w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center mr-4">
                          <span className="text-orange-600 font-bold">{index + 1}</span>
                        </div>
                        <span className="text-gray-600 text-lg">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              {activeTab === 'usage' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">How to Use</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-xl font-bold text-gray-800 mb-4">Daily Practice</h3>
                      <ul className="space-y-3">
                        {product.howToUse.map((step: string, index: number) => (
                          <li key={index} className="flex items-start">
                            <div className="flex-shrink-0 w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center mr-3 mt-0.5">
                              <span className="text-white text-xs font-bold">{index + 1}</span>
                            </div>
                            <span className="text-gray-600">{step}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-bold text-gray-800 mb-4">Installation Instructions</h3>
                      <ul className="space-y-3">
                        {product.installation.map((step: string, index: number) => (
                          <li key={index} className="flex items-start">
                            <div className="flex-shrink-0 w-6 h-6 bg-rose-500 rounded-full flex items-center justify-center mr-3 mt-0.5">
                              <span className="text-white text-xs font-bold">{index + 1}</span>
                            </div>
                            <span className="text-gray-600">{step}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
              
              {activeTab === 'reviews' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">Customer Reviews</h2>
                  <div className="space-y-6">
                    {/* Mock reviews - in a real app these would come from an API */}
                    <div className="border-b border-gray-200 pb-6 last:border-0 last:pb-0">
                      <div className="flex justify-between mb-2">
                        <h4 className="font-bold text-gray-800">Rajesh Kumar</h4>
                        <span className="text-sm text-gray-500">2023-10-15</span>
                      </div>
                      <div className="flex items-center mb-3">
                        {[...Array(5)].map((_, i) => (
                          <svg 
                            key={i} 
                            className={`w-5 h-5 ${i < 5 ? 'text-yellow-500' : 'text-gray-300'}`} 
                            fill="currentColor" 
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                          </svg>
                        ))}
                        <span className="ml-3 text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                          Verified Purchase
                        </span>
                      </div>
                      <p className="text-gray-600">Excellent product! I noticed positive changes in my business within a week of installation.</p>
                    </div>
                    
                    <div className="border-b border-gray-200 pb-6 last:border-0 last:pb-0">
                      <div className="flex justify-between mb-2">
                        <h4 className="font-bold text-gray-800">Priya Sharma</h4>
                        <span className="text-sm text-gray-500">2023-09-22</span>
                      </div>
                      <div className="flex items-center mb-3">
                        {[...Array(5)].map((_, i) => (
                          <svg 
                            key={i} 
                            className={`w-5 h-5 ${i < 4 ? 'text-yellow-500' : 'text-gray-300'}`} 
                            fill="currentColor" 
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                          </svg>
                        ))}
                        <span className="ml-3 text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                          Verified Purchase
                        </span>
                      </div>
                      <p className="text-gray-600">Highly recommended for anyone looking to improve their business prospects. Great quality and quick delivery.</p>
                    </div>
                  </div>
                  
                  <div className="mt-8 text-center">
                    <button className="px-6 py-3 bg-gradient-to-r from-orange-500 to-rose-500 text-white font-bold rounded-2xl hover:from-orange-600 hover:to-rose-600 transition-all duration-300">
                      Write a Review
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* FAQ Section */}
          <div className="mt-12 bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl p-8 border border-white/50">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
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
                .filter((item: any) => item.id !== product.id) // Don't show the current product
                .slice(0, 3) // Show only 3 related products
                .map((item: any) => (
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