'use client';

import type { ReactNode } from 'react';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';

import { ConfigProvider } from '@/providers/ConfigProvider';
import { clientConfig } from '@/clientConfig';

interface ProvidersProps {
  children: ReactNode;
  sanityProjectId: string;
  sanityDataset: string;
}

export function Providers({ children, sanityProjectId, sanityDataset }: ProvidersProps) {
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
