import { isProduction } from '@/lib/constants';
import { Post, postSchema, sanityClient, urlForImage } from '@/lib/sanity';
import groq from 'groq';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PostPage } from './post/post-page';

export const revalidate = 60; // 1-minute.

type Props = {
  params: { id: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = params;

  try {
    const data =
      await sanityClient.fetch<Post>(groq`*[_type=='post' && _id=='${id}'][0] {
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
        canonical: `/content/${id}`,
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
      _id
    }
  `);

  const posts = postSchema.pick({ _id: true }).required().array().parse(data);

  return posts.map((post) => ({
    id: post._id,
  }));
};

export default async function Page({ params: { id } }: Props) {
  try {
    const data =
      await sanityClient.fetch<Post>(groq`*[_type=='post' && _id=='${id}'][0] {
      title,
      excerpt,
      cover,
      body,
    }`);

    const post = postSchema.parse(data);

    return <PostPage post={post} />;
  } catch (err) {
    console.warn(err);
    return notFound();
  }
}
