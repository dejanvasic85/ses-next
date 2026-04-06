import type { NextConfig } from 'next';
import bundleAnalyzer from '@next/bundle-analyzer';

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig: NextConfig = {
  images: {
    deviceSizes: [640, 828, 1200],
    imageSizes: [48, 128, 256],
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

export default withBundleAnalyzer(nextConfig);
