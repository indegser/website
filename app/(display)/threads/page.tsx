import { PageContainer } from '@/components/atoms/page-container';
import { ThreadList } from './components/thread-list';

export const revalidate = 60; // 1-minute.

export default async function IndexPage() {
  return (
    <PageContainer>
      <ThreadList />
    </PageContainer>
  );
}
