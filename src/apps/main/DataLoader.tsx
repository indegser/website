import styled from "@emotion/styled";
import { Row } from "common/atoms/Row";
import { mq } from "common/theme";
import { useEffect } from "react";
import { ComponentProps } from "react";
import { HiOutlineArrowDown } from "react-icons/hi";
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
        <Row role="button" tabIndex={0}>
          <Button>
            <HiOutlineArrowDown />
            <ButtonStrong>{pageSize}개 더</ButtonStrong>
            {" 불러오기"}
          </Button>
        </Row>
      </Desktop>
      <Mobile ref={ref} />
    </Container>
  );
};

const Container = styled.div`
  &:last-child {
    margin-top: 2px;
    padding-top: 2px;
    border-top: 1px solid ${colors.gray70};
  }
`;

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
  display: flex;
  align-items: center;
  font-size: 14px;
  color: ${colors.gray400};
`;

const ButtonStrong = styled.strong`
  font-weight: normal;
  color: ${colors.gray800};
  margin: 0 4px 0 4px;
`;
