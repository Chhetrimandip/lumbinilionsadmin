import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  optimizeFonts: false,
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname:  'res.cloudinary.com',
        port: '',
        pathname: '/**',
      },
    ]}
};

export default nextConfig;
