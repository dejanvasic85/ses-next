import Container from './Container';

/*
sticky top-0 z-30 flex h-16 w-full justify-center bg-opacity-90 backdrop-blur transition-all duration-100 bg-base-100 text-base-content shadow-sm
sticky top-0 z-30 flex h-16 w-full justify-center bg-opacity-90 backdrop-blur transition-all duration-100 text-primary-content
*/

export default function Navbar() {
  return (
    <div className="sticky top-0 z-30 flex h-16 w-full justify-center bg-opacity-90 backdrop-blur transition-all duration-100 text-primary-content">
      <nav className="navbar w-full">
        <Container>
          <div className="flex-1">
            <a className="btn btn-ghost normal-case text-xl">Logo</a>
          </div>
          <div className="flex-none">
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
