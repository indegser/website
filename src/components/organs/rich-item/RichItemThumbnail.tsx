import Image from 'next/image';

import { breakPoints } from '@src/components/breakPoints';

interface Props {
  alt: string;
  src?: string;
}

export const RichItemThumbnail = (props: Props) => {
  const { src, alt } = props;

  return (
    <div className="relative aspect-video">
      {src ? (
        <Image
          priority
          src={src}
          alt={alt}
          fill
          style={{ objectFit: 'cover' }}
          sizes={`(max-width: ${breakPoints.sm}px) 100vw,
                33vw"`}
        />
      ) : (
        <div className="h-full w-full bg-gray-100 dark:bg-gray-800" />
      )}
    </div>
  );
};
