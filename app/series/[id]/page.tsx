import { Metadata } from 'next';

import { seriesApi } from '@src/apis/series.api';
import { SupabaseSeriesType } from '@src/types/page.types';
import { SeriesPage } from 'components/layout/series/SeriesPage';

export const revalidate = 60;

type Props = {
  params: SupabaseSeriesType;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = params;
  const { data: series } = await seriesApi.getSeries(id);
  const { name: title } = series;

  return {
    title,
    openGraph: {
      title,
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
  return data;
};

export default async function Page({ params: { id } }: Props) {
  return <SeriesPage id={id} />;
}
