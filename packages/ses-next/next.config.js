/** @type {import('next').NextConfig} */

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig = {
  images: {
    domains: [`cdn.sanity.io`],
  },
  reactStrictMode: true,
};

module.exports = withBundleAnalyzer(nextConfig);
