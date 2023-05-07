import styled from '@emotion/styled';
import Link from 'next/link';

import { PageContent } from '@src/design/atoms/Container';
import { Row } from '@src/design/atoms/Row';
import { RichText } from '@src/design/notion/RichText';
import { theme } from '@src/design/theme';
import { BlockType } from '@src/types/notion';

interface Props {
  blocks: BlockType[];
}

export const TocBlock = ({ blocks }: Props) => {
  const headings = blocks.filter((block) => block.type.startsWith('heading'));

  const { result: depthList } = headings.reduce(
    (res, block) => {
      switch (block.type) {
        case 'heading_1': {
          res.hasHeading1 = true;
          res.result.push(0);
          break;
        }
        case 'heading_2': {
          res.hasHeading2 = true;
          res.result.push(res.hasHeading1 ? 1 : 0);
          break;
        }
        case 'heading_3': {
          res.result.push(
            [res.hasHeading1, res.hasHeading2].filter(Boolean).length
          );
          break;
        }
      }
      return res;
    },
    {
      hasHeading1: false,
      hasHeading2: false,
      result: [],
    }
  );

  return (
    <PageContent>
      {headings.map((block, i) => {
        const depth = depthList[i];
        return (
          <Link
            key={block.id}
            passHref
            href={{
              hash: block.id,
            }}
          >
            <TocRow style={{ paddingLeft: 24 * depth }}>
              <TextWrapper>
                <RichText data={block[block.type].rich_text} />
              </TextWrapper>
            </TocRow>
          </Link>
        );
      })}
    </PageContent>
  );
};

const TocRow = styled(Row)`
  padding: 2px 8px 3px 0px;
  display: flex;
  align-items: center;
`;

const TextWrapper = styled.div`
  background-image: linear-gradient(
    to right,
    ${theme.colors.gray7.computedValue} 0%,
    ${theme.colors.gray7.computedValue} 100%
  );
  background-repeat: repeat-x;
  background-position: 0px 100%;
  background-size: 100% 1px;
  color: ${theme.colors.gray11.computedValue};
  font-size: 14px;
  line-height: 1.4;
  letter-spacing: 0;
  margin-left: 4px;
`;
