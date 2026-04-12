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
    <nav aria-label="Breadcrumb" className="mx-auto max-w-screen-lg px-4 pt-4 md:px-8">
      <ol className="flex flex-wrap items-center gap-1 text-sm text-gray-500">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={item.name} className="flex items-center gap-1">
              {index > 0 && <span aria-hidden="true">›</span>}
              {isLast || !item.item ? (
                <span className="font-medium text-gray-900" aria-current={isLast ? 'page' : undefined}>
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
    </nav>
  );
}
