'use client';

import { InView } from 'react-intersection-observer';

import { RichItem } from './RichItem';

import { PageContainer } from '@src/design/atoms/Container';
import { Spinner } from '@src/design/atoms/Spinner';
import { useDatabaseQuery } from '@src/queries/useDatabaseQuery';
import { IndexConfigType } from '@src/types/indexes';
import { usePageTracking } from '@src/utils/analytics/usePageTracking';

interface Props {
  id: string;
  config: IndexConfigType;
}

export const IndexPage = ({ id, config }: Props) => {
  usePageTracking('visit_index');

  const { data, isFetchingNextPage, fetchNextPage } = useDatabaseQuery(id);

  return (
    <PageContainer>
      <div className="grid grid-cols-1 gap-8 py-8 sm:grid-cols-3">
        {data?.pages
          .flatMap((page) => page.results)
          .map((journal) => (
            <RichItem key={journal.id} page={journal} config={config} />
          ))}
      </div>
      {isFetchingNextPage ? (
        <Spinner />
      ) : (
        <InView
          as="div"
          style={{ height: 1 }}
          onChange={(inView) => {
            if (!inView) return;
            fetchNextPage();
          }}
        />
      )}
    </PageContainer>
  );
};
