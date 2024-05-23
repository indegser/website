import { Suspense } from 'react';

import { ContentHeadline } from './content-headline';
import { ContentRouter } from './content-router';
import { Feedback } from './feedback/Feedback';

import { NotionContent } from '@/components/notion/notion-content';
import { PageContainer } from 'components/atoms/Container';

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
      <ContentHeadline id={id} />
      <PageContainer>
        <NotionContent id={id} />
        <Feedback />
      </PageContainer>
    </>
  );
};
