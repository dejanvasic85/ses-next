import classNames from 'class-names';
import NextLink from 'next/link';

import { Container, Icon } from '.';

const styles = {
  nav: {
    default:
      'sticky top-0 z-30 flex h-16 w-full justify-center bg-opacity-90 backdrop-blur transition-all duration-100',
    top: 'text-base-content',
    scrolled: 'bg-base-100 text-base-content shadow-sm',
  },
};

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
}) {
  return (
    <div className={classNames(styles.nav.default, styles.nav.scrolled)}>
      <nav className="navbar w-full">
        <Container>
          <div className="hidden md:flex md:flex-1">
            <a className="btn btn-ghost normal-case text-xl" href={links.home}>
              <Icon name="bolt" size="xxl" className="mr-2" /> {title}
            </a>
          </div>
          <div className="flex items-center justify-center text-sm md:text-base w-full md:w-auto md:flex-none">
            <ul className="menu menu-xs lg:menu-md menu-horizontal p-0">
              <li className="">
                <a className="rounded-lg" href="/">
                  Home
                </a>
              </li>
              <li>
                <a className="rounded-lg" href={links.services}>
                  Services
                </a>
              </li>
              <li>
                <a className="rounded-lg" href={links.about}>
                  About Us
                </a>
              </li>
              <li>
                <a className="rounded-lg" href={links.contact}>
                  Contact Us
                </a>
              </li>
              <li>
                <a className="rounded-lg" href={links.faq}>
                  FAQ
                </a>
              </li>
              <li>
                <NextLink className="rounded-lg" href={links.blog}>
                  Blog
                </NextLink>
              </li>
              {contactPhone && (
                <li className="hidden md:inline-block">
                  <a className="rounded-lg" href={`tel:${contactPhone}`}>
                    <Icon name="phone" />
                    {contactPhone}
                  </a>
                </li>
              )}
            </ul>
          </div>
        </Container>
      </nav>
    </div>
  );
}
