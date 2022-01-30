import { Logo } from "./Logo";
import Link from "next/link";
import { styled } from "common/stitches.config";

export const Nav = () => {
  return (
    <Layout id="global-nav">
      <Link href="/" passHref>
        <a title="home">
          <Heading>
            <Logo />
            Indegser
          </Heading>
        </a>
      </Link>
    </Layout>
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
  padding: "0 16px",
  height: 45,
  fontSize: 14,
  fontWeight: 600,
  cursor: "pointer",
});
