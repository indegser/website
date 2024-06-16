import { RichItem } from '@/app/(display)/rich-item';
import { PageContainer } from '@/components/atoms/page-container';
import { sanityClient } from '@/lib/sanity';
import { postFeedSchema } from '@/lib/sanity/types';
import groq from 'groq';

export const revalidate = 60; // 1-minute.

export default async function IndexPage() {
  const data =
    await sanityClient.fetch(groq`*[_type == 'post'] | order(publishedAt desc) {
    _id,
    title,
    excerpt,
    cover,
    publishedAt,
    categories[]->
  }`);

  const posts = postFeedSchema.array().parse(data);

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
