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
    ],
  },
  publicRuntimeConfig: {
    googleTagManagerId: process.env.GTM_ID,
    googleRecaptchaSiteKey: process.env.RECAPTCHA_SITE_KEY,
  },
  reactStrictMode: true,
};

module.exports = withBundleAnalyzer(nextConfig);
