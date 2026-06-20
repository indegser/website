import { getImageDimensions, urlForImage } from 'lib/sanity';
import { PortableTextTypeComponentProps } from 'next-sanity';
import Image from 'next/image';
import type { Image as SanityImage } from 'sanity';

interface Props extends PortableTextTypeComponentProps<SanityImage> {}

export const PostImage = ({ value, isInline }: Props) => {
  if (!value.asset) {
    return null;
  }

  const { width, height } = getImageDimensions(value.asset!);

  return (
    <div className="my-8 md:my-11">
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
