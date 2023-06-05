'use client';

import { InView } from 'react-intersection-observer';
import useSWRInfinite from 'swr/infinite';

import { RichItem } from './RichItem';

import { databaseApi } from '@src/apis/database';
import { Spinner } from '@src/design/atoms/Spinner';
import { DatabaseType, JournalPageType } from '@src/types/notion';

interface Props {
  id: string;
  startCursor: string;
}

export const IndexShowMore = ({ id, startCursor }: Props) => {
  const { data, size, setSize, isValidating } = useSWRInfinite(
    (pageIndex, previous: DatabaseType) => {
      if (previous && !previous.next_cursor) return null;
      if (pageIndex === 0) return startCursor;
      return previous.next_cursor;
    },
    (startCursor) => {
      return databaseApi.queryDatabase<JournalPageType>({ id, startCursor });
    },
    { revalidateFirstPage: false }
  );

  return (
    <>
      {data?.map((result) =>
        result.results.map((page) => <RichItem key={page.id} page={page} />)
      )}
      {isValidating ? (
        <Spinner />
      ) : (
        <InView
          as="div"
          style={{ height: 1 }}
          onChange={(inView) => {
            if (!inView) return;
            setSize(size + 1);
          }}
        />
      )}
    </>
  );
};
