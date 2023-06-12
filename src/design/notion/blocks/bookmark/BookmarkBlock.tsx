import { RichTextItemResponse } from '@notionhq/client/build/src/api-endpoints';
import { Suspense } from 'react';

import { BookmarkContent } from './BookmarkContent';
import { Caption } from '../Caption';

interface Props {
  url: string;
  caption?: RichTextItemResponse[];
}

export const BookmarkBlock = (props: Props) => {
  const { url, caption = [] } = props;

  return (
    <figure className="my-6">
      <Suspense fallback={<BookmarkContent url={url} isSkeleton />}>
        <BookmarkContent url={url} />
      </Suspense>
      <Caption caption={caption} />
    </figure>
  );
};
