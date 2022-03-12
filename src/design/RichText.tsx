import { styled } from "@src/common/stitches.config";
import { RichTextItemResponse } from "@src/types/notion.types";

interface Props {
  data: RichTextItemResponse;
}

export const RichText = ({ data }: Props) => {
  return (
    <>
      {data.map((richText, i) => {
        switch (richText.type) {
          case "text": {
            return (
              <RichTextContent key={i} {...richText.annotations}>
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
