import styled from "@emotion/styled";
import { mq } from "common/theme";
import { spacingVariables } from "common/variables";

export const PageContainer = styled.div`
  max-width: 1040px;
  margin: 0 auto;
  box-sizing: border-box;
  padding: 48px var(${spacingVariables.pagePadding});

  ${mq("sm")} {
    padding-top: 24px;
  }
`;

export const MarkdownContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;

  ${mq("md")} {
    width: calc(100vw - 2 * var(${spacingVariables.pagePadding}));
  }
`;
