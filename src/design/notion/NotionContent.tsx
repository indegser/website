import styled from '@emotion/styled';
import { InView } from 'react-intersection-observer';
import { SpinnerCircular } from 'spinners-react';

import { Block } from './blocks/Block';
import { mq } from '../mediaQueries';
import { theme } from '../theme';

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

const Article = styled.article`
  font-size: 19px;
  line-height: 1.64;
  color: ${theme.colors.body.computedValue};

  ${mq('sm')} {
    font-size: 17px;
  }
`;

const Spinner = styled.div`
  display: flex;
  justify-content: center;
  padding: 24px 0;
`;
