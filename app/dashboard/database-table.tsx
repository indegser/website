import { Tables } from '@/lib/supabase';
import { notionUtils } from '@/lib/utils/notion';
import Link from 'next/link';
import { DatabaseMenu } from './database-menu';

export const DatabaseTable = ({ data }: { data: Tables<'databases'>[] }) => {
  return (
    <div>
      {data.map(({ id, raw_data }) => {
        const title = notionUtils.getTitle(raw_data);
        const description = raw_data.description[0]?.plain_text;
        return (
          <div key={id} className="rounded-lg border p-4 hover:bg-secondary">
            <div className="flex">
              <Link href={`/database/${id}`} className="flex-1">
                <h3 className="font-medium">{title}</h3>
                <div className="text-sm text-muted-foreground">
                  {description}
                </div>
              </Link>
              <div className="flex-shrink-0">
                <DatabaseMenu data={raw_data} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
