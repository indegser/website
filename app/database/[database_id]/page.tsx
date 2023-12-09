import { PageContainer } from '@/components/atoms/Container';
import { RichItem } from '@/components/organs/rich-item/RichItem';
import { createServerSupabase } from '@/lib/supabase/create-supabase';
import { syncApi } from 'lib/utils/sync';
import { notFound } from 'next/navigation';

const getData = async (databaseId: string) => {
  const supabase = createServerSupabase();

  const { data } = await supabase
    .from('tokens')
    .select()
    .single()
    .throwOnError();

  const { token } = data!;

  try {
    const result = await syncApi.syncDatabase(databaseId, token);
    return result;
  } catch (err) {
    return { data: null, error: err };
  }
};

export default async function Page({
  params,
}: {
  params: { database_id: string };
}) {
  const { data, error } = await getData(params.database_id);

  if (error) {
    return notFound();
  }

  return (
    <PageContainer>
      <div className="grid grid-cols-1 gap-8 py-8 sm:grid-cols-3">
        {data?.map((result) => {
          return <RichItem key={result.id} page={result} />;
        })}
      </div>
    </PageContainer>
  );
}
