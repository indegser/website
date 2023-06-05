import { IndexShowMore } from './IndexShowMore';
import { RichItem } from './RichItem';

import { databaseApi } from '@src/apis/database';
import { PageContainer } from '@src/design/atoms/Container';
import { JournalPageType } from '@src/types/notion';

interface Props {
  id: string;
}

export const preloadIndex = (id: string) => {
  void databaseApi.queryDatabase({ id });
};

export const IndexPage = async ({ id }: Props) => {
  const { results, next_cursor } =
    await databaseApi.queryDatabase<JournalPageType>({ id });

  return (
    <PageContainer>
      <div className="grid grid-cols-1 gap-8 py-8 sm:grid-cols-3">
        {results.map((page) => (
          <RichItem key={page.id} page={page} />
        ))}
        <IndexShowMore id={id} startCursor={next_cursor} />
      </div>
    </PageContainer>
  );
};
