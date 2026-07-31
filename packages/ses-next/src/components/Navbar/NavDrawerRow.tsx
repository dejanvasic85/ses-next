import NextLink from 'next/link';
import { clsx } from 'clsx';

import { Icon } from '@/components/Icon/Icon';
import type { NavItem } from '@/components/Navbar/navItems';

const rowStyles =
  'focus-visible:ring-primary focus-visible:ring-offset-base-100 group flex items-center gap-4 rounded-2xl px-3 py-4 transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none';

const tileStyles = 'flex size-11 shrink-0 items-center justify-center rounded-xl transition-colors duration-200';

interface NavDrawerRowProps {
  item: NavItem;
  isCurrent: boolean;
  onClick?: () => void;
}

export function NavDrawerRow({ item, isCurrent, onClick }: NavDrawerRowProps) {
  return (
    <NextLink
      href={item.href}
      onClick={onClick}
      aria-current={isCurrent ? 'page' : undefined}
      className={clsx(rowStyles, isCurrent ? 'bg-primary/10' : 'hover:bg-base-200 active:bg-base-200')}
    >
      <span
        className={clsx(
          tileStyles,
          isCurrent
            ? 'bg-primary text-primary-content'
            : 'bg-base-200 text-primary group-hover:bg-primary group-hover:text-primary-content',
        )}
      >
        <Icon name={item.icon} size="md" />
      </span>
      <span
        className={clsx(
          'font-display flex-1 text-lg font-medium tracking-tight',
          isCurrent ? 'text-primary' : 'text-base-content',
        )}
      >
        {item.label}
      </span>
      <Icon
        name="chevron-right"
        size="sm"
        className={clsx(
          'transition-transform duration-200 group-hover:translate-x-0.5',
          isCurrent ? 'text-primary' : 'text-base-content/30',
        )}
      />
    </NextLink>
  );
}
