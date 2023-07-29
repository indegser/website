import { RichItem } from './RichItem';

import { databaseApi } from '@src/apis/database';
import { PageContainer } from '@src/design/atoms/Container';
import { supabase } from '@src/sdks/supabase';

interface Props {
  id: string;
}

export const preloadIndex = (id: string) => {
  void databaseApi.queryDatabase({ id });
};

export const IndexPage = async (props: Props) => {
  const { data } = await supabase.from('pages').select('*');

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
