import styled from '@emotion/styled';
import Image from 'next/image';

import { breakPoints } from '@src/design/theme/mediaQueries';

interface Props {
  alt: string;
  src?: string;
}

export const RichItemThumbnail = (props: Props) => {
  const { src, alt } = props;

  if (!src) return null;

  return (
    <Container>
      <Image
        src={src}
        alt={alt}
        fill
        priority
        style={{ objectFit: 'cover' }}
        sizes={`(max-width: ${breakPoints.sm}px) 100vw,
              33vw"`}
      />
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  aspect-ratio: 16 / 9;
`;