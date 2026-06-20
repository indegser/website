import { PortableTextMarkComponent } from 'next-sanity';

export const PostLink: PortableTextMarkComponent = ({ value, children }) => {
  const isInternal =
    value.href.startsWith('/') ||
    value.href.startsWith('?') ||
    value.href.startsWith('#');
  const rel = !isInternal ? 'noreferrer noopener' : undefined;
  return (
    <a
      href={value.href}
      rel={rel}
      target={!isInternal ? '_blank' : undefined}
      className="cursor-pointer text-blue-800 no-underline hover:underline dark:text-blue-400"
    >
      {children}
    </a>
  );
};
