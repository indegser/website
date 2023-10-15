import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { PageContainer } from 'components/atoms/Container';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { Databases } from './databases';

export default async function Page() {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });
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
