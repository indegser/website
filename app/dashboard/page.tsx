import { createServerSupabase } from '@/lib/supabase/create-supabase';
import { PageContainer } from 'components/atoms/Container';
import { redirect } from 'next/navigation';
import { Databases } from './databases';

export default async function Page() {
  const supabase = createServerSupabase();
  const { data, error } = await supabase.auth.getSession();

  if (error || !data.session) {
    return redirect('/');
  }

  return (
    <PageContainer>
      <div className="space-y-4 pt-8">
        <Databases userId={data.session.user.id} />
      </div>
    </PageContainer>
  );
}
