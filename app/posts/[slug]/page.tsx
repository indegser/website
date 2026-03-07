import { getPostBySlug, getPostSlugs } from '@/lib/posts';
import { postSchema, urlForImage } from '@/lib/sanity';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PostPage } from './post/post-page';

export const revalidate = 60; // 1-minute.

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  const { slug } = params;

  try {
    const data = await getPostBySlug(slug);

    const { title, excerpt, cover } = postSchema
      .pick({ title: true, excerpt: true, cover: true })
      .required()
      .parse(data);
    const coverUrl = urlForImage(cover).width(1200).url();

    return {
      title,
      description: excerpt,
      openGraph: {
        title,
        description: excerpt || '',
        type: 'article',
        siteName: 'Indegser',
        images: coverUrl ? [coverUrl] : [],
      },
      alternates: {
        canonical: `/posts/${slug}`,
      },
      twitter: {
        card: 'summary_large_image',
      },
    };
  } catch (err) {
    return {};
  }
}

export const generateStaticParams = async () => {
  return getPostSlugs();
};

export default async function Page(props: Props) {
  const params = await props.params;

  const { slug } = params;

  try {
    const data = await getPostBySlug(slug);

    const post = postSchema
      .pick({ title: true, excerpt: true, cover: true, body: true })
      .parse(data);

    return <PostPage post={post} />;
  } catch (err) {
    console.warn(err);
    return notFound();
  }
}
