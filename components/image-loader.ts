import { ImageLoaderProps } from 'next/image';

export default function imageLoader({ src, width, quality }: ImageLoaderProps) {
  if (!src.includes('res.cloudinary.com')) {
    const url = new URL(src);
    url.searchParams.set('w', String(width));

    if (quality) {
      url.searchParams.set('q', String(quality));
    }

    return url.href;
  }

  const url = new URL(src);
  const fragments = url.pathname.split('/');
  const index = fragments.findIndex((value) => /v\d+/.test(value));
  const params = [
    'f_auto',
    'c_fill',
    'w_' + width,
    'ar_16:9',
    'g_auto',
    'q_' + (quality || 'auto'),
  ];

  fragments.splice(index, 1, params.join(','));
  url.pathname = fragments.join('/');

  return url.href;
}
