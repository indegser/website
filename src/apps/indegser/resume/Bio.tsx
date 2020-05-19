import styled from "@emotion/styled";
import { ResumeContentHeading } from "./Resume.styled";
import { useTrans } from "../Indegser.hooks";
import { mq } from "common/theme";

const Layout = styled.div`
  display: grid;
  grid-template-columns: 2fr 1.5fr;
  grid-gap: 32px;

  ${mq("md")} {
    grid-template-columns: 1fr;
  }
`;

const Biography = styled.div`
  margin: 0;
`;

const Bio = () => {
  return (
    <Layout>
      <Biography>{useTrans("biography")}</Biography>
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
