'use server';

import { isNotionClientError } from '@notionhq/client';
import { createServerActionClient } from '@supabase/auth-helpers-nextjs';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { notion } from '../notion';
import { Database } from '../supabase';

export async function createDatabase(
  prevState: { message?: string } | undefined,
  formData: FormData,
) {
  const supabase = createServerActionClient<Database>({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) return;

  const { data, error } = await supabase
    .from('tokens')
    .select('token')
    .eq('user_id', session.user.id)
    .single();

  if (error) return { message: error.message };

  const { token } = data;
  const url = String(formData.get('url'));
  const { pathname } = new URL(url);
  const databaseId = pathname.slice(1);

  try {
    const database = await notion.databases.retrieve({
      database_id: databaseId,
      auth: token,
    });

    const { error } = await supabase.from('databases').upsert({
      id: database.id,
      user_id: session.user.id,
      raw_data: database,
    });

    if (error) {
      return { message: error.message };
    }

    revalidatePath('/dashboard');
  } catch (err) {
    if (isNotionClientError(err)) {
      /**
       * validation_error
       * object_not_found
       */
      return { message: err.message };
    }
  }
}
