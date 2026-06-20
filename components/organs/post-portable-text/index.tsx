import { PortableText } from 'next-sanity';
import { ComponentProps } from 'react';
import { BulletListItem } from './components/bullet-list-item';
import { NumberListItem } from './components/number-list-item';
import {
  PostProgressionCompare,
  PostRelatedTerms,
  PostUsageNotes,
  PostVoiceMotion,
} from './components/post-harmony-blocks';
import { PostCallout } from './components/post-callout';
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
          bullet: ({ children }) => (
            <ul className="mb-[26px] md:mb-[29px]">{children}</ul>
          ),
          number: ({ children }) => (
            <ol className="mb-[26px] md:mb-[29px]">{children}</ol>
          ),
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
          progressionCompare: PostProgressionCompare,
          voiceMotion: PostVoiceMotion,
          usageNotes: PostUsageNotes,
          relatedTerms: PostRelatedTerms,
          callout: PostCallout,
        },
        block: {
          h1: (props) => (
            <h1 className="text-heading-32 mb-4 mt-11 py-0 first:mt-3 md:mt-[52px] md:first:mt-2">
              {props.children}
            </h1>
          ),
          h2: (props) => (
            <h2 className="text-heading-24 mb-4 mt-11 py-0 first:mt-3 md:mt-[52px] md:first:mt-2">
              {props.children}
            </h2>
          ),
          h3: (props) => (
            <h3 className="text-heading-20 mb-4 mt-9 py-0 first:mt-3 md:mt-11 md:first:mt-2">
              {props.children}
            </h3>
          ),
          h4: (props) => (
            <h4 className="text-heading-16 mb-3 mt-8 py-0 first:mt-3 md:mt-9 md:first:mt-2">
              {props.children}
            </h4>
          ),
          blockquote: ({ children }) => (
            <blockquote className="text-copy-16 text-[#1d1d1f]/85 my-[26px] border-l border-gray-300 pl-5 italic dark:border-gray-700 dark:text-gray-100/70 md:my-[29px] md:pl-6">
              {children}
            </blockquote>
          ),
          normal: ({ children, ...props }) => {
            return (
              <div
                className="mb-[26px] py-0 last:mb-0 md:mb-[29px]"
                data-block-id={props.value._key}
              >
                <p className="text-copy-18">{children}</p>
              </div>
            );
          },
        },
        marks: {
          link: PostLink,
          code: ({ children }) => {
            return (
              <code className="text-copy-13-mono rounded-sm bg-gray-100 px-1 py-0.5 text-rose-500 dark:bg-gray-500 dark:text-rose-100">
                {children}
              </code>
            );
          },
        },
      }}
    />
  );
};
