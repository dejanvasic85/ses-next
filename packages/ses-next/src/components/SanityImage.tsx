'use client';

import Image, { type ImageProps } from 'next/image';
import { sanityImageLoader } from '@/lib/sanityImageLoader';

type SanityImageProps = Omit<ImageProps, 'loader'>;

export function SanityImage(props: SanityImageProps) {
  return <Image {...props} loader={sanityImageLoader} />;
}
