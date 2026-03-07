import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import { createClient } from '@supabase/supabase-js';

const postsSeedPath = path.resolve(
  'supabase/seeds/sanity-production-posts.json',
);
const sqlSeedPath = path.resolve('supabase/seed.sql');

const requiredEnv = (name) => {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing required env: ${name}`);
  }

  return value;
};

const optionalEnv = (name, fallback) => {
  return process.env[name] || fallback;
};

const sanityProjectId = requiredEnv('SANITY_STUDIO_PROJECT_ID');
const sanityDataset = requiredEnv('SANITY_STUDIO_DATASET');
const sanitySourceDatasetOverride = process.env.SANITY_SOURCE_DATASET;
const supabaseUrl = requiredEnv('NEXT_PUBLIC_SUPABASE_URL');
const supabaseServiceRoleKey = requiredEnv('SUPABASE_SERVICE_ROLE_KEY');
const bucket = optionalEnv('SUPABASE_IMAGE_BUCKET', 'post-images');
const postsTable = optionalEnv('SUPABASE_POSTS_TABLE', 'posts');
const shouldSyncDb = optionalEnv('SUPABASE_SYNC_DB', 'true') !== 'false';

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
});

const isObject = (value) => {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value);
};

const parseSanityImageRef = (ref) => {
  const match = /^image-([a-f\d]+)-(\d+x\d+)-([a-z\d]+)$/i.exec(ref);
  if (!match) {
    return null;
  }

  const [, assetId, dimensions, ext] = match;

  return {
    assetId,
    dimensions,
    ext,
    fileName: `${assetId}-${dimensions}.${ext}`,
  };
};

const sanityDatasets = [
  sanitySourceDatasetOverride,
  sanityDataset,
  'production',
]
  .filter((value, index, arr) => Boolean(value) && arr.indexOf(value) === index)
  .map((value) => value);

const toSanityUrls = (parsedRef) => {
  return sanityDatasets.map((datasetName) => {
    return `https://cdn.sanity.io/images/${sanityProjectId}/${datasetName}/${parsedRef.assetId}-${parsedRef.dimensions}.${parsedRef.ext}`;
  });
};

const collectImageRefs = (value, output) => {
  if (Array.isArray(value)) {
    value.forEach((item) => collectImageRefs(item, output));
    return;
  }

  if (!isObject(value)) {
    return;
  }

  if (
    value._type === 'image' &&
    isObject(value.asset) &&
    typeof value.asset._ref === 'string'
  ) {
    output.add(value.asset._ref);
  }

  for (const nested of Object.values(value)) {
    collectImageRefs(nested, output);
  }
};

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const uploadRef = async (ref) => {
  const parsed = parseSanityImageRef(ref);

  if (!parsed) {
    throw new Error(`Unsupported Sanity image ref format: ${ref}`);
  }

  const storagePath = `sanity/${parsed.fileName}`;
  const sourceUrls = toSanityUrls(parsed);
  let response = null;

  for (const sourceUrl of sourceUrls) {
    const candidate = await fetch(sourceUrl);
    if (candidate.ok) {
      response = candidate;
      break;
    }
  }

  if (!response) {
    throw new Error(
      `Failed to fetch ref ${ref} from datasets: ${sanityDatasets.join(', ')}`,
    );
  }

  const arrayBuffer = await response.arrayBuffer();
  const contentType =
    response.headers.get('content-type') || `image/${parsed.ext}`;

  const { error } = await supabase.storage
    .from(bucket)
    .upload(storagePath, arrayBuffer, {
      cacheControl: '31536000',
      contentType,
      upsert: true,
    });

  if (error) {
    throw new Error(`Failed to upload ${storagePath}: ${error.message}`);
  }

  const { data } = supabase.storage.from(bucket).getPublicUrl(storagePath);
  return data.publicUrl;
};

const mapRefsToSupabaseUrls = async (refs) => {
  const refList = [...refs];
  const map = new Map();

  for (let index = 0; index < refList.length; index += 1) {
    const ref = refList[index];
    const url = await uploadRef(ref);
    map.set(ref, url);
    console.log(`[${index + 1}/${refList.length}] uploaded ${ref}`);

    // Avoid hammering local storage service too aggressively.
    await sleep(20);
  }

  return map;
};

const injectSupabaseUrls = (value, refToUrl) => {
  if (Array.isArray(value)) {
    return value.map((item) => injectSupabaseUrls(item, refToUrl));
  }

  if (!isObject(value)) {
    return value;
  }

  const cloned = { ...value };

  if (
    cloned._type === 'image' &&
    isObject(cloned.asset) &&
    typeof cloned.asset._ref === 'string'
  ) {
    const resolvedUrl = refToUrl.get(cloned.asset._ref);
    if (resolvedUrl) {
      cloned.asset = {
        ...cloned.asset,
        url: resolvedUrl,
      };
    }
  }

  for (const [key, nested] of Object.entries(cloned)) {
    cloned[key] = injectSupabaseUrls(nested, refToUrl);
  }

  return cloned;
};

