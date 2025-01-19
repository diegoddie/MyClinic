import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb", 
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "eneuxfikrdaxigjdlpah.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/avatar/**",
      },
    ],
  },

};

export default nextConfig;
