import { Row } from "common/atoms/Row";
import { styled, theme } from "common/stitches.config";
import { mq } from "common/theme";
import Link from "next/link";
import { HiOutlinePlus } from "react-icons/hi";

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

const Container = styled("div", {
  marginTop: 2,
  paddingTop: 2,
  borderTop: `1px solid ${theme.colors.borderMuted}`,
});

const Button = styled("div", {
  color: theme.colors.fgSubtle,
  display: "grid",
  gridAutoFlow: "column",
  gap: 4,
  alignItems: "center",
  fontSize: 14,
  fontWeight: 450,

  [mq("sm")]: {
    height: 30,
    display: "flex",
  },
});
