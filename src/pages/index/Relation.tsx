'use client';

import useSWR from 'swr';

import { pageApi } from '@src/apis/content';
import { IndexConfigType } from '@src/types/indexes';
import { PageType } from '@src/types/notion';
import { notionUtils } from '@src/utils/notion';

interface Props {
  page: PageType;
  config: IndexConfigType;
}

export const Relation = ({ page, config }: Props) => {
  const { data } = useSWR(`relation-of-${page.id}`, () => {
    const ids = notionUtils.getRelationOfPage(page, config);
    return Promise.all(ids.map((id) => pageApi.getPage(id)));
  });

  if (!data || data?.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-1">
      {data.map((page) => {
        return (
          <div
            className="rounded bg-blue-50 px-2 py-1 text-[11px] leading-relaxed"
            key={page.id}
          >
            {notionUtils.getTitle(page)}
          </div>
        );
      })}
    </div>
  );
};
