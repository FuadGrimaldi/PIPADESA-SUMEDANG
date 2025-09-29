/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["images.unsplash.com", "cdn.tailgrids.com"],
    unoptimized: true, // hindari optimisasi Next.js
  },
};

export default nextConfig;
