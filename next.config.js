/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'santaisabel.vtexassets.com' },
      { protocol: 'https', hostname: 'jumbo.vtexassets.com' },
      { protocol: 'https', hostname: 'assets.jumbo.cl' },
      { protocol: 'https', hostname: 'assets.santaisabel.cl' },
      { protocol: 'https', hostname: 'images.lider.cl' },
      { protocol: 'https', hostname: 'www.walmartchile.cl' }
    ]
  }
}

module.exports = nextConfig
