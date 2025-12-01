import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
      },
      {
        protocol: 'https',
        hostname: 'api.33kotidham.in',
      },
      {
        protocol: 'https',
        hostname: 'api.33kotidham.com',
      },
      {
        protocol: 'https',
        hostname: 'www.gujarattourism.com',
      },
      {
        protocol: 'https',
        hostname: 'www.tamilnadutourism.tn.gov.in',
      },
      {
        protocol: 'https',
        hostname: 'uttarakhandtourism.gov.in',
      },
      {
        protocol: 'https',
        hostname: 'www.varanasibest.com',
      },
    ],
  },
  experimental: {
    optimizePackageImports: ['@mui/material', '@mui/icons-material'],
  },
};

export default nextConfig;