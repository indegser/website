import { Hydrate, dehydrate } from '@tanstack/react-query';
import { get } from '@vercel/edge-config';
import { Metadata } from 'next';

import { IndexPage } from '@src/pages/index/IndexPage';
import { getQueryClient } from '@src/queries/getQueryClient';
import { createDatabaseQueryConfig } from '@src/queries/useDatabaseQuery';
import { createIndexQueryConfig } from '@src/queries/useIndexQuery';
import { notionUtils } from '@src/utils/notion';

export const revalidate = 60;

type Props = {
  params: { id: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = params;
  const queryClient = getQueryClient();
  const result = await queryClient.fetchQuery(createIndexQueryConfig(id));

  return {
    title: notionUtils.getTitle(result),
  };
}

export async function generateStaticParams() {
  const indexes = await get<{ id: string }[]>('indexes');

  if (!indexes) return [];

  return indexes.map((index) => ({
    id: index.id,
  }));
}

export default async function Page({ params }: { params: { id: string } }) {
  const queryClient = getQueryClient();
  const { id } = params;

  await Promise.all([
    queryClient.fetchQuery(createIndexQueryConfig(id)),
    queryClient.prefetchInfiniteQuery(createDatabaseQueryConfig(id)),
  ]);

  return (
    <Hydrate state={dehydrate(queryClient)}>
      <IndexPage id={id} />
    </Hydrate>
  );
}
