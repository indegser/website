import { PageContainer } from 'components/atoms/Container';
import { RichItem } from 'components/organs/rich-item/RichItem';
import { pageApi } from 'lib/supabase/page.api';

export const preloadIndex = () => {
  void pageApi.queryPages();
};

export const IndexPage = async () => {
  const { data } = await pageApi.queryPages();

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
