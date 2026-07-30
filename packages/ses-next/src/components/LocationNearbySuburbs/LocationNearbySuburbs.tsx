import Link from 'next/link';

import type { LocationPageNearbySuburbRef } from '@/types';

type LocationNearbySuburbsProps = {
  suburb: string;
  nearbySuburbs: LocationPageNearbySuburbRef[];
};

export function LocationNearbySuburbs({ suburb, nearbySuburbs }: LocationNearbySuburbsProps) {
  return (
    <section aria-labelledby="nearby-suburbs-heading" className="mx-auto mt-16 mb-12 max-w-5xl px-4 md:px-8">
      <div className="surface-card bg-ambient relative overflow-hidden rounded-xl px-6 py-8 sm:px-8 lg:px-10">
        <div className="relative grid gap-8 lg:grid-cols-2 lg:items-start">
          <div className="max-w-xl">
            <p className="border-primary/20 text-primary bg-base-100/80 mb-4 inline-flex rounded-full border px-3 py-1 text-xs font-semibold tracking-widest uppercase shadow-sm">
              Neighbouring Service Areas
            </p>
            <h2
              id="nearby-suburbs-heading"
              className="font-display text-base-content max-w-md text-3xl leading-tight font-bold tracking-tight sm:text-4xl"
            >
              Also Serving Nearby
            </h2>
            <p className="text-base-content/70 mt-4 max-w-lg text-base leading-7 sm:text-lg">
              If you are just outside {suburb}, we regularly work across these nearby suburbs as part of the same local
              service area.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {nearbySuburbs.map((location) => (
              <Link
                key={location.id}
                href={`/locations/${location.slug}`}
                className="group surface-glass hover:border-primary/40 relative overflow-hidden rounded-2xl p-4 transition-all duration-200 hover:-translate-y-1"
                prefetch={false}
              >
                <div className="from-primary via-secondary absolute inset-x-0 top-0 h-1 bg-gradient-to-r to-transparent opacity-70 transition-opacity duration-200 group-hover:opacity-100" />
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-base-content/50 text-xs font-semibold tracking-widest uppercase">Service area</p>
                    <h3 className="font-display group-hover:text-primary text-base-content mt-3 text-lg leading-snug font-semibold transition-colors duration-200">
                      Electrician {location.suburb}
                    </h3>
                  </div>
                  <span className="group-hover:text-primary text-base-content/30 mt-1 text-xl leading-none transition-all duration-200 group-hover:translate-x-0.5">
                    ↗
                  </span>
                </div>
                <p className="text-base-content/60 group-hover:text-base-content/80 mt-6 text-sm font-medium transition-colors duration-200">
                  View suburb page
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
