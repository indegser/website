'use client';

import { isProduction } from '@/lib/constants';
import Script from 'next/script';

const SCRIPT = `
  (function(h,o,t,j,a,r){
      h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
      h._hjSettings={hjid:2698426,hjsv:6};
      a=o.getElementsByTagName('head')[0];
      r=o.createElement('script');r.async=1;
      r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
      a.appendChild(r);
  })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
`;

export const Hotjar = () => {
  if (isProduction) {
    return <Script id="hotjar">{SCRIPT}</Script>;
  }
  return null;
};
