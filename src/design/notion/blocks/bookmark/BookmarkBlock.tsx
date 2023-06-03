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
    <figure className="my-12">
      <Suspense
        fallback={
          /** @ts-expect-error Async Server Component */
          <BookmarkContent url={url} isSkeleton />
        }
      >
        {/* @ts-expect-error Async Server Component */}
        <BookmarkContent url={url} />
      </Suspense>
      <Caption caption={caption} />
    </figure>
  );
};
