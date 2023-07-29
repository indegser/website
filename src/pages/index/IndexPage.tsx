import { RichItem } from './RichItem';

import { pageApi } from '@src/apis/page.api';
import { PageContainer } from '@src/design/atoms/Container';

export const preloadIndex = () => {
  void pageApi.queryPages();
};

export const IndexPage = async () => {
  const { data } = await pageApi.queryPages();

  return (
    <PageContainer>
      <div className="grid grid-cols-1 gap-8 py-8 sm:grid-cols-3">
        {data.map((page) => (
          <RichItem key={page.id} page={page} />
        ))}
      </div>
    </PageContainer>
  );
};
