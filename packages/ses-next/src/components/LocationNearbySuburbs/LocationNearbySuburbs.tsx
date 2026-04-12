import Link from 'next/link';

import type { LocationPageNearbySuburbRef } from '@/types';

type LocationNearbySuburbsProps = {
  suburb: string;
  nearbySuburbs: LocationPageNearbySuburbRef[];
};

export function LocationNearbySuburbs({ suburb, nearbySuburbs }: LocationNearbySuburbsProps) {
  return (
    <section aria-labelledby="nearby-suburbs-heading" className="mx-auto mt-16 mb-12 max-w-screen-lg px-4 md:px-8">
      <div className="relative overflow-hidden rounded-xl border border-slate-200 bg-gradient-to-br from-slate-50 via-white to-primary/5 px-6 py-8 shadow-[0_24px_80px_-48px_rgba(15,23,42,0.45)] sm:px-8 lg:px-10">
        <div className="absolute inset-y-0 right-0 hidden w-1/3 bg-[radial-gradient(circle_at_top,_rgba(37,99,235,0.16),_transparent_58%)] lg:block" />
        <div className="absolute -left-16 bottom-0 h-32 w-32 rounded-full bg-primary/10 blur-3xl" />

        <div className="relative grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start">
          <div className="max-w-xl">
            <p className="mb-4 inline-flex rounded-full border border-primary/20 bg-white/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-primary shadow-sm">
              Neighbouring Service Areas
            </p>
            <h2
              id="nearby-suburbs-heading"
              className="max-w-md text-3xl font-bold leading-tight text-slate-900 sm:text-4xl"
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
                className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white/90 p-4 shadow-[0_18px_40px_-30px_rgba(15,23,42,0.7)] transition-all duration-200 hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_24px_55px_-28px_rgba(37,99,235,0.35)]"
                prefetch={false}
              >
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary via-sky-400 to-transparent opacity-70 transition-opacity duration-200 group-hover:opacity-100" />
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-slate-400">
                      Nearby {String(index + 1).padStart(2, '0')}
                    </p>
                    <h3 className="mt-3 text-lg font-semibold leading-snug text-slate-900 transition-colors duration-200 group-hover:text-primary">
                      Electrician {location.suburb}
                    </h3>
                  </div>
                  <span className="mt-1 text-xl leading-none text-slate-300 transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-primary">
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
