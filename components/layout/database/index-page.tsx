import { RichItem } from '@/components/organs/rich-item/rich-item';
import { sanityClient } from '@/lib/sanity';
import { postFeedSchema } from '@/lib/sanity/types';
import { PageContainer } from 'components/atoms/Container';
import groq from 'groq';

export const IndexPage = async () => {
  const data = await sanityClient.fetch(groq`*[_type == 'post'] {
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
      <div className="grid grid-cols-1 gap-8 py-8 sm:grid-cols-3">
        {posts.map((post) => (
          <RichItem key={post._id} post={post} />
        ))}
      </div>
    </PageContainer>
  );
};
