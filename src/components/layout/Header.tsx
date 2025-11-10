  'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';
import { useAppSelector, useAppDispatch } from '@/hooks';
import { setLoginModalOpen, setMobileMenuOpen } from '@/store/slices/uiSlice';
import { logout } from '@/store/slices/authSlice';
import OtpLoginModal from '@/components/modals/OtpLoginModal';
import LanguageSwitcher from '@/components/LanguageSwitcher/LanguageSwitcher';

const Header: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const { isMobileMenuOpen } = useAppSelector((state) => state.ui);
  const { user } = useAppSelector((state) => state.auth);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  // const [isScrolled, setIsScrolled] = useState(false);
  const [activeMenuItem, setActiveMenuItem] = useState('Home');
  const [showMoreDropdown, setShowMoreDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Handle scroll effect for glassmorphism
  // useEffect(() => {
  //   const handleScroll = () => {
  //     const scrollPosition = window.scrollY;
  //     setIsScrolled(scrollPosition > 50);
  //   };

  //   window.addEventListener('scroll', handleScroll);
  //   return () => {
  //     window.removeEventListener('scroll', handleScroll);
  //   };
  // }, []);

  // Close mobile menu and dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isMobileMenuOpen &&
        mobileMenuRef.current &&
        hamburgerRef.current &&
        !mobileMenuRef.current.contains(event.target as Node) &&
        !hamburgerRef.current.contains(event.target as Node)
      ) {
        dispatch(setMobileMenuOpen(false));
      }

      if (
        showMoreDropdown &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowMoreDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMobileMenuOpen, showMoreDropdown, dispatch]);

  // Update active menu item based on pathname
  useEffect(() => {
    if (pathname === '/') {
      setActiveMenuItem('Home');
    } else if (pathname?.startsWith('/puja') || pathname?.startsWith('/pujas')) {
      setActiveMenuItem('Puja');
    } else if (pathname?.startsWith('/horoscope')) {
      setActiveMenuItem('Horoscope');
    } else if (pathname?.startsWith('/chadawa-store')) {
      setActiveMenuItem('Chadawa');
    } 
    // else if (pathname?.startsWith('/store')) {
    //   setActiveMenuItem('Store');
    // } 
    else if (
      pathname?.startsWith('/about') ||
      pathname?.startsWith('/panchang') ||
      pathname?.startsWith('/free-kundli') ||
      pathname?.startsWith('/match-making') ||
      pathname?.startsWith('/numerology') ||
      pathname?.startsWith('/contact') ||
      pathname?.startsWith('/blog') ||
      pathname?.startsWith('/ask-question') ||
      pathname?.startsWith('/astro-watch') ||
      pathname?.startsWith('/manglik-dosh') ||
      pathname?.startsWith('/kaalsarp-dosh') ||
      pathname?.startsWith('/astro-tools') ||
      pathname?.startsWith('/career')
    ) {
      setActiveMenuItem('More');
    }
  }, [pathname]);

  // Dropdown menu items
  const moreMenuItems = [
    // { name: 'Panchang', href: '/panchang', icon: '📅' },
    // { name: 'Free Kundli', href: '/free-kundli', icon: '🔮' },
    // { name: 'Match Making', href: '/match-making', icon: '💕' },
    // { name: 'Numerology', href: '/numerology', icon: '🔢' },
    // { name: 'Astro Tools', href: '/astro-tools', icon: '🛠️' },
    // { name: 'Ask Question', href: '/ask-question', icon: '❓' },
    // { name: 'Career', href: '/career', icon: '💼' },
    { name: 'Blog', href: '/blog', icon: '📚' },
    { name: 'Contact', href: '/contact', icon: '📞' },
  ];

  const menuItems = [
    { name: 'Home', href: '/', active: activeMenuItem === 'Home' },
    { name: 'Puja', href: '/pujas', active: activeMenuItem === 'Puja' },
    { name: 'Horoscope', href: '/horoscope', active: activeMenuItem === 'Horoscope' },
    // { name: 'Store', href: '/store', active: activeMenuItem === 'Store' },
    { name: 'Chadawa', href: '/chadawa-store', active: activeMenuItem === 'Chadawa' },
    { name: 'More', href: '/about', active: activeMenuItem === 'More' },
  ];

  const handleMenuItemClick = (href: string, name: string) => {
    setActiveMenuItem(name);
    setShowMoreDropdown(false);
    router.push(href);
    if (isMobileMenuOpen) {
      dispatch(setMobileMenuOpen(false));
    }
  };

  const handleMoreClick = () => {
    setShowMoreDropdown(!showMoreDropdown);
  };

  const handleLogout = () => {
    dispatch(logout());
    router.push('/');
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-[100] w-full flex justify-center items-center py-6 bg-transparent">
      <div className="w-full max-w-7xl flex items-center justify-between px-2 sm:px-4">
        {/* Logo Section */}
        <div className="flex items-center">
          <button onClick={() => router.push('/')} className="cursor-pointer">
            <Image
              src="/images/logo.webp"
              alt="Logo Text"
              width={100}
              height={18}
              className="w-36 h-8"
              priority
            />
          </button>
        </div>

        {/* Desktop Navigation */}
        <div className="rounded-full p-[1px] bg-gradient-to-r from-orange-400 to-orange-500 shadow-md">
          <div className="flex items-center rounded-full" style={{ background: '#FFF0E9' }}>
            <nav className="hidden lg:flex items-center justify-between w-full">
              {menuItems.slice(0, 4).map((item, index) => (
                <div key={index} className="relative">
                  <button
                    onClick={() => handleMenuItemClick(item.href, item.name)}
                    className={`px-6 py-3 rounded-full font-regular uppercase text-sm transition-all
                      ${item.active
                        ? 'bg-gradient-to-r from-orange-400 to-orange-500 font-semibold text-white shadow border border-orange-400'
                        : 'bg-transparent text-[#000923] font-medium hover:bg-orange-100 hover:text-orange-500'}
                    `}
                  >
                    {item.name}
                  </button>
                </div>
              ))}

              {/* More Dropdown */}
              <div className="relative" ref={dropdownRef}>
                <div className="relative">
                  <button
                    onClick={handleMoreClick}
                    className={`px-6 py-3 rounded-full font-regular uppercase text-sm transition-all
                      ${activeMenuItem === 'More'
                        ? 'bg-gradient-to-r from-orange-400 to-orange-500 font-semibold text-white shadow border border-orange-400'
                        : 'bg-transparent text-[#000923] font-medium hover:bg-orange-100 hover:text-orange-500'}
                    `}
                  >
                    <span className="flex items-center">
                      More
                      <svg
                        className={`w-3 h-3 ml-1 transition-transform duration-300 ${showMoreDropdown ? 'rotate-180' : ''}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </span>
                  </button>
                </div>

                {/* Dropdown Menu */}
                {showMoreDropdown && (
                  <div className="absolute top-12 right-0 w-52 rounded-xl shadow-2xl border overflow-hidden z-[101] transition-all duration-300 bg-white/95 border-orange-200">
                    <div className="py-1">
                      {moreMenuItems.map((item, index) => (
                        <button
                          key={index}
                          onClick={() => handleMenuItemClick(item.href, item.name)}
                          className="w-full px-4 py-2 text-left hover:bg-orange-50 transition-all duration-200 flex items-center gap-2 text-orange-500 hover:text-orange-600 text-sm"
                        >
                          <span className="text-base">{item.icon}</span>
                          <span className="font-medium">{item.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </nav>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-3 ml-4">
          {/* Language Switcher */}
           <LanguageSwitcher /> 

          {/* User Profile or Login Button */}
          {user?.isAuthenticated ? (
            <div className="flex items-center gap-3">
              <button
                onClick={() => router.push('/dashboard')}
                className="hidden sm:flex items-center gap-2 px-6 py-4 rounded-full bg-gradient-to-r from-orange-400 to-orange-500 text-white font-bold uppercase text-sm shadow hover:scale-105 transition-all"
              >
                <div className="w-6 h-6 rounded-full bg-gradient-to-r from-orange-400 to-orange-500 flex items-center justify-center text-white text-xs font-bold">
                  {(user?.name || 'User')?.charAt(0)?.toUpperCase() || 'U'}
                </div>
                <span className="text-sm font-['Work_Sans'] capitalize">{user?.name || 'User'}</span>
              </button>
              <button
                onClick={handleLogout}
                className="hidden sm:flex items-center gap-2 px-6 py-4 rounded-full bg-gradient-to-r from-red-400 to-red-500 text-white font-bold uppercase text-sm shadow hover:scale-105 transition-all"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Logout
              </button>
              <button
                onClick={() => router.push('/dashboard')}
                className="sm:hidden flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-orange-400 to-orange-500 text-white shadow hover:scale-105 transition-all"
              >
                <div className="w-6 h-6 rounded-full bg-gradient-to-r from-orange-400 to-orange-500 flex items-center justify-center text-white text-xs font-bold">
                  {(user?.name || 'User')?.charAt(0)?.toUpperCase() || 'U'}
                </div>
              </button>
              <button
                onClick={handleLogout}
                className="sm:hidden flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-red-400 to-red-500 text-white shadow hover:scale-105 transition-all"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
              </button>
            </div>
          ) : (
            <button
              className="hidden sm:flex items-center gap-2 px-6 py-4 rounded-full bg-gradient-to-r from-orange-400 to-orange-500 text-white font-bold uppercase text-sm shadow hover:scale-105 transition-all"
              onClick={() => dispatch(setLoginModalOpen(true))}
            >
              <Image
                src="/images/img_vector.svg"
                alt="Login Icon"
                width={12}
                height={12}
                className="w-3 h-3 sm:w-4 sm:h-4"
              />
              Login
              <Image
                src="/images/img_vector.svg"
                alt="Arrow"
                width={12}
                height={12}
                className="w-3 h-3 sm:w-4 sm:h-4"
              />
            </button>
          )}

          {/* Mobile Menu Button */}
          <button
            ref={hamburgerRef}
            className="lg:hidden flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-orange-400 to-orange-500 text-white shadow hover:scale-105 transition-all"
            onClick={() => dispatch(setMobileMenuOpen(!isMobileMenuOpen))}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <nav
        ref={mobileMenuRef}
        className={`fixed top-20 left-0 right-0 mx-auto max-w-xs w-full z-[101] rounded-2xl shadow-lg bg-white/95 border border-orange-200 transition-all duration-300
          ${isMobileMenuOpen ? 'block animate-fadeIn' : 'hidden'}
        `}
      >
        <div className="flex flex-col items-center py-6">
          {menuItems.map((item, index) => (
            <div key={index} className="relative w-full flex justify-center">
              <button
                onClick={() => handleMenuItemClick(item.href, item.name)}
                className={`w-4/5 my-2 px-4 py-2 rounded-full font-bold uppercase text-base transition-all
                  ${item.active
                    ? 'bg-gradient-to-r from-orange-400 to-orange-500 text-white shadow'
                    : 'bg-white text-orange-500 border border-orange-200 hover:bg-orange-50'}
                `}
              >
                {item.name}
              </button>
            </div>
          ))}

          {/* Mobile More Section */}
          <div className="border-t border-orange-200 pt-4 mt-4 w-4/5">
            {/* <div className="text-sm font-bold text-orange-500 px-4 py-2 uppercase tracking-wide text-center">
              More Options
            </div> */}
            {moreMenuItems.map((item, index) => (
              <div key={index} className="relative w-full flex justify-center">
                <button
                  onClick={() => handleMenuItemClick(item.href, item.name)}
                  className="w-4/5 my-2 px-4 py-2 rounded-full font-bold uppercase text-base transition-all bg-white text-orange-500 border border-orange-200 hover:bg-orange-50 flex items-center justify-center gap-3"
                >
                  <span className="text-base">{item.icon}</span>
                  {item.name}
                </button>
              </div>
            ))}
          </div>

          {/* Mobile Language Switcher */}
          {/* <div className="w-4/5 mt-4">
            <LanguageSwitcher />
          </div> */}

          {/* Mobile Login/Profile Button */}
          {user?.isAuthenticated ? (
            <div className="w-4/5 mt-4 space-y-3">
              <button
                onClick={() => router.push('/dashboard')}
                className="w-full px-4 py-2 rounded-full bg-gradient-to-r from-orange-400 to-orange-500 text-white font-bold uppercase text-base shadow hover:scale-105 transition-all"
              >
                <div className="flex items-center justify-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-r from-orange-400 to-orange-500 flex items-center justify-center text-white text-xs font-bold">
                    {(user?.name || 'User')?.charAt(0)?.toUpperCase() || 'U'}
                  </div>
                  <span className="capitalize">{user?.name || 'User'}</span>
                </div>
              </button>
              <button
                onClick={handleLogout}
                className="w-full px-4 py-2 rounded-full bg-gradient-to-r from-red-400 to-red-500 text-white font-bold uppercase text-base shadow hover:scale-105 transition-all flex items-center justify-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Logout
              </button>
            </div>
          ) : (
            <button
              className="w-4/5 mt-4 px-4 py-2 rounded-full bg-gradient-to-r from-orange-400 to-orange-500 text-white font-bold uppercase text-base shadow hover:scale-105 transition-all"
              onClick={() => dispatch(setLoginModalOpen(true))}
            >
              <div className="flex items-center justify-center gap-2">
                <Image
                  src="/images/img_vector.svg"
                  alt="Login Icon"
                  width={12}
                  height={12}
                  className="w-3 h-3 sm:w-4 sm:h-4"
                />
                Login
                <Image
                  src="/images/img_vector.svg"
                  alt="Arrow"
                  width={12}
                  height={12}
                  className="w-3 h-3 sm:w-4 sm:h-4"
                />
              </div>
            </button>
          )}
        </div>
      </nav>

      {/* OTP Login Modal */}
      <OtpLoginModal />
    </header>
  );
};

export default Header;