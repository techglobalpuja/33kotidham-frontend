'use client';

import React from 'react';
import Link from 'next/link';

const GlobalFooter: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-12 w-full">
      <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4 text-orange-400">Quick Links</h3>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/" className="hover:text-orange-400 transition-colors">Home</Link></li>
              <li><Link href="/about" className="hover:text-orange-400 transition-colors">About Us</Link></li>
              <li><Link href="/pujas" className="hover:text-orange-400 transition-colors">All Pujas</Link></li>
              <li><Link href="/contact" className="hover:text-orange-400 transition-colors">Contact</Link></li>
              <li><Link href="/feedback" className="hover:text-orange-400 transition-colors">Feedback</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4 text-orange-400">Services</h3>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/pujas" className="hover:text-orange-400 transition-colors">Online Puja</Link></li>
              <li><Link href="/chadawa-store" className="hover:text-orange-400 transition-colors">Temple Visits</Link></li>
              <li><Link href="/horoscope" className="hover:text-orange-400 transition-colors">Astrology</Link></li>
              <li><Link href="/store" className="hover:text-orange-400 transition-colors">E-Store</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4 text-orange-400">Connect</h3>
            <ul className="space-y-2 text-gray-400">
              <li className="flex items-center gap-2">
                <span>📧</span> info@33kotidham.com
              </li>
              <li className="flex items-center gap-2">
                <span>📱</span> +91 98765 43210
              </li>
              <li className="flex items-center gap-2">
                <span>📍</span> Gujrat, India
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4 text-orange-400">Follow Us</h3>
            <div className="flex gap-3">
              <Link href="https://facebook.com" target="_blank" className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center hover:bg-orange-600 transition-colors">
                <span className="font-bold">f</span>
              </Link>
              <Link href="https://twitter.com" target="_blank" className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center hover:bg-orange-600 transition-colors">
                <span className="font-bold">𝕏</span>
              </Link>
              <Link href="https://linkedin.com" target="_blank" className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center hover:bg-orange-600 transition-colors">
                <span className="font-bold">in</span>
              </Link>
              <Link href="https://instagram.com" target="_blank" className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center hover:bg-orange-600 transition-colors">
                <span className="font-bold">📷</span>
              </Link>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2025 33 Koti Dham. All rights reserved. Made with devotion 🙏</p>
        </div>
      </div>
    </footer>
  );
};

export default GlobalFooter;
