import { dehydrate, Hydrate } from '@tanstack/react-query';
import { Metadata } from 'next';

import { journalApi } from '@src/apis/journal';
import { ContentPage } from '@src/pages/content/ContentPage';
import { getQueryClient } from '@src/queries/getQueryClient';
import { createPageContentQueryConfig } from '@src/queries/usePageContentQuery';
import { createPageQueryConfig } from '@src/queries/usePageQuery';
import { getNotionFileUrl, notionUtils } from '@src/utils/notion';

export const revalidate = 60;

type Props = {
  params: { id: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = params;
  const queryClient = getQueryClient();
  const result = await queryClient.fetchQuery(createPageQueryConfig(id));

  const title = notionUtils.getTitle(result);
  const description = notionUtils.getPlainText(result.properties.Description);
  const image = getNotionFileUrl(result.cover);

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      siteName: 'Indegser',
      images: image ? [image] : [],
    },
    twitter: {
      card: 'summary_large_image',
    },
  };
}

export const generateStaticParams = async () => {
  const { results } = await journalApi.queryJournalDatabase({ page_size: 20 });

  return results.map((page) => ({
    id: page.id,
  }));
};

export default async function Page({ params: { id } }: Props) {
  const queryClient = getQueryClient();
  await Promise.all([
    queryClient.prefetchInfiniteQuery(createPageContentQueryConfig(id)),
    queryClient.prefetchQuery(createPageQueryConfig(id)),
  ]);

  return (
    <Hydrate state={dehydrate(queryClient)}>
      <ContentPage id={id} />
    </Hydrate>
  );
}
