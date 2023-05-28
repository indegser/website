import { InView } from 'react-intersection-observer';

import { Block } from './blocks/Block';
import { Spinner } from '../atoms/Spinner';

import { usePageContentQuery } from '@src/queries/usePageContentQuery';

interface Props {
  id: string;
}

export const NotionContent = ({ id }: Props) => {
  const { data, fetchNextPage, isFetchingNextPage } = usePageContentQuery(id);
  const blocks = data.pages.flatMap((page) => page.results);

  return (
    <article className="text-lg">
      {blocks.map((block, index) => {
        if (!('type' in block)) {
          return null;
        }

        return (
          <Block key={block.id} block={block} index={index} blocks={blocks} />
        );
      })}
      {isFetchingNextPage ? (
        <Spinner />
      ) : (
        <InView
          as="div"
          style={{ height: 1 }}
          onChange={(inView) => {
            if (!inView) return;
            fetchNextPage();
          }}
        />
      )}
    </article>
  );
};
