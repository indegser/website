import { getSitemapPosts } from '@/lib/posts';
import { getURL } from 'lib/constants';
import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getSitemapPosts();

  return posts.map((post) => ({
    url: `${getURL()}/posts/${post.slug}`,
    lastModified: post.updatedAt,
  }));
}
