import Link from 'next/link';
import Balancer from 'react-wrap-balancer';

import { RichItemThumbnail } from './RichItemThumbnail';
import { Series } from './Series';

import { Time } from 'components/atoms/Time';
import { PageType, SeriesType } from 'lib/supabase';

interface Props {
  page: PageType;
  series: SeriesType[];
}

export const RichItem = ({ page, series }: Props) => {
  const { id, title, cover, last_edited_time } = page;

  const href = `/content/${id}`;

  return (
    <section className="grid auto-rows-max gap-3">
      <Link href={href}>
        <RichItemThumbnail src={cover} alt={title} />
      </Link>
      <div className="grid gap-2">
        <Link href={href}>
          <div className="grid gap-1">
            <div className="m-0 font-semibold leading-tight text-gray-900 dark:text-gray-400">
              <Balancer>{title}</Balancer>
            </div>
            <div className="grid grid-flow-col auto-rows-max items-center gap-x-3">
              <div className="text-xs leading-none text-gray-600 dark:text-gray-500">
                <Time date={last_edited_time} template="LL" />
              </div>
            </div>
          </div>
        </Link>
        <Series series={series} />
      </div>
    </section>
  );
};
