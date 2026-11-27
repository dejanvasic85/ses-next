import { Icon } from '@/components/Icon/Icon';

interface CareersListProps {
  title: string;
  items: string[];
}

export function CareersList({ title, items }: CareersListProps) {
  if (items.length === 0) {
    return null;
  }

  return (
    <section className="surface-card rounded-xl p-6">
      <h2 className="mb-4 text-lg font-semibold">{title}</h2>
      <ul className="space-y-3">
        {items.map((item) => (
          <li key={item} className="text-base-content/80 flex gap-3">
            <Icon name="check" size="md" className="text-primary mt-0.5 flex-none" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
