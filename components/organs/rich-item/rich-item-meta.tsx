import { PageType } from '@/lib/supabase';
import dayjs from 'dayjs';
import { Series } from './rich-item-series';

interface Props {
  page: PageType;
}

export const RichItemMeta = ({ page }: Props) => {
  if (!page.raw_data) return null;

  const createdTime = dayjs(page.raw_data.created_time).format('MMMM D, YYYY');
  return (
    <div className="flex flex-wrap gap-x-1">
      <Series series={page.raw_data?.properties.Series} />
      <div>{createdTime}</div>
    </div>
  );
};
