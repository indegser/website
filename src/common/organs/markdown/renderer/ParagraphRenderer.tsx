import styled from "@emotion/styled";
import { COLORS } from "common/theme";
import BlockLink from "../link/BlockLink";

const Paragraph = styled.div`
  #footnote & {
    margin: 0 !important;
  }

  margin-top: 1em;
  hyphens: auto;

  blockquote & {
    padding-left: 1em;
    /* font-size: em; */
    border-left: 2px solid ${COLORS.bgDivider};
    box-sizing: border-box;
    margin: 2em auto;
    font-weight: 500;
  }
`;

const ParagraphRenderer = (props) => {
  const isBlockLink =
    props.children.length === 1 && props.children[0].type === "a";

  if (isBlockLink) {
    return (
      <Paragraph>
        <BlockLink {...props.children[0].props} />
      </Paragraph>
    );
  }
  return <Paragraph {...props} />;
};

export default ParagraphRenderer;
