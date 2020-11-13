import HashLink from "common/atoms/link/HashLink";
import styled from "@emotion/styled";
import { COLORS } from "common/theme";

const Box = styled.span`
  text-decoration: none;

  a {
    color: ${COLORS.textBlack};
    text-decoration: none;
    &:hover {
      color: ${COLORS.linkPrimary};
      fill: ${COLORS.linkPrimary};
    }
  }
`;

const TocLink = (props) => {
  return (
    <Box>
      <HashLink {...props}>{props.children}</HashLink>
    </Box>
  );
};

export default TocLink;
