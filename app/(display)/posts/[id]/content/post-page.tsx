import { Suspense } from 'react';

import { Feedback } from './feedback/Feedback';
import { PostRouter } from './post-router';

import { PageContainer } from '@/components/atoms/container';
import { Post } from '@/lib/sanity';
import { PostHeadline } from './post-headline';

interface Props {
  post: Post;
}

export const PostPage = ({ post }: Props) => {
  return (
    <>
      <Suspense fallback={<></>}>
        <PostRouter />
      </Suspense>
      <PostHeadline post={post} />
      <PageContainer>
        {/* <NotionContent id={id} /> */}
        <Feedback />
      </PageContainer>
    </>
  );
};
