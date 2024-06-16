'use client';

import Image from 'next/image';

import { PostFeed, getImageDimensions, urlForImage } from '@/lib/sanity';
import { breakPoints } from 'components/breakPoints';

interface Props {
  alt: string;
  cover: PostFeed['cover'];
}

export const Thumbnail = (props: Props) => {
  const { cover, alt } = props;
  const { width, height, aspectRatio } = getImageDimensions(cover?.asset!);

  return (
    <div className="relative bg-muted" style={{ aspectRatio }}>
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
