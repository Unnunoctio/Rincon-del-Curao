/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'assets.rincondelcurao.cl',
      }
    ]
  }
};

export default nextConfig;
