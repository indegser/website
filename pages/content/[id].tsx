import { dehydrate, QueryClient } from '@tanstack/react-query';
import { GetStaticPaths, GetStaticProps } from 'next';

import { journalApi } from '@src/apis/journal';
import { ContentPage } from '@src/pages/content/ContentPage';
import { createPageContentQueryConfig } from '@src/queries/usePageContentQuery';
import { createPageQueryConfig } from '@src/queries/usePageQuery';

export const getStaticProps: GetStaticProps = async (context) => {
  const queryClient = new QueryClient();

  const id = context.params.id.toString();
  await Promise.all([
    queryClient.prefetchInfiniteQuery(createPageContentQueryConfig(id)),
    queryClient.prefetchQuery(createPageQueryConfig(id)),
  ]);

  return {
    props: {
      id,
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
    },
    revalidate: 60, // Seconds
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const { results } = await journalApi.queryJournalDatabase({ page_size: 20 });

  const paths = results.map((page) => ({
    params: { id: page.id },
  }));

  return { paths, fallback: 'blocking' };
};

export default ContentPage;
