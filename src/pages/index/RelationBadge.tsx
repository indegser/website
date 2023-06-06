'use client';

import useSWR from 'swr';

import { pageApi } from '@src/apis/content';
import { notionUtils } from '@src/utils/notion';

interface Props {
  pageId: string;
}

export const RelationBadge = ({ pageId }: Props) => {
  const { data } = useSWR(['page', pageId], () => pageApi.getPage(pageId));

  return (
    <div className="rounded bg-blue-50 px-1 py-0.5 text-[11px] leading-relaxed">
      {data ? notionUtils.getTitle(data) : '...'}
    </div>
  );
};
