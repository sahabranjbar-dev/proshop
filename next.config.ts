import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    // allow loading images from this remote host
    domains: ["storage.c2.liara.space"],
  },
};

export default nextConfig;
