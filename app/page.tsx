import { RichItem } from '@/app/rich-item';
import { PageContainer } from '@/components/atoms/page-container';
import { getPostFeed } from '@/lib/posts';

export const revalidate = 60; // 1-minute.

export default async function IndexPage() {
  const posts = await getPostFeed();

  return (
    <PageContainer>
      <div className="grid grid-cols-1 gap-8 py-8 sm:grid-cols-2">
        {posts.map((post) => (
          <RichItem key={post._id} post={post} />
        ))}
      </div>
    </PageContainer>
  );
}
