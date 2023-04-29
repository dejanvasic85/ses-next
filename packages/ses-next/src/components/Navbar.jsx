import classNames from 'class-names';

import useScrollPosition from '../hooks/useScrollPosition';

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
  links = { home: '#', about: '#about', services: '#services', contact: '#contact' },
}) {
  const scrollPosition = useScrollPosition();
  const isTopPosition = scrollPosition < 5;

  return (
    <div
      className={classNames(
        styles.nav.default,
        { [styles.nav.top]: isTopPosition },
        { [styles.nav.scrolled]: !isTopPosition },
      )}
    >
      <nav className="navbar w-full">
        <Container>
          <div className="hidden md:flex md:flex-1">
            <a className="btn btn-ghost normal-case text-xl" href={links.home}>
              <Icon name="bolt" size="xxl" className="mr-2" /> {title}
            </a>
          </div>
          <div className="flex items-center justify-center text-sm md:text-base w-full md:w-auto md:flex-none">
            <ul className="menu menu-horizontal p-0">
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
              {contactPhone && (
                <li>
                  <a className="rounded-lg" href={`tel:${contactPhone}`}>
                    <Icon name="phone" />
                    <span className="hidden md:inline-block">{contactPhone}</span>
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
