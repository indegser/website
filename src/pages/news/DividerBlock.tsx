import { PageContent } from "@src/common/atoms/Container";
import { styled, theme } from "@src/common/stitches.config";

export const DividerBlock = () => {
  return (
    <PageContent>
      <Divider />
    </PageContent>
  );
};

const Divider = styled("div", {
  height: 1,
  borderBottom: `1px solid ${theme.colors.gray5}`,
});
