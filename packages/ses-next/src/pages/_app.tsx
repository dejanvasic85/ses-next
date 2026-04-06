import { useEffect } from 'react';
import type { AppProps } from 'next/app';
import { Inter } from 'next/font/google';

import TagManager from 'react-gtm-module';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';

import '../../styles/globals.css';
import { BasePageProps } from '@/types';
import { ConfigProvider } from '@/providers/ConfigProvider';
import { clientConfig } from '@/clientConfig';

const dmSans = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
});

function MyApp({ Component, pageProps }: AppProps<BasePageProps>) {
  useEffect(() => {
    if (!clientConfig.googleTagManagerId) {
      console.log('Google Tag Manager ID not set, not initializing GTM');
      return;
    }

    const tagManagerArgs = {
      gtmId: clientConfig.googleTagManagerId,
    };

    TagManager.initialize(tagManagerArgs);
  }, []);

  const sanityProjectId = pageProps.publicConfig?.sanityProjectId;
  const sanityDataset = pageProps.publicConfig?.sanityDataset;

  if (!sanityProjectId || !sanityDataset) {
    throw new Error('Missing Sanity public config in pageProps.publicConfig');
  }

  return (
    <div className={dmSans.className} style={{ minHeight: '100vh' }}>
      <ConfigProvider sanityProjectId={sanityProjectId} sanityDataset={sanityDataset}>
        <GoogleReCaptchaProvider
          reCaptchaKey={clientConfig.googleRecaptchaSiteKey}
          scriptProps={{
            async: true,
            defer: true,
          }}
        >
          <Component {...pageProps} />
        </GoogleReCaptchaProvider>
      </ConfigProvider>
    </div>
  );
}

export default MyApp;
