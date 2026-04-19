const createNextIntlPlugin = require("next-intl/plugin");

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");
const supabaseHostname = process.env.NEXT_PUBLIC_SUPABASE_URL
  ? new URL(process.env.NEXT_PUBLIC_SUPABASE_URL).hostname
  : null;

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  experimental: {
    instrumentationHook: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      ...(supabaseHostname ? [
        {
          protocol: "https",
          hostname: supabaseHostname,
        },
      ] : []),
    ],
  },
};

module.exports = withNextIntl(nextConfig);
