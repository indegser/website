'use client';

import { RichTextItemResponse } from '@notionhq/client/build/src/api-endpoints';
import { motion } from 'framer-motion';

import { useBookmarkBlock } from './BookmarkBlock.hooks';
import { Caption } from '../Caption';

interface Props {
  url: string;
  caption?: RichTextItemResponse[];
}

export const BookmarkBlock = (props: Props) => {
  const { url, caption = [] } = props;
  const { data: metadata } = useBookmarkBlock(url);

  return (
    <figure className="my-12">
      <a href={url} title={metadata?.title} target="_blank" rel="noreferrer">
        <motion.div whileTap={{ opacity: 0.8 }} transition={{ duration: 0.2 }}>
          <div className="flex rounded-sm border">
            <div className="grid basis-3/4 gap-1 p-4">
              <div className="text-sm text-gray-900">{metadata?.title}</div>
              <div className="line-clamp-2 text-xs text-gray-500">
                {metadata?.description}
              </div>
              <div className="line-clamp-1 text-xs text-gray-700">
                {decodeURIComponent(url)}
              </div>
            </div>
            <div
              className="basis-1/4 bg-cover bg-center"
              style={{
                backgroundImage:
                  metadata?.image_url && `url(${metadata.image_url})`,
              }}
            />
          </div>
        </motion.div>
      </a>
      <Caption caption={caption} />
    </figure>
  );
};
