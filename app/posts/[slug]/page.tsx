import { isProduction } from '@/lib/constants';
import { Post, postSchema, sanityClient, urlForImage } from '@/lib/sanity';
import { getDraftPostBySlug } from '@/lib/sanity/draft-post';
import groq from 'groq';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { DraftStatusBanner } from './post/draft-status-banner';
import { PostPage } from './post/post-page';

export const revalidate = 60; // 1-minute.

type Props = {
  params: Promise<{ slug: string }>;
};

async function getPublishedPost(slug: string) {
  return sanityClient.fetch<Post | null>(
    groq`*[_type == 'post' && slug.current == $slug][0] {
      title,
      excerpt,
      cover,
      body,
    }`,
    { slug },
  );
}

function getPostMetadata({
  slug,
  post,
  isDraft,
}: {
  slug: string;
  post: Pick<Post, 'title' | 'excerpt' | 'cover'>;
  isDraft: boolean;
}): Metadata {
  const { title, excerpt, cover } = post;
  const coverUrl = cover ? urlForImage(cover).width(1200).url() : undefined;

  return {
    title,
    description: excerpt,
    robots: isDraft
      ? {
          index: false,
          follow: false,
        }
      : undefined,
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
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  const { slug } = params;

  try {
    const data = await getPublishedPost(slug);

    if (data) {
      const post = postSchema
        .pick({ title: true, excerpt: true, cover: true })
        .parse(data);

      return getPostMetadata({ slug, post, isDraft: false });
    }

    const draft = await getDraftPostBySlug(slug);

    if (!draft?.hasDraft) {
      return {};
    }

    const post = postSchema
      .pick({ title: true, excerpt: true, cover: true })
      .parse(draft.post);

    return getPostMetadata({ slug, post, isDraft: true });
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
    const data = await getPublishedPost(slug);

    if (data) {
      const post = postSchema
        .pick({ title: true, excerpt: true, cover: true, body: true })
        .parse(data);

      return <PostPage post={post} />;
    }

    const draft = await getDraftPostBySlug(slug);

    if (!draft?.hasDraft) {
      return notFound();
    }

    const post = postSchema
      .pick({ title: true, excerpt: true, cover: true, body: true })
      .parse(draft.post);

    return (
      <>
        <DraftStatusBanner />
        <PostPage post={post} />
      </>
    );
  } catch (err) {
    console.warn(err);
    return notFound();
  }
}
