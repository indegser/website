import { ResumeSectionBorder } from "./Resume.styled";
import Tech from "./Tech";
import Bio from "./Bio";
import Works from "./Works";
import General from "./General";

const Resume = () => {
  return (
    <>
      <General />
      <Bio />
      <ResumeSectionBorder />
      <Works />
      <ResumeSectionBorder />
      <Tech />
    </>
  );
};

export default Resume;
