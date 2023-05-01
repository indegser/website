import { styled } from '@stitches/react';
import { InView } from 'react-intersection-observer';
import { SpinnerCircular } from 'spinners-react';

import { Block } from './blocks/Block';
import { mq } from '../theme/mediaQueries';
import { theme } from '../theme/stitches.config';

import { usePageContentQuery } from '@src/queries/usePageContentQuery';

interface Props {
  id: string;
}

export const NotionContent = ({ id }: Props) => {
  const { data, fetchNextPage, isFetchingNextPage } = usePageContentQuery(id);
  const blocks = data.pages.flatMap((page) => page.results);

  return (
    <Article>
      {blocks.map((block, index) => {
        if (!('type' in block)) {
          return null;
        }

        return (
          <Block key={block.id} block={block} index={index} blocks={blocks} />
        );
      })}
      {isFetchingNextPage ? (
        <Spinner>
          <SpinnerCircular
            size={28}
            color={theme.colors.gray10.toString()}
            secondaryColor={theme.colors.gray4.toString()}
          />
        </Spinner>
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
    </Article>
  );
};

const Article = styled('article', {
  fontSize: 16,
  lineHeight: '26px',
  letterSpacing: '-0.008em',
  fontWeight: 450,
  color: theme.colors.gray12,

  [mq('sm')]: {
    fontSize: 18,
    lineHeight: '28px',
  },
});

const Spinner = styled('div', {
  display: 'flex',
  justifyContent: 'center',
  padding: '24px 0',
});
