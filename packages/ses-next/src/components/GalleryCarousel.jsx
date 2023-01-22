import React from 'react';

import Image from 'next/image';

export function GalleryCarousel({ imageGallery }) {
  return (
    <div className="w-full flex gap-4 snap-x snap-mandatory overflow-x-auto">
      {imageGallery.map(({ serviceName, alt, src }, idx) => (
        <div key={idx} className="snap-always snap-center shrink-0 first:pl-8 last:pr-8">
          <div className="relative py-8">
            <Image
              alt={alt}
              className="shrink-0 w-80 h-60 lg:w-[440px] lg:h-[300px] object-cover rounded-lg shadow-xl bg-white"
              src={src}
              width={320}
              height={240}
            />
            <div className="w-full flex flex-col bg-white text-center rounded-lg relative p-2">
              <span className="text-gray-500 text-sm">{alt}</span>
              <span className="text-gray-800 font-bold">{serviceName}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
