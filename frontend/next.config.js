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
              "connect-src 'self' https://accounts.google.com",
              "frame-src 'self' https://accounts.google.com"
            ].join('; ')
          }
        ]
      }
    ]
  },
  // Other Next.js config options...
  reactStrictMode: true,
  swcMinify: true,
}

module.exports = nextConfig
