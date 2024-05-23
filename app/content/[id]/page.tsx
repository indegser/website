import { ContentPage } from '@/components/layout/content/content-page';
import { isProduction } from '@/lib/constants';
import { notionApi } from '@/lib/supabase/notion.api';
import { notionUtils } from '@/lib/utils/notion';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

export const revalidate = 3600; // 1-hour.

type Props = {
  params: { id: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = params;

  try {
    const { cover, properties } = await notionApi.retrievePage(id);
    const title = notionUtils.getPlainText(properties.Title);
    const excerpt = notionUtils.getPlainText(properties.Description);
    const coverUrl = notionUtils.getNotionFileUrl(cover);

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
  const { results } = await notionApi.queryDatabase({
    limit: isProduction ? 10 : 1,
  });

  return results.map((page) => ({
    id: page.id,
  }));
};

export default async function Page({ params: { id } }: Props) {
  try {
    await notionApi.retrievePage(id);
  } catch (err) {
    notFound();
  }

  return <ContentPage id={id} />;
}
