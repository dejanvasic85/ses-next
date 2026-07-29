'use client';

import { Activity } from 'react';
import { useState, useEffect, type PropsWithChildren } from 'react';
import classNames from 'class-names';
import NextLink from 'next/link';

import { Container, Icon } from '.';

const navStyles = 'surface-glass sticky top-0 z-30 w-full border-x-0 border-t-0 text-base-content';

interface NavLinks {
  home: string;
  services: string;
  locations: string;
  about: string;
  contact: string;
  faq: string;
  blog: string;
}

const defaultNavLinks: NavLinks = {
  home: '/',
  services: '/services/',
  locations: '/locations/',
  about: '/#about',
  contact: '/#contact',
  faq: '/faq',
  blog: '/blog',
};

interface NavbarProps {
  contactPhone: string;
  title: string;
  links?: NavLinks;
}

export function Navbar({ contactPhone, title, links = defaultNavLinks }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isMobileMenuOpen]);

  const handleCloseMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav className={navStyles}>
        <Container>
          <div className="flex h-16 w-full items-center justify-between">
            <div className="md:flex md:flex-1">
              <NextLink
                className="btn btn-ghost font-display text-base whitespace-nowrap normal-case sm:text-xl"
                href={links.home}
              >
                <Icon name="bolt" size="xxl" className="mr-2" /> {title}
              </NextLink>
            </div>

            <div className="flex flex-row-reverse gap-2 md:hidden">
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="hover:bg-base-200 rounded p-2"
                aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={isMobileMenuOpen}
                aria-controls="mobile-menu"
              >
                <Icon name="menu" size="xl" />
              </button>
              <Activity mode={contactPhone ? 'visible' : 'hidden'}>
                <a href={`tel:${contactPhone}`} className="hover:bg-base-200 rounded p-2" aria-label="Call us">
                  <Icon name="phone" size="lg" />
                </a>
              </Activity>
            </div>

            <div className="hidden flex-1 md:flex md:justify-end">
              <Menu>
                <MenuItems links={links} contactPhone={contactPhone} />
              </Menu>
            </div>
          </div>
        </Container>
      </nav>
      <MobileMenu isOpen={isMobileMenuOpen} contactPhone={contactPhone} onClose={handleCloseMobileMenu}>
        <Menu direction="vertical" size="lg" className="mt-16">
          <MenuItems links={links} contactPhone={contactPhone} onClick={handleCloseMobileMenu} />
        </Menu>
      </MobileMenu>
    </>
  );
}

interface MenuLinkItemProps extends React.PropsWithChildren {
  href: string;
  className?: string;
  onClick?: () => void;
}

function MenuLinkItem({ href, children, className, onClick }: MenuLinkItemProps) {
  return (
    <li>
      <NextLink
        href={href}
        className={classNames('hover:bg-primary hover:text-primary-content rounded p-2 transition-colors', className)}
        onClick={onClick}
      >
        {children}
      </NextLink>
    </li>
  );
}

interface MenuProps extends React.PropsWithChildren {
  className?: string;
  direction?: 'horizontal' | 'vertical';
  size?: 'md' | 'lg';
}

function Menu({ children, className, direction = 'horizontal', size = 'md' }: MenuProps) {
  return (
    <ul
      className={classNames(
        'flex h-16 w-full items-center justify-center gap-1 md:w-auto md:flex-none md:text-sm lg:gap-2',
        className,
        {
          'flex-col': direction === 'vertical',
          'flex-row': direction === 'horizontal',
        },
        {
          'text-md': size === 'md',
          'text-lg': size === 'lg',
        },
      )}
    >
      {children}
    </ul>
  );
}

interface MobileMenuProps extends PropsWithChildren {
  isOpen?: boolean;
  onClose?: () => void;
  contactPhone?: string;
}

export const MobileMenu = ({ isOpen, onClose, children, contactPhone }: MobileMenuProps) => {
  const handleClickInsideMenu = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <>
      <div
        className={classNames(
          // A scrim is an overlay rather than a themed surface, so raw black is
          // intentional here and stays legible against either theme.
          `fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-sm transition-opacity duration-200 ease-[cubic-bezier(0.22,1,0.36,1)]`,
          isOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0',
        )}
        onClick={onClose}
      >
        <div
          className={classNames(
            'bg-base-100 h-full w-4/5 max-w-xs transform p-4 shadow-lg transition-transform duration-200 ease-[cubic-bezier(0.22,1,0.36,1)]',
            isOpen ? 'translate-x-0' : 'translate-x-full',
          )}
          onClick={handleClickInsideMenu}
        >
          <header className="border-base-300 flex items-center justify-between border-b p-4">
            <span className="font-display text-xl font-semibold">Menu</span>
            <button onClick={onClose} aria-label="Close menu">
              <Icon name="close" size="lg" />
            </button>
          </header>
          <main>{children}</main>
        </div>
      </div>
    </>
  );
};

interface MenuItemsProps extends Pick<NavbarProps, 'links' | 'contactPhone'> {
  onClick?: () => void;
}

function MenuItems({ links, contactPhone, onClick }: MenuItemsProps) {
  if (!links) return null;
  return (
    <>
      <MenuLinkItem href={links.home} className="hidden items-center gap-1 md:flex" onClick={onClick}>
        <Icon name="home" className="lg:hidden" />
        <span className="hidden lg:block">Home</span>
      </MenuLinkItem>
      <MenuLinkItem href={links.contact} onClick={onClick}>
        Contact
      </MenuLinkItem>
      <MenuLinkItem href={links.services} onClick={onClick}>
        Services
      </MenuLinkItem>
      <MenuLinkItem href={links.locations} onClick={onClick}>
        Locations
      </MenuLinkItem>
      <MenuLinkItem href={links.about} onClick={onClick}>
        About
      </MenuLinkItem>
      <MenuLinkItem href={links.faq} onClick={onClick}>
        FAQ
      </MenuLinkItem>
      <MenuLinkItem href={links.blog} onClick={onClick}>
        Blog
      </MenuLinkItem>
      <Activity mode={contactPhone ? 'visible' : 'hidden'}>
        <MenuLinkItem href={`tel:${contactPhone}`} onClick={onClick} className="hidden items-center gap-1 md:flex">
          <Icon name="phone" />
          <span className="hidden lg:block">{contactPhone}</span>
        </MenuLinkItem>
      </Activity>
    </>
  );
}
