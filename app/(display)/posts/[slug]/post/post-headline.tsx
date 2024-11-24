import { PageContainer, PageContent } from '@/components/atoms/page-container';

import { Balancer } from '@/components/atoms/balancer';
import { Post } from '@/lib/sanity';

interface Props {
  post: Post;
}

export const PostHeadline = async ({ post }: Props) => {
  const { title, excerpt } = post;

  return (
    <PageContainer className="py-10">
      <PageContent>
        <h1 className="my-0 break-keep py-4 text-4xl font-bold md:text-5xl">
          <Balancer>{title}</Balancer>
        </h1>
        <div>
          <h4 className="break-keep">
            <Balancer>{excerpt}</Balancer>
          </h4>
        </div>
      </PageContent>
    </PageContainer>
  );
};
