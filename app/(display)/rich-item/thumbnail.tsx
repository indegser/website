'use client';

import Image from 'next/image';

import { PostFeed, urlForImage } from '@/lib/sanity';
import { breakPoints } from 'components/breakPoints';

interface Props {
  alt: string;
  cover: PostFeed['cover'];
}

export const Thumbnail = (props: Props) => {
  const { cover, alt } = props;

  return (
    <div className="relative aspect-square h-auto w-full bg-muted">
      {cover ? (
        <Image
          src={urlForImage(cover).width(500).url()}
          priority
          alt={alt}
          fill
          style={{ objectFit: 'contain' }}
          loader={({ width, quality = 80 }) =>
            urlForImage(cover).width(width).quality(quality).url()
          }
          sizes={`(max-width: ${breakPoints.sm}px) 100vw, 33vw`}
        />
      ) : (
        <div className="h-full w-full" />
      )}
    </div>
  );
};
