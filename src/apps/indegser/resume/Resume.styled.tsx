import styled from "@emotion/styled";
import { mq } from "common/theme";

export const ResumeGrid = styled.div`
  column-count: 2;
  column-gap: 40px;

  ${mq("md")} {
    column-count: 1;
  }
`;

export const ResumeSection = styled.div`
  position: relative;
  padding-top: 3em;
  padding-bottom: 3em;
  display: grid;
  grid-auto-flow: column;
  grid-gap: 0 40px;
  grid-template-columns: 0.9fr 4fr;

  &:first-of-type {
    border-color: transparent;
  }

  ${mq("sm")} {
    grid-template-columns: 1fr;
    grid-auto-flow: row;
    grid-gap: 40px;
  }
`;

export const ResumeSectionBorder = styled.div`
  margin: 40px 0;
  width: 100%;
`;

export const ResumeSectionTitle = styled.h2`
  font-weight: 600;
  margin: 0;
`;

export const ResumeContent = styled.div`
  font-size: 17px;
  line-height: 1.8;
`;

export const ResumeContentHeading = styled(ResumeContent)`
  font-weight: 600;
`;
