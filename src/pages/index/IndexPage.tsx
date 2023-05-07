import styled from '@emotion/styled';
import { InView } from 'react-intersection-observer';
import { SpinnerCircular } from 'spinners-react';

import { RichItem } from './RichItem';

import { PageContainer } from '@src/design/atoms/Container';
import { SEO } from '@src/design/atoms/SEO';
import { mq } from '@src/design/theme/mediaQueries';
import { theme } from '@src/design/theme/stitches.config';
import { useDatabaseQuery } from '@src/queries/useDatabaseQuery';
import { useIndexQuery } from '@src/queries/useIndexQuery';
import { IndexConfigType } from '@src/types/indexes';
import { usePageTracking } from '@src/utils/analytics/usePageTracking';
import { notionUtils } from '@src/utils/notion';

interface Props {
  id: string;
  config: IndexConfigType;
}

export const IndexPage = ({ id, config }: Props) => {
  usePageTracking('visit_index');

  const { data: index } = useIndexQuery(id);
  // const { data: tagIndex } = useIndexQuery(
  //   notionUtils.getTagDatabaseId(index, config)
  // );
  const { data, isFetchingNextPage, fetchNextPage } = useDatabaseQuery(id);
  const title = notionUtils.getTitle(index);

  return (
    <Container>
      <SEO title={title} />
      <Layout>
        {data?.pages
          .flatMap((page) => page.results)
          .map((journal) => (
            <RichItem key={journal.id} page={journal} config={config} />
          ))}
      </Layout>
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
    </Container>
  );
};

const Container = styled(PageContainer)`
  overflow: hidden;
  padding-top: 32px;
`;

const Layout = styled.div`
  display: grid;
  gap: 5vh 5vh;
  grid-template-columns: repeat(3, 1fr);

  ${mq('sm')} {
    grid-template-columns: repeat(1, 1fr);
  }
`;

const Spinner = styled.div`
  display: flex;
  justify-content: center;
  padding: 24px 0;
`;
