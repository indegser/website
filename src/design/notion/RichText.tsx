'use client';

import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Fragment, ReactElement, ReactNode } from 'react';
import { toArray } from 'react-emoji-render';

import { convertApiColorToStyleProps } from './convertApiColorToStyleProps';
import { RichTextWithLink } from './RichTextWithLink';

import { theme } from '@src/design/theme';
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

type TextProps = {
  code?: boolean;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  strikethrough?: boolean;
};

const Text = styled.span<TextProps>`
  box-decoration-break: clone;
  display: inline;
  white-space: pre-line;

  ${({ code }) =>
    code &&
    css`
      font-family: ${theme.fonts.mono.computedValue};
      border-radius: 3px;
      font-size: 85%;
      padding: 0.2em 0.4em;
      background: ${theme.colors.green4.computedValue};
      color: ${theme.colors.green11.computedValue};
    `}
  ${({ bold }) =>
    bold &&
    css`
      font-weight: 700;
    `}

  ${({ italic }) =>
    italic &&
    css`
      font-style: italic;
    `}

  ${({ underline }) =>
    underline &&
    css`
      text-decoration: underline;
    `}

  ${({ strikethrough }) =>
    strikethrough &&
    css`
      text-decoration: line-through;
    `}
`;

const EmojiIcon = styled.span`
  line-height: 1;
  white-space: nowrap;
  font-size: 1em;
  font-family: 'Apple Color Emoji', 'Segoe UI Emoji', NotoColorEmoji,
    'Noto Color Emoji', 'Segoe UI Symbol', 'Android Emoji', EmojiSymbols;
`;
