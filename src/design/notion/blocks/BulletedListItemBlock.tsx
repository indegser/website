'use client';

import styled from '@emotion/styled';

import { RichText } from '@src/design/notion/RichText';
import { BlockType } from '@src/types/notion';

interface Props {
  depth: number;
  block: Extract<BlockType, { type: 'bulleted_list_item' }>;
}

const bullets = ['•', '◦', '▪'];
export const BulletedListItemBlock = ({ depth, block }: Props) => {
  const { bulleted_list_item } = block;

  return (
    <Container>
      <Marker>{bullets[depth % 3]}</Marker>
      <Content>
        <div>
          <RichText data={bulleted_list_item.rich_text} />
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
  display: flex;
  align-items: center;
  justify-content: center;
  height: 25px;
  margin-right: 2px;
  line-height: 25px;
  font-size: 1.15em;
`;

const Content = styled.div`
  flex: 1 1 0px;
  min-width: 1px;
  display: flex;
  flex-direction: column;
`;
