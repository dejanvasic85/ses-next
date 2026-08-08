import Link from 'next/link';

import { Container } from '@/components/Container';
import type { ServiceAreaRef } from '@/types';

const sectionTitle = "Serving Melbourne's Western Suburbs";

type ServiceAreasProps = {
  areas: ServiceAreaRef[];
};

export function ServiceAreas({ areas }: ServiceAreasProps) {
  if (areas.length === 0) return null;

  return (
    <Container width="wide">
      <div className="flex flex-col items-center gap-6">
        <div className="flex items-center gap-4">
          <span className="bg-base-300 h-px w-12" aria-hidden="true" />
          <h2 className="text-base-content/60 text-center text-sm font-bold tracking-[0.2em] uppercase">
            {sectionTitle}
          </h2>
          <span className="bg-base-300 h-px w-12" aria-hidden="true" />
        </div>
        <ul className="flex flex-wrap justify-center gap-2.5" aria-label="Service area suburbs">
          {areas.map((area) => (
            <li key={area.id}>
              <Link
                href={`/locations/${area.slug}`}
                className="group surface-card text-base-content/80 hover:border-primary hover:bg-primary/10 hover:text-primary inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium shadow-sm transition-all duration-150 hover:shadow-md"
              >
                <span
                  className="bg-primary h-1.5 w-1.5 rounded-full opacity-0 transition-opacity duration-150 group-hover:opacity-100"
                  aria-hidden="true"
                />
                {area.suburb}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </Container>
  );
}
