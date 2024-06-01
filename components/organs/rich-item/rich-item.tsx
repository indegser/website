import Link from 'next/link';
import Balancer from 'react-wrap-balancer';

import { RichItemThumbnail } from './rich-item-thumbnail';

import { PostFeed, urlForImage } from '@/lib/sanity';
import { RichItemMeta } from './rich-item-meta';

interface Props {
  post: PostFeed;
}

export const RichItem = ({ post }: Props) => {
  const { _id, cover, title, excerpt } = post;
  const href = `/posts/${_id}`;

  return (
    <section className="grid auto-rows-max gap-3">
      <Link href={href}>
        <RichItemThumbnail src={urlForImage(cover)} alt={title} />
      </Link>
      <div className="grid gap-2">
        <Link href={href}>
          <div className="grid gap-1">
            <div className="font-medium leading-tight">
              <Balancer>{title}</Balancer>
            </div>
            <div className="grid grid-flow-col auto-rows-max items-center gap-x-3">
              <div className="text-xs leading-normal text-muted-foreground">
                {excerpt}
              </div>
            </div>
          </div>
        </Link>
        <div className="mt-4 text-xs text-muted-foreground text-opacity-75">
          <RichItemMeta post={post} />
        </div>
      </div>
    </section>
  );
};
