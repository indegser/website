import styled from "@emotion/styled";
import { Row } from "common/atoms/Row";
import Link from "next/link";
import { HiOutlinePlus } from "react-icons/hi";
import { colors } from "types/style.types";
export const CreateNew = () => {
  return (
    <Container>
      <Link href="/newsroom" passHref>
        <a>
          <Row>
            <Button>
              <HiOutlinePlus />
              새로 만들기
            </Button>
          </Row>
        </a>
      </Link>
    </Container>
  );
};

const Container = styled.div`
  margin-top: 2px;
  padding-top: 2px;
  border-top: 1px solid ${colors.gray70};
`;

const Button = styled.div`
  color: ${colors.gray400};
  display: grid;
  grid-auto-flow: column;
  gap: 4px;
  align-items: center;
  font-size: 14px;
  font-weight: 450;
`;
