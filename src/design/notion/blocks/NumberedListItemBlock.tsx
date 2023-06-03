'use client';

import styled from '@emotion/styled';

import { RichText } from '@src/design/notion/RichText';
import { BlockType } from '@src/types/notion';

interface Props {
  marker: number;
  depth: number;
  block: Extract<BlockType, { type: 'numbered_list_item' }>;
}

const alphabet = [
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'v',
  'w',
  'x',
  'y',
  'z',
];

function counterGenerator(type: number, marker: number) {
  switch (type) {
    case 0: {
      return marker + 1;
    }
    case 1: {
      return alphabet[marker % alphabet.length];
    }
    default: {
      return;
    }
  }
}

export const NumberedListItemBlock = ({ block, depth, marker }: Props) => {
  const { numbered_list_item } = block;

  return (
    <Container>
      <Marker>{counterGenerator(depth % 2, marker)}.</Marker>
      <Content>
        <div>
          <RichText data={numbered_list_item.rich_text} />
        </div>
      </Content>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: start;
  padding-left: 2px;
  width: 100%;
`;

const Marker = styled.div`
  width: 24px;
  min-height: 25px;
  margin-right: 2px;
  justify-content: center;
  align-items: center;
  display: flex;
`;

const Content = styled.div`
  flex: 1 1 0px;
  min-width: 1px;
  display: flex;
  flex-direction: column;
`;
