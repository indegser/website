import { RichItem } from '@/components/organs/rich-item/rich-item';
import { PageContainer } from 'components/atoms/Container';
import { pageApi } from 'lib/supabase/page.api';

export const IndexPage = async () => {
  const { data } = await pageApi.queryPages();

  return (
    <PageContainer>
      <div className="grid grid-cols-1 gap-8 py-8 sm:grid-cols-3">
        {data?.map((page) => <RichItem key={page.id} page={page} />)}
      </div>
    </PageContainer>
  );
};
