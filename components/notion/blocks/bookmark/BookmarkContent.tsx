import { Tables } from '@/lib/supabase';
import { linkPreview } from 'lib/utils/link-preview';

interface Props {
  url: string;
  isSkeleton?: boolean;
}

export const BookmarkContent = async ({ url, isSkeleton }: Props) => {
  let base: Partial<Tables<'link_previews'>> = {
    title: '...',
    description: '...',
    image_url: '',
  };

  if (!isSkeleton) {
    const result = await linkPreview(url);
    if (result) {
      base = result;
    }
  }

  const { title, description, image_url } = base;
  return (
    <a href={url} title={title} target="_blank" rel="noreferrer">
      <div>
        <div className="flex rounded-sm border dark:border-gray-800">
          <div className="grid basis-2/3 gap-1 p-4">
            <div className="text-sm text-gray-900 dark:text-gray-400">
              {title}
            </div>
            <div className="line-clamp-2 text-xs text-gray-500 dark:text-gray-500">
              {description}
            </div>
            <div className="line-clamp-1 text-xs text-gray-700 dark:text-gray-600">
              {decodeURIComponent(url)}
            </div>
          </div>
          <div
            className="basis-1/3 bg-gray-100 bg-cover bg-center"
            style={{
              backgroundImage: image_url ? `url(${image_url})` : undefined,
            }}
          />
        </div>
      </div>
    </a>
  );
};
