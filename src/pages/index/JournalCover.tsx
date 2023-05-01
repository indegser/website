import Image from 'next/image';

import { breakPoints } from '@src/design/theme/mediaQueries';
import { styled } from '@src/design/theme/stitches.config';

interface Props {
  alt: string;
  src?: string;
}

export const JournalCover = (props: Props) => {
  const { src, alt } = props;

  if (!src) return null;

  return (
    <Container>
      <Image
        src={src}
        alt={alt}
        fill
        style={{ objectFit: 'cover' }}
        sizes={`(max-width: ${breakPoints.sm}px) 100vw,
              33vw"`}
      />
    </Container>
  );
};

const Container = styled('div', {
  position: 'relative',
  aspectRatio: `16 / 9`,
});
