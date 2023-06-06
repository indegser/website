// app/providers.jsx
'use client';

import 'dayjs/locale/ko';

import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';

dayjs.locale('ko');
dayjs.extend(localizedFormat);

export default function Providers({ children }) {
  return <>{children}</>;
}
