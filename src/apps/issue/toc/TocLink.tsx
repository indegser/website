import HashLink from "common/atoms/link/HashLink";
import styled from "@emotion/styled";
import { colors } from "style.types";

const Box = styled.span`
  text-decoration: none;

  a {
    color: ${colors.textBlack};
    text-decoration: none;
    &:hover {
      color: ${colors.linkPrimary};
      fill: ${colors.linkPrimary};
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
