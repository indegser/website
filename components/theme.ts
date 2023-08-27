import { JetBrains_Mono } from 'next/font/google';
import localFont from 'next/font/local';
import { blue, gray, green, lime, purple, red } from 'tailwindcss/colors';

// Font files can be colocated inside of `pages`
export const pretendardFont = localFont({
  src: '../fonts/PretendardVariable.woff2',
  style: 'normal',
  weight: '100 800',
  variable: '--pretendard',
});

export const jetBrainsMonoFont = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--jetbrains-mono',
});

export const colors = {
  gray,
  blue,
  red,
  green,
  purple,
  lime,
};
