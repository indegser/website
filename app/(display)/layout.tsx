import 'components/globals.css';

import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Metadata } from 'next';
import { ReactNode } from 'react';

import { Providers } from './providers';

import { Footer } from '@/components/organs/footer';
import { Nav } from '@/components/organs/nav';
import { Toaster } from '@/components/ui/toaster';
import { jetBrainsMonoFont, pretendardFont } from 'components/theme';
import { getURL } from 'lib/constants';

export const metadata: Metadata = {
  title: {
    template: '%s - Indegser',
    default: 'Indegser', // a default is required when creating a template
  },
  metadataBase: new URL(getURL()),
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
      <body>
        <Providers
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Nav />
          <main className="min-h-screen w-full">{children}</main>
          <Footer />
        </Providers>
        <Analytics />
        <Toaster />
        <SpeedInsights />
      </body>
    </html>
  );
}
