import { readFileSync, writeFileSync, existsSync, mkdirSync, mkdir } from 'fs';
import { join } from 'path';

export const cache = async (read, write, factory) => {
  let data = await read();
  if (data) {
    console.log(`Cache: hit`);
    return data;
  }

  console.log('Cache: miss');
  data = await factory();
  await write(data);
  return data;
};

export const jsonFileCacher = async (key, factory) => {
  if (!existsSync(join(process.cwd(), 'cache'))) {
    mkdirSync(join(process.cwd(), 'cache'));
  }

  const path = join(process.cwd(), 'cache', `${key}.json`);

  return cache(
    () => {
      if (!existsSync(path)) {
        return null;
      }

      return JSON.parse(readFileSync(path, 'utf8'));
    },
    (data) => {
      writeFileSync(path, JSON.stringify(data, null, 2), { encoding: 'utf-8', flag: 'w' });
    },
    factory,
  );
};
