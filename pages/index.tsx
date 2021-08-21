import { GetStaticProps } from "next";
import githubApi from "apis/github";
import { IssuesPage } from "apps/issues/IssuesPage";

export const getStaticProps: GetStaticProps = async (context) => {
  try {
    const issues = await githubApi.getIssues();
    return { props: { issues }, revalidate: 60 }; // 1min.
  } catch (err) {
    console.warn(err);
    return { props: {} };
  }
};

export default IssuesPage;
