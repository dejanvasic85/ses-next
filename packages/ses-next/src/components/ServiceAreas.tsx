import Link from 'next/link';

import type { ServiceAreaRef } from '@/types';

const sectionTitle = "Serving Melbourne's Western Suburbs";

type ServiceAreasProps = {
  areas: ServiceAreaRef[];
};

export function ServiceAreas({ areas }: ServiceAreasProps) {
  if (areas.length === 0) return null;

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col items-center gap-6">
        <div className="flex items-center gap-4">
          <span className="h-px w-12 bg-slate-300" aria-hidden="true" />
          <h2 className="text-center text-sm font-bold tracking-[0.2em] text-slate-500 uppercase">{sectionTitle}</h2>
          <span className="h-px w-12 bg-slate-300" aria-hidden="true" />
        </div>
        <ul className="flex flex-wrap justify-center gap-2.5" aria-label="Service area suburbs">
          {areas.map((area) => (
            <li key={area.id}>
              <Link
                href={`/locations/${area.slug}`}
                className="group inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition-all duration-150 hover:border-sky-400 hover:bg-sky-50 hover:text-sky-700 hover:shadow-md"
              >
                <span
                  className="h-1.5 w-1.5 rounded-full bg-sky-400 opacity-0 transition-opacity duration-150 group-hover:opacity-100"
                  aria-hidden="true"
                />
                {area.suburb}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
