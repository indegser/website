import Toc from "./toc/Toc";
import Markdown from "common/organs/markdown/Markdown";
import SEO from "common/SEO";
import { Issue } from "global.types";
import { useIssueSEO } from "./Issue.hooks";
import { Container } from "common/atoms/Container";
import styled from "@emotion/styled";
import { IssueContent } from "./IssueContent";

interface Props {
  issue: Issue;
}

const Layout = styled.div`
  max-width: 900px;
  width: 100%;
  padding: 0 92px;
  box-sizing: border-box;
`;

const IssuePage: React.FC<Props> = ({ issue }) => {
  const { image, description } = useIssueSEO(issue.body);

  return (
    <>
      <SEO title={issue.title} image={image} description={description} />
      <Container>
        <Layout>
          <IssueContent issue={issue} />
          <Markdown children={issue.body} />
        </Layout>
      </Container>
    </>
  );
};

export default IssuePage;
