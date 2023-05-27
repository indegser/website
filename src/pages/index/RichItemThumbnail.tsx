import Image from 'next/image';

import { breakPoints } from '@src/design/mediaQueries';

interface Props {
  alt: string;
  src?: string;
}

export const RichItemThumbnail = (props: Props) => {
  const { src, alt } = props;

  return (
    <div className="relative aspect-video">
      <Image
        src={src || `/api/image?title=${alt}`}
        alt={alt}
        fill
        style={{ objectFit: 'cover' }}
        sizes={`(max-width: ${breakPoints.sm}px) 100vw,
              33vw"`}
      />
    </div>
  );
};
