import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { PageContainer } from 'components/atoms/Container';
import { cookies } from 'next/headers';
import { Databases } from './databases';
import { LoginForm } from './login-form';

export default async function Page() {
  const supabase = createServerComponentClient({ cookies });
  const { data, error } = await supabase.auth.getSession();

  if (error || !data.session) {
    return <LoginForm />;
  }

  return (
    <PageContainer>
      <div className="pt-8">
        <Databases userId={data.session.user.id} />
        <pre style={{ color: 'white' }}>
          {JSON.stringify(data.session.user.user_metadata, null, 2)}
        </pre>
      </div>
    </PageContainer>
  );
}
