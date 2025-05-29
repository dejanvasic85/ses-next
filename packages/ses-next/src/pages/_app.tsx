import { useEffect } from 'react';
import getConfig from 'next/config';
import type { AppProps } from 'next/app';

import TagManager from 'react-gtm-module';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';

import '../../styles/globals.css';
import { BasePageProps } from '@/types';
import { ConfigProvider } from '@/providers/ConfigProvider';

const { publicRuntimeConfig } = getConfig();

function MyApp({ Component, pageProps }: AppProps<BasePageProps>) {
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
    <ConfigProvider
      sanityProjectId={pageProps.publicConfig.sanityProjectId}
      sanityDataset={pageProps.publicConfig.sanityDataset}
    >
      <GoogleReCaptchaProvider
        reCaptchaKey={publicRuntimeConfig.googleRecaptchaSiteKey}
        scriptProps={{
          async: true,
          defer: true,
        }}
      >
        <Component {...pageProps} />
      </GoogleReCaptchaProvider>
    </ConfigProvider>
  );
}

export default MyApp;
