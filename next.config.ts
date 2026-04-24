import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "i.pravatar.cc",
      },
      {
        protocol: "https",
        hostname: "wlbxfwpszbrdifodklfp.supabase.co",
      },
      {
        protocol: "https",
        hostname: "api.dicebear.com",
      },
      {
        protocol: "https",
        hostname: "dashboard.myngaji.com",
      },
      {
        protocol: "https",
        hostname: "ui-avatars.com",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/api/external/:path*",
        destination: `${process.env.NEXT_PUBLIC_API_URL || 'https://dashboard.myngaji.com/api/public/v1'}/:path*`,
      },
    ];
  },
};

export default nextConfig;
