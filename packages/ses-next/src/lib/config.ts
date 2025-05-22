import { z } from 'zod';

// Define the Zod schema for configuration validation
const AppConfigSchema = z.object({
  awsAccessKeyId: z.string(),
  awsSecretAccessKey: z.string(),
  emailEnabled: z.boolean(),
  emailFrom: z.string(),
  emailTo: z.string(),
  googleTagManagerId: z.string().optional(),
  googleRecaptchaSiteKey: z.string().optional(),
  googleRecaptchaSecretKey: z.string().optional(),
  sanityProjectId: z.string(),
  sanityDataset: z.string(),
});

// Type derived from the schema
type AppConfig = z.infer<typeof AppConfigSchema>;

// Raw configuration object
const rawConfig = {
  awsAccessKeyId: process.env.SES_AWS_ACCESS_KEY_ID,
  awsSecretAccessKey: process.env.SES_AWS_SECRET_ACCESS_KEY,
  emailEnabled: process.env.EMAIL_ENABLED === 'true',
  emailFrom: process.env.EMAIL_FROM,
  emailTo: process.env.EMAIL_TO,
  googleTagManagerId: process.env.GTM_ID,
  googleRecaptchaSiteKey: process.env.RECAPTCHA_SITE_KEY,
  googleRecaptchaSecretKey: process.env.RECAPTCHA_SECRET_KEY,
  sanityProjectId: 'j7d3pd5g',
  sanityDataset: 'production',
};

// Cache for the parsed config
let configCache: AppConfig | null = null;

/**
 * Parses and validates the application configuration
 * @returns The validated application configuration
 */
export function getConfig(): AppConfig {
  if (configCache) {
    return configCache;
  }

  console.log('Parsing and validating config...', rawConfig);

  const parsedConfig = AppConfigSchema.parse(rawConfig);

  configCache = Object.freeze(parsedConfig);

  return configCache;
}
export const config = rawConfig;
