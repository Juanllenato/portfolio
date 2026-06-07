import type { NextConfig } from "next";

// Security headers applied to every response.
const securityHeaders = [
  // Stop the site being embedded in iframes (clickjacking protection)
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Content-Security-Policy", value: "frame-ancestors 'none'" },
  // Don't let browsers MIME-sniff responses
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Limit referrer leakage
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // Lock down powerful APIs — allow microphone for the voice chat, block the rest
  { key: "Permissions-Policy", value: "camera=(), geolocation=(), microphone=(self)" },
  // Opt into a strict origin isolation posture
  { key: "X-DNS-Prefetch-Control", value: "on" },
];

const nextConfig: NextConfig = {
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
