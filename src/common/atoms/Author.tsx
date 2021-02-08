import styled from "@emotion/styled";
import Link from "next/link";
import Icon from "common/atoms/icons/Icon";
import { colors } from "style.types";

const Layout = styled.div`
  max-width: 160px;
`;

const Content = styled.div`
  display: flex;
`;

const Avatar = styled.img`
  display: block;
  width: 32px;
  height: 32px;
  border-radius: 999rem;
  flex: 0 0 auto;
  margin-left: 16px;
`;

const AuthorInfo = styled.div`
  flex: 1 1;
`;

const Name = styled.div`
  font-weight: 500;
  font-size: 15px;
`;

const Nickname = styled.div`
  font-weight: 400;
  color: ${colors.textLightGrey};
  font-size: 14px;
  margin-top: 1px;
`;

const Links = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(2, 1fr);
  margin-top: 8px;
  position: relative;
`;

const LinkText = styled.a`
  font-size: 13px;
  cursor: default;
  padding: 8px 0;
  color: ${colors.linkPrimary};
  display: flex;
  align-items: center;

  &:hover {
    color: ${colors.linkPrimaryHover};
  }
`;

const LinkIcon = styled(Icon)`
  transform: rotate(-90deg);
  fill: currentColor;
  margin-left: 4px;
`;

const Author = () => {
  const author = {
    name: "indegser",
    avatar: "https://avatars3.githubusercontent.com/u/12758512?v=4&s=128",
  };

  return (
    <Layout>
      <Content>
        <AuthorInfo>
          <Name>Jaekwon Han</Name>
          <Nickname>indegser</Nickname>
        </AuthorInfo>
        <Avatar src={author.avatar} />
      </Content>
      <Links>
        <Link href="/indegser">
          <LinkText>
            Resume
            <LinkIcon variant="arrowDown" width={9} />
          </LinkText>
        </Link>
        <Link href="/indegser/portfolio">
          <LinkText>
            Portfolio
            <LinkIcon variant="arrowDown" width={9} />
          </LinkText>
        </Link>
      </Links>
    </Layout>
  );
};

export default Author;
