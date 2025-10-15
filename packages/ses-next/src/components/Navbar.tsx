import React, { useState, useEffect, type PropsWithChildren } from 'react';
import classNames from 'class-names';
import NextLink from 'next/link';

import { Container, Icon } from '.';

const styles = {
  nav: {
    default: 'sticky top-0 z-30 w-full bg-opacity-90 backdrop-blur transition-all duration-100',
    top: 'text-base-content',
    scrolled: 'bg-base-100 text-base-content shadow-sm',
  },
};

interface NavLinks {
  home: string;
  services: string;
  about: string;
  contact: string;
  faq: string;
  blog: string;
}

interface NavbarProps {
  contactPhone: string;
  title: string;
  links?: NavLinks;
}

export function Navbar({
  contactPhone,
  title,
  links = {
    home: '/',
    services: '/#services',
    about: '/#about',
    contact: '/#contact',
    faq: '/faq',
    blog: '/blog',
  },
}: NavbarProps) {
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
      <nav className={classNames(styles.nav.default, styles.nav.scrolled)}>
        <Container>
          <div className="flex items-center justify-between h-16 w-full">
            <div className="md:flex md:flex-1">
              <NextLink className="btn btn-ghost normal-case text-xl" href={links.home}>
                <Icon name="bolt" size="xxl" className="mr-2" /> {title}
              </NextLink>
            </div>

            <div className="flex flex-row-reverse md:hidden gap-2">
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 hover:bg-slate-200 rounded"
                aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={isMobileMenuOpen}
                aria-controls="mobile-menu"
              >
                <Icon name="menu" size="xl" />
              </button>
              {contactPhone && (
                <a href={`tel:${contactPhone}`} className="p-2 hover:bg-slate-200 rounded" aria-label="Call us">
                  <Icon name="phone" size="lg" />
                </a>
              )}
            </div>

            <div className="hidden md:flex flex-1 md:justify-end">
              <Menu>
                <MenuItems links={links} contactPhone={contactPhone} />
              </Menu>
            </div>
          </div>
        </Container>
      </nav>
      <MobileMenu isOpen={isMobileMenuOpen} onClose={handleCloseMobileMenu}>
        <Menu direction="vertical" size="lg" className="mt-16">
          <MenuItems links={links} contactPhone={contactPhone} />
        </Menu>
      </MobileMenu>
    </>
  );
}

interface MenuLinkItemProps extends React.PropsWithChildren {
  href: string;
  className?: string;
}

function MenuLinkItem({ href, children, className }: MenuLinkItemProps) {
  return (
    <li>
      <NextLink href={href} className={classNames('hover:bg-slate-500 hover:text-white rounded p-2', className)}>
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
        'flex items-center h-16 md:text-sm justify-center w-full gap-1 lg:gap-2 md:w-auto md:flex-none',
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
}

export const MobileMenu = ({ isOpen, onClose, children }: MobileMenuProps) => {
  const handleClickInsideMenu = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div
      className={classNames(
        `fixed inset-0 z-50 bg-black/30 flex justify-end transition-opacity duration-200 ease-out`,
        isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none',
      )}
      onClick={onClose}
    >
      <div
        className={classNames(
          'w-4/5 max-w-xs bg-white h-full shadow-lg p-4 transform transition-transform duration-200 ease-out',
          isOpen ? 'translate-x-0' : 'translate-x-full',
        )}
        onClick={handleClickInsideMenu}
      >
        {children}
      </div>
    </div>
  );
};

function MenuItems({ links, contactPhone }: Pick<NavbarProps, 'links' | 'contactPhone'>) {
  if (!links) return null;
  return (
    <>
      <MenuLinkItem href={links.home} className="md:flex items-center gap-1 hidden">
        <Icon name="home" className="lg:hidden" />
        <span className="hidden lg:block">Home</span>
      </MenuLinkItem>
      <MenuLinkItem href={links.services}>Services</MenuLinkItem>
      <MenuLinkItem href={links.about}>About</MenuLinkItem>
      <MenuLinkItem href={links.contact}>Contact</MenuLinkItem>
      <MenuLinkItem href={links.faq}>FAQ</MenuLinkItem>
      <MenuLinkItem href={links.blog}>Blog</MenuLinkItem>
      {contactPhone && (
        <MenuLinkItem href={`tel:${contactPhone}`} className="md:flex items-center gap-1 hidden">
          <Icon name="phone" />
          <span className="hidden lg:block">{contactPhone}</span>
        </MenuLinkItem>
      )}
    </>
  );
}
