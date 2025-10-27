'use client';

import { useState, useCallback, useEffect } from 'react';
import Image from 'next/image';

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
    <div className="container mx-auto px-5 py-2 lg:px-32 lg:pt-12 pb-20">
      <div className="relative w-full">
        <div className="mb-4 flex items-center justify-between">
          {serviceName && <h2 className="text-2xl font-bold text-gray-900">{serviceName} Gallery</h2>}
          <span className="text-sm text-gray-600">
            {currentIndex + 1} / {images.length}
          </span>
        </div>

        <div className="relative overflow-hidden rounded-lg bg-gray-100 min-h-[400px] md:min-h-[500px] lg:min-h-[600px]">
          <div
            className="flex h-full transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {images.map((image, index) => (
              <div key={index} className="w-full flex-shrink-0 relative p-4" style={{ minHeight: '400px' }}>
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                  priority={index === 0}
                  {...(index !== 0 && { loading: 'lazy' })}
                />
              </div>
            ))}
          </div>
        </div>

        {currentImage.alt && (
          <div className="mt-4 bg-gray-900 text-white p-4 text-center rounded-lg">{currentImage.alt}</div>
        )}

        {images.length > 1 && (
          <div className="flex justify-center mt-4 gap-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                disabled={isTransitioning}
                aria-label={`Go to slide ${index + 1}`}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentIndex ? 'bg-blue-600 w-8' : 'bg-gray-300 hover:bg-gray-400'
                } ${isTransitioning ? 'cursor-not-allowed' : 'cursor-pointer'}`}
              />
            ))}
          </div>
        )}

        {currentIndex > 0 && (
          <button
            onClick={goToPrevious}
            disabled={isTransitioning}
            aria-label="Previous image"
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="sr-only">Previous</span>
          </button>
        )}

        {currentIndex < images.length - 1 && (
          <button
            onClick={goToNext}
            disabled={isTransitioning}
            aria-label="Next image"
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="sr-only">Next</span>
          </button>
        )}
      </div>
    </div>
  );
}
