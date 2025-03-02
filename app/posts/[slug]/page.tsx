import { isProduction } from '@/lib/constants';
import { Post, postSchema, sanityClient, urlForImage } from '@/lib/sanity';
import groq from 'groq';
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
    const data =
      await sanityClient.fetch<Post>(groq`*[_type=='post' && slug.current=='${slug}'][0] {
    title,
    excerpt,
    cover,
  }`);

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
  const data = await sanityClient.fetch<Post[]>(groq`
    *[_type=='post'][0...${isProduction ? 10 : 1}] {
      slug
    }
  `);

  const posts = postSchema.pick({ slug: true }).required().array().parse(data);

  return posts.map((post) => ({
    slug: post.slug?.current,
  }));
};

export default async function Page(props: Props) {
  const params = await props.params;

  const { slug } = params;

  try {
    const data =
      await sanityClient.fetch<Post>(groq`*[_type=='post' && slug.current=='${slug}'][0] {
      title,
      excerpt,
      cover,
      body,
    }`);

    const post = postSchema
      .pick({ title: true, excerpt: true, cover: true, body: true })
      .parse(data);

    return <PostPage post={post} />;
  } catch (err) {
    console.warn(err);
    return notFound();
  }
}
