import { Suspense } from 'react';

import { PageContainer } from '@/components/atoms/page-container';
import { Post } from '@/lib/sanity';
import { PortableText } from '@portabletext/react';
import { BulletListItem } from './components/bullet-list-item';
import { NumberListItem } from './components/number-list-item';
import { PostCode } from './components/post-code';
import { PostImage } from './components/post-image';
import { PostLink } from './components/post-link';
import { PostLinkPreview } from './components/post-link-preview';
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
        <article className="mx-auto max-w-2xl text-base font-[420] leading-relaxed text-gray-800 dark:text-gray-100 dark:text-opacity-70">
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
                linkPreview: PostLinkPreview,
                code: PostCode,
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
                code: ({ children }) => {
                  return (
                    <code className="rounded-sm bg-gray-100 px-1 py-0.5 text-xs text-rose-500 dark:bg-gray-500 dark:text-rose-100">
                      {children}
                    </code>
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
