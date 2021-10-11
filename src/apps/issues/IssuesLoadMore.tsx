import styled from "@emotion/styled";
import { mediaQueries } from "common/theme";
import { ComponentProps } from "react";
import { colors } from "style.types";

interface Props extends ComponentProps<typeof Container> {
  leftover: number;
}

export const IssuesLoadMore = ({ leftover, ...props }: Props) => {
  const canRender = leftover > 0;
  if (!canRender) return null;

  return (
    <Container {...props}>
      <Button role="button" tabIndex={0}>
        <strong>{leftover}개 더</strong> 불러오기
      </Button>
    </Container>
  );
};

const Container = styled.div``;

const Button = styled.div`
  padding: 4px;
  cursor: pointer;
  transition: 0.2s background-color ease;
  color: ${colors.gray500};
  font-size: 14px;

  strong {
    font-weight: normal;
    color: ${colors.gray900};
  }

  ${mediaQueries.hoverable} {
    &:hover {
      background: ${colors.gray50};
    }
  }
`;
