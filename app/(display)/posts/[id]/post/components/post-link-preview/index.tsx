import { LinkPreview, urlForImage } from '@/lib/sanity';
import { PortableTextComponentProps } from 'next-sanity';
import { Image } from 'sanity';

interface Props
  extends PortableTextComponentProps<LinkPreview & { image: Image }> {}

export const PostLinkPreview = async ({ value }: Props) => {
  const { title, description, link, image } = value;

  const url = urlForImage(image).width(400).fit('max').auto('format').url();

  return (
    <a href={link} title={title} target="_blank" rel="noreferrer">
      <div className="mt-4 py-1">
        <div className="flex rounded-sm border dark:border-gray-800">
          <div className="grid flex-1 gap-1 p-4">
            <div className="text-sm text-gray-900 dark:text-gray-400">
              {title}
            </div>
            <div className="line-clamp-2 text-xs text-gray-500 dark:text-gray-500">
              {description}
            </div>
            <div className="line-clamp-1 text-xs text-gray-700 dark:text-gray-600">
              {decodeURIComponent(link!)}
            </div>
          </div>
          <div
            className=" aspect-video basis-auto bg-gray-100 bg-cover bg-center"
            style={{
              backgroundImage: `url(${url})`,
            }}
          />
        </div>
      </div>
    </a>
  );
};
