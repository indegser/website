import styled from "@emotion/styled";
import { mq } from "@src/common/theme";
import { ResumeGrid } from "./Resume.styled";

const Layout = styled(ResumeGrid)`
  padding-top: 32px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);

  ${mq("md")} {
    row-gap: 20px;
    grid-template-columns: repeat(2, 1fr);
  }

  ${mq("sm")} {
    grid-template-columns: 1fr;
  }
`;

const Label = styled.div`
  font-size: 13px;
  margin-bottom: 4px;
`;

const GeneralLink = styled.a``;

const General = () => {
  const columns = [
    {
      key: "Website",
      href: "https://indegser.com",
    },
    {
      key: "Github",
      href: "https://github.com/indegser",
    },
    {
      key: "Email",
      href: "indegser@gmail.com",
    },
    {
      key: "Phone",
      href: "(82)-10-9241-8014",
    },
  ];

  return (
    <Layout>
      {columns.map((column) => {
        const { key, href } = column;
        return (
          <div key={key}>
            <Label>{key}</Label>
            <GeneralLink href={href}>{href}</GeneralLink>
          </div>
        );
      })}
    </Layout>
  );
};

export default General;
