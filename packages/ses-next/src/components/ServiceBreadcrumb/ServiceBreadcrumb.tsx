import Link from 'next/link';

interface BreadcrumbItem {
  name: string;
  item?: string;
}

interface ServiceBreadcrumbProps {
  items: BreadcrumbItem[];
}

export function ServiceBreadcrumb({ items }: ServiceBreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className="mx-auto px-4 md:px-8 max-w-screen-lg pt-4">
      <ol className="flex flex-wrap items-center gap-1 text-sm text-gray-500">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={item.name} className="flex items-center gap-1">
              {index > 0 && <span aria-hidden="true">›</span>}
              {isLast || !item.item ? (
                <span className="text-gray-900 font-medium" aria-current={isLast ? 'page' : undefined}>
                  {item.name}
                </span>
              ) : (
                <Link href={item.item} className="hover:text-primary hover:underline transition-colors">
                  {item.name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
