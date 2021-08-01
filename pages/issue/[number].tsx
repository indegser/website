import Error from "next/error";
import { FC } from "react";
import githubApi from "apis/github";
import { Issue } from "global.types";
import IssuePage from "apps/issue/Issue";
import { GetStaticPaths, GetStaticProps } from "next";

interface Props {
  issue: Issue;
}

const Page: FC<Props> = ({ issue }) => {
  if (!issue) {
    return <Error statusCode={404} />;
  }

  return <IssuePage issue={issue} />;
};

export const getStaticPaths: GetStaticPaths = async () => {
  const data = await githubApi.getIssues();
  const paths = data.map((issue) => ({
    params: { number: issue.number.toString() },
  }));

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { number } = params;

  try {
    const { data: issue } = await githubApi.getIssue(
      parseInt(number.toString())
    );
    return { props: { issue }, revalidate: 60 };
  } catch (err) {
    console.log(err);
    return { props: {} };
  }
};

export default Page;
