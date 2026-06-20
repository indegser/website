import { PageContainer, PageContent } from '@/components/atoms/page-container';

import { Balancer } from '@/components/atoms/balancer';
import { Post } from '@/lib/sanity';

interface Props {
  post: Post;
}

export const PostHeadline = async ({ post }: Props) => {
  const { title, excerpt } = post;

  return (
    <PageContainer className="px-6 pb-8 pt-20 md:px-5 md:pb-11 md:pt-24">
      <PageContent className="mx-auto max-w-[653px] text-[#1d1d1f] dark:text-gray-100">
        <h1 className="text-heading-40 md:text-heading-48 my-0 break-keep py-0">
          <Balancer>{title}</Balancer>
        </h1>
        <div className="mt-4 md:mt-5">
          <h4 className="text-copy-24 break-keep">
            <Balancer>{excerpt}</Balancer>
          </h4>
        </div>
      </PageContent>
    </PageContainer>
  );
};
