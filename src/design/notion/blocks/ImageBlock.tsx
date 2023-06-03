'use client';

import { useCallback, useEffect, useState } from 'react';

import { Caption } from './Caption';

import { PageContent } from '@src/design/atoms/Container';
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
    <PageContent>
      <div className="-mx-6 my-11">
        <div className="flex justify-center">
          <img src={url} className="block md:rounded-md" />
        </div>
        <Caption caption={caption} />
      </div>
    </PageContent>
  );
};
