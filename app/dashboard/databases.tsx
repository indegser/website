import { supabase } from 'lib/supabase';
import Link from 'next/link';
import CreateDatabase from './create-database';

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
      <div>
        {data.map((database) => (
          <Link href={`/database/${database.id}`} key={database.id}>
            <h2 style={{ color: 'white' }}>{database.id}</h2>
          </Link>
        ))}
      </div>
    </div>
  );
};
