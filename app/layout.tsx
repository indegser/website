import '@src/design/globals.css';

import { Analytics } from '@vercel/analytics/react';
import { ReactNode } from 'react';

import Providers from './providers';

import { Footer } from '@src/design/organs/footer/Footer';
import { Nav } from '@src/design/organs/nav/Nav';
import { jetBrainsMonoFont, pretendardFont } from '@src/design/theme';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en-KR"
      className={`${pretendardFont.variable} ${jetBrainsMonoFont.variable}`}
    >
      <body>
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
