import { supabase } from 'lib/supabase';
import CreateDatabase from './create-database';

import { DatabaseTable } from './database-table';

interface Props {
  userId: string;
}

export const Databases = async ({ userId }: Props) => {
  const { data, error } = await supabase
    .from('databases')
    .select()
    .eq('user_id', userId);

  if (error) {
    return <div>😇</div>;
  }

  return (
    <div>
      <CreateDatabase />
      <DatabaseTable data={data} />
    </div>
  );
};
