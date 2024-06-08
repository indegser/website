import { PostFeed } from '@/lib/sanity';
import dayjs from 'dayjs';

interface Props {
  post: PostFeed;
}

export const Metadata = ({ post }: Props) => {
  const { publishedAt, categories = [] } = post;

  const date = dayjs(publishedAt).format('MMMM D, YYYY');

  return (
    <div className="flex flex-wrap gap-x-1">
      {categories.map((category) => (
        <div key={category._id}>
          {category.title}
          <span className="ml-1">{'·'}</span>
        </div>
      ))}
      <div>{date}</div>
    </div>
  );
};
