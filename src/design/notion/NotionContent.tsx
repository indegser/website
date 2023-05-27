import { InView } from 'react-intersection-observer';
import { SpinnerCircular } from 'spinners-react';

import { Block } from './blocks/Block';
import { theme } from '../theme';

import { usePageContentQuery } from '@src/queries/usePageContentQuery';

interface Props {
  id: string;
}

export const NotionContent = ({ id }: Props) => {
  const { data, fetchNextPage, isFetchingNextPage } = usePageContentQuery(id);
  const blocks = data.pages.flatMap((page) => page.results);

  return (
    <article className="text-base sm:text-lg">
      {blocks.map((block, index) => {
        if (!('type' in block)) {
          return null;
        }

        return (
          <Block key={block.id} block={block} index={index} blocks={blocks} />
        );
      })}
      {isFetchingNextPage ? (
        <div className="flex justify-center px-6">
          <SpinnerCircular
            size={28}
            color={theme.colors.gray10.toString()}
            secondaryColor={theme.colors.gray4.toString()}
          />
        </div>
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
