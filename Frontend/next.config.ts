/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['dxueqphl3.res.cloudinary.com',
      'res.cloudinary.com',
      'ui-avatars.com',
      'cdn.pixabay.com',
      'i.pinimg.com',
      'hebbkx1anhila5yf.public.blob.vercel-storage.com',
      'images.collegedunia.com',
      'images.collegedunia.com',
      'wallpapercave.com',
      'placeholder.svg',
      'images.unsplash.com'],
  },
  serverExternalPackages: ['axios'],
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  output: 'standalone',
  experimental: {
    // Remove any experimental features that aren't needed
  },
  pageExtensions: ['ts', 'tsx', 'js', 'jsx'],
}
export default nextConfig 