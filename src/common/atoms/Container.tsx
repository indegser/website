import styled from "@emotion/styled";
import { spacingVariables } from "common/variables";

export const Container = styled.div`
  max-width: 1040px;
  margin: 0 auto;
  box-sizing: border-box;
  padding: 0 var(${spacingVariables.pagePadding});
`;

export const LayoutGrid = styled.div`
  display: grid;
  grid-gap: 20px;
  grid-template-columns: repeat(8, 1fr);
`;
