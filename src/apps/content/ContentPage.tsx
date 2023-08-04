import { Suspense } from 'react';

import { ContentHeadline } from './ContentHeadline';
import { ContentRouter } from './ContentRouter';

import { PageContainer } from '@src/components/atoms/Container';
import { NotionContent } from '@src/components/notion/NotionContent';

interface Props {
  id: string;
}

export const ContentPage = (props: Props) => {
  const { id } = props;

  return (
    <>
      <Suspense fallback={<></>}>
        <ContentRouter />
      </Suspense>
      <PageContainer>
        <ContentHeadline id={id} />
        <NotionContent id={id} />
      </PageContainer>
    </>
  );
};
