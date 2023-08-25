import { Suspense } from 'react';

import { ContentHeadline } from './ContentHeadline';
import { ContentRouter } from './ContentRouter';
import { Feedback } from './feedback/Feedback';

import { PageContainer } from 'components/atoms/Container';
import { NotionContent } from 'components/notion/NotionContent';

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
        <Feedback />
      </PageContainer>
    </>
  );
};
