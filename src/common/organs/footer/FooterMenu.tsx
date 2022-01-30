import styled from "@emotion/styled";
import Link from "next/link";
import { colors } from "types/style.types";

const Links = styled.div`
  display: grid;
  grid-template-columns: repeat(3, max-content);
  align-items: center;
  grid-gap: 8px;
  position: relative;
`;

const LinkText = styled.a`
  font-size: 12px;
  padding: 8px 0;
  cursor: pointer;
  color: ${colors.textBlack};
  display: flex;
  align-items: center;

  &:hover {
    text-decoration: underline;
  }
`;

const MidDot = styled.div`
  width: 2px;
  height: 2px;
  border-radius: 999rem;
  background: ${colors.textLiDot};
`;

const FooterMenu = () => {
  return (
    <Links>
      <Link href="/indegser">
        <LinkText>Resume</LinkText>
      </Link>
      <MidDot />
      <Link href="/indegser/portfolio">
        <LinkText>Portfolio</LinkText>
      </Link>
    </Links>
  );
};

export default FooterMenu;
