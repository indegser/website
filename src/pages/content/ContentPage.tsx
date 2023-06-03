import { ContentHeadline } from './ContentHeadline';
import { ContentRouter } from './ContentRouter';

import { PageContainer } from '@src/design/atoms/Container';
import { NotionContent } from '@src/design/notion/NotionContent';

interface Props {
  id: string;
}

export const ContentPage = (props: Props) => {
  const { id } = props;

  return (
    <PageContainer>
      <ContentRouter />
      <ContentHeadline id={id} />
      <NotionContent id={id} />
    </PageContainer>
  );
};
