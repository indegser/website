import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PlusIcon } from '@radix-ui/react-icons';
import { createServerActionClient } from '@supabase/auth-helpers-nextjs';
import { notion } from 'lib/notion';

import { Database } from 'lib/supabase/types';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { z } from 'zod';

const schema = z.object({
  id: z.string(),
});

export default async function CreateDatabase() {
  const addDatabase = async (formData: FormData) => {
    'use server';

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

    if (error) return;
    const { token } = data;
    const id = String(formData.get('id'));

    try {
      const database = await notion.databases.retrieve({
        database_id: id,
        auth: token,
      });

      const { error } = await supabase.from('databases').upsert({
        id: database.id,
        user_id: session.user.id,
        raw_data: database,
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
    <div className="mb-4">
      <form action={addDatabase}>
        <div className="flex space-x-4">
          <Input type="text" name="id" />
          <div className="flex-shrink-0">
            <Button type="submit">
              <PlusIcon className="mr-2 h-4 w-4" /> Add New...
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
