import styled from "@emotion/styled";
import { colors } from "style.types";

export const HorizontalRule = ({ children, attributes }) => {
  return (
    <div {...attributes}>
      <Container contentEditable={false} />
      {children}
    </div>
  );
};

const Container = styled.hr`
  background-color: ${colors.gray100};
  padding-top: 0.25rem;
  padding-bottom: 0.25rem;
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;
  background-clip: content-box;
  height: 1px;
  border: none;

  &:before,
  &:after {
    content: "";
    display: table;
  }

  &:after {
    clear: both;
  }
`;
