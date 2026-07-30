import NextLink from 'next/link';
import classNames from 'class-names';

import { isCurrentNavItem, railItems } from '@/components/Navbar/navItems';

const linkStyles =
  'focus-visible:ring-primary focus-visible:ring-offset-base-100 relative rounded-full px-3 py-2 text-sm font-medium transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none';

const restingStyles = 'text-base-content/70 hover:text-base-content hover:bg-base-content/5';

interface NavRailProps {
  pathname: string;
}

export function NavRail({ pathname }: NavRailProps) {
  return (
    <ul className="hidden h-full items-center gap-0.5 md:flex">
      {railItems.map((item) => {
        const isCurrent = isCurrentNavItem(item, pathname);

        return (
          <li key={item.href} className="relative flex h-full items-center">
            <NextLink
              href={item.href}
              aria-current={isCurrent ? 'page' : undefined}
              className={classNames(linkStyles, isCurrent ? 'text-primary' : restingStyles)}
            >
              {item.label}
            </NextLink>
            {isCurrent && (
              <span aria-hidden="true" className="bg-primary absolute inset-x-3 bottom-0 h-[2px] rounded-t-full" />
            )}
          </li>
        );
      })}
    </ul>
  );
}
