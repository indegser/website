import Image from 'next/image';

import { Caption } from './Caption';

import { PageContent } from 'components/atoms/Container';
import { notion } from 'lib/notion';
import { BlockType } from 'lib/supabase/notion.types';
import { uploadImage } from 'lib/utils/image/create-image';

interface Props {
  block: Extract<BlockType, { type: 'image' }>;
}

const getMetadata = async (url: string, blockId: string) => {
  const result = await uploadImage(url);

  if (url !== result) {
    await notion.blocks.update({
      block_id: blockId,
      image: {
        external: {
          url: result,
        },
      },
    });
  }

  return result;
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
              src={metadata}
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
