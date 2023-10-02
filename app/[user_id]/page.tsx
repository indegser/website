import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { syncApi } from 'lib/utils/sync';
import { cookies } from 'next/headers';

const getData = async (userId: string) => {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { id, token },
  } = await supabase
    .from('databases')
    .select('*')
    .eq('user_id', userId)
    .limit(1)
    .maybeSingle();

  return syncApi.syncDatabase(id, token);
};

export default async function Page({
  params,
}: {
  params: { user_id: string };
}) {
  const { data, error } = await getData(params.user_id);

  return (
    <div style={{ color: 'white' }}>
      {data.map((result) => {
        return <div key={result.id}>{result.title}</div>;
      })}
    </div>
  );
}
