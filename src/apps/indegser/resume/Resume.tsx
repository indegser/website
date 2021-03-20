import { ResumeSectionBorder } from "./Resume.styled";
import Tech from "./Tech";
import Bio from "./Bio";
import Works from "./Works";

const Resume = () => {
  return (
    <div>
      <Bio />
      <ResumeSectionBorder />
      <Works />
      <ResumeSectionBorder />
      <Tech />
    </div>
  );
};

export default Resume;
