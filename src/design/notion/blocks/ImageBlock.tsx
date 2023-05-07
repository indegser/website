import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { useCallback, useEffect, useState } from 'react';

import { Caption } from './Caption';

import { mq } from '@src/design/theme/mediaQueries';
import { BlockType } from '@src/types/notion';

interface Props {
  block: Extract<BlockType, { type: 'image' }>;
}

export const ImageBlock = ({ block }: Props) => {
  const [metadata, setMetadata] = useState<{ width: number; height: number }>(
    null
  );

  let url = '';

  if ('file' in block.image) {
    url = block.image.file.url;
  }

  if ('external' in block.image) {
    url = block.image.external.url;
  }

  const handleImageLoad = useCallback((event: Event) => {
    const image = event.target as HTMLImageElement;
    setMetadata({ width: image.width, height: image.height });
  }, []);

  useEffect(() => {
    if (!url || url.startsWith('data:image')) return;

    const image = new Image();
    image.addEventListener('load', handleImageLoad);

    image.src = url;

    return () => {
      image.removeEventListener('load', handleImageLoad);
    };
  }, [url, handleImageLoad]);

  if (!url || !metadata) return null;

  const { width, height } = metadata;
  const { caption } = block.image;

  return (
    <Container>
      <ImageLayout>
        <ImageElement src={url} alt="" layout={width > height ? 'x' : 'y'} />
      </ImageLayout>
      <CaptionContainer>
        <Caption caption={caption} />
      </CaptionContainer>
    </Container>
  );
};

const Container = styled.div`
  margin: 44px 0;
  ${mq('sm')} {
    margin-left: calc(-1 * max(22px, env(safe-area-inset-left)));
    margin-right: calc(-1 * max(22px, env(safe-area-inset-right)));
  }
`;

const ImageLayout = styled.div`
  display: flex;
  justify-content: center;
`;

const ImageElement = styled.img<{ layout: 'x' | 'y' }>`
  display: block;
  border-radius: 8px;

  ${({ layout }) =>
    layout === 'x' &&
    css`
      max-width: 100%;
      height: auto;
    `}

  ${({ layout }) =>
    layout === 'y' &&
    css`
      width: auto;
      max-height: 80vh;
    `}

  ${mq('sm')} {
    border-radius: 0px;
    width: 100% !important;
    height: auto !important;
    max-width: auto !important;
    max-height: auto !important;
  }
`;

const CaptionContainer = styled.div`
  ${mq('sm')} {
    margin-left: max(22px, env(safe-area-inset-left));
    margin-right: max(22px, env(safe-area-inset-right));
  }
`;
