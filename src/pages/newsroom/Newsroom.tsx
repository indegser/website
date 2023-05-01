import { InView } from 'react-intersection-observer';
import { SpinnerCircular } from 'spinners-react';

import { Journal } from './Journal';

import { PageContainer } from '@src/design/atoms/Container';
import { SEO } from '@src/design/atoms/SEO';
import { mq } from '@src/design/theme/mediaQueries';
import { styled, theme } from '@src/design/theme/stitches.config';
import { useNewsroomQuery } from '@src/queries/useNewsroomQuery';
import { usePageTracking } from '@src/utils/analytics/usePageTracking';

export const Newsroom = () => {
  usePageTracking('visit_newsroom');

  const { data, isFetching, fetchNextPage } = useNewsroomQuery();

  return (
    <NewsroomContainer>
      <SEO title="홈" />
      <Layout>
        {data?.pages
          .flatMap((page) => page.results)
          .map((journal) => (
            <Journal key={journal.id} page={journal} />
          ))}
      </Layout>
      {isFetching ? (
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
    </NewsroomContainer>
  );
};

const NewsroomContainer = styled(PageContainer, {
  overflow: 'hidden',
  paddingTop: 32,
});

const Layout = styled('div', {
  display: 'grid',
  gap: `5vh 5vh`,
  gridTemplateColumns: 'repeat(3, 1fr)',

  [mq('sm')]: {
    gridTemplateColumns: 'repeat(1, 1fr)',
  },
});

const Spinner = styled('div', {
  display: 'flex',
  justifyContent: 'center',
  padding: '24px 0',
});
