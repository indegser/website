import 'components/globals.css';

import { Analytics } from '@vercel/analytics/react';
import { Metadata } from 'next';
import { ReactNode } from 'react';

import { Providers } from './providers';

import { Toaster } from '@/components/ui/toaster';
import { Footer } from 'components/organs/footer/Footer';
import { Nav } from 'components/organs/nav/Nav';
import { jetBrainsMonoFont, pretendardFont } from 'components/theme';
import { ORIGIN } from 'lib/constants';

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
      suppressHydrationWarning
    >
      <body className="bg-gray-50 dark:bg-gray-950">
        <Providers attribute="class" defaultTheme="system">
          <Nav />
          <main className="min-h-screen w-full">{children}</main>
          <Footer />
        </Providers>
        <Analytics />
        <Toaster />
      </body>
    </html>
  );
}
