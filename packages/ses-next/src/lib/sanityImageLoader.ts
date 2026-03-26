import { type ImageLoaderProps } from 'next/image';

export const sanityImageLoader = ({ src, width, quality }: ImageLoaderProps): string => {
  const url = new URL(src);
  url.searchParams.set('w', String(width));
  url.searchParams.set('q', String(quality ?? 75));
  url.searchParams.set('auto', 'format');
  return url.toString();
};
