import { PropertyType } from '@/lib/supabase/notion.types';

interface Props {
  series?: PropertyType<any> | null;
}

export const Series = ({ series }: Props) => {
  if (series?.type !== 'multi_select') return null;

  return (
    <div className="flex flex-wrap gap-1">
      {series.multi_select.map(({ id, name }) => {
        return (
          <div
            key={id}
            className="rounded bg-muted px-1 text-xs font-medium leading-relaxed text-muted-foreground text-opacity-75"
          >
            {name}
          </div>
        );
      })}
    </div>
  );
};
