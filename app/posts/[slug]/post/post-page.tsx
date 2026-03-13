import { Suspense } from 'react';

import { PageContainer } from '@/components/atoms/page-container';
import { PostPortableText } from '@/components/organs/post-portable-text';
import { Post } from '@/lib/sanity';
import { Feedback } from './feedback';
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
        <article className="text-copy-16 mx-auto max-w-2xl text-gray-800 dark:text-gray-100 dark:text-opacity-70">
          <PostPortableText value={post.body ?? []} />
        </article>
        <Feedback />
      </PageContainer>
    </>
  );
};
