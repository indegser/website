import { PropertyType } from '@/lib/notion/notion.types';

interface Props {
  series?: PropertyType<any> | null;
}

export const Series = ({ series }: Props) => {
  if (series?.type !== 'multi_select') return null;

  return (
    <>
      {series.multi_select.map(({ id, name }) => {
        return (
          <div key={id}>
            {name}
            <span className="ml-1">{'·'}</span>
          </div>
        );
      })}
    </>
  );
};
