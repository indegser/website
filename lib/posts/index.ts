import { isProduction } from '@/lib/constants';
import {
  Post,
  PostFeed,
  postFeedSchema,
  postSchema,
  sanityClient,
} from '@/lib/sanity';
import { createSupabaseServerClient } from '@/lib/supabase';
import groq from 'groq';

type DataSource = 'sanity' | 'supabase';

type PostRecord = Record<string, unknown>;

const dataSource = ((process.env.DATA_SOURCE || 'sanity').toLowerCase() ||
  'sanity') as DataSource;

const supabasePostsTable = process.env.SUPABASE_POSTS_TABLE || 'posts';

const toSlugObject = (slug: unknown) => {
  if (typeof slug === 'string') {
    return {
      _type: 'slug',
      current: slug,
    };
  }

  if (slug && typeof slug === 'object') {
    return slug;
  }

  return undefined;
};

const normalizePostRecord = (record: PostRecord) => {
  const normalized: PostRecord = {
    ...record,
    _updatedAt: record._updatedAt ?? record.updated_at,
    publishedAt: record.publishedAt ?? record.published_at,
    slug: toSlugObject(record.slug),
  };

  if (!normalized.cover || typeof normalized.cover !== 'object') {
    delete normalized.cover;
  }

  if (!normalized.categories || !Array.isArray(normalized.categories)) {
    normalized.categories = null;
  }

  if (!normalized.body || !Array.isArray(normalized.body)) {
    normalized.body = [];
  }

  return normalized;
};

const fetchSupabaseRowsBySlug = async (
  slug: string,
  columns: string,
): Promise<PostRecord | null> => {
  const client = createSupabaseServerClient();

  const textSlugQuery = await client
    .from(supabasePostsTable)
    .select(columns)
    .eq('slug', slug)
    .limit(1)
    .maybeSingle();

  if (!textSlugQuery.error && textSlugQuery.data) {
    return textSlugQuery.data as PostRecord;
  }

  const jsonSlugQuery = await client
    .from(supabasePostsTable)
    .select(columns)
    .filter('slug->>current', 'eq', slug)
    .limit(1)
    .maybeSingle();

  if (jsonSlugQuery.error) {
    throw jsonSlugQuery.error;
  }

  return (jsonSlugQuery.data as PostRecord | null) ?? null;
};

const fetchPostsFromSupabase = async (): Promise<PostFeed[]> => {
  const client = createSupabaseServerClient();
  const { data, error } = await client
    .from(supabasePostsTable)
    .select(
      '_id, slug, title, excerpt, cover, publishedAt, published_at, categories',
    )
    .order('published_at', { ascending: false });

  if (error) {
    throw error;
  }

  const rows = (data || []).map((row) =>
    normalizePostRecord(row as PostRecord),
  );

  return postFeedSchema.array().parse(rows);
};

const fetchPostBySlugFromSupabase = async (
  slug: string,
): Promise<Post | null> => {
  const row = await fetchSupabaseRowsBySlug(
    slug,
    '_id, slug, title, excerpt, cover, body, categories, publishedAt, published_at, _updatedAt, updated_at',
  );

  if (!row) {
    return null;
  }

  return postSchema.parse(normalizePostRecord(row));
};

const fetchPostSlugsFromSupabase = async (limit: number) => {
  const client = createSupabaseServerClient();
  const { data, error } = await client
    .from(supabasePostsTable)
    .select('slug')
    .order('published_at', { ascending: false })
    .limit(limit);

  if (error) {
    throw error;
  }

  return (data || [])
    .map((row) => toSlugObject((row as PostRecord).slug))
    .filter((slugValue): slugValue is { current: string } => {
      return Boolean(
        slugValue &&
          typeof slugValue === 'object' &&
          typeof (slugValue as { current?: unknown }).current === 'string',
      );
    })
    .map((slugValue) => ({ slug: slugValue.current }));
};

const fetchSitemapPostsFromSupabase = async () => {
  const client = createSupabaseServerClient();
  const { data, error } = await client
    .from(supabasePostsTable)
    .select('slug, _updatedAt, updated_at');

  if (error) {
    throw error;
  }

  return (data || [])
    .map((row) => {
      const normalized = normalizePostRecord(row as PostRecord);
      const parsed = postSchema
        .pick({ slug: true, _updatedAt: true })
        .parse(normalized);

      return {
        slug: parsed.slug?.current,
        updatedAt: parsed._updatedAt,
      };
    })
    .filter((item) => Boolean(item.slug));
};

export const getPostFeed = async (): Promise<PostFeed[]> => {
  if (dataSource === 'supabase') {
    return fetchPostsFromSupabase();
  }

  const data = await sanityClient.fetch(
    groq`*[_type == 'post'] | order(publishedAt desc) {
      _id,
      slug,
      title,
      excerpt,
      cover,
      publishedAt,
      categories[]->
    }`,
  );

  return postFeedSchema.array().parse(data);
};

export const getPostBySlug = async (slug: string): Promise<Post | null> => {
  if (dataSource === 'supabase') {
    return fetchPostBySlugFromSupabase(slug);
  }

  const data = await sanityClient.fetch<Post>(
    groq`*[_type=='post' && slug.current=='${slug}'][0] {
      _id,
      slug,
      title,
      excerpt,
      cover,
      body,
      categories[]->,
      publishedAt,
      _updatedAt,
    }`,
  );

  if (!data) {
    return null;
  }

  return postSchema.parse(data);
};

export const getPostSlugs = async () => {
  const limit = isProduction ? 10 : 1;

  if (dataSource === 'supabase') {
    return fetchPostSlugsFromSupabase(limit);
  }

  const data = await sanityClient.fetch<Post[]>(groq`
    *[_type=='post'][0...${limit}] {
      slug
    }
  `);

  const posts = postSchema.pick({ slug: true }).required().array().parse(data);

  return posts
    .map((post) => ({ slug: post.slug?.current }))
    .filter((post): post is { slug: string } => Boolean(post.slug));
};

export const getSitemapPosts = async () => {
  if (dataSource === 'supabase') {
    return fetchSitemapPostsFromSupabase();
  }

  const data = await sanityClient.fetch(
    groq`*[_type == 'post'] { slug, _updatedAt }`,
  );

  const posts = postSchema.array().parse(data);

  return posts
    .map((post) => ({
      slug: post.slug?.current,
      updatedAt: post._updatedAt,
    }))
    .filter((post): post is { slug: string; updatedAt: Date } =>
      Boolean(post.slug),
    );
};
