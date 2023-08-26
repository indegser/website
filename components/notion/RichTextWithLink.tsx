import { PropsWithChildren } from 'react';

interface Props {
  link: { url: string } | null;
}

export const RichTextWithLink = ({
  link,
  children,
}: PropsWithChildren<Props>) => {
  if (link === null) {
    return <>{children}</>;
  }

  return (
    <a
      className="cursor-pointer text-blue-800 no-underline hover:underline dark:text-blue-400"
      href={link.url}
    >
      {children}
    </a>
  );
};
