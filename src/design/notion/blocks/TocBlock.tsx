import Link from "next/link";

import { PageContent } from "@src/design/atoms/Container";
import { Row } from "@src/design/atoms/Row";
import { RichText } from "@src/design/notion/RichText";
import { styled, theme } from "@src/design/theme/stitches.config";
import { BlockType } from "@src/types/notion.types";

interface Props {
  blocks: BlockType[];
}

export const TocBlock = ({ blocks }: Props) => {
  const headings = blocks.filter((block) => block.type.startsWith("heading"));

  const { result: depthList } = headings.reduce(
    (res, block) => {
      switch (block.type) {
        case "heading_1": {
          res.hasHeading1 = true;
          res.result.push(0);
          break;
        }
        case "heading_2": {
          res.hasHeading2 = true;
          res.result.push(res.hasHeading1 ? 1 : 0);
        }
        case "heading_3": {
          res.result.push(
            [res.hasHeading1, res.hasHeading2].filter(Boolean).length
          );
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
            <a>
              <TocRow style={{ paddingLeft: 24 * depth }}>
                <TextWrapper>
                  <RichText data={block[block.type].rich_text} />
                </TextWrapper>
              </TocRow>
            </a>
          </Link>
        );
      })}
    </PageContent>
  );
};

const TocRow = styled(Row, {
  padding: "2px 8px 3px 0px",
  display: "flex",
  alignItems: "center",
});

const TextWrapper = styled("div", {
  backgroundImage: `linear-gradient(to right, ${theme.colors.gray7} 0%, ${theme.colors.gray7} 100%)`,
  backgroundRepeat: `repeat-x`,
  backgroundPosition: `0px 100%`,
  backgroundSize: `100% 1px`,
  color: theme.colors.gray11,
  fontSize: 14,
  lineHeight: 1.4,
  letterSpacing: 0,
  marginLeft: 4,
});
