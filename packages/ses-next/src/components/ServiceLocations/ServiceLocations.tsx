import Link from 'next/link';

import type { LocationPageNearbySuburbRef } from '@/types';

type ServiceLocationsProps = {
  serviceName: string;
  locations: LocationPageNearbySuburbRef[];
};

const sectionDescription =
  "Our team is on the road every day across Melbourne's west. Choose a suburb page for local availability and suburb-specific guidance.";

const cardAccentClasses = [
  'from-sky-400/30 via-cyan-300/10 to-transparent',
  'from-emerald-400/30 via-teal-300/10 to-transparent',
  'from-amber-400/30 via-orange-300/10 to-transparent',
  'from-rose-400/30 via-pink-300/10 to-transparent',
];

const getCardAccentClass = (index: number): string => {
  return cardAccentClasses[index % cardAccentClasses.length];
};

const getCardSpanClass = (index: number): string => {
  return index === 0 ? 'xl:col-span-2' : '';
};

export function ServiceLocations({ serviceName, locations }: ServiceLocationsProps) {
  return (
    <section aria-labelledby="service-locations-heading" className="mx-auto mt-14 mb-10 max-w-screen-xl px-4 md:px-8">
      <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 px-6 py-10 text-white shadow-2xl shadow-slate-900/35 sm:px-8 lg:px-10">
        <div className="absolute -top-16 -right-10 h-44 w-44 rounded-full bg-cyan-300/20 blur-3xl" />
        <div className="absolute -bottom-20 -left-10 h-56 w-56 rounded-full bg-emerald-300/15 blur-3xl" />
        <div className="absolute inset-0 [background-image:radial-gradient(rgba(255,255,255,0.55)_1px,transparent_1px)] [background-size:14px_14px] opacity-20" />

        <div className="relative">
          <p className="mb-4 inline-flex rounded-full border border-white/25 bg-white/10 px-3 py-1 text-xs font-semibold tracking-[0.18em] uppercase">
            Area Coverage
          </p>
          <h2 id="service-locations-heading" className="max-w-3xl text-3xl leading-tight font-bold sm:text-4xl">
            {serviceName} across Melbourne&apos;s west
          </h2>
          <p className="mt-4 max-w-3xl text-base leading-7 text-slate-200">{sectionDescription}</p>

          <ul
            className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3"
            aria-label={`${serviceName} service areas`}
          >
            {locations.map((location, index) => (
              <li key={location.id} className={getCardSpanClass(index)}>
                <Link
                  href={`/locations/${location.slug}`}
                  className="group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-white/20 bg-white/10 p-5 backdrop-blur-sm transition duration-200 hover:-translate-y-1 hover:border-white/45 hover:bg-white/15"
                  prefetch={false}
                >
                  <div
                    className={`absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r ${getCardAccentClass(index)} transition-opacity duration-200 group-hover:opacity-100`}
                  />
                  <div>
                    <p className="text-xs font-semibold tracking-[0.14em] text-cyan-100 uppercase">
                      Local service page
                    </p>
                    <h3 className="mt-3 text-2xl leading-tight font-semibold text-white">
                      Electrician {location.suburb}
                    </h3>
                  </div>
                  <p className="mt-7 text-sm font-medium text-slate-200 transition-colors group-hover:text-white">
                    Explore local details and availability
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
