import { PostPortableText } from '@/components/organs/post-portable-text';
import { Thread } from '@/lib/sanity';
import dayjs from 'dayjs';
import { ThreadCategory } from './thread-category';

interface Props {
  thread: Thread;
}

export function ThreadItem({ thread }: Props) {
  const { _createdAt, content } = thread;
  if (!_createdAt) return null;

  const date = dayjs(_createdAt).format('MMMM D, YYYY');

  return (
    <div className="pt-4 md:border-b">
      <div className="flex flex-wrap items-center gap-x-1">
        <ThreadCategory category={thread.category} />
        <div className="text-sm">{date}</div>
      </div>
      <PostPortableText value={content ?? []} />
    </div>
  );
}
