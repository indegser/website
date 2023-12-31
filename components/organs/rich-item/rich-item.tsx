import Link from 'next/link';
import Balancer from 'react-wrap-balancer';

import { Series } from './rich-item-series';
import { RichItemThumbnail } from './rich-item-thumbnail';

import { PageType } from 'lib/supabase';

interface Props {
  page: PageType;
}

export const RichItem = ({ page }: Props) => {
  const { id, title, cover, excerpt, raw_data: raw } = page;
  const href = `/content/${id}`;

  return (
    <section className="grid auto-rows-max gap-3">
      <Link href={href}>
        <RichItemThumbnail src={cover} alt={title} />
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
        <Series series={raw?.properties.Series} />
      </div>
    </section>
  );
};
