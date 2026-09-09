import "./scripts/patch-next-dev-chunk-race.mjs";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Standardize build directory across dev and production to eliminate chunk mismatch
  distDir: ".next",
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.output = {
        ...config.output,
        chunkLoadTimeout: 120000,
      };
    }
    return config;
  },
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
