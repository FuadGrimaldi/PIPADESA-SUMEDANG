/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    allowedDevOrigins: ["*.localhost:3000", "*.localhost"],
  },
  images: {
    domains: ["images.unsplash.com", "cdn.tailgrids.com"],
  },
};

export default nextConfig;
