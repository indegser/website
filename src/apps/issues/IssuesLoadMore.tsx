import styled from "@emotion/styled";
import { mediaQueries, mq } from "common/theme";
import { useEffect } from "react";
import { ComponentProps } from "react";
import { useInView } from "react-intersection-observer";
import { colors } from "style.types";

interface Props extends ComponentProps<typeof Container> {
  leftover: number;
  onLoadMore: () => void;
}

export const IssuesLoadMore = ({ leftover, onLoadMore, ...props }: Props) => {
  const canRender = leftover > 0;
  const { ref, inView } = useInView();

  useEffect(() => {
    if (leftover === 0 || !inView) return;
    onLoadMore();
  }, [inView, leftover]);

  if (!canRender) return null;

  return (
    <Container>
      <Desktop onClick={onLoadMore}>
        <Button role="button" tabIndex={0}>
          <strong>{leftover}개 더</strong> 불러오기
        </Button>
      </Desktop>
      <Mobile ref={ref} />
    </Container>
  );
};

const Container = styled.div``;

const Desktop = styled.div`
  ${mq("sm")} {
    display: none;
  }
`;

const Mobile = styled.div`
  display: none;

  ${mq("sm")} {
    display: block;
  }
`;

const Button = styled.div`
  padding: 4px;
  cursor: pointer;
  transition: 0.2s background-color ease;
  color: ${colors.gray500};
  font-size: 14px;
  height: 30px;
  line-height: 30px;
  border-top: 1px solid ${colors.gray100};

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
