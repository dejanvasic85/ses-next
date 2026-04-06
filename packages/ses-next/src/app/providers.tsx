'use client';

import { useEffect, type ReactNode } from 'react';
import TagManager from 'react-gtm-module';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';

import { ConfigProvider } from '@/providers/ConfigProvider';
import { clientConfig } from '@/clientConfig';

interface ProvidersProps {
  children: ReactNode;
  sanityProjectId: string;
  sanityDataset: string;
}

export function Providers({ children, sanityProjectId, sanityDataset }: ProvidersProps) {
  useEffect(() => {
    if (!clientConfig.googleTagManagerId) {
      console.log('Google Tag Manager ID not set, not initializing GTM');
      return;
    }

    TagManager.initialize({ gtmId: clientConfig.googleTagManagerId });
  }, []);

  return (
    <ConfigProvider sanityProjectId={sanityProjectId} sanityDataset={sanityDataset}>
      <GoogleReCaptchaProvider
        reCaptchaKey={clientConfig.googleRecaptchaSiteKey}
        scriptProps={{
          async: true,
          defer: true,
        }}
      >
        {children}
      </GoogleReCaptchaProvider>
    </ConfigProvider>
  );
}
