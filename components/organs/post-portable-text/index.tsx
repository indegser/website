import { PortableText } from 'next-sanity';
import { ComponentProps } from 'react';
import { BulletListItem } from './components/bullet-list-item';
import { NumberListItem } from './components/number-list-item';
import { PostCode } from './components/post-code';
import { PostGoogleMap } from './components/post-google-map';
import { PostImage } from './components/post-image';
import { PostLink } from './components/post-link';
import { PostLinkPreview } from './components/post-link-preview';
import { PostYoutube } from './components/post-youtube';

interface Props extends ComponentProps<typeof PortableText> {}

export const PostPortableText = (props: Props) => {
  return (
    <PortableText
      {...props}
      components={{
        list: {
          bullet: ({ children }) => <ul className="mb-4">{children}</ul>,
          number: ({ children }) => <ol className="mb-4">{children}</ol>,
        },
        listItem: {
          bullet: BulletListItem,
          number: NumberListItem,
        },
        types: {
          image: PostImage,
          linkPreview: PostLinkPreview,
          code: PostCode,
          youtube: PostYoutube,
          'google-map': PostGoogleMap,
        },
        block: {
          h1: (props) => <h1 className="mb-4 py-1">{props.children}</h1>,
          h2: (props) => <h2 className="mb-4 py-1">{props.children}</h2>,
          h3: (props) => <h3 className="mb-4 py-1">{props.children}</h3>,
          h4: (props) => <h4 className="mb-4 py-1">{props.children}</h4>,
          normal: ({ children, ...props }) => {
            return (
              <div className="mb-4 py-1" data-block-id={props.value._key}>
                <p>{children}</p>
              </div>
            );
          },
        },
        marks: {
          link: PostLink,
          code: ({ children }) => {
            return (
              <code className="rounded-sm bg-gray-100 px-1 py-0.5 text-xs text-rose-500 dark:bg-gray-500 dark:text-rose-100">
                {children}
              </code>
            );
          },
        },
      }}
    />
  );
};
