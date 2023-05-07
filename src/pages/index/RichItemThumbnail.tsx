import styled from '@emotion/styled';
import Image from 'next/image';

import { breakPoints } from '@src/design/mediaQueries';

interface Props {
  alt: string;
  src?: string;
}

export const RichItemThumbnail = (props: Props) => {
  const { src, alt } = props;

  return (
    <Container>
      <Image
        src={src || `/api/image?title=${alt}`}
        alt={alt}
        fill
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
