import { config } from 'dotenv';

config({ path: '.env.local' });

(async () => {
  const { getServices } = await import('@/lib/content/contentService');

  const result = await getServices();
  console.log(JSON.stringify(result, null, 2));
})();
