import { PostPortableText } from '@/components/organs/post-portable-text';
import { Thread } from '@/lib/sanity';
import dayjs from 'dayjs';

interface Props {
  thread: Thread;
}

export function ThreadItem({ thread }: Props) {
  const { _createdAt, content } = thread;
  if (!_createdAt) return null;

  const date = dayjs(_createdAt).format('MMMM D, YYYY');

  return (
    <div className="md:border-x md:border-b md:p-4">
      <div className="flex flex-wrap gap-x-1">
        <div className="text-sm">{date}</div>
      </div>
      <div>
        <PostPortableText value={content ?? []} />
      </div>
    </div>
  );
}
