'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { clsx } from 'clsx';

import { Container } from '@/components/Container';
import { Icon } from '@/components/Icon/Icon';
import { NavBrand } from '@/components/Navbar/NavBrand';
import { NavDrawer } from '@/components/Navbar/NavDrawer';
import { NavRail } from '@/components/Navbar/NavRail';

/*
 * The bar rides transparent over the top of the page and condenses into glass
 * once you leave it, so the hero is never cut off by a lid. The threshold is a
 * few pixels rather than zero to keep momentum scrolling from flickering it.
 */
const scrollThreshold = 8;

const navStyles = 'sticky top-0 z-40 w-full transition-colors duration-300';
const scrolledStyles = 'surface-glass border-x-0 border-t-0';

const iconButtonStyles =
  'text-base-content/70 hover:bg-base-content/5 hover:text-base-content focus-visible:ring-primary focus-visible:ring-offset-base-100 flex size-11 items-center justify-center rounded-full transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none';

const callButtonStyles = 'btn btn-primary btn-sm hidden h-10 gap-2 rounded-full px-4 md:inline-flex';

interface NavbarProps {
  contactPhone: string;
  title: string;
  licence?: string;
}

export function Navbar({ contactPhone, title, licence }: NavbarProps) {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > scrollThreshold);

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const handleCloseMenu = useCallback(() => {
    setIsMenuOpen(false);
    menuButtonRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!isMenuOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') handleCloseMenu();
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isMenuOpen, handleCloseMenu]);

  return (
    <>
      <nav aria-label="Main" className={clsx(navStyles, isScrolled && scrolledStyles)}>
        <Container>
          <div className="flex h-16 w-full items-center justify-between gap-4">
            <NavBrand title={title} />

            <div className="flex h-full items-center gap-1 md:gap-3">
              <NavRail pathname={pathname} />

              {contactPhone && (
                <>
                  <a href={`tel:${contactPhone}`} className={callButtonStyles}>
                    <Icon name="phone" size="sm" />
                    <span className="hidden lg:inline">{contactPhone}</span>
                    <span className="lg:hidden">Call</span>
                  </a>
                  <a
                    href={`tel:${contactPhone}`}
                    className={clsx(iconButtonStyles, 'md:hidden')}
                    aria-label={`Call ${contactPhone}`}
                  >
                    <Icon name="phone" size="lg" />
                  </a>
                </>
              )}

              <button
                ref={menuButtonRef}
                type="button"
                onClick={() => setIsMenuOpen(true)}
                className={clsx(iconButtonStyles, 'md:hidden')}
                aria-label="Open menu"
                aria-expanded={isMenuOpen}
                aria-haspopup="dialog"
              >
                <Icon name="menu" size="xl" />
              </button>
            </div>
          </div>
        </Container>

        {/* The bus bar doubles as the header's only divider — dim at rest, lit once you scroll. */}
        <span
          aria-hidden="true"
          className={clsx(
            'nav-busbar absolute inset-x-0 bottom-0 h-px transition-opacity duration-300',
            isScrolled ? 'opacity-100' : 'opacity-40',
          )}
        />
      </nav>

      <NavDrawer
        isOpen={isMenuOpen}
        pathname={pathname}
        title={title}
        contactPhone={contactPhone}
        licence={licence}
        onClose={handleCloseMenu}
      />
    </>
  );
}
