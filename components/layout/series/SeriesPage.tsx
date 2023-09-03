import { PageContainer } from 'components/atoms/Container';
import { RichItem } from 'components/organs/rich-item/RichItem';
import { seriesApi } from 'lib/supabase/series.api';

interface Props {
  id: string;
}

export const SeriesPage = async ({ id }: Props) => {
  const { data: series } = await seriesApi.getSeries(id);
  const { data } = await seriesApi.getSeriesEpisodes(id);

  return (
    <PageContainer>
      <div className="pt-8">
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-gray-100">
          {series.name}
        </h1>
      </div>
      <div className="grid grid-cols-1 gap-8 py-8 sm:grid-cols-3">
        {data?.map(({ series, ...page }) => (
          <RichItem key={page.id} page={page} series={series} />
        ))}
      </div>
    </PageContainer>
  );
};
