import Markdown from "react-markdown";
import { useTocContent } from "./toc.hooks";
import TocLink from "./TocLink";
import styled from "@emotion/styled";

const Box = styled.div`
  padding: 0;
  text-align: left;
  font-weight: 400;
  color: var(--text400);
  border-bottom: 1px solid var(--border100);
  font-size: 14px;
  line-height: 1;
  padding-bottom: 1rem;

  & > div {
    overflow-y: hidden;
  }

  ol {
    list-style-type: none;
    counter-reset: item;
    margin: 0;
    padding: 0;
  }

  ol > li {
    display: table;
    counter-increment: item;

    &:before {
      content: counters(item, ".") ". ";
      display: table-cell;
      padding-top: 0.4em;
      padding-right: 0.6em;
      font-weight: 400;
      font-size: 13px;
      color: var(--text300);
    }
  }

  li ol > li {
    margin: 0;

    &:before {
      content: counters(item, ".") " ";
    }
  }

  li {
    line-height: 1.6;
    list-style-type: none;
  }

  p {
    margin: 0;
  }
`;

const FoldTitle = styled.div`
  font-size: 14px;
  flex: 1 1;
  font-weight: 500;
  margin-bottom: 0.5rem;
  color: var(--text400);
`;

interface Props {
  content: string;
}

const Toc: React.FC<Props> = ({ content }) => {
  const tocContent = useTocContent(content);

  if (!tocContent) return null;

  return (
    <Box>
      <FoldTitle>Table of Contents</FoldTitle>
      <Markdown
        source={tocContent}
        renderers={{
          link: TocLink,
        }}
      />
    </Box>
  );
};

export default Toc;
