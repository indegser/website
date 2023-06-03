import sizeOf from 'image-size';

import { Caption } from './Caption';

import { PageContent } from '@src/design/atoms/Container';
import { BlockType } from '@src/types/notion';

interface Props {
  block: Extract<BlockType, { type: 'image' }>;
}

const getMetadata = async (url: string) => {
  const arrayBuffer = await fetch(url).then((res) => res.arrayBuffer());
  return sizeOf(Buffer.from(arrayBuffer));
};

export const ImageBlock = async ({ block }: Props) => {
  let url = '';

  if ('file' in block.image) {
    url = block.image.file.url;
  }

  if ('external' in block.image) {
    url = block.image.external.url;
  }

  const metadata = await getMetadata(url);

  if (!url || !metadata) return null;

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
