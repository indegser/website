import Link from 'next/link';

import { SupabaseSeriesType } from '@src/types/page.types';

interface Props {
  series: SupabaseSeriesType[];
}

export const Series = ({ series }: Props) => {
  return (
    <div className="flex flex-wrap gap-1">
      {series.map(({ id, name }) => {
        return (
          <Link key={id} href={`/series/${id}`}>
            <div className="rounded bg-blue-50 px-1 py-0.5 text-[11px] leading-relaxed">
              {name}
            </div>
          </Link>
        );
      })}
    </div>
  );
};
