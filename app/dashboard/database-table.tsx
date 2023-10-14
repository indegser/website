import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Tables } from '@/lib/supabase';
import { notionUtils } from '@/lib/utils/notion';
import Link from 'next/link';
import { DatabaseMenu } from './database-menu';

export const DatabaseTable = ({ data }: { data: Tables<'databases'>[] }) => {
  return (
    <Table>
      <TableCaption>A list of your Notion databases.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Title</TableHead>
          <TableHead>Description</TableHead>
          <TableHead className="text-right">Settings</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map(({ id, raw_data }) => {
          const title = notionUtils.getTitle(raw_data);
          const description = raw_data.description[0]?.plain_text;

          return (
            <TableRow key={id}>
              <TableCell>
                <Link href={`/database/${id}`}>{title}</Link>
              </TableCell>
              <TableCell>{description}</TableCell>
              <TableCell className="text-right">
                <DatabaseMenu data={raw_data} />
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};
