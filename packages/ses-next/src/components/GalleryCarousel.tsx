import React from 'react';

import { SanityImage } from '@/components/SanityImage';

interface GalleryImage {
  serviceName: string;
  alt: string;
  src: string;
}

interface GalleryCarouselProps {
  imageGallery: GalleryImage[];
}

export function GalleryCarousel({ imageGallery }: GalleryCarouselProps) {
  return (
    <div className="flex w-full snap-x snap-mandatory gap-4 overflow-x-auto">
      {imageGallery.map(({ serviceName, alt, src }, idx) => (
        <div key={idx} className="shrink-0 snap-center snap-always first:pl-8 last:pr-8">
          <div className="relative py-8">
            <SanityImage
              alt={alt}
              className="h-60 w-80 shrink-0 rounded-lg bg-white object-cover shadow-xl lg:h-[300px] lg:w-[440px]"
              src={src}
              width={320}
              height={240}
            />
            <div className="relative flex w-full flex-col rounded-lg bg-white p-2 text-center">
              <span className="text-sm text-gray-500">{alt}</span>
              <span className="font-bold text-gray-800">{serviceName}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
