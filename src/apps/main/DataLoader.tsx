import styled from "@emotion/styled";
import Icon from "common/atoms/icons/Icon";
import { mediaQueries, mq } from "common/theme";
import { useEffect } from "react";
import { ComponentProps } from "react";
import { useInView } from "react-intersection-observer";
import { colors } from "style.types";

interface Props extends ComponentProps<typeof Container> {
  pageSize: number;
  canRender: boolean;
  isValidating: boolean;
  onLoadMore: () => void;
}

export const DataLoader = ({
  pageSize,
  canRender,
  isValidating,
  onLoadMore,
}: Props) => {
  const { ref, inView } = useInView();

  useEffect(() => {
    if (!inView || isValidating) return;
    onLoadMore();
  }, [inView, isValidating]);

  if (!canRender) return null;

  return (
    <Container>
      <Desktop onClick={onLoadMore}>
        <Button role="button" tabIndex={0}>
          <Icon variant="loadMore" width={14} fill={colors.gray300} />
          <ButtonStrong>{pageSize}개 더</ButtonStrong>
          {" 불러오기"}
        </Button>
      </Desktop>
      <Mobile ref={ref} />
    </Container>
  );
};

const Container = styled.div``;

const Desktop = styled.div`
  border-top: 1px solid ${colors.gray100};
  padding-top: 4px;

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
  border-radius: 3px;
  cursor: pointer;
  transition: 0.2s background-color ease;
  color: ${colors.gray500};
  font-size: 14px;
  height: 26px;
  display: flex;
  align-items: center;

  ${mediaQueries.hoverable} {
    &:hover {
      background: ${colors.gray50};
    }
  }
`;

const ButtonStrong = styled.strong`
  font-weight: normal;
  color: ${colors.gray900};
  margin: 0 4px 0 4px;
`;
