'use client';

import { Activity } from 'react';
import { useState, useCallback, useEffect } from 'react';
import Image from 'next/image';

import { sanityImageLoader } from '@/lib/sanityImageLoader';

interface ImageCarouselProps {
  images: Array<{
    alt: string;
    src: string;
  }>;
  serviceName?: string;
}

export function ImageCarousel({ images, serviceName }: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const goToNext = useCallback(() => {
    if (isTransitioning || currentIndex >= images.length - 1) return;
    setIsTransitioning(true);
    setCurrentIndex(currentIndex + 1);
    setTimeout(() => setIsTransitioning(false), 500);
  }, [images.length, currentIndex, isTransitioning]);

  const goToPrevious = useCallback(() => {
    if (isTransitioning || currentIndex <= 0) return;
    setIsTransitioning(true);
    setCurrentIndex(currentIndex - 1);
    setTimeout(() => setIsTransitioning(false), 500);
  }, [currentIndex, isTransitioning]);

  const goToSlide = useCallback(
    (index: number) => {
      if (isTransitioning || index === currentIndex) return;
      setIsTransitioning(true);
      setCurrentIndex(index);
      setTimeout(() => setIsTransitioning(false), 500);
    },
    [currentIndex, isTransitioning],
  );

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (isTransitioning) return;
      switch (event.key) {
        case 'ArrowLeft':
          if (currentIndex > 0) {
            event.preventDefault();
            goToPrevious();
          }
          break;
        case 'ArrowRight':
          if (currentIndex < images.length - 1) {
            event.preventDefault();
            goToNext();
          }
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goToPrevious, goToNext, isTransitioning, currentIndex, images.length]);

  if (!images || images.length === 0) {
    return null;
  }

  const currentImage = images[currentIndex];

  return (
    <div className="container mx-auto px-5 py-2 pb-20 lg:px-32 lg:pt-12">
      <div className="relative w-full">
        <div className="mb-4 flex items-center justify-between">
          <Activity mode={serviceName ? 'visible' : 'hidden'}>
            <h2 className="font-display text-base-content text-2xl font-bold">{serviceName} Gallery</h2>
          </Activity>
          <span className="text-base-content/70 text-sm">
            {currentIndex + 1} / {images.length}
          </span>
        </div>

        <div className="bg-base-200 relative overflow-hidden rounded-lg">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {images.map((image, index) => (
              <div
                key={index}
                className="relative w-full flex-shrink-0"
                style={{ height: '70vh', maxHeight: '800px', minHeight: '400px' }}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-contain p-4"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                  priority={index === 0}
                  loader={sanityImageLoader}
                  {...(index !== 0 && { loading: 'lazy' })}
                />
              </div>
            ))}
          </div>
        </div>

        <Activity mode={currentImage.alt ? 'visible' : 'hidden'}>
          <div className="bg-neutral text-neutral-content mt-4 rounded-lg p-4 text-center">{currentImage.alt}</div>
        </Activity>

        <Activity mode={images.length > 1 ? 'visible' : 'hidden'}>
          <div className="mt-4 flex justify-center gap-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                disabled={isTransitioning}
                aria-label={`Go to slide ${index + 1}`}
                className={`h-3 w-3 rounded-full transition-all ${
                  index === currentIndex ? 'bg-primary w-8' : 'bg-base-300 hover:bg-base-content/30'
                } ${isTransitioning ? 'cursor-not-allowed' : 'cursor-pointer'}`}
              />
            ))}
          </div>
        </Activity>

        <Activity mode={currentIndex > 0 ? 'visible' : 'hidden'}>
          <button
            onClick={goToPrevious}
            disabled={isTransitioning}
            aria-label="Previous image"
            className="surface-glass hover:bg-base-100 absolute top-1/2 left-4 -translate-y-1/2 rounded-full p-2 transition-all disabled:cursor-not-allowed disabled:opacity-50"
          >
            <svg className="text-base-content h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="sr-only">Previous</span>
          </button>
        </Activity>

        <Activity mode={currentIndex < images.length - 1 ? 'visible' : 'hidden'}>
          <button
            onClick={goToNext}
            disabled={isTransitioning}
            aria-label="Next image"
            className="surface-glass hover:bg-base-100 absolute top-1/2 right-4 -translate-y-1/2 rounded-full p-2 transition-all disabled:cursor-not-allowed disabled:opacity-50"
          >
            <svg className="text-base-content h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="sr-only">Next</span>
          </button>
        </Activity>
      </div>
    </div>
  );
}
