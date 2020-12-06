import styled from "@emotion/styled";
import { ResumeContentHeading } from "./Resume.styled";

const Box = styled.div`
  column-count: 3;

  & > div {
    break-inside: avoid;
  }
`;

const TechList = styled.ul`
  margin: 0;
  padding: 0;
  margin-left: 20px;
`;

const TechItem = styled.li`
  line-height: 1.4;
  margin-top: 0.4em;
`;

const Tech = () => {
  return (
    <Box>
      <div>
        <ResumeContentHeading>Front-End</ResumeContentHeading>
        <TechList>
          <TechItem>HTML, CSS, JS</TechItem>
          <TechItem>React, Typescript</TechItem>
          <TechItem>Node JS</TechItem>
          <TechItem>Webpack, Jest</TechItem>
        </TechList>
      </div>
      <div>
        <ResumeContentHeading>Design</ResumeContentHeading>
        <TechList>
          <TechItem>Figma</TechItem>
          <TechItem>Sketch</TechItem>
          <TechItem>Photoshop</TechItem>
          <TechItem>AfterEffects</TechItem>
        </TechList>
      </div>
      <div>
        <ResumeContentHeading>Extra</ResumeContentHeading>
        <TechList>
          <TechItem>NextJS</TechItem>
          <TechItem>AWS</TechItem>
          <TechItem>Docker</TechItem>
          <TechItem>Github Actions</TechItem>
        </TechList>
      </div>
    </Box>
  );
};

export default Tech;
