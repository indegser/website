import { Caption } from './Caption';

import { PageContent } from '@/components/atoms/page-container';
import { BlockType } from '@/lib/notion/notion.types';

interface Props {
  block: Extract<BlockType, { type: 'image' }>;
}

const getMetadata = async (url: string, blockId: string) => {
  // const result = await uploadImage(url);
  // if (url !== result) {
  //   await notion.blocks.update({
  //     block_id: blockId,
  //     image: {
  //       external: {
  //         url: result,
  //       },
  //     },
  //   });
  // }
  // return result;
};

export const ImageBlock = async ({ block }: Props) => {
  let url = '';

  if ('file' in block.image) {
    url = block.image.file.url;
  }

  if ('external' in block.image) {
    url = block.image.external.url;
  }

  const width = 1;
  const height = 1;
  const { caption } = block.image;

  return (
    <PageContent>
      <div className="-mx-5">
        <div className="flex justify-center">
          <div
            className="relative w-full"
            style={{ aspectRatio: `${width} / ${height}` }}
          ></div>
        </div>
        <Caption caption={caption} />
      </div>
    </PageContent>
  );
};
