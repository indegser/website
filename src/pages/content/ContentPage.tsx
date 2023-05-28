'use client';

import { ContentHeadline } from './ContentHeadline';
import { useJournalRouter } from './ContentPage.hooks';

import { PageContainer } from '@src/design/atoms/Container';
import { NotionContent } from '@src/design/notion/NotionContent';

interface Props {
  id: string;
}

export const ContentPage = (props: Props) => {
  const { id } = props;
  useJournalRouter();

  return (
    <PageContainer>
      <ContentHeadline id={id} />
      <NotionContent id={id} />
    </PageContainer>
  );
};
