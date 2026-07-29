import Link from 'next/link';

import type { LocationPageNearbySuburbRef } from '@/types';

type ServiceLocationsProps = {
  serviceName: string;
  locations: LocationPageNearbySuburbRef[];
};

const sectionDescription =
  "Our team is on the road every day across Melbourne's west. Choose a suburb page for local availability and suburb-specific guidance.";

const getCardSpanClass = (index: number): string => {
  return index === 0 ? 'xl:col-span-2' : '';
};

/*
 * A deliberately dark panel in both themes — it is the one inverted surface on
 * a service page, which is what makes it read as a feature rather than another
 * card. Cards sit on neutral-content alpha because the ground is always dark.
 */
export function ServiceLocations({ serviceName, locations }: ServiceLocationsProps) {
  return (
    <section aria-labelledby="service-locations-heading" className="mx-auto mt-14 mb-10 max-w-screen-xl px-4 md:px-8">
      <div className="bg-neutral text-neutral-content relative overflow-hidden rounded-3xl px-6 py-10 shadow-2xl sm:px-8 lg:px-10">
        <div className="bg-secondary/25 absolute -top-16 -right-10 h-44 w-44 rounded-full blur-3xl" />
        <div className="bg-primary/25 absolute -bottom-20 -left-10 h-56 w-56 rounded-full blur-3xl" />
        <div className="absolute inset-0 [background-image:radial-gradient(rgba(255,255,255,0.55)_1px,transparent_1px)] [background-size:14px_14px] opacity-20" />

        <div className="relative">
          <p className="border-neutral-content/25 bg-neutral-content/10 mb-4 inline-flex rounded-full border px-3 py-1 text-xs font-semibold tracking-[0.18em] uppercase">
            Area Coverage
          </p>
          <h2
            id="service-locations-heading"
            className="font-display max-w-3xl text-3xl leading-tight font-bold tracking-tight sm:text-4xl"
          >
            {serviceName} across Melbourne&apos;s west
          </h2>
          <p className="text-neutral-content/80 mt-4 max-w-3xl text-base leading-7">{sectionDescription}</p>

          <ul
            className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3"
            aria-label={`${serviceName} service areas`}
          >
            {locations.map((location, index) => (
              <li key={location.id} className={getCardSpanClass(index)}>
                <Link
                  href={`/locations/${location.slug}`}
                  className="group border-neutral-content/20 bg-neutral-content/10 hover:border-neutral-content/45 hover:bg-neutral-content/15 relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border p-5 backdrop-blur-sm transition duration-200 hover:-translate-y-1"
                  prefetch={false}
                >
                  <div className="from-secondary via-primary absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r to-transparent opacity-70 transition-opacity duration-200 group-hover:opacity-100" />
                  <div>
                    <p className="text-secondary text-xs font-semibold tracking-[0.14em] uppercase">
                      Local service page
                    </p>
                    <h3 className="font-display mt-3 text-2xl leading-tight font-semibold">{location.suburb}</h3>
                  </div>
                  <p className="text-neutral-content/80 group-hover:text-neutral-content mt-7 text-sm font-medium transition-colors">
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
