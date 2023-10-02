import {
  createServerActionClient,
  createServerComponentClient,
} from '@supabase/auth-helpers-nextjs';

import { Database } from 'lib/supabase/types';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

export default async function Page() {
  const supabase = createServerComponentClient<Database>({ cookies });
  const { data } = await supabase.from('databases').select('*');
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    return <div>Should authenticate first</div>;
  }

  const addDatabase = async (formData: FormData) => {
    'use server';

    const supabase = createServerActionClient<Database>({ cookies });
    const id = String(formData.get('id'));

    const { error } = await supabase
      .from('databases')
      .upsert({ id, token: session.provider_token, user_id: session.user.id });

    if (error) {
      console.error(error.message);
      return;
    }

    revalidatePath('/database');
  };

  return (
    <div style={{ color: 'white' }}>
      <form action={addDatabase}>
        <input type="text" name="id" style={{ color: 'black' }}></input>
      </form>
      <pre style={{ whiteSpace: 'pre-wrap' }}>
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  );
}
