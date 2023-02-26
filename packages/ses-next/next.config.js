/** @type {import('next').NextConfig} */

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig = {
  images: {
    domains: [`cdn.sanity.io`],
  },
  publicRuntimeConfig: {
    googleTagManagerId: process.env.GTM_ID,
  },
  serverRuntimeConfig: {
    awsAccessKeyId: process.env.SES_AWS_ACCESS_KEY_ID,
    awsSecretAccessKey: process.env.SES_AWS_SECRET_ACCESS_KEY,
    emailEnabled: process.env.EMAIL_ENABLED === 'true',
    emailFrom: process.env.EMAIL_FROM,
    emailTo: process.env.EMAIL_TO,
  },
  reactStrictMode: true,
};

module.exports = withBundleAnalyzer(nextConfig);
