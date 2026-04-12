import Link from 'next/link';

import type { LocationPageNearbySuburbRef } from '@/types';

type LocationNearbySuburbsProps = {
  nearbySuburbs: LocationPageNearbySuburbRef[];
};

export function LocationNearbySuburbs({ nearbySuburbs }: LocationNearbySuburbsProps) {
  return (
    <section aria-labelledby="nearby-suburbs-heading" className="mx-auto mt-12 mb-8 max-w-screen-lg px-4 md:px-8">
      <h2 id="nearby-suburbs-heading" className="mb-6 text-3xl font-bold text-gray-900">
        Also Serving Nearby
      </h2>
      <div className="flex flex-wrap gap-3">
        {nearbySuburbs.map((location) => (
          <Link
            key={location.id}
            href={`/locations/${location.slug}`}
            className="rounded-full border border-gray-300 px-4 py-2 text-base font-medium text-gray-800 transition-colors duration-200 hover:border-primary hover:text-primary"
            prefetch={false}
          >
            Electrician {location.suburb}
          </Link>
        ))}
      </div>
    </section>
  );
}
