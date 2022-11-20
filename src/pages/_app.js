import { Footer, Navbar } from '../components';

import '../../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Navbar contactPhone={pageProps.contact.phone} />
      <Component {...pageProps} />
      <Footer />
    </>
  );
}

export default MyApp;
