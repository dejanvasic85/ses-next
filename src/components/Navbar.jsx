import Container from './Container';

export default function Navbar() {
  return (
    <nav className="navbar w-full">
      <Container>
        <div className="flex-1">
          <a className="btn btn-ghost normal-case text-xl">SES - Storm Electrical Solutions</a>
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
  );
}
