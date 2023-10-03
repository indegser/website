import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { PageContainer } from 'components/atoms/Container';
import { cookies } from 'next/headers';
import { Databases } from './databases';
import { LoginForm } from './login-form';
import { Session } from './session';

export default async function Page() {
  const supabase = createServerComponentClient({ cookies });
  const { data, error } = await supabase.auth.getSession();

  if (error || !data.session) {
    return <LoginForm />;
  }

  const {
    session: { user },
  } = data;

  return (
    <PageContainer>
      <div className="pt-8">
        <Session userMetadata={user.user_metadata} />
        <Databases userId={user.id} />
      </div>
    </PageContainer>
  );
}
