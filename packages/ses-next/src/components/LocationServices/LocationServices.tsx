import Link from 'next/link';

import { Icon } from '@/components/Icon/Icon';
import type { LocationPageServiceRef } from '@/types';

type LocationServicesProps = {
  services: LocationPageServiceRef[];
};

const getServicePath = (service: LocationPageServiceRef): string => {
  return service.parentService
    ? `/services/${service.parentService.slug}/${service.slug}`
    : `/services/${service.slug}`;
};

export function LocationServices({ services }: LocationServicesProps) {
  return (
    <section aria-labelledby="location-services-heading" className="mx-auto px-4 md:px-8 max-w-screen-lg mt-12 mb-8">
      <h2 id="location-services-heading" className="text-3xl font-bold text-gray-900 mb-6">
        Services We Offer
      </h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <article
            key={service.id}
            className="group relative overflow-hidden rounded-lg border border-gray-200 hover:shadow-md transition-shadow duration-200"
          >
            <Link href={getServicePath(service)} className="absolute inset-0 z-10" prefetch={false}>
              <span className="sr-only">View {service.name} service</span>
            </Link>
            <div className="flex h-full flex-col justify-between p-6">
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className="rounded-full bg-primary p-2">
                    <Icon name={service.icon} size="xl" className="text-white" />
                  </div>
                  <h3 className="text-lg font-semibold border-b-2 border-primary">{service.name}</h3>
                </div>
                <p className="text-gray-500">{service.blurb}</p>
              </div>
              <span className="mt-4 inline-block text-primary font-medium group-hover:underline">Learn more →</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
