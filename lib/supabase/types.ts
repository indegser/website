import {
  BlockObjectResponse,
  DatabaseObjectResponse,
  PartialBlockObjectResponse,
} from '@notionhq/client/build/src/api-endpoints';
import type { MergeDeep } from 'type-fest';
import { PageType } from '../notion/notion.types';
import type { Database as DatabaseGenerated } from './generated-types';

type X = {
  public: {
    Tables: {
      databases: {
        Row: {
          raw_data: DatabaseObjectResponse;
        };
      };
      pages: {
        Row: {
          content: (PartialBlockObjectResponse | BlockObjectResponse)[];
          raw_data: PageType;
          is_draft: boolean;
        };
      };
    };
  };
};

export type Database = MergeDeep<DatabaseGenerated, X>;

export type Tables<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Row'];
export type Enums<T extends keyof Database['public']['Enums']> =
  Database['public']['Enums'][T];
