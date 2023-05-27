import '@src/design/globals.css';

import { ReactNode } from 'react';

import Providers from './providers';

import { Footer } from '@src/design/organs/footer/Footer';
import { Nav } from '@src/design/organs/nav/Nav';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en-KR">
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
