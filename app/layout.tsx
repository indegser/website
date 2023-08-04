import '@src/components/globals.css';

import { Analytics } from '@vercel/analytics/react';
import { Metadata } from 'next';
import { ReactNode } from 'react';

import Providers from './providers';

import { Footer } from '@src/components/organs/footer/Footer';
import { Nav } from '@src/components/organs/nav/Nav';
import { jetBrainsMonoFont, pretendardFont } from '@src/components/theme';
import { ORIGIN } from '@src/types/const.types';

export const metadata: Metadata = {
  title: {
    template: '%s - Indegser',
    default: 'Indegser', // a default is required when creating a template
  },
  metadataBase: new URL(ORIGIN),
  alternates: {
    canonical: '/',
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en-KR"
      className={`${pretendardFont.variable} ${jetBrainsMonoFont.variable}`}
    >
      <body className="bg-gray-50 dark:bg-gray-950">
        <Providers>
          <Nav />
          <main className="min-h-screen w-full">{children}</main>
          <Footer />
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}
