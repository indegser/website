import { dehydrate, QueryClient } from '@tanstack/react-query';
import { get } from '@vercel/edge-config';
import { GetStaticPaths, GetStaticProps } from 'next';

import { IndexPage } from '@src/pages/index/IndexPage';
import { createDatabaseQueryConfig } from '@src/queries/useDatabaseQuery';
import { createIndexQueryConfig } from '@src/queries/useIndexQuery';

export const getStaticProps: GetStaticProps = async (context) => {
  const queryClient = new QueryClient();

  const id = context.params.database_id.toString();

  await Promise.all([
    queryClient.fetchQuery(createIndexQueryConfig(id)),
    queryClient.prefetchInfiniteQuery(createDatabaseQueryConfig(id)),
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
  const indexes = await get<{ id: string }[]>('indexes');
  const ids = indexes.map((index) => index.id);

  const paths = ids.map((id) => ({
    params: { database_id: id },
  }));

  return { paths, fallback: 'blocking' };
};

export default IndexPage;
