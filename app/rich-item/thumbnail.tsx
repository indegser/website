'use client';

import Image from 'next/image';

import { breakPoints } from '@/components/break-points';
import { PostFeed, getImageDimensions, urlForImage } from '@/lib/sanity';

interface Props {
  alt: string;
  cover: PostFeed['cover'];
}

export const Thumbnail = (props: Props) => {
  const { cover, alt } = props;

  if (!cover?.asset) {
    return <div className="relative aspect-square bg-muted" aria-hidden />;
  }

  const { aspectRatio } = getImageDimensions(cover.asset);

  return (
    <div className="relative bg-muted" style={{ aspectRatio }}>
      <Image
        src={urlForImage(cover).width(500).url()}
        priority
        alt={alt}
        fill
        style={{ objectFit: 'contain' }}
        className="object-contain"
        loader={({ width, quality = 80 }) =>
          urlForImage(cover).width(width).quality(quality).url()
        }
        sizes={`(max-width: ${breakPoints.sm}px) 100vw, 33vw`}
      />
    </div>
  );
};
