import styled from "@emotion/styled";
import { colors } from "style.types";
import Theme from "./theme/Theme";
import Logo from "./Logo";
import Emoji from "react-emoji-render";
import { useCategories } from "apps/issues/IssuePage.hooks";
import Link from "next/link";

const Layout = styled.nav`
  flex: 0 0 auto;
  width: 240px;
  height: 100vh;
  background: ${colors.gray50};
`;

const Heading = styled.div`
  display: flex;
  padding: 0 16px;
  height: 45px;
  align-items: center;
  font-size: 14px;
  font-weight: 600;
`;

const Menu = styled.div`
  display: flex;
  align-items: center;
  padding: 2px 14px;
  font-size: 14px;
  min-height: 27px;
  color: ${colors.gray600};
  font-weight: 500;
  cursor: pointer;
  transition: background 20ms ease-in;

  .emoji {
    font-size: 18px;
    line-height: 1;
    margin-right: 10px;
  }

  &:hover {
    background: ${colors.gray100};
  }
`;

const Nav = () => {
  const { data } = useCategories();

  console.log(data);
  return (
    <Layout>
      <Heading>
        <Logo />
        Indegser
      </Heading>
      {data?.map((category) => (
        <div key={category.id}>
          <Link href={`/${category.id}`} passHref>
            <a>
              <Menu>
                <Emoji text={category.emoji} onlyEmojiClassName="emoji" />
                <div>{category.name}</div>
              </Menu>
            </a>
          </Link>
        </div>
      ))}
      <Theme />
    </Layout>
  );
};

export default Nav;
