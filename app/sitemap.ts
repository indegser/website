import { postSchema, sanityClient } from '@/lib/sanity';
import groq from 'groq';
import { getURL } from 'lib/constants';
import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const data = await sanityClient.fetch(
    groq`*[_type == 'post'] { slug, _updatedAt }`,
  );
  const posts = postSchema.array().parse(data);

  return posts.map((post) => ({
    url: `${getURL()}/posts/${post.slug}`,
    lastModified: post._updatedAt,
  }));
}
