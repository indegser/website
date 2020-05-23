import styled from "@emotion/styled";
import { ResumeContentHeading } from "./Resume.styled";
import { useTrans } from "../Indegser.hooks";
import { mq } from "common/theme";

const Layout = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 24px;

  ${mq("md")} {
    grid-template-columns: 1fr;
  }
`;

const Biography = styled.div`
  margin: 0;
  grid-column: 1 / 3;
  padding-right: 2rem;
`;

const Bio = () => {
  return (
    <Layout>
      <Biography
        dangerouslySetInnerHTML={{ __html: useTrans("biography") as string }}
      />
      <div>
        <ResumeContentHeading>{useTrans("contact")}</ResumeContentHeading>
        <div>indegser@gmail.com</div>
        <ResumeContentHeading>{useTrans("location")}</ResumeContentHeading>
        <div>Seoul, South Korea</div>
        <ResumeContentHeading>{useTrans("education")}</ResumeContentHeading>
        <div>Industrial Design</div>
      </div>
    </Layout>
  );
};

export default Bio;
