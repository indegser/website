'use client';

import { VisitTracker } from '@/components/atoms/visit-tracker';
import styled from '@emotion/styled';
import { NewsById } from '../@shared/news_by_id';
import { NewsIdType } from '../@shared/type';
import { NewsContent } from './NewsContent';
import { NewsCover } from './NewsCover';
import { NewsProductList } from './NewsProductList';

export const NewsPage = ({ params: { id } }: { params: { id: string } }) => {
  const news = NewsById[id as NewsIdType];
  if (!news) return null;

  return (
    <Global>
      <VisitTracker params={[`visit_event_page`, { eventId: id }]} />
      <NewsCover news={news} />
      <NewsContent news={news} />
      <NewsProductList news={news} />
    </Global>
  );
};

const Global = styled.div`
  padding-bottom: 80px;
`;
