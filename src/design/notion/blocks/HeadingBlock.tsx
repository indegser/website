import { RichText } from '@src/design/notion/RichText';
import { styled } from '@src/design/theme/stitches.config';
import { RichTextItemResponse } from '@src/types/notion';

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

const Heading = styled('h1', {
  fontWeight: 600,
  lineHeight: 1.25,
  marginBottom: 0,

  ['&[data-level="1"]']: {
    marginTop: 50,
    fontWeight: 700,
    fontSize: '1.65em',
  },
  ['&[data-level="2"]']: {
    fontSize: '1.25em',
    marginTop: 50,
  },
  ['&[data-level="3"]']: {
    fontSize: '1.15em',
  },
});
