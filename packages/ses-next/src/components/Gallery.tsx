import { SanityImage } from '@/components/SanityImage';

interface GalleryImage {
  serviceName: string;
  alt: string;
  src: string;
}

interface GalleryProps {
  imageGallery: GalleryImage[];
}

export function Gallery({ imageGallery }: GalleryProps) {
  return (
    <>
      <div className="bg-base-100 py-6 sm:py-8 lg:py-12">
        <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
          <h2 className="font-display text-base-content mb-8 text-center text-2xl font-bold md:mb-12 lg:text-3xl">
            Gallery
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-3 xl:grid-cols-4">
            {imageGallery.map(({ serviceName, alt, src }, idx) => (
              <div
                key={idx}
                className="group bg-base-200 relative flex h-96 items-end overflow-hidden rounded-lg p-4 shadow-lg"
              >
                <SanityImage
                  src={src}
                  alt={alt}
                  fill
                  className="object-cover object-center transition duration-200 group-hover:scale-110"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                />

                <div className="surface-glass relative z-10 flex w-full flex-col rounded-lg p-2 text-center">
                  <span className="text-base-content/70 text-sm">{alt}</span>
                  <span className="text-base-content font-bold">{serviceName}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
