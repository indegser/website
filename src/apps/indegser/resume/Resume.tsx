import { useTrans } from "../Indegser.hooks";
import {
  ResumeSection,
  ResumeSectionTitle,
  ResumeContent,
} from "./Resume.styled";
import Tech from "./Tech";
import Bio from "./Bio";
import Works from "./Works";

const Resume = () => {
  return (
    <div>
      <Bio />
      <ResumeSection>
        <ResumeSectionTitle>{useTrans("works")}</ResumeSectionTitle>
        <ResumeContent>
          <Works />
        </ResumeContent>
      </ResumeSection>
      <ResumeSection>
        <ResumeSectionTitle>{useTrans("tech")}</ResumeSectionTitle>
        <ResumeContent>
          <Tech />
        </ResumeContent>
      </ResumeSection>
    </div>
  );
};

export default Resume;
