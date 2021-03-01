import useSWR from "swr";
import styled from "@emotion/styled";
import githubApi from "apis/github";
import { mq } from "common/theme";
import IssueMarquee from "./Marquee";
import { colors } from "style.types";
import { useRouter } from "next/router";

const Container = styled.div`
  position: relative;
  grid-column: span 6;

  ${mq("md")} {
    grid-column: span 8;
    padding-top: 20px;
  }
`;

const Heading = styled.div`
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom: 4px solid ${colors.textBlack};
`;

const Label = styled.div`
  font-size: 48px;
  font-weight: 700;
`;

const IssueList = () => {
  const router = useRouter();
  const label = router.query.label?.toString();
  const result = useSWR(
    router.isReady ? ["issues", label] : null,
    githubApi.getIssues
  );

  if (!result.data) return null;

  const contents = result.data.data.map((issue) => (
    <IssueMarquee key={issue.id} issue={issue} />
  ));

  return (
    <Container>
      <Heading>
        <Label>{label || "All"}</Label>
      </Heading>
      {contents}
    </Container>
  );
};

export default IssueList;
