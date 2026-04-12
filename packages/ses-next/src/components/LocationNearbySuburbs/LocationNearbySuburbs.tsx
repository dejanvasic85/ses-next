import Link from 'next/link';

import type { LocationPageNearbySuburbRef } from '@/types';

type LocationNearbySuburbsProps = {
  suburb: string;
  nearbySuburbs: LocationPageNearbySuburbRef[];
};

export function LocationNearbySuburbs({ suburb, nearbySuburbs }: LocationNearbySuburbsProps) {
  return (
    <section aria-labelledby="nearby-suburbs-heading" className="mx-auto mt-16 mb-12 max-w-5xl px-4 md:px-8">
      <div className="to-primary/5 relative overflow-hidden rounded-xl border border-slate-200 bg-gradient-to-br from-slate-50 via-white px-6 py-8 shadow-2xl shadow-slate-900/10 sm:px-8 lg:px-10">
        <div className="from-primary/15 absolute inset-y-0 right-0 hidden w-1/3 bg-gradient-to-b to-transparent lg:block" />
        <div className="bg-primary/10 absolute bottom-0 -left-16 h-32 w-32 rounded-full blur-3xl" />

        <div className="relative grid gap-8 lg:grid-cols-2 lg:items-start">
          <div className="max-w-xl">
            <p className="border-primary/20 text-primary mb-4 inline-flex rounded-full border bg-white/80 px-3 py-1 text-xs font-semibold tracking-widest uppercase shadow-sm">
              Neighbouring Service Areas
            </p>
            <h2
              id="nearby-suburbs-heading"
              className="max-w-md text-3xl leading-tight font-bold text-slate-900 sm:text-4xl"
            >
              Also Serving Nearby
            </h2>
            <p className="mt-4 max-w-lg text-base leading-7 text-slate-600 sm:text-lg">
              If you are just outside {suburb}, we regularly work across these nearby suburbs as part of the same local
              service area.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {nearbySuburbs.map((location, index) => (
              <Link
                key={location.id}
                href={`/locations/${location.slug}`}
                className="group hover:border-primary/40 hover:shadow-primary/10 relative overflow-hidden rounded-2xl border border-slate-200 bg-white/90 p-4 shadow-lg shadow-slate-900/5 transition-all duration-200 hover:-translate-y-1 hover:shadow-xl"
                prefetch={false}
              >
                <div className="from-primary absolute inset-x-0 top-0 h-1 bg-gradient-to-r via-sky-400 to-transparent opacity-70 transition-opacity duration-200 group-hover:opacity-100" />
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold tracking-widest text-slate-400 uppercase">
                      Nearby {String(index + 1).padStart(2, '0')}
                    </p>
                    <h3 className="group-hover:text-primary mt-3 text-lg leading-snug font-semibold text-slate-900 transition-colors duration-200">
                      Electrician {location.suburb}
                    </h3>
                  </div>
                  <span className="group-hover:text-primary mt-1 text-xl leading-none text-slate-300 transition-all duration-200 group-hover:translate-x-0.5">
                    ↗
                  </span>
                </div>
                <p className="mt-6 text-sm font-medium text-slate-500 transition-colors duration-200 group-hover:text-slate-700">
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
