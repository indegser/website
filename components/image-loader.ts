import { ImageLoaderProps } from 'next/image';

export default function imageLoader({ src, width, quality }: ImageLoaderProps) {
  if (!src.includes('res.cloudinary.com')) return src;

  const url = new URL(src);
  const fragments = url.pathname.split('/');
  const index = fragments.findIndex((value) => /v\d+/.test(value));
  const params = [
    'f_auto',
    'c_limit',
    'w_' + width,
    'q_' + (quality || 'auto'),
  ];

  fragments.splice(index, 1, params.join(','));
  url.pathname = fragments.join('/');

  return url.href;
}
