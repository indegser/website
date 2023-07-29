import { Metadata } from 'next';

import { pageApi } from '@src/apis/content';
import { pageApi as pageApiV2 } from '@src/apis/page.api';
import { preloadPage } from '@src/pages/content/ContentHeadline';
import { ContentPage } from '@src/pages/content/ContentPage';
import { isProduction } from '@src/types/env.types';

export const revalidate = 60;

type Props = {
  params: { id: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = params;

  const { title, excerpt, cover } = await pageApi.getPage(id);

  return {
    title,
    description: excerpt,
    openGraph: {
      title,
      description: excerpt,
      type: 'article',
      siteName: 'Indegser',
      images: cover ? [cover] : [],
    },
    twitter: {
      card: 'summary_large_image',
    },
  };
}

export const generateStaticParams = async () => {
  const { data } = await pageApiV2.queryPages({
    limit: isProduction ? 20 : 1,
  });

  return data.map((page) => ({
    id: page.id,
  }));
};

export default async function Page({ params: { id } }: Props) {
  preloadPage(id);

  return <ContentPage id={id} />;
}
