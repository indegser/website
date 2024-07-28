import { getImageDimensions, urlForImage } from 'lib/sanity';
import { PortableTextTypeComponentProps } from 'next-sanity';
import Image from 'next/image';
import type { Image as SanityImage } from 'sanity';

interface Props extends PortableTextTypeComponentProps<SanityImage> {}

export const PostImage = ({ value, isInline }: Props) => {
  const { width, height } = getImageDimensions(value.asset!);

  return (
    <div className="mb-4 py-1">
      <div className="relative w-full" style={{ aspectRatio: width / height }}>
        <Image
          src={urlForImage(value)
            .width(isInline ? 100 : 800)
            .fit('max')
            .auto('format')
            .url()}
          alt=""
          fill
          loading="lazy"
          style={{
            display: isInline ? 'inline-block' : 'block',
          }}
        />
      </div>
    </div>
  );
};
