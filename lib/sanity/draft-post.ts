import { createClient } from 'next-sanity';

import { apiVersion, dataset, projectId } from './env';
import { Post } from './types';

type DraftPostDocument = Post & {
  _id: string;
  _rev?: string;
  _createdAt?: string;
  _updatedAt?: string;
};

export type DraftPostResult = {
  post: DraftPostDocument;
  hasDraft: boolean;
};

function getAdminClient() {
  const token = process.env.SANITY_TOKEN;

  if (!token) {
    throw new Error('Missing SANITY_TOKEN.');
  }

  return createClient({
    projectId,
    dataset,
    apiVersion,
    token,
    useCdn: false,
    perspective: 'raw',
  });
}

export async function getDraftPostBySlug(
  slug: string,
): Promise<DraftPostResult | null> {
  const client = getAdminClient();
  const docs = await client.fetch<DraftPostDocument[]>(
    `*[_type == "post" && slug.current == $slug && !(_id in path("versions.**"))] {
      _id,
      _rev,
      _createdAt,
      _updatedAt,
      title,
      excerpt,
      contentKind,
      sourceMeta,
      slug,
      cover,
      body,
      categories[]->,
      publishedAt
    }`,
    { slug },
  );

  const draft = docs.find((doc) => doc._id.startsWith('drafts.'));
  const published = docs.find((doc) => !doc._id.startsWith('drafts.'));
  const post = draft ?? published;

  if (!post) {
    return null;
  }

  return {
    post,
    hasDraft: Boolean(draft),
  };
}
