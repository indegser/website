import { RichItem } from '@/components/organs/rich-item/rich-item';
import { notionApi } from '@/lib/supabase/notion.api';
import { PageContainer } from 'components/atoms/Container';

export const IndexPage = async () => {
  const { results } = await notionApi.queryDatabase();

  return (
    <PageContainer>
      <div className="grid grid-cols-1 gap-8 py-8 sm:grid-cols-3">
        {results.map((result) => (
          <RichItem key={result.id} page={result} />
        ))}
      </div>
    </PageContainer>
  );
};
