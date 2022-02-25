import { PageContainer } from "common/atoms/Container";
import { mq } from "common/theme";
import { styled, theme } from "common/stitches.config";
import { Sns } from "./Sns";

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
  fontSize: 14,
  color: theme.colors.fgSubtle,
  gridArea: "name",
});
