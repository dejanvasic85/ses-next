import Link from 'next/link';

import { Icon } from '@/components/Icon/Icon';
import type { ServiceItem } from '@/types';

interface RelatedServicesProps {
  services: ServiceItem[];
}

const getServicePath = (service: ServiceItem): string => {
  return service.parentService
    ? `/services/${service.parentService.slug}/${service.slug}`
    : `/services/${service.slug}`;
};

export function RelatedServices({ services }: RelatedServicesProps) {
  return (
    <section aria-labelledby="related-services-heading" className="mx-auto mt-12 mb-8 max-w-screen-lg px-4 md:px-8">
      <h2 id="related-services-heading" className="mb-6 text-3xl font-bold text-gray-900">
        Specialist Services
      </h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <article
            key={service.id}
            className="group relative overflow-hidden rounded-lg border border-gray-200 transition-shadow duration-200 hover:shadow-md"
          >
            <Link href={getServicePath(service)} className="absolute inset-0 z-10" prefetch={false}>
              <span className="sr-only">View {service.name} service</span>
            </Link>
            <div className="flex h-full flex-col justify-between p-6">
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className="bg-primary rounded-full p-2">
                    <Icon name={service.icon} size="xl" className="text-white" />
                  </div>
                  <h3 className="border-primary border-b-2 text-lg font-semibold">{service.name}</h3>
                </div>
                <p className="text-gray-500">{service.blurb}</p>
              </div>
              <span className="text-primary mt-4 inline-block font-medium group-hover:underline">Learn more →</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
