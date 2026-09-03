/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // All external media is re-hosted into /public/images by scripts/fetch-content.mjs,
  // so no remote image patterns are required.
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
