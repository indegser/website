import { dehydrate, QueryClient } from '@tanstack/react-query';
import { GetStaticProps } from 'next';

import { IndexPage } from '@src/pages/index/IndexPage';
import { createDatabaseQueryConfig } from '@src/queries/useDatabaseQuery';
import { createIndexQueryConfig } from '@src/queries/useIndexQuery';

export const getStaticProps: GetStaticProps = async (context) => {
  const queryClient = new QueryClient();

  const id = '82649fda5ba84801a464d7ef2f7552b3';

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

export default IndexPage;
