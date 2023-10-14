import { Metadata } from 'next';

import { preloadPage } from 'components/layout/content/ContentHeadline';
import { ContentPage } from 'components/layout/content/ContentPage';
import { isProduction } from 'lib/constants';
import { pageApi } from 'lib/supabase/page.api';

export const revalidate = 60;

type Props = {
  params: { id: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = params;

  const { data, error } = await pageApi.getPage(id);
  if (error) {
    return {};
  }

  const { title, excerpt, cover } = data;

  return {
    title,
    description: excerpt,
    openGraph: {
      title,
      description: excerpt || '',
      type: 'article',
      siteName: 'Indegser',
      images: cover ? [cover] : [],
    },
    alternates: {
      canonical: `/content/${id}`,
    },
    twitter: {
      card: 'summary_large_image',
    },
  };
}

export const generateStaticParams = async () => {
  const { data, error } = await pageApi.queryPages({
    limit: isProduction ? 20 : 1,
  });

  if (error) return [];

  return data.map((page) => ({
    id: page.id,
  }));
};

export default async function Page({ params: { id } }: Props) {
  preloadPage(id);

  return <ContentPage id={id} />;
}
