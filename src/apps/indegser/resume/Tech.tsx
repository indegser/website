import styled from "@emotion/styled";
import { colors } from "style.types";
import { useIndegserContext } from "../Indegser.hooks";
import { ResumeContentHeading } from "./Resume.styled";

const Box = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 40px 20px;
`;

const TechList = styled.ul`
  margin: 0;
  padding: 0;
`;

const TechItem = styled.li`
  line-height: 1.4;
  margin-top: 0.6em;
  position: relative;
  padding-left: 24px;
  font-size: 15px;
  list-style: none;
  color: ${colors.textLiDot};

  span {
    color: ${colors.textResume};
    letter-spacing: 0.2px;
  }

  &::before {
    position: absolute;
    left: 0px;
    top: 0px;
    display: inline-block;
    width: 16px;
    content: "•";
    text-align: center;
  }
`;

const Tech = () => {
  const { lang } = useIndegserContext();
  const isEn = lang === "en";

  const section = [
    {
      title: isEn ? "Front-end" : "프론트엔드",
      stacks: ["React, Next.js", "Typescript", "Jest, Zustand, Emotion"],
    },
    {
      title: isEn ? "2D/3D Graphics" : "2D/3D 그래픽",
      stacks: [
        "WebGL, Three.js",
        "SVG, D3.js",
        "React Three Fiber, React Spring",
      ],
    },
    {
      title: "CI/CD",
      stacks: [
        "Vercel, Netlify",
        "K8s, Docker",
        "Github Action, AWS CodePipeline",
      ],
    },
    {
      title: isEn ? "Etc" : "기타",
      stacks: ["Figma"],
    },
  ];
  return (
    <Box>
      {section.map((section, i) => (
        <div key={i}>
          <ResumeContentHeading>{section.title}</ResumeContentHeading>
          <TechList>
            {section.stacks.map((stack) => (
              <TechItem key={stack}>
                <span>{stack}</span>
              </TechItem>
            ))}
          </TechList>
        </div>
      ))}
    </Box>
  );
};

export default Tech;
