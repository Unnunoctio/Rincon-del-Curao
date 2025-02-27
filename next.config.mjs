/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'assets.rincondelcurao.com',
      }
    ]
  }
};

export default nextConfig;
