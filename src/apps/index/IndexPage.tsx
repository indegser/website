import { pageApi } from '@src/apis/page.api';
import { PageContainer } from '@src/design/atoms/Container';
import { RichItem } from '@src/design/organs/rich-item/RichItem';

export const preloadIndex = () => {
  void pageApi.queryPages();
};

export const IndexPage = async () => {
  const { data } = await pageApi.queryPages();

  return (
    <PageContainer>
      <div className="grid grid-cols-1 gap-8 py-8 sm:grid-cols-3">
        {data.map(({ series, ...page }) => (
          <RichItem key={page.id} page={page} series={series} />
        ))}
      </div>
    </PageContainer>
  );
};
