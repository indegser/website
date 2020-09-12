import styled from "@emotion/styled";
import useWhoami from "common/hooks/me/useWhoami";
import Link from "next/link";
import Icon from "common/atoms/icons/Icon";

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
  color: var(--text200);
  font-size: 14px;
  margin-top: 1px;
`;

const Links = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(2, 1fr);
  /* border-top: 1px solid var(--border100); */
  margin-top: 8px;
  position: relative;
`;

const LinkDivider = styled.div`
  position: absolute;
  top: 8px;
  bottom: 8px;
  left: calc(50% - 1px);
  width: 1px;
  background: var(--border100);
`;

const LinkText = styled.a`
  font-size: 13px;
  cursor: default;
  padding: 8px 0;
  color: var(--primary100);
  display: flex;
  align-items: center;

  &:hover {
    color: var(--primary200);
  }
`;

const LinkIcon = styled(Icon)`
  transform: rotate(-90deg);
  fill: currentColor;
  margin-left: 4px;
`;

const Author = () => {
  const author = useWhoami();

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