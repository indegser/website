'use client';

import 'dayjs/locale/ko';
const Analytics = dynamic(() => import('@src/components/Analytics'), {
  ssr: false,
});

import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import dynamic from 'next/dynamic';

dayjs.locale('ko');
dayjs.extend(localizedFormat);

export default function Providers({ children }) {
  return (
    <>
      <Analytics />
      {children}
    </>
  );
}
