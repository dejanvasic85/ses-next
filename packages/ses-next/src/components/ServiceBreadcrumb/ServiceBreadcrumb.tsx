import Link from 'next/link';

import { Container } from '@/components/Container';

interface BreadcrumbItem {
  name: string;
  item?: string;
}

interface ServiceBreadcrumbProps {
  items: BreadcrumbItem[];
}

export function ServiceBreadcrumb({ items }: ServiceBreadcrumbProps) {
  return (
    <Container width="wide" as="nav" className="pt-4" aria-label="Breadcrumb">
      <ol className="text-base-content/70 flex flex-wrap items-center gap-1 text-sm">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={item.name} className="flex items-center gap-1">
              {index > 0 && <span aria-hidden="true">›</span>}
              {isLast || !item.item ? (
                <span className="text-base-content font-medium" aria-current={isLast ? 'page' : undefined}>
                  {item.name}
                </span>
              ) : (
                <Link href={item.item} className="hover:text-primary transition-colors hover:underline">
                  {item.name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </Container>
  );
}
