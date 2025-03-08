import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      'dxueqphl3.res.cloudinary.com',
      'res.cloudinary.com',
      'ui-avatars.com',
      'cdn.pixabay.com',
      'i.pinimg.com',
      'hebbkx1anhila5yf.public.blob.vercel-storage.com',
      'images.collegedunia.com',
      'images.collegedunia.com',
      'wallpapercave.com',
      'placeholder.svg',
      'images.unsplash.com',
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'wallpapercave.com',
        pathname: '/**',
      },
    ],
  },
  /* config options here */
};

export default nextConfig;
