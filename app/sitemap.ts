import { postSchema, sanityClient } from '@/lib/sanity';
import groq from 'groq';
import { getURL } from 'lib/constants';
import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const data = await sanityClient.fetch(
    groq`*[_type == 'post'] { _id, _updatedAt }`,
  );
  const posts = postSchema.array().parse(data);

  return posts.map((post) => ({
    url: `${getURL()}/posts/${post._id}`,
    lastModified: post._updatedAt,
  }));
}
