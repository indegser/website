import { convertApiColorToStyleProps } from "./convertApiColorToStyleProps";
import { RichTextWithLink } from "./RichTextWithLink";

import { styled, theme } from "@src/common/stitches.config";
import { RichTextItemResponse } from "@src/types/notion.types";

interface Props {
  shouldRenderPlainText?: boolean;
  data: RichTextItemResponse;
}

export const RichText = ({ data, shouldRenderPlainText = false }: Props) => {
  return (
    <>
      {data.map((richText, i) => {
        switch (richText.type) {
          case "text": {
            const { color, ...fontStyleProps } = richText.annotations;
            const annotations = !shouldRenderPlainText
              ? fontStyleProps
              : ({} as typeof richText["annotations"]);

            const { link, content } = richText.text;

            return (
              <RichTextWithLink key={i} link={link}>
                <Text
                  as={annotations.code ? "code" : "span"}
                  {...annotations}
                  style={convertApiColorToStyleProps(color)}
                >
                  {content}
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

const Text = styled("span", {
  boxDecorationBreak: "clone",
  display: "inline",
  whiteSpace: "pre-line",

  variants: {
    code: {
      true: {
        fontFamily: theme.fonts.mono,
        borderRadius: 3,
        fontSize: "85%",
        padding: "0.2em 0.4em",
        background: theme.colors.green4,
        color: theme.colors.green11,
      },
    },
    bold: {
      true: {
        fontWeight: 600,
      },
    },
    italic: {
      true: {
        fontStyle: "italic",
      },
    },
    underline: {
      true: {
        textDecoration: "underline",
      },
    },
    strikethrough: {
      true: {
        textDecoration: "line-through",
      },
    },
  },
});
