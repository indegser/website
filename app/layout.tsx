import '@src/design/globals.css';

import { Metadata } from 'next';
import { ReactNode } from 'react';

import Providers from './providers';

import { Footer } from '@src/design/organs/footer/Footer';
import { Nav } from '@src/design/organs/nav/Nav';
import { jetBrainsMonoFont, pretendardFont } from '@src/design/theme';

export const metdata: Metadata = {
  title: {
    default: '콘텐츠',
    template: '%s - indegser',
  },
};

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
      </body>
    </html>
  );
}
