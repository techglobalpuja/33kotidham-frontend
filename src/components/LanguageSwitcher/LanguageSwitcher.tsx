'use client';

import React, { useState, useRef, useEffect } from 'react';
import { parseCookies, setCookie } from 'nookies';

// Google translation cookie name
const COOKIE_NAME = 'googtrans';

// Language descriptor interface
interface LanguageDescriptor {
  name: string;
  title: string;
}
 
// Global declaration for Google translation config
declare global {
  namespace globalThis {
    var __GOOGLE_TRANSLATION_CONFIG__: {
      languages: LanguageDescriptor[];
      defaultLanguage: string;
    };
  }
}

const LanguageSwitcher: React.FC = () => {
  const [currentLanguage, setCurrentLanguage] = useState<string>();
  const [languageConfig, setLanguageConfig] = useState<any>();
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const languageDropdownRef = useRef<HTMLDivElement>(null);

  // Initialize language settings
  useEffect(() => {
    const cookies = parseCookies();
    const existingLanguageCookieValue = cookies[COOKIE_NAME];

    let languageValue;
    if (existingLanguageCookieValue) {
      const sp = existingLanguageCookieValue.split('/');
      if (sp.length > 2) {
        languageValue = sp[2];
      }
    }
    if (global.__GOOGLE_TRANSLATION_CONFIG__ && !languageValue) {
      languageValue = global.__GOOGLE_TRANSLATION_CONFIG__.defaultLanguage;
    }
    if (languageValue) {
      setCurrentLanguage(languageValue);
    }
    if (global.__GOOGLE_TRANSLATION_CONFIG__) {
      setLanguageConfig(global.__GOOGLE_TRANSLATION_CONFIG__);
    }
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        showLanguageDropdown &&
        languageDropdownRef.current &&
        !languageDropdownRef.current.contains(event.target as Node)
      ) {
        setShowLanguageDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showLanguageDropdown]);

  // Function to switch language
  const switchLanguage = (lang: string) => {
    setCookie(null, COOKIE_NAME, '/auto/' + lang);
    setCurrentLanguage(lang);
    setShowLanguageDropdown(false);
    window.location.reload();
  };

  // Don't display anything if language information is unavailable
  if (!currentLanguage || !languageConfig) {
    return null;
  }

  // Get the display title for the current language
  const currentLanguageTitle =
    languageConfig.languages.find(
      (ld: LanguageDescriptor) =>
        ld.name === currentLanguage ||
        (currentLanguage === 'auto' && ld.name === languageConfig.defaultLanguage)
    )?.title || 'Language';

  return (
    <div className="relative" ref={languageDropdownRef}>
      <button
        onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
        className="px-4 py-2 rounded-full font-medium uppercase text-sm transition-all bg-transparent text-[#000923] hover:bg-orange-100 hover:text-orange-500 flex items-center gap-1"
      >
        <span>{currentLanguageTitle}</span>
        <svg
          className={`w-3 h-3 transition-transform duration-300 ${showLanguageDropdown ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Language Dropdown */}
      {showLanguageDropdown && (
        <div className="absolute top-12 right-0 w-40 rounded-xl shadow-2xl border overflow-hidden z-50 transition-all duration-300 bg-white/95 border-orange-200">
          <div className="py-1">
            {languageConfig.languages.map((ld: LanguageDescriptor, index: number) => (
              <button
                key={index}
                onClick={() => switchLanguage(ld.name)}
                className={`w-full px-4 py-2 text-left hover:bg-orange-50 transition-all duration-200 flex items-center gap-2 text-sm
                  ${
                    currentLanguage === ld.name ||
                    (currentLanguage === 'auto' && languageConfig.defaultLanguage === ld.name)
                      ? 'text-orange-600 font-semibold'
                      : 'text-orange-500 hover:text-orange-600'
                  }`}
              >
                {ld.title}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
export { COOKIE_NAME };