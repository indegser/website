import { JournalHeadline } from './JournalHeadline';
import { useJournalRouter } from './JournalPage.hooks';

import { PageContainer } from '@src/design/atoms/Container';
import { NotionContent } from '@src/design/notion/NotionContent';

interface Props {
  id: string;
}

export const JournalPage = (props: Props) => {
  const { id } = props;
  useJournalRouter();

  return (
    <PageContainer>
      <JournalHeadline id={id} />
      <NotionContent id={id} />
    </PageContainer>
  );
};
