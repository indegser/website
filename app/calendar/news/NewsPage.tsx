'use client';

import styled from '@emotion/styled';
import { NewsById } from '../@shared/news_by_id';
import { NewsIdType } from '../@shared/type';
import { NewsContent } from './NewsContent';
import { NewsCover } from './NewsCover';
import { NewsProductList } from './NewsProductList';
import { NewsSubscribe } from './NewsSubscribe';
import { NewsWaitings } from './NewsWaitings';

export const NewsPage = ({ params: { id } }: { params: { id: string } }) => {
  const news = NewsById[id as NewsIdType];
  if (!news) return null;

  return (
    <Global>
      <NewsCover news={news} />
      <NewsContent news={news} />
      <NewsProductList news={news} />
      <NewsWaitings />
      <NewsSubscribe />
    </Global>
  );
};

const Global = styled.div``;
