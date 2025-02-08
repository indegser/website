import Link from 'next/link';
import Balancer from 'react-wrap-balancer';

import { Thumbnail } from './thumbnail';

import { PostFeed } from '@/lib/sanity';
import { Metadata } from './metadata';

interface Props {
  post: PostFeed;
}

export const RichItem = ({ post }: Props) => {
  const { slug, cover, title, excerpt } = post;
  const href = `/posts/${slug?.current}`;

  return (
    <article className="flex gap-5 md:gap-6">
      <Link href={href} className="w-1/4 shrink-0">
        <Thumbnail cover={cover} alt={title!} />
      </Link>
      <div className="flex flex-col gap-2">
        <Link href={href}>
          <div className="grid gap-1">
            <div className="break-keep font-medium leading-tight">
              <Balancer>{title}</Balancer>
            </div>
            <div className="grid grid-flow-col auto-rows-max items-center gap-x-3">
              <div className="text-xs leading-normal text-muted-foreground">
                {excerpt}
              </div>
            </div>
          </div>
        </Link>
        <div className="text-xs text-muted-foreground text-opacity-75">
          <Metadata post={post} />
        </div>
      </div>
    </article>
  );
};
