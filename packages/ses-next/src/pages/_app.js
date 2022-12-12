import { useEffect } from 'react';
import TagManager from 'react-gtm-module';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

import '../../styles/globals.css';

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    if (!publicRuntimeConfig.googleTagManagerId) {
      console.log('Google Tag Manager ID not set, not initializing GTM');
      return;
    }

    const tagManagerArgs = {
      gtmId: publicRuntimeConfig.googleTagManagerId,
    };

    TagManager.initialize(tagManagerArgs);
  }, []);

  return <Component {...pageProps} />;
}

export default MyApp;
