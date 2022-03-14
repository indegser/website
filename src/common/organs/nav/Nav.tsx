import Link from "next/link";

import { Logo } from "./Logo";

import { PageContainer } from "@src/common/atoms/Container";
import { styled, theme } from "@src/common/stitches.config";
import { useThemeStore } from "@src/design/themeStore";

export const Nav = () => {
  const theme = useThemeStore((s) => s.theme);
  const toggleTheme = useThemeStore((s) => s.toggleTheme);

  return (
    <PageContainer>
      <Layout id="global-nav">
        <Link href="/" passHref>
          <a title="home">
            <Heading>
              <Logo />
              Indegser
            </Heading>
          </a>
        </Link>
        <button onClick={() => toggleTheme()}>{theme}</button>
      </Layout>
    </PageContainer>
  );
};

const Layout = styled("nav", {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  paddingTop: 4,
});

const Heading = styled("div", {
  display: "flex",
  alignItems: "center",
  padding: "0 16px 0 0",
  height: 45,
  fontSize: 14,
  fontWeight: 600,
  cursor: "pointer",
  color: theme.colors.gray12,
});
