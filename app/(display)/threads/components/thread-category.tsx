import { Category } from '@/lib/sanity';

interface Props {
  category?: Category | null;
}

export function ThreadCategory({ category }: Props) {
  return <div className="font-semibold">{category?.title || 'Untitled'}</div>;
}
