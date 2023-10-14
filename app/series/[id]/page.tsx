import { Metadata } from 'next';

import { SeriesPage } from 'components/layout/series/SeriesPage';
import { SeriesType } from 'lib/supabase';
import { seriesApi } from 'lib/supabase/series.api';

export const revalidate = 60;

type Props = {
  params: SeriesType;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = params;
  const { data, error } = await seriesApi.getSeries(id);

  if (error || !data) return {};

  const { name: title } = data;

  return {
    title,
    openGraph: {
      title: title || '',
      type: 'article',
      siteName: 'Indegser',
      images: [],
    },
    alternates: {
      canonical: `/series/${id}`,
    },
    twitter: {
      card: 'summary_large_image',
    },
  };
}

export const generateStaticParams = async () => {
  const { data } = await seriesApi.getAllSeries();
  return data || [];
};

export default async function Page({ params: { id } }: Props) {
  return <SeriesPage id={id} />;
}
