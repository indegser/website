import { Suspense } from 'react';

import { ContentHeadline } from './content-headline';
import { ContentRouter } from './content-router';
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
      <ContentHeadline id={id} />
      <PageContainer>
        <NotionContent id={id} />
        <Feedback />
      </PageContainer>
    </>
  );
};
