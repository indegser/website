import { createSupabaseServerClient } from '@/lib/supabase/client';
import {
  fromDbRow,
  fromDbRows,
  toSelectColumns,
} from '@/lib/supabase/query-helper';

type PostRecord = Record<string, unknown>;

const supabasePostsTable = process.env.SUPABASE_POSTS_TABLE || 'posts';
const categoriesRelationSelect =
  'postCategories:post_categories(category:categories(_id,title,avatar))';
const normalizeDeprecatedUpdatedAtColumn = (selectColumns: string) => {
  return selectColumns.replaceAll(
    '_updatedAt:_updated_at',
    'updatedAt:updated_at',
  );
};

const isRecord = (value: unknown): value is Record<string, unknown> => {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value);
};

const withMappedCategories = (row: PostRecord): PostRecord => {
  const postCategories = row.postCategories;

  if (!Array.isArray(postCategories)) {
    return {
      ...row,
      categories: null,
    };
  }

  const categories = postCategories
    .map((relation) => {
      if (!isRecord(relation)) {
        return null;
      }

      const category = relation.category;

      if (!isRecord(category)) {
        return null;
      }

      return category;
    })
    .filter((category): category is Record<string, unknown> =>
      Boolean(category),
    );

  return {
    ...row,
    categories: categories.length > 0 ? categories : null,
  };
};

export const postsRepository = {
  async findBySlug(
    slug: string,
    columns: string[],
  ): Promise<PostRecord | null> {
    const client = createSupabaseServerClient();
    const selectColumns = normalizeDeprecatedUpdatedAtColumn(
      `${toSelectColumns(columns)}, ${categoriesRelationSelect}`,
    );

    const textSlugQuery = await client
      .from(supabasePostsTable)
      .select(selectColumns)
      .eq('slug', slug)
      .limit(1)
      .maybeSingle();

    if (!textSlugQuery.error && textSlugQuery.data) {
      return withMappedCategories(fromDbRow(textSlugQuery.data) as PostRecord);
    }

    const jsonSlugQuery = await client
      .from(supabasePostsTable)
      .select(selectColumns)
      .filter('slug->>current', 'eq', slug)
      .limit(1)
      .maybeSingle();

    if (jsonSlugQuery.error) {
      throw jsonSlugQuery.error;
    }

    if (!jsonSlugQuery.data) {
      return null;
    }

    return withMappedCategories(fromDbRow(jsonSlugQuery.data) as PostRecord);
  },

  async list(columns: string[]) {
    const client = createSupabaseServerClient();
    const selectColumns = `${toSelectColumns(columns)}, ${categoriesRelationSelect}`;
    const { data, error } = await client
      .from(supabasePostsTable)
      .select(selectColumns)
      .order('published_at', { ascending: false });

    if (error) {
      throw error;
    }

    return (fromDbRows(data as unknown[]) as PostRecord[]).map((row) =>
      withMappedCategories(row),
    );
  },

  async listSlugs(limit: number) {
    const client = createSupabaseServerClient();
    const { data, error } = await client
      .from(supabasePostsTable)
      .select('slug')
      .order('published_at', { ascending: false })
      .limit(limit);

    if (error) {
      throw error;
    }

    return fromDbRows(data as unknown[]) as PostRecord[];
  },

  async listSitemapFields() {
    const client = createSupabaseServerClient();
    const { data, error } = await client
      .from(supabasePostsTable)
      .select(toSelectColumns(['slug', 'updated_at']));

    if (error) {
      throw error;
    }

    return fromDbRows(data as unknown[]) as PostRecord[];
  },
};
