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
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/services/catering-maintenance',
        destination: '/services',
        permanent: true,
      },
      {
        source: '/services/telecommunications',
        destination: '/services/data-and-tv',
        permanent: true,
      },
    ];
  },
};

module.exports = withBundleAnalyzer(nextConfig);
