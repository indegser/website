import { Suspense } from 'react';

import { PageContainer } from '@/components/atoms/container';
import { Post } from '@/lib/sanity';
import { PortableText } from '@portabletext/react';
import { PostImage } from './components/post-image';
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
        <article className="text-[17px] font-[420] leading-relaxed text-gray-800 dark:text-gray-100 dark:text-opacity-70">
          <PortableText
            value={post.body}
            components={{
              types: {
                image: PostImage,
              },
              block: {
                normal: ({ children, ...props }) => {
                  return (
                    <div
                      className="py-1 [&+&]:mt-4"
                      data-block-id={props.value._key}
                    >
                      <p>{children}</p>
                    </div>
                  );
                },
              },
            }}
          />
        </article>
        <Feedback />
      </PageContainer>
    </>
  );
};
