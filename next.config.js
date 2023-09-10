/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    RDC_BACKEND: 'https://rincon-del-curao-api.onrender.com',
    API_KEY: '7b6c806f-4923-4e35-9458-8877598e2b62'
  },
  images: {
    domains: [
      'jumbo.vtexassets.com',
      'santaisabel.vtexassets.com',
      'assets.jumbo.cl',
      'assets.santaisabel.cl'
    ]
  }
}

module.exports = nextConfig
