import React from 'react';
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
  return (
    <nav className={classNames(styles.nav.default, styles.nav.scrolled)}>
      <Container>
        <div className="flex items-center justify-between h-full w-full">
          <div className="hidden md:flex md:flex-1">
            <NextLink className="btn btn-ghost normal-case text-xl" href={links.home}>
              <Icon name="bolt" size="xxl" className="mr-2" /> {title}
            </NextLink>
          </div>
          <Menu>
            <MenuLinkItem href={links.home} className="flex items-center gap-1">
              <Icon name="home" className="lg:hidden" />
              <span className="hidden lg:block">Home</span>
            </MenuLinkItem>
            <MenuLinkItem href={links.services}>Services</MenuLinkItem>
            <MenuLinkItem href={links.about}>About</MenuLinkItem>
            <MenuLinkItem href={links.contact}>Contact</MenuLinkItem>
            <MenuLinkItem href={links.faq}>FAQ</MenuLinkItem>
            <MenuLinkItem href={links.blog}>Blog</MenuLinkItem>
            {contactPhone && (
              <MenuLinkItem href={`tel:${contactPhone}`} className="flex items-center gap-1">
                <Icon name="phone" />
                <span className="hidden lg:block">{contactPhone}</span>
              </MenuLinkItem>
            )}
          </Menu>
        </div>
      </Container>
    </nav>
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
}

function Menu({ children, className }: MenuProps) {
  return (
    <ul
      className={classNames(
        'flex items-center h-16 text-xs md:text-sm justify-center w-full gap-1 lg:gap-2 md:w-auto md:flex-none',
        className,
      )}
    >
      {children}
    </ul>
  );
}
