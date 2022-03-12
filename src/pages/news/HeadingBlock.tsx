import { styled } from "@src/common/stitches.config";
import { RichText } from "@src/design/RichText";
import { RichTextItemResponse } from "@src/types/notion.types";

interface Props {
  level: 1 | 2 | 3;
  heading: {
    rich_text: RichTextItemResponse;
    color: any;
  };
}

export const HeadingBlock = ({ level, heading }: Props) => {
  const as = `h${level}` as const;

  return (
    <Heading as={as} data-level={level}>
      <RichText data={heading.rich_text} />
    </Heading>
  );
};

const Heading = styled("h1", {
  fontWeight: 600,
  lineHeight: 1.25,

  ['&[data-level="1"]']: {
    marginTop: 50,
    marginBottom: 25,
    fontSize: "1.45em",
  },
  ['&[data-level="2"]']: {
    fontSize: "1.25em",
    marginTop: 50,
    marginBottom: 20,
  },
  ['&[data-level="3"]']: {
    fontSize: "1.15em",
    margin: "1em 0",
  },
});
