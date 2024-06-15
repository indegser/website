import { LinkPreview, SanityImage, urlForImage } from '@/lib/sanity';
import { PortableTextComponentProps } from 'next-sanity';
import Image from 'next/image';

interface Props
  extends PortableTextComponentProps<LinkPreview & { image: SanityImage }> {}

export const PostLinkPreview = async ({ value }: Props) => {
  const { title, description, link, image } = value;

  const url = urlForImage(image).width(400).fit('max').auto('format').url();

  return (
    <a href={link} title={title} target="_blank" rel="noreferrer">
      <div className="mt-4 py-1">
        <div className="flex h-24 rounded-sm border dark:border-gray-800">
          <div className="grid flex-1 gap-1 p-4">
            <div className="line-clamp-1 text-sm text-gray-900 dark:text-gray-400">
              {title}
            </div>
            <div className="line-clamp-1 text-xs text-gray-500 dark:text-gray-500 md:line-clamp-2">
              {description}
            </div>
            <div className="line-clamp-1 text-xs text-gray-700 dark:text-gray-600">
              {decodeURIComponent(link!)}
            </div>
          </div>
          <div className="relative hidden aspect-video h-full bg-gray-100 bg-cover bg-center md:block">
            <Image src={url} alt="" fill className="object-cover" />
          </div>
        </div>
      </div>
    </a>
  );
};
