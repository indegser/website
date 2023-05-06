import styled from '@emotion/styled';
import { RichText } from '@src/design/notion/RichText';
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

const Heading = styled.h1`
  font-weight: 600;
  line-height: 1.25;
  margin-bottom: 0;

  &[data-level='1'] {
    margin-top: 50px;
    font-weight: 700;
    font-size: 1.65em;
  }

  &[data-level='2'] {
    font-size: 1.25em;
    margin-top: 50px;
  }

  &[data-level='3'] {
    font-size: 1.15em;
  }

