/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        // Apply these headers to all routes in your application
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://accounts.google.com",
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data: https: http:",
              "font-src 'self' data:",
              "connect-src 'self' https://accounts.google.com https://*.googleapis.com",
              "frame-src 'self' https://accounts.google.com"
            ].join('; ')
          },
          {
            key: 'Access-Control-Allow-Credentials',
            value: 'true'
          },
          {
            key: 'Access-Control-Allow-Origin',
            value: 'https://url-shortener-beta-lemon.vercel.app'
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT'
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-V, Authorization'
          }
        ]
      }
    ]
  },
  // Required for NextAuth.js
  experimental: {
    serverActions: true,
  },
  // Handle API routes
  async rewrites() {
    return [
      {
        source: '/api/auth/:path*',
        destination: '/api/auth/:path*',
      },
    ]
  },
  // Other Next.js config options...
  reactStrictMode: true,
  swcMinify: true,
  // For production deployments
  output: 'standalone',
}

module.exports = nextConfig
