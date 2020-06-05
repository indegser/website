import styled from "@emotion/styled";
import { mq } from "common/theme";
import { spacingVariables } from "ui/variables";

const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  box-sizing: border-box;
  padding: 0 var(${spacingVariables.pagePadding});
  ${spacingVariables.pagePadding}: 48px;

  ${mq(840)} {
    ${spacingVariables.pagePadding}: 32px;
  }

  ${mq(640)} {
    ${spacingVariables.pagePadding}: 20px;
  }
`;

export default PageContainer;
