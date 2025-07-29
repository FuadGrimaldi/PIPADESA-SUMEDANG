/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    allowedDevOrigins: ["*.localhost:3000", "*.localhost"],
  },
};

export default nextConfig;
