import styled from "@emotion/styled";
import { ResumeContentHeading } from "./Resume.styled";
import { useTrans } from "../Indegser.hooks";
import { mq } from "common/theme";

const Layout = styled.div``;

const Biography = styled.div``;

const BioField = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 20px;
  margin-top: 40px;

  ${mq("md")} {
    grid-template-columns: 1fr;
  }
`;

const Bio = () => {
  const fields = [
    { key: "contact", name: "indegser@gmail.com" },
    { key: "location", name: "서울, 대한민국" },
    { key: "education", name: "산업디자인과" },
  ] as const;

  return (
    <Layout>
      <Biography
        dangerouslySetInnerHTML={{ __html: useTrans("biography") as string }}
      />
      <BioField>
        {fields.map((field) => (
          <div key={field.key}>
            <ResumeContentHeading>{useTrans(field.key)}</ResumeContentHeading>
            <div>{field.name}</div>
          </div>
        ))}
      </BioField>
    </Layout>
  );
};

export default Bio;
