import Link from 'next/link';
import Balancer from 'react-wrap-balancer';

import { RichItemThumbnail } from './rich-item-thumbnail';

import { ContentType } from '@/lib/notion/notion.types';
import { notionUtils } from '@/lib/utils/notion';
import { RichItemMeta } from './rich-item-meta';

interface Props {
  page: ContentType;
}

export const RichItem = ({ page }: Props) => {
  const { id, cover, properties } = page;
  const title = notionUtils.getPlainText(properties.Title);
  const excerpt = notionUtils.getPlainText(properties.Description);
  const href = `/content/${id}`;

  return (
    <section className="grid auto-rows-max gap-3">
      <Link href={href}>
        <RichItemThumbnail
          src={notionUtils.getNotionFileUrl(cover)}
          alt={title}
        />
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
          <RichItemMeta page={page} />
        </div>
      </div>
    </section>
  );
};
