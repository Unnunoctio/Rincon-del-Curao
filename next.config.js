/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'res.cloudinary.com' },
      // logos
      { protocol: 'https', hostname: 'assets.jumbo.cl' },
      { protocol: 'https', hostname: 'assets.santaisabel.cl' },
      { protocol: 'https', hostname: 'www.walmartchile.cl' }
    ]
  }
}

module.exports = nextConfig
