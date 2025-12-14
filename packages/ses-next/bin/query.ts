import { config } from 'dotenv';

config({ path: '.env.local' });

(async () => {
  const { getSiteSettings } = await import('@/lib/content/contentService');

  const result = await getSiteSettings();
  console.log(JSON.stringify(result, null, 2));
})();
