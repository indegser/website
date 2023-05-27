import Link from 'next/link';
import Balancer from 'react-wrap-balancer';

import { Relation } from './Relation';
import { RichItemThumbnail } from './RichItemThumbnail';

import { Time } from '@src/design/atoms/Time';
import { IndexConfigType } from '@src/types/indexes';
import { PageType, PropertyType } from '@src/types/notion';
import { getNotionFileUrl, notionUtils } from '@src/utils/notion';

interface Props {
  page: PageType;
  config: IndexConfigType;
}

export const RichItem = ({ page, config }: Props) => {
  const { id, last_edited_time } = page;

  const title = notionUtils.getTitle(page);

  const href = config.urlProperty
    ? (page.properties[config.urlProperty] as PropertyType<'url'>).url
    : `/content/${id}`;

  return (
    <Link href={href}>
      <section className="grid auto-rows-max gap-2">
        <RichItemThumbnail src={getNotionFileUrl(page.cover)} alt={title} />
        <div className="grid gap-1">
          <Relation page={page} config={config} />
          <div className="m-0 font-semibold leading-tight">
            <Balancer>{title}</Balancer>
          </div>
          <div className="grid grid-flow-col auto-rows-max items-center gap-x-3">
            <div className="text-xs leading-none text-gray-600">
              <Time date={last_edited_time} template="LL" />
            </div>
          </div>
        </div>
      </section>
    </Link>
  );
};
