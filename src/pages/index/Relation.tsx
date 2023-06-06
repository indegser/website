import { RelationBadge } from './RelationBadge';

import { IndexConfigType } from '@src/types/indexes';
import { PageType } from '@src/types/notion';
import { notionUtils } from '@src/utils/notion';

interface Props {
  page: PageType;
  config: IndexConfigType;
}

export const Relation = ({ page, config }: Props) => {
  if (!config) return null;

  const ids = notionUtils.getRelationOfPage(page, config);

  return (
    <div className="flex flex-wrap gap-1">
      {ids.map((pageId) => {
        return <RelationBadge key={pageId} pageId={pageId} />;
      })}
    </div>
  );
};
