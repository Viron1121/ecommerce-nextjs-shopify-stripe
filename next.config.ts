import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["cdn.shopify.com"], // whitelist Shopify images
  },
  // other config options if you have
};

export default nextConfig;
