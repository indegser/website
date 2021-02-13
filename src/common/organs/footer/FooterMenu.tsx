import styled from "@emotion/styled";
import Link from "next/link";
import { colors } from "style.types";

const Links = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 18px;
  position: relative;
`;

const LinkText = styled.a`
  font-size: 12px;
  cursor: default;
  padding: 8px 0;
  color: ${colors.textLightGrey};
  display: flex;
  align-items: center;

  &:hover {
    color: ${colors.textGrey};
  }
`;

const FooterMenu = () => {
  return (
    <Links>
      <Link href="/indegser">
        <LinkText>Resume</LinkText>
      </Link>
      <Link href="/indegser/portfolio">
        <LinkText>Portfolio</LinkText>
      </Link>
    </Links>
  );
};

export default FooterMenu;
