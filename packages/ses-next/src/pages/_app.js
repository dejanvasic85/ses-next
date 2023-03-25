import { useEffect } from 'react';

import TagManager from 'react-gtm-module';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
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

  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={publicRuntimeConfig.googleRecaptchaSiteKey}
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
