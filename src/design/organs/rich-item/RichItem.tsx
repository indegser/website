import Link from 'next/link';
import Balancer from 'react-wrap-balancer';

import { RichItemThumbnail } from './RichItemThumbnail';
import { Series } from './Series';

import { Time } from '@src/design/atoms/Time';
import { SupabasePageType, SupabaseSeriesType } from '@src/types/page.types';

interface Props {
  page: SupabasePageType;
  series: SupabaseSeriesType[];
}

export const RichItem = ({ page, series }: Props) => {
  const { id, title, cover, last_edited_time } = page;

  const href = `/content/${id}`;

  return (
    <section className="grid auto-rows-max gap-2">
      <Link href={href}>
        <RichItemThumbnail src={cover} alt={title} />
      </Link>
      <div className="grid gap-2">
        <Link href={href}>
          <div className="m-0 mb-2 font-semibold leading-tight">
            <Balancer>{title}</Balancer>
          </div>
          <div className="grid grid-flow-col auto-rows-max items-center gap-x-3">
            <div className="text-xs leading-none text-gray-600">
              <Time date={last_edited_time} template="LL" />
            </div>
          </div>
        </Link>
        <Series series={series} />
      </div>
    </section>
  );
};