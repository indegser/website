import styled from "@emotion/styled";
import { RenderLeafProps } from "slate-react";

interface Props extends RenderLeafProps {}

export const TextLeaf = (props: Props) => {
  const { attributes, children, leaf } = props;
  return (
    <Container data-is-empty={leaf.text === ""} {...attributes}>
      {children}
    </Container>
  );
};

const Container = styled.span`
  // The following is a workaround for a Chromium bug where,
  // if you have an inline at the end of a block,
  // clicking the end of a block puts the cursor inside the inline
  // instead of inside the final {text: ''} node
  // https://github.com/ianstormtaylor/slate/issues/4704#issuecomment-1006696364
  &[data-is-empty="true"] {
    padding-left: 0.1px;
  }
`;
