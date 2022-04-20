import { Sns } from "./Sns";

import { PageContainer } from "@src/design/atoms/Container";
import { mq } from "@src/design/theme/mediaQueries";
import { styled, theme } from "@src/design/theme/stitches.config";

export const Footer = () => {
  return (
    <FooterBox>
      <PageContainer>
        <Layout>
          <Name>Indegser. Designer at Seoul, South Korea.</Name>
          <Sns />
        </Layout>
      </PageContainer>
    </FooterBox>
  );
};

const FooterBox = styled("footer", {
  marginTop: 32,
  padding: "16px 0 48px 0",
});

const Layout = styled("div", {
  display: "grid",
  gridAutoColumns: "max-content",
  gridGap: "0 20px",
  alignItems: "center",
  gridTemplateAreas: `"name sns"`,

  [mq("md")]: {
    gridGap: "12px 0",
    justifyContent: "center",
    gridTemplateAreas: `"sns" "name"`,
  },
});

const Name = styled("div", {
  fontSize: 13,
  fontWeight: 500,
  color: theme.colors.gray10,
  gridArea: "name",
});
