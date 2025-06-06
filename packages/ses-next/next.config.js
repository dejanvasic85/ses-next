/** @type {import('next').NextConfig} */

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
      {
        protocol: 'https',
        hostname: '**.googleusercontent.com',
      },
    ],
  },
  publicRuntimeConfig: {
    googleTagManagerId: process.env.GTM_ID,
    googleRecaptchaSiteKey: process.env.RECAPTCHA_SITE_KEY,
  },
  reactStrictMode: true,
  // Ensure paths alias works properly with TypeScript
  webpack(config) {
    return config;
  },
};

module.exports = withBundleAnalyzer(nextConfig);
