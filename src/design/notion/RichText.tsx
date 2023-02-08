import { Fragment, ReactElement, ReactNode } from 'react';
import { toArray } from 'react-emoji-render';

import { convertApiColorToStyleProps } from './convertApiColorToStyleProps';
import { RichTextWithLink } from './RichTextWithLink';

import { styled, theme } from '@src/design/theme/stitches.config';
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

            return (
              <RichTextWithLink key={i} link={link}>
                <Text
                  as={annotations.code ? 'code' : 'span'}
                  {...annotations}
                  style={convertApiColorToStyleProps(color)}
                >
                  {children.map((child, index) => {
                    if (isReactElement(child)) {
                      return (
                        <EmojiIcon key={index}>
                          {child.props.children}
                        </EmojiIcon>
                      );
                    }

                    return <Fragment key={index}>{child}</Fragment>;
                  })}
                </Text>
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

const Text = styled('span', {
  boxDecorationBreak: 'clone',
  display: 'inline',
  whiteSpace: 'pre-line',

  variants: {
    code: {
      true: {
        fontFamily: theme.fonts.mono,
        borderRadius: 3,
        fontSize: '85%',
        padding: '0.2em 0.4em',
        background: theme.colors.green4,
        color: theme.colors.green11,
      },
    },
    bold: {
      true: {
        fontWeight: 700,
      },
    },
    italic: {
      true: {
        fontStyle: 'italic',
      },
    },
    underline: {
      true: {
        textDecoration: 'underline',
      },
    },
    strikethrough: {
      true: {
        textDecoration: 'line-through',
      },
    },
  },
});

const EmojiIcon = styled('span', {
  fontFamily:
    '"Apple Color Emoji","Segoe UI Emoji",NotoColorEmoji,"Noto Color Emoji","Segoe UI Symbol","Android Emoji",EmojiSymbols',
  lineHeight: 1,
  whiteSpace: 'nowrap',
  fontSize: '1em',
});
