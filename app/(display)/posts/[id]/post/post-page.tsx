import { Suspense } from 'react';

import { PageContainer } from '@/components/atoms/page-container';
import { Post } from '@/lib/sanity';
import { PortableText } from '@portabletext/react';
import { BulletListItem } from './components/bullet-list-item';
import { NumberListItem } from './components/number-list-item';
import { PostImage } from './components/post-image';
import { PostLink } from './components/post-link';
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
              list: {
                bullet: ({ children }) => <ul className="mt-4">{children}</ul>,
                number: ({ children }) => <ol className="mt-4">{children}</ol>,
              },
              listItem: {
                bullet: BulletListItem,
                number: NumberListItem,
              },
              types: {
                image: PostImage,
              },
              block: {
                normal: ({ children, ...props }) => {
                  return (
                    <div className="mt-4 py-1" data-block-id={props.value._key}>
                      <p>{children}</p>
                    </div>
                  );
                },
              },
              marks: {
                link: PostLink,
              },
            }}
          />
        </article>
        <Feedback />
      </PageContainer>
    </>
  );
};
