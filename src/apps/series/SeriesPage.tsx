import { RichItem } from '../index/RichItem';

import { seriesApi } from '@src/apis/series.api';
import { PageContainer } from '@src/design/atoms/Container';

interface Props {
  id: string;
}

export const SeriesPage = async ({ id }: Props) => {
  const { data } = await seriesApi.getSeriesEpisodes(id);

  return (
    <PageContainer>
      <div className="grid grid-cols-1 gap-8 py-8 sm:grid-cols-3">
        {data?.map(({ series, ...page }) => (
          <RichItem key={page.id} page={page} series={series} />
        ))}
      </div>
    </PageContainer>
  );
};
