'use client';
import { Fragment } from 'react';
import useSWRInfinite from 'swr/infinite';
import { getThreads } from '../actions/get-threads';
import { THREAD_PAGE_SIZE } from '../constants';
import { ThreadInfiniteScroll } from './thread-infinite-scroll';
import { ThreadItem } from './thread-item';

export function ThreadList() {
  const { data, size, setSize, isLoading } = useSWRInfinite(
    (pageIndex, previousData) => {
      if (pageIndex === 0) return {};
      if (!previousData) return null;
      return {
        lastCreatedAt: previousData[previousData.length - 1]._createdAt,
      };
    },
    getThreads,
  );

  const isEnd = (data?.[data.length - 1].length ?? 0) < THREAD_PAGE_SIZE;

  return (
    <div className="m-auto flex max-w-xl flex-col gap-y-6 md:gap-y-0">
      {data?.map((threads, index) => (
        <Fragment key={index}>
          {threads.map((thread) => {
            return <ThreadItem key={thread._id} thread={thread} />;
          })}
        </Fragment>
      ))}
      {isLoading || isEnd ? null : (
        <ThreadInfiniteScroll fetchMore={() => setSize(size + 1)} />
      )}
    </div>
  );
}
