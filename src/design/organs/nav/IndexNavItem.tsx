import Link from 'next/link';

import { databaseApi } from '@src/apis/database';
import { notionUtils } from '@src/utils/notion';

interface Props {
  id: string;
}

export const IndexNavItem = async ({ id }: Props) => {
  const page = await databaseApi.retrieveDatabase(id);

  return (
    <Link href={`/indexes/${id}`}>
      <div className="w-fit text-sm font-medium text-gray-600">
        {notionUtils.getTitle(page)}
      </div>
    </Link>
  );
};
