import Error from "next/error";
import { FC } from "react";
import githubApi from "apis/github";
import { Issue } from "global.types";
import IssuePage from "apps/issue/Issue";

interface Props {
  issue: Issue;
}

const Page: FC<Props> = ({ issue }) => {
  if (!issue) {
    return <Error statusCode={404} />;
  }

  return <IssuePage issue={issue} />;
};

export async function getStaticPaths() {
  const { data } = await githubApi.getIssues();
  const paths = data.map((issue) => ({
    params: { number: issue.number.toString() },
  }));

  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const { number } = params;

  try {
    const { data: issue } = await githubApi.getIssue(parseInt(number));
    return { props: { issue } };
  } catch (err) {
    return { props: {} };
  }
}

export default Page;
