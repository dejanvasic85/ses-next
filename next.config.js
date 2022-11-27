/** @type {import('next').NextConfig} */
const nextConfig = {
  serverRuntimeConfig: {
    awsAccessKeyId: process.env.SES_AWS_ACCESS_KEY_ID,
    awsSecretAccessKey: process.env.SES_AWS_SECRET_ACCESS_KEY,
    emailFrom: process.env.EMAIL_FROM,
    emailTo: process.env.EMAIL_TO,
  },
  reactStrictMode: true,
};

module.exports = nextConfig;
