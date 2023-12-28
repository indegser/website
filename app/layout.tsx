import 'components/globals.css';

import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Metadata } from 'next';
import { ReactNode } from 'react';

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
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `<!-- Hotjar Tracking Code for https://indegser.com -->
    (function(h,o,t,j,a,r){
        h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
        h._hjSettings={hjid:2698426,hjsv:6};
        a=o.getElementsByTagName('head')[0];
        r=o.createElement('script');r.async=1;
        r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
        a.appendChild(r);
    })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
`,
          }}
        ></script>
      </head>
      <body>
        <main className="min-h-screen w-full">{children}</main>
        <Analytics />
        <Toaster />
        <SpeedInsights />
      </body>
    </html>
  );
}
