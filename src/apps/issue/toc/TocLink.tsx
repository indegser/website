import HashLink from "common/atoms/link/HashLink";
import Icon, { IconVariant } from "common/atoms/icons/Icon";
import styled from "@emotion/styled";

const LinkIcon = styled.span`
  margin-left: 6px;
  display: inline-flex;
  transform: translateY(1px);
`;

const Box = styled.span`
  text-decoration: none;

  a {
    color: var(--text400);
    text-decoration: none;
    &:hover {
      color: var(--primary100);
      fill: var(--primary100);
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
// <LinkIcon>
//   <Icon variant={IconVariant.link} width={10} height={10} />
// </LinkIcon>

export default TocLink;
