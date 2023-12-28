/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'santaisabel.vtexassets.com'
      },
      {
        protocol: 'https',
        hostname: 'jumbo.vtexassets.com'
      }
    ]
  }
}

module.exports = nextConfig
