import { usePageQueries } from '@src/queries/usePageQueries';
import { IndexConfigType } from '@src/types/indexes';
import { PageType } from '@src/types/notion';
import { notionUtils } from '@src/utils/notion';

interface Props {
  page: PageType;
  config: IndexConfigType;
}

export const Relation = ({ page, config }: Props) => {
  const ids = notionUtils.getRelationOfPage(page, config);
  const results = usePageQueries(ids);

  if (results.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-1">
      {results.map((result) => {
        const { data } = result;
        if (!data) return '...';

        return (
          <div
            className="rounded bg-blue-50 px-2 py-1 text-[11px] leading-relaxed"
            key={data.id}
          >
            {notionUtils.getTitle(data)}
          </div>
        );
      })}
    </div>
  );
};
