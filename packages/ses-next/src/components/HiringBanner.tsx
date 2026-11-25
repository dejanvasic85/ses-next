'use client';

import { useSyncExternalStore } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Container } from '@/components/Container';
import { Icon } from '@/components/Icon/Icon';
import { careersPath } from '@/lib/careers';

const dismissedKey = 'ses-hiring-banner-dismissed';
const dismissEvent = 'ses-hiring-banner-dismiss';

type StoreListener = () => void;

const subscribe = (listener: StoreListener) => {
  window.addEventListener(dismissEvent, listener);
  return () => window.removeEventListener(dismissEvent, listener);
};

const getSnapshot = () => window.sessionStorage.getItem(dismissedKey) === 'true';

const getServerSnapshot = () => false;

interface HiringBannerProps {
  text: string;
}

/**
 * Thin strip above the navbar. Closing it hides it for the rest of the visit
 * (sessionStorage), so a returning visitor sees it again next time.
 */
export function HiringBanner({ text }: HiringBannerProps) {
  const pathname = usePathname();
  const isDismissed = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const handleDismiss = () => {
    window.sessionStorage.setItem(dismissedKey, 'true');
    window.dispatchEvent(new Event(dismissEvent));
  };

  if (isDismissed || pathname === careersPath) {
    return null;
  }

  return (
    <aside aria-label="Job opening" className="bg-primary text-primary-content">
      <Container width="standard" className="flex min-h-10 items-center gap-2 py-1.5 text-sm">
        <span aria-hidden="true" className="size-8 flex-none" />
        <Link
          href={careersPath}
          className="group inline-flex flex-1 items-center justify-center gap-2 text-center font-medium hover:underline"
        >
          <Icon name="user-plus" size="sm" className="hidden flex-none sm:block" />
          <span>{text}</span>
          <Icon name="arrow-right" size="sm" className="flex-none transition-transform group-hover:translate-x-0.5" />
        </Link>
        <button
          type="button"
          onClick={handleDismiss}
          aria-label="Close job opening banner"
          className="hover:bg-primary-content/10 focus-visible:ring-primary-content flex size-8 flex-none items-center justify-center rounded-full focus-visible:ring-2 focus-visible:outline-none"
        >
          <Icon name="close" size="sm" />
        </button>
      </Container>
    </aside>
  );
}
