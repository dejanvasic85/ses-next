import { readFileSync, writeFileSync, existsSync, mkdirSync, mkdir } from 'fs';
import { join } from 'path';

type CacheRead<T> = () => Promise<T | null>;
type CacheWrite<T> = (data: T) => Promise<void> | void;
type CacheFactory<T> = () => Promise<T>;

export const cache = async <T>(
  read: CacheRead<T>,
  write: CacheWrite<T>,
  factory: CacheFactory<T>
): Promise<T> => {
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

export const jsonFileCacher = async <T>(key: string, factory: CacheFactory<T>): Promise<T> => {
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
    (data: T) => {
      writeFileSync(path, JSON.stringify(data, null, 2), { encoding: 'utf-8', flag: 'w' });
    },
    factory,
  );
};
