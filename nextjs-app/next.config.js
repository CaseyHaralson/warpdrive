/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.imgbox.com'
      },
      {
        protocol: 'https',
        hostname: '**.imgur.com'
      }
    ]
  }
}

module.exports = nextConfig
