import { useEffect, useRef } from 'react';
import { clsx } from 'clsx';

import { Icon } from '@/components/Icon/Icon';
import { NavBrand } from '@/components/Navbar/NavBrand';
import { NavDrawerRow } from '@/components/Navbar/NavDrawerRow';
import { isCurrentNavItem, navItems } from '@/components/Navbar/navItems';

const easing = 'ease-[cubic-bezier(0.22,1,0.36,1)]';

const panelStyles = `bg-base-100 border-base-300 flex h-full w-[86%] max-w-sm flex-col border-l shadow-2xl transition-transform duration-300 ${easing}`;

const closeButtonStyles =
  'text-base-content/60 hover:bg-base-200 hover:text-base-content focus-visible:ring-primary focus-visible:ring-offset-base-100 flex size-11 items-center justify-center rounded-full transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none';

const focusableSelector = 'a[href], button:not([disabled])';

interface NavDrawerProps {
  isOpen: boolean;
  pathname: string;
  title: string;
  contactPhone?: string;
  licence?: string;
  onClose: () => void;
}

export function NavDrawer({ isOpen, pathname, title, contactPhone, licence, onClose }: NavDrawerProps) {
  const panelRef = useRef<HTMLElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isOpen) closeButtonRef.current?.focus();
  }, [isOpen]);

  /*
   * Tab stays inside the panel while it is open. The panel is inert when
   * closed, so this only ever runs against the menu's own controls.
   */
  const handleKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    if (event.key !== 'Tab' || !panelRef.current) return;

    const focusable = Array.from(panelRef.current.querySelectorAll<HTMLElement>(focusableSelector));
    if (focusable.length === 0) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  /*
   * Visibility is toggled rather than left to the transform alone, so a closed
   * drawer is out of the accessibility tree and the tab order. Hiding is delayed
   * by the length of the slide so the panel is still on screen while it leaves.
   */
  return (
    <div
      className={clsx(
        'fixed inset-0 z-50 flex justify-end transition-[visibility] duration-0 md:hidden',
        isOpen ? 'pointer-events-auto visible delay-0' : 'pointer-events-none invisible delay-300',
      )}
    >
      <div
        onClick={onClose}
        aria-hidden="true"
        className={clsx(
          // eslint-disable-next-line no-restricted-syntax -- a scrim is an overlay, not a themed surface; raw black stays legible under either theme
          'absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300',
          isOpen ? 'opacity-100' : 'opacity-0',
        )}
      />

      <aside
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        inert={!isOpen}
        onKeyDown={handleKeyDown}
        className={clsx('relative', panelStyles, isOpen ? 'translate-x-0' : 'translate-x-full')}
      >
        <header className="border-base-300 flex h-16 shrink-0 items-center justify-between border-b pr-2 pl-4">
          <NavBrand title={title} onClick={onClose} />
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className={closeButtonStyles}
          >
            <Icon name="close" size="lg" />
          </button>
        </header>

        <nav aria-label="Menu" className="flex-1 overflow-y-auto p-3">
          <ul className="nav-stagger flex flex-col gap-1" data-open={isOpen ? 'true' : 'false'}>
            {navItems.map((item) => (
              <li key={item.href}>
                <NavDrawerRow item={item} isCurrent={isCurrentNavItem(item, pathname)} onClick={onClose} />
              </li>
            ))}
          </ul>
        </nav>

        {(contactPhone || licence) && (
          <footer className="border-base-300 shrink-0 border-t p-4">
            {contactPhone && (
              <a href={`tel:${contactPhone}`} onClick={onClose} className="btn btn-primary w-full gap-2 rounded-full">
                <Icon name="phone" size="md" />
                {contactPhone}
              </a>
            )}
            {licence && (
              <p className="text-base-content/50 mt-3 text-center text-xs tracking-wide">
                {`REC ${licence} · Licensed & insured`}
              </p>
            )}
          </footer>
        )}
      </aside>
    </div>
  );
}
