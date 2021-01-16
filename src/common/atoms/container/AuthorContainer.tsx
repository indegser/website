import styled from "@emotion/styled";
import { mq } from "common/theme";
import { FC } from "react";

const Container = styled.div`
  padding: 24px 0 40px 0;
  position: relative;
  margin-top: 20px;

  ${mq("md")} {
    margin-top: 0;
  }
`;

const Content = styled.div`
  display: grid;
  grid-gap: 40px;
  grid-template-columns: max-content auto;

  ${mq("md")} {
    grid-gap: 20px;
    grid-template-columns: auto;
  }
`;

const AuthorContainer: FC<{}> = ({ children, ...props }) => {
  return (
    <Container {...props}>
      <Content>{children}</Content>
    </Container>
  );
};

export default AuthorContainer;
