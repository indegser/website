import clsx from 'clsx';
import { Fragment, ReactElement, ReactNode } from 'react';
import { toArray } from 'react-emoji-render';

import { convertApiColorToStyleProps } from './convertApiColorToStyleProps';
import { RichTextWithLink } from './RichTextWithLink';

import { RichTextItemResponse } from '@src/types/notion';

interface Props {
  shouldRenderPlainText?: boolean;
  data: RichTextItemResponse;
}

function isReactElement(
  child: ReactElement | ReactNode
): child is ReactElement {
  return typeof child === 'object';
}

export const RichText = ({ data, shouldRenderPlainText = false }: Props) => {
  return (
    <>
      {data.map((richText, i) => {
        switch (richText.type) {
          case 'text': {
            const { color, ...fontStyleProps } = richText.annotations;
            const annotations = !shouldRenderPlainText
              ? fontStyleProps
              : ({} as (typeof richText)['annotations']);

            const { link, content } = richText.text;
            const children = toArray(content) as Array<
              ReactNode | ReactElement
            >;

            const Tag = annotations.code ? 'code' : 'span';

            return (
              <RichTextWithLink key={i} link={link}>
                <Tag
                  {...annotations}
                  className={clsx(
                    'inline',
                    'whitespace-pre-line',
                    annotations.code && [
                      'rounded-sm',
                      'text-xs',
                      'px-1',
                      'py-1',
                      'bg-gray-100',
                    ]
                  )}
                  style={{
                    fontWeight: annotations.bold && 700,
                    fontStyle: annotations.italic && 'italic',
                    textDecorationLine: annotations.underline && 'underline',
                    textDecoration: annotations.strikethrough && 'line-through',
                    ...convertApiColorToStyleProps(color),
                  }}
                >
                  {children.map((child, index) => {
                    if (isReactElement(child)) {
                      return (
                        <span
                          key={index}
                          className="whitespace-nowrap font-emoji text-base leading-none"
                        >
                          {child.props.children}
                        </span>
                      );
                    }

                    return <Fragment key={index}>{child}</Fragment>;
                  })}
                </Tag>
              </RichTextWithLink>
            );
          }
          default:
            return null;
        }
      })}
    </>
  );
};
