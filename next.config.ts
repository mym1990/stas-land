import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      // Standalone HCI prototype served from public/, outside the blog layout.
      {
        source: "/time-off",
        destination: "/prototypes/time-off-assistant.html",
      },
    ];
  },
};

export default nextConfig;
