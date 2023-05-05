import { dehydrate, QueryClient } from '@tanstack/react-query';
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
  const ids = [
    '82649fda5ba84801a464d7ef2f7552b3',
    '22bb63060d624e398960b42c7afb7348',
    '57dae7d18f6d4045956e894a03d6c81f',
  ];

  const paths = ids.map((id) => ({
    params: { database_id: id },
  }));

  return { paths, fallback: 'blocking' };
};

export default IndexPage;
