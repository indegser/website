import { notionUtils } from '@/lib/utils/notion';
import { DatabaseObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import Link from 'next/link';

interface Props {
  database: DatabaseObjectResponse;
}

export const DatabaseCard = ({ database }: Props) => {
  const title = notionUtils.getTitle(database);
  const description = database.description[0]?.plain_text;

  return (
    <div>
      <Link href={`/database/${database.id}`}>
        <div className="flex items-center">
          <div>Cover</div>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{title}</p>
            <p className="text-muted-foreground text-sm">{description}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};
