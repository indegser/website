import { Hydrate, dehydrate } from '@tanstack/react-query';
import { get } from '@vercel/edge-config';

import { IndexPage } from '@src/pages/index/IndexPage';
import { getQueryClient } from '@src/queries/getQueryClient';
import { createDatabaseQueryConfig } from '@src/queries/useDatabaseQuery';
import { createIndexQueryConfig } from '@src/queries/useIndexQuery';

export async function generateStaticParams() {
  const indexes = await get<{ id: string }[]>('indexes');
  return indexes?.map((index) => ({
    id: index.id,
  }));
}

export default async function Page({ params }: { params: { id: string } }) {
  const queryClient = getQueryClient();
  const { id } = params;
  const indexes = await get<{ id: string }[]>('indexes');

  const config = indexes?.find((index) => index.id === id);
  if (!config) return { notFound: true };

  await Promise.all([
    queryClient.fetchQuery(createIndexQueryConfig(id)),
    queryClient.prefetchInfiniteQuery(createDatabaseQueryConfig(id)),
  ]);

  return (
    <Hydrate state={dehydrate(queryClient)}>
      <IndexPage id={id} config={config} />
    </Hydrate>
  );
}
