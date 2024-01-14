import { useEffect } from 'react';
import getConfig from 'next/config';

import TagManager from 'react-gtm-module';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';

import '../../styles/globals.css';
import { Layout } from '../components/Layout';

const { publicRuntimeConfig } = getConfig();

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
      <Layout content={pageProps.content} pageUrl={pageProps.pageUrl} googleReviews={pageProps.googleReviews}>
        <Component {...pageProps} />
      </Layout>
    </GoogleReCaptchaProvider>
  );
}

export default MyApp;
