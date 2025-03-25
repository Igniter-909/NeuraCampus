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
      'wallpapercave.com',
      'placeholder.svg',
      'images.unsplash.com'],
    unoptimized: true
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
    // Enable specific features needed for proper build
    appDir: true,
    serverActions: true,
    serverComponentsExternalPackages: ['axios']
  },
  generateBuildId: async () => {
    return 'build-' + Date.now()
  },
  webpack: (config, { isServer }) => {
    // Add webpack optimization
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      };
    }
    return config;
  },
  pageExtensions: ['ts', 'tsx', 'js', 'jsx'],
}
export default nextConfig 