import type { Metadata } from 'next';
import localFont from 'next/font/local';

import { getSiteSettings, getServices } from '@/lib/content/contentService';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Providers } from '@/app/providers';
import { config } from '@/lib/config';
import '../../styles/globals.css';

const inter = localFont({
  src: [
    { path: '../../public/fonts/inter-latin-400-normal.woff2', weight: '400', style: 'normal' },
    { path: '../../public/fonts/inter-latin-500-normal.woff2', weight: '500', style: 'normal' },
    { path: '../../public/fonts/inter-latin-700-normal.woff2', weight: '700', style: 'normal' },
  ],
  display: 'swap',
});

export const metadata: Metadata = {
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    locale: 'en_AU',
    type: 'website',
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: [
      { url: '/apple-touch-icon.png' },
      { url: '/apple-touch-icon-57x57.png', sizes: '57x57' },
      { url: '/apple-touch-icon-72x72.png', sizes: '72x72' },
      { url: '/apple-touch-icon-76x76.png', sizes: '76x76' },
      { url: '/apple-touch-icon-114x114.png', sizes: '114x114' },
      { url: '/apple-touch-icon-120x120.png', sizes: '120x120' },
      { url: '/apple-touch-icon-144x144.png', sizes: '144x144' },
      { url: '/apple-touch-icon-152x152.png', sizes: '152x152' },
      { url: '/apple-touch-icon-180x180.png', sizes: '180x180' },
    ],
  },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const [siteSettings, services] = await Promise.all([getSiteSettings(), getServices()]);

  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen`}>
        <Providers sanityProjectId={config.sanityProjectId} sanityDataset={config.sanityDataset}>
          <Navbar contactPhone={siteSettings.phone} title={siteSettings.shortTitle} />
          <main>{children}</main>
          <Footer social={siteSettings.social} services={services} />
        </Providers>
      </body>
    </html>
  );
}
