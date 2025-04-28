import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    API_URL: process.env.NEXT_PUBLIC_API_URL,
    SOCKET_URL: process.env.NEXT_PUBLIC_SOCKET_URL
  }
};

export default nextConfig;
