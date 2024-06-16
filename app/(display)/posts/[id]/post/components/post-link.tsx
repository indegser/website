import { PortableTextMarkComponent } from 'next-sanity';

export const PostLink: PortableTextMarkComponent = ({ value, children }) => {
  const rel = !value.href.startsWith('/') ? 'noreferrer noopener' : undefined;
  return (
    <a
      href={value.href}
      rel={rel}
      target="_blank"
      className="cursor-pointer text-blue-800 no-underline hover:underline dark:text-blue-400"
    >
      {children}
    </a>
  );
};
