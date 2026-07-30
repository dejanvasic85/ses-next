import NextLink from 'next/link';
import classNames from 'class-names';

import { Icon } from '@/components/Icon/Icon';
import { homeHref } from '@/components/Navbar/navItems';

const focusStyles =
  'focus-visible:ring-primary focus-visible:ring-offset-base-100 rounded-xl focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none';

interface NavBrandProps {
  title: string;
  className?: string;
  onClick?: () => void;
}

export function NavBrand({ title, className, onClick }: NavBrandProps) {
  return (
    <NextLink
      href={homeHref}
      onClick={onClick}
      className={classNames('group flex min-w-0 items-center gap-2.5', focusStyles, className)}
    >
      {/* The mark carries the logo's bolt gradient; both stops are theme tokens. */}
      <span className="from-secondary to-primary text-primary-content ring-primary-content/20 flex size-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br shadow-sm ring-1 transition-transform duration-300 ring-inset group-hover:-rotate-6">
        <Icon name="bolt" size="lg" />
      </span>
      <span className="font-display truncate text-base leading-tight font-semibold tracking-tight sm:text-lg">
        {title}
      </span>
    </NextLink>
  );
}
