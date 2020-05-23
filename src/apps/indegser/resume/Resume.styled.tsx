import styled from "@emotion/styled";
import { mq } from "common/theme";

export const ResumeSection = styled.div`
  position: relative;
  border-top: 1px solid var(--border100);
  padding-top: 3em;
  padding-bottom: 3em;
  display: grid;
  grid-auto-flow: column;
  grid-gap: 0 40px;
  grid-template-columns: 0.9fr 4fr;

  &:first-child {
    border-color: transparent;
  }

  ${mq("sm")} {
    grid-template-columns: 1fr;
    grid-auto-flow: row;
    grid-gap: 40px;
  }
`;

export const ResumeSectionTitle = styled.h2`
  font-weight: 500;
  margin: 0;
`;

export const ResumeContent = styled.div`
  font-size: 17px;
  line-height: 1.8;
`;

export const ResumeContentHeading = styled(ResumeContent)`
  font-weight: 500;
`;
