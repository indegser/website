import Toc from "./toc/Toc";
import Headline from "./Headline";
import Markdown from "common/organs/markdown/Markdown";
import SEO from "common/SEO";
import { Issue } from "global.types";
import { useIssueSEO } from "./Issue.hooks";
import { Container } from "common/atoms/Container";
import styled from "@emotion/styled";

interface Props {
  issue: Issue;
}

const Layout = styled.div`
  grid-column: span 8;
`;

const IssuePage: React.FC<Props> = ({ issue }) => {
  const { image, description } = useIssueSEO(issue.body);

  return (
    <>
      <SEO title={issue.title} image={image} description={description} />
      <Container>
        <Layout>
          <Headline issue={issue} />
          <Toc content={issue.body} />
          <Markdown source={issue.body} />
        </Layout>
      </Container>
    </>
  );
};

export default IssuePage;
