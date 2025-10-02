import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable output standalone for better Vercel deployment
  output: 'standalone',
  
  // Configure rewrites for backend API calls only (exclude NextAuth routes)
  async rewrites() {
    return [
      {
        source: '/api/backend/:path*',
        destination: `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/:path*`,
      },
    ];
  },
  
  // Ensure proper routing for dynamic pages
  trailingSlash: false,
};

export default nextConfig;
