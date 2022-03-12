import { styled } from "@src/common/stitches.config";
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
            const annotations = !shouldRenderPlainText
              ? richText.annotations
              : {};
            return (
              <RichTextContent key={i} {...annotations}>
                {richText.text.content}
              </RichTextContent>
            );
          }
          default:
            return null;
        }
      })}
    </>
  );
};

const RichTextContent = styled("span", {
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
