import { pageApi } from '@src/apis/content';
import { IndexConfigType } from '@src/types/indexes';
import { PageType } from '@src/types/notion';
import { notionUtils } from '@src/utils/notion';

interface Props {
  page: PageType;
  config: IndexConfigType;
}

export const Relation = async ({ page, config }: Props) => {
  const ids = notionUtils.getRelationOfPage(page, config);
  const results = await Promise.all(ids.map((id) => pageApi.getPage(id)));

  if (results.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-1">
      {results.map((page) => {
        return (
          <div
            className="rounded bg-blue-50 px-2 py-1 text-[11px] leading-relaxed"
            key={page.id}
          >
            {notionUtils.getTitle(page)}
          </div>
        );
      })}
    </div>
  );
};
