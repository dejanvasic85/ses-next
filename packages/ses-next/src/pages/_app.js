import { useEffect } from 'react';

import TagManager from 'react-gtm-module';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import { config } from '../lib/config';

import '../../styles/globals.css';

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    if (!config.googleTagManagerId) {
      console.log('Google Tag Manager ID not set, not initializing GTM');
      return;
    }

    const tagManagerArgs = {
      gtmId: config.googleTagManagerId,
    };

    TagManager.initialize(tagManagerArgs);
  }, []);

  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={config.googleRecaptchaSiteKey}
      scriptProps={{
        async: true,
        defer: true,
      }}
    >
      <Component {...pageProps} />
    </GoogleReCaptchaProvider>
  );
}

export default MyApp;
