import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { DatabaseObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import { supabase } from 'lib/supabase';
import CreateDatabase from './create-database';
import { DatabaseCard } from './database-card';

interface Props {
  userId: string;
}

export const Databases = async ({ userId }: Props) => {
  const { data, error } = await supabase
    .from('databases')
    .select()
    .eq('user_id', userId);

  if (error) {
    return <div>😇</div>;
  }

  return (
    <div>
      <CreateDatabase />
      <Card>
        <CardHeader>
          <CardTitle>Databases</CardTitle>
          <CardDescription>{data.length}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {data.map((database) => (
            <DatabaseCard
              key={database.id}
              database={database.raw_data as DatabaseObjectResponse}
            />
          ))}
        </CardContent>
      </Card>
    </div>
  );
};
