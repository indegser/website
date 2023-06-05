import { get } from '@vercel/edge-config';
import { Metadata } from 'next';

import { IndexPage, preloadIndex } from '@src/pages/index/IndexPage';
import { getQueryClient } from '@src/queries/getQueryClient';
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
  const { id } = params;

  preloadIndex(id);
  /* @ts-expect-error Async Server Component */
  return <IndexPage id={id} />;
}
