import { SeriesType } from 'lib/supabase';
import Link from 'next/link';

interface Props {
  series: SeriesType[];
}

export const Series = ({ series }: Props) => {
  return (
    <div className="flex flex-wrap gap-1">
      {series.map(({ id, name }) => {
        return (
          <Link key={id} href={`/series/${id}`}>
            <div className="rounded bg-gray-300 !bg-opacity-50 px-1 text-xs font-medium leading-relaxed text-gray-950 text-opacity-75 dark:bg-gray-400">
              {name}
            </div>
          </Link>
        );
      })}
    </div>
  );
};
