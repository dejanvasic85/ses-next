import classNames from 'class-names';

import useScrollPosition from '../hooks/useScrollPosition';

import Container from './Container';

const styles = {
  nav: {
    default:
      'sticky top-0 z-30 flex h-16 w-full justify-center bg-opacity-90 backdrop-blur transition-all duration-100',
    top: 'text-primary-content',
    scrolled: 'bg-base-100 text-base-content shadow-sm',
  },
};

export default function Navbar() {
  const scrollPosition = useScrollPosition();
  const isTopPosition = scrollPosition < 95;

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
            <a className="btn btn-ghost normal-case text-xl">SES</a>
          </div>
          <div className="flex items-center justify-center w-full md:w-auto md:flex-none">
            <ul className="menu menu-horizontal p-0">
              <li>
                <a>Services</a>
              </li>
              <li>
                <a>About Us</a>
              </li>
              <li>
                <a>Contact Us</a>
              </li>
            </ul>
          </div>
        </Container>
      </nav>
    </div>
  );
}
