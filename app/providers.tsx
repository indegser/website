'use client';

import 'dayjs/locale/ko';

import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import Script from 'next/script';

import { GA_MEASUREMENT_ID } from '@src/types/const.types';

dayjs.locale('ko');
dayjs.extend(localizedFormat);

export default function Providers({ children }) {
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />
      <Script id="google-analytics">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
 
          gtag('config', '${GA_MEASUREMENT_ID}');
        `}
      </Script>
      {children}
    </>
  );
}
