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
            <div className="rounded bg-muted px-1 text-xs font-medium leading-relaxed text-muted-foreground text-opacity-75">
              {name}
            </div>
          </Link>
        );
      })}
    </div>
  );
};
