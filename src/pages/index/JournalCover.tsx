import Image from 'next/image';

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
      <Image src={src} alt={alt} fill style={{ objectFit: 'cover' }} />
    </Container>
  );
};

const Container = styled('div', {
  position: 'relative',
  aspectRatio: `16 / 9`,
});
