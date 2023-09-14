/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    API_ENDPOINT: 'https://rincon-del-curao-api-v2-unnunoctio-org.koyeb.app/',
    API_KEY: '7b6c806f-4923-4e35-9458-8877598e2b62'
  },
  images: {
    domains: [
      'santaisabel.vtexassets.com',
      'jumbo.vtexassets.com',
      'assets.jumbo.cl',
      'assets.santaisabel.cl'
    ]
  }
}

module.exports = nextConfig
