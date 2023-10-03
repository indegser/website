import {
  createServerActionClient,
  createServerComponentClient,
} from '@supabase/auth-helpers-nextjs';
import { notion } from 'lib/notion';

import { Database } from 'lib/supabase/types';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

export default async function CreateDatabase() {
  const supabase = createServerComponentClient<Database>({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const addDatabase = async (formData: FormData) => {
    'use server';

    const supabase = createServerActionClient<Database>({ cookies });
    const id = String(formData.get('id'));

    try {
      const notionData = await notion.databases.retrieve({
        database_id: id,
        auth: session.provider_token,
      });

      const { error } = await supabase.from('databases').upsert({
        id: notionData.id,
        token: session.provider_token,
        user_id: session.user.id,
      });

      if (error) {
        console.error(error.message);
        return;
      }

      revalidatePath('/dashboard');
    } catch (err) {
      console.warn(err);
    }
  };

  return (
    <div className="mb-4 text-gray-100">
      <form action={addDatabase}>
        <div className="flex gap-4">
          <input
            type="text"
            name="id"
            style={{ color: 'black', width: 300 }}
          ></input>
          <div>
            <button type="submit">Submit</button>
          </div>
        </div>
      </form>
    </div>
  );
}
