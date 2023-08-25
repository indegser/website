import Image from 'next/image';

import { Caption } from './Caption';

import { PageContent } from 'components/atoms/Container';
import { notion } from '@src/sdks/notion';
import { BlockType } from '@src/types/notion.types';
import { uploadImage } from '@src/utils/image/createImage';

interface Props {
  block: Extract<BlockType, { type: 'image' }>;
}

const getMetadata = async (url: string, blockId: string) => {
  const result = await uploadImage(url);
  if (!result) return url;

  if (url !== result.data.url) {
    await notion.blocks.update({
      block_id: blockId,
      image: {
        external: {
          url: result.data.url,
        },
      },
    });
  }

  return result.data;
};

export const ImageBlock = async ({ block }: Props) => {
  let url = '';

  if ('file' in block.image) {
    url = block.image.file.url;
  }

  if ('external' in block.image) {
    url = block.image.external.url;
  }

  const metadata = await getMetadata(url, block.id);

  if (!url || !metadata || typeof metadata == 'string') return null;

  const { width, height } = metadata;
  const { caption } = block.image;

  return (
    <PageContent>
      <div className="-mx-5">
        <div className="flex justify-center">
          <div
            className="relative w-full"
            style={{ aspectRatio: `${width} / ${height}` }}
          >
            <Image
              src={metadata.url}
              alt=""
              fill
              className="block object-cover md:rounded-md"
            />
          </div>
        </div>
        <Caption caption={caption} />
      </div>
    </PageContent>
  );
};
