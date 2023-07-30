import { ORIGIN } from '@src/types/const.types';

interface OpenGraphType {
  id: string;
  url: string;
  title: string;
  description: string;
  image_url: string;
}

interface Props {
  url: string;
  isSkeleton?: boolean;
}

export const BookmarkContent = async ({ url, isSkeleton }: Props) => {
  const { title, description, image_url } = isSkeleton
    ? { title: '...', description: '...', image_url: '' }
    : await fetch(`${ORIGIN}/api/og?url=${encodeURIComponent(url)}`).then(
        (res) => res.json() as Promise<OpenGraphType>,
      );

  return (
    <a href={url} title={title} target="_blank" rel="noreferrer">
      <div>
        <div className="flex rounded-sm border">
          <div className="grid basis-2/3 gap-1 p-4">
            <div className="text-sm text-gray-900">{title}</div>
            <div className="line-clamp-2 text-xs text-gray-500">
              {description}
            </div>
            <div className="line-clamp-1 text-xs text-gray-700">
              {decodeURIComponent(url)}
            </div>
          </div>
          <div
            className="basis-1/3 bg-gray-100 bg-cover bg-center"
            style={{
              backgroundImage: image_url && `url(${image_url})`,
            }}
          />
        </div>
      </div>
    </a>
  );
};
