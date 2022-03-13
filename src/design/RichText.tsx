import { RichTextWithLink } from "./RichTextWithLink";

import { styled, theme } from "@src/common/stitches.config";
import {
  RichText as RichTextType,
  RichTextItemResponse,
} from "@src/types/notion.types";

interface Props {
  shouldRenderPlainText?: boolean;
  data: RichTextItemResponse;
}

export const RichText = ({ data, shouldRenderPlainText = false }: Props) => {
  const getStyleProp = ({ color }: RichTextType["annotations"]) => {
    if (!color || color === "default") return {};

    const isBackground = color.includes("_background");
    const colorValue = isBackground
      ? color.replace("_background", "4")
      : `${color}11`;
    const colorKey = isBackground ? "backgroundColor" : "color";

    return { [colorKey]: theme.colors[colorValue] };
  };

  return (
    <>
      {data.map((richText, i) => {
        switch (richText.type) {
          case "text": {
            const annotations = !shouldRenderPlainText
              ? richText.annotations
              : ({} as typeof richText["annotations"]);

            const { link } = richText.text;

            return (
              <RichTextWithLink key={i} link={link}>
                <Text {...annotations} style={getStyleProp(annotations)}>
                  {richText.text.content}
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
  fontWeight: 420,
  variants: {
    code: {
      true: {},
    },
    bold: {
      true: {
        fontWeight: 640,
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
