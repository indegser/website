import { PageContainer } from '@/components/atoms/Container';
import { RichItem } from '@/components/organs/rich-item/RichItem';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { syncApi } from 'lib/utils/sync';
import { cookies } from 'next/headers';

const getData = async (databaseId: string) => {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { id, token },
  } = await supabase
    .from('databases')
    .select()
    .eq('id', databaseId)
    .maybeSingle();

  return syncApi.syncDatabase(id, token);
};

export default async function Page({
  params,
}: {
  params: { database_id: string };
}) {
  const { data, error } = await getData(params.database_id);

  return (
    <PageContainer>
      <div className="grid grid-cols-1 gap-8 py-8 sm:grid-cols-3">
        {data.map((result) => {
          return <RichItem key={result.id} page={result} />;
        })}
      </div>
    </PageContainer>
  );
}
