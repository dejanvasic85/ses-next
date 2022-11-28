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

export function Navbar({ contactPhone }) {
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
            <a className="btn btn-ghost normal-case text-xl" href="#">
              <Icon name="bolt" size="xxl" className="mr-2" /> SES - Melbourne
            </a>
          </div>
          <div className="flex items-center justify-center text-sm md:text-base w-full md:w-auto md:flex-none">
            <ul className="menu menu-horizontal p-0">
              <li>
                <a className="rounded-lg" href="#about">
                  About Us
                </a>
              </li>
              <li>
                <a className="rounded-lg" href="#contact">
                  Contact Us
                </a>
              </li>
              <li>
                <a className="rounded-lg" href="#services">
                  Services
                </a>
              </li>
              {contactPhone && (
                <li>
                  <a className="rounded-lg" href={`tel:contactPhone`}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                      />
                    </svg>
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
