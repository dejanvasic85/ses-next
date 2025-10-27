import Image from 'next/image';

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
      <div className="bg-white py-6 sm:py-8 lg:py-12">
        <div className="max-w-screen-2xl px-4 md:px-8 mx-auto">
          <h2 className="text-gray-800 text-2xl lg:text-3xl font-bold text-center mb-8 md:mb-12">Gallery</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {imageGallery.map(({ serviceName, alt, src }, idx) => (
              <div
                key={idx}
                className="group h-96 flex items-end bg-gray-100 rounded-lg overflow-hidden shadow-lg relative p-4"
              >
                <Image
                  src={src}
                  alt={alt}
                  fill
                  className="object-cover object-center group-hover:scale-110 transition duration-200"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                />

                <div className="w-full flex flex-col bg-white text-center rounded-lg relative p-2 z-10">
                  <span className="text-gray-500 text-sm">{alt}</span>
                  <span className="text-gray-800 font-bold">{serviceName}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
