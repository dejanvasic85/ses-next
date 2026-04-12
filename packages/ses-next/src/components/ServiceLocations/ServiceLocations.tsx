import Link from 'next/link';

import type { LocationPageNearbySuburbRef } from '@/types';

type ServiceLocationsProps = {
  serviceName: string;
  locations: LocationPageNearbySuburbRef[];
};

export function ServiceLocations({ serviceName, locations }: ServiceLocationsProps) {
  return (
    <section aria-labelledby="service-locations-heading" className="mx-auto mt-12 mb-8 max-w-screen-lg px-4 md:px-8">
      <h2 id="service-locations-heading" className="mb-3 text-3xl font-bold text-gray-900">
        Areas We Serve for {serviceName}
      </h2>
      <p className="mb-6 text-gray-600">
        We regularly deliver {serviceName.toLowerCase()} across these suburbs in Melbourne&apos;s west.
      </p>
      <ul className="flex flex-wrap gap-3" aria-label={`${serviceName} service areas`}>
        {locations.map((location) => (
          <li key={location.id}>
            <Link
              href={`/locations/${location.slug}`}
              className="hover:bg-primary hover:border-primary inline-flex items-center rounded-full border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-800 transition-colors hover:text-white"
              prefetch={false}
            >
              Electrician {location.suburb}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
