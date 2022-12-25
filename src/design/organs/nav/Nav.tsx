import Link from "next/link";

import { Logo } from "./Logo";
import { Theme } from "./Theme";

import { PageContainer } from "@src/design/atoms/Container";
import { styled, theme } from "@src/design/theme/stitches.config";

export const Nav = () => {
  return (
    <PageContainer>
      <Layout id="global-nav">
        <Link href="/" passHref>
          <Heading>
            <Logo />
            Indegser
          </Heading>
        </Link>
        <Theme />
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
