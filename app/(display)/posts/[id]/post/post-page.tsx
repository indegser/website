import { Suspense } from 'react';

import { PageContainer } from '@/components/atoms/container';
import { Post } from '@/lib/sanity';
import { PortableText } from '@portabletext/react';
import { Feedback } from './feedback/Feedback';
import { PostHeadline } from './post-headline';
import { PostRouter } from './post-router';

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
        <PortableText value={post.body} />
        <Feedback />
      </PageContainer>
    </>
  );
};
