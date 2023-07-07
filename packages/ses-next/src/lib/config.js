export const config = {
  awsAccessKeyId: process.env.SES_AWS_ACCESS_KEY_ID,
  awsSecretAccessKey: process.env.SES_AWS_SECRET_ACCESS_KEY,
  emailEnabled: process.env.EMAIL_ENABLED === 'true',
  emailFrom: process.env.EMAIL_FROM,
  emailTo: process.env.EMAIL_TO,
  googleTagManagerId: process.env.GTM_ID,
  googleRecaptchaSiteKey: process.env.RECAPTCHA_SITE_KEY,
  googleRecpatchaSecretKey: process.env.RECAPTCHA_SECRET_KEY,
  sanityProjectId: 'j7d3pd5g',
  sanityDataset: 'production',
};
