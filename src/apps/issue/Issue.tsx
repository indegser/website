import SEO from "common/SEO";
import { Issue } from "global.types";
import { useIssueSEO } from "./Issue.hooks";
import { PageContainer } from "common/atoms/Container";
import { IssueContent } from "./IssueContent";

interface Props {
  issue: Issue;
}

const IssuePage: React.FC<Props> = ({ issue }) => {
  const { image, description } = useIssueSEO(issue.body);

  return (
    <>
      <SEO title={issue.title} image={image} description={description} />
      <PageContainer>
        <IssueContent issue={issue} />
      </PageContainer>
    </>
  );
};

export default IssuePage;
