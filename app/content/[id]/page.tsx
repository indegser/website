import { Metadata } from 'next';

import { pageApi } from '@src/apis/content';
import { journalApi } from '@src/apis/journal';
import { preload } from '@src/design/notion/NotionContent';
import { preloadPage } from '@src/pages/content/ContentHeadline';
import { ContentPage } from '@src/pages/content/ContentPage';
import { isProduction } from '@src/types/env';
import { getNotionFileUrl, notionUtils } from '@src/utils/notion';

export const revalidate = 60;

type Props = {
  params: { id: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = params;

  const result = await pageApi.getPage(id);

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
  const { results } = await journalApi.queryJournalDatabase({
    page_size: isProduction ? 20 : 1,
  });

  return results.map((page) => ({
    id: page.id,
  }));
};

export default async function Page({ params: { id } }: Props) {
  preload(id);
  preloadPage(id);

  return <ContentPage id={id} />;
}