const sqlEscapeText = (value) => {
  return value.replace(/'/g, "''");
};

const toSqlText = (value) => {
  return `'${sqlEscapeText(value)}'`;
};

const toSqlJsonb = (value) => {
  return `${toSqlText(JSON.stringify(value))}::jsonb`;
};

const toSqlTimestamp = (value) => {
  return toSqlText(value);
};

const buildSeedSql = (posts) => {
  const categoriesMap = new Map();
  const postCategoryPairs = [];

  for (const post of posts) {
    const categories = Array.isArray(post.categories) ? post.categories : [];

    for (const category of categories) {
      if (!category || typeof category._id !== 'string') {
        continue;
      }

      if (!categoriesMap.has(category._id)) {
        categoriesMap.set(category._id, {
          _id: category._id,
          title: category.title || '',
          avatar: category.avatar || null,
        });
      }

      postCategoryPairs.push({
        postId: post._id,
        categoryId: category._id,
      });
    }
  }

  const postValuesSql = posts
    .map((post) => {
      return `  (${toSqlText(post._id)}, ${toSqlJsonb(post.slug)}, ${toSqlText(post.title || '')}, ${toSqlText(post.excerpt || '')}, ${toSqlJsonb(post.cover || null)}, ${toSqlJsonb(Array.isArray(post.body) ? post.body : [])}, ${toSqlTimestamp(post.publishedAt)}, ${toSqlTimestamp(post._updatedAt)})`;
    })
    .join(',\n');

  const categories = [...categoriesMap.values()];
  const categoryValuesSql = categories
    .map((category) => {
      const avatarSql = category.avatar ? toSqlJsonb(category.avatar) : 'null';
      return `  (${toSqlText(category._id)}, ${toSqlText(category.title)}, ${avatarSql})`;
    })
    .join(',\n');

  const postCategoryValuesSql = postCategoryPairs
    .map((relation) => {
      return `  (${toSqlText(relation.postId)}, ${toSqlText(relation.categoryId)})`;
    })
    .join(',\n');

  const lines = [
    '-- Generated from supabase/seeds/sanity-production-posts.json',
    'begin;',
    'truncate table public.post_categories, public.categories, public.posts restart identity cascade;',
    '',
    'insert into public.posts (_id, slug, title, excerpt, cover, body, published_at, updated_at) values',
    postValuesSql,
    'on conflict (_id) do update set',
    '  slug = excluded.slug,',
    '  title = excluded.title,',
    '  excerpt = excluded.excerpt,',
    '  cover = excluded.cover,',
    '  body = excluded.body,',
    '  published_at = excluded.published_at,',
    '  updated_at = excluded.updated_at;',
    '',
    'insert into public.categories (_id, title, avatar) values',
    categoryValuesSql,
    'on conflict (_id) do update set',
    '  title = excluded.title,',
    '  avatar = excluded.avatar;',
    '',
    'insert into public.post_categories (post_id, category_id) values',
    postCategoryValuesSql,
    'on conflict (post_id, category_id) do nothing;',
    '',
    'commit;',
    '',
  ];

  return lines.join('\n');
};

const run = async () => {
  const raw = await readFile(postsSeedPath, 'utf8');
  const posts = JSON.parse(raw);

  if (!Array.isArray(posts)) {
    throw new Error('Seed JSON must be an array of posts.');
  }

  const refs = new Set();
  collectImageRefs(posts, refs);
  console.log(`Found ${refs.size} unique Sanity image refs.`);

  const refToUrl = await mapRefsToSupabaseUrls(refs);
  const updatedPosts = injectSupabaseUrls(posts, refToUrl);

  await writeFile(
    postsSeedPath,
    `${JSON.stringify(updatedPosts, null, 2)}\n`,
    'utf8',
  );

  const seedSql = buildSeedSql(updatedPosts);
  await writeFile(sqlSeedPath, seedSql, 'utf8');

  if (shouldSyncDb) {
    for (let index = 0; index < updatedPosts.length; index += 1) {
      const post = updatedPosts[index];
      const payload = {
        _id: post._id,
        slug: post.slug,
        title: post.title || '',
        excerpt: post.excerpt || '',
        cover: post.cover || null,
        body: Array.isArray(post.body) ? post.body : [],
        published_at: post.publishedAt,
        updated_at: post._updatedAt,
      };

      const { error } = await supabase
        .from(postsTable)
        .upsert(payload, { onConflict: '_id' });

      if (error) {
        throw new Error(`Failed to upsert post ${post._id}: ${error.message}`);
      }

      console.log(
        `[db ${index + 1}/${updatedPosts.length}] upserted ${post._id}`,
      );
    }
  }

  console.log(`Updated ${postsSeedPath}`);
  console.log(`Regenerated ${sqlSeedPath}`);
  if (shouldSyncDb) {
    console.log(`Synced ${updatedPosts.length} posts to table ${postsTable}`);
  }
};

run().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
