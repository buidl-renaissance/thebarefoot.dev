import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  images: {
    domains: [
      "dpop.nyc3.digitaloceanspaces.com",
      "nyc3.digitaloceanspaces.com",
    ],
  },
};

export default nextConfig;
