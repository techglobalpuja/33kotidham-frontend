import React from 'react';
import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import ReduxProvider from '@/providers/ReduxProvider';
import AuthInitializer from '@/components/AuthInitializer';
import '@/styles/globals.css';
import '@/styles/translate.css';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: '33KotiDham - पूजा एवं ज्योतिष सेवाएं',
  description: 'Trusted by millions of devotees for authentic puja and astrology services',
  icons: {
    icon: '/favicon.ico',
  },
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <head>
        <Script src="/assets/scripts/lang-config.js" strategy="beforeInteractive" />
        <Script src="/assets/scripts/translation.js" strategy="beforeInteractive" />
        <Script
          src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
          strategy="afterInteractive"
        />
        <Script
          id="hide-google-translate"
          dangerouslySetInnerHTML={{
            __html: `
              // Hide Google Translate bar immediately
              window.addEventListener('load', function() {
                const hideGoogleTranslate = () => {
                  const elements = [
                    '.goog-te-banner-frame',
                    '.goog-te-menu-frame',
                    '#google_translate_element'
                  ];
                  
                  elements.forEach(selector => {
                    const elements = document.querySelectorAll(selector);
                    elements.forEach(el => {
                      if (el) {
                        el.style.display = 'none';
                        el.style.visibility = 'hidden';
                      }
                    });
                  });
                  
                  // Also hide by moving off-screen
                  const style = document.createElement('style');
                  style.innerHTML = \`
                    .goog-te-banner-frame { display: none !important; }
                    #google_translate_element { display: none !important; }
                    .skiptranslate { display: none !important; }
                    body { top: 0px !important; }
                  \`;
                  document.head.appendChild(style);
                };
                
                // Run immediately
                hideGoogleTranslate();
                
                // Run again after a delay to catch any delayed elements
                setTimeout(hideGoogleTranslate, 100);
                setTimeout(hideGoogleTranslate, 500);
                setTimeout(hideGoogleTranslate, 1000);
              });
            `,
          }}
        />
      </head>
      <body className="antialiased">
        <div id="google_translate_element" className="hidden absolute -top-96 -left-96" />
        <ReduxProvider>
          <AuthInitializer />
          {children}
        </ReduxProvider>
      </body>
    </html>
  );
}