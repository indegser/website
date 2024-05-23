import { ContentType } from '@/lib/supabase/notion.types';
import dayjs from 'dayjs';
import { Series } from './rich-item-series';

interface Props {
  page: ContentType;
}

export const RichItemMeta = ({ page }: Props) => {
  const {
    created_time,
    properties: { Series: series },
  } = page;

  const createdTime = dayjs(created_time).format('MMMM D, YYYY');
  return (
    <div className="flex flex-wrap gap-x-1">
      <Series series={series} />
      <div>{createdTime}</div>
    </div>
  );
};
