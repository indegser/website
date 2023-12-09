import { PageContainer } from 'components/atoms/Container';
import { pageApi } from 'lib/supabase/page.api';

export const IndexPage = async () => {
  console.log('PAGE LEVEL CALL');
  const { data } = await pageApi.queryPages();

  return <PageContainer></PageContainer>;
};
