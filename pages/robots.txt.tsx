import { GetServerSideProps } from "next";

const content = `
User-agent: *
Disallow: /_next/static/
`.trim();

export const getServerSideProps: GetServerSideProps = async ({ res, req }) => {
  res.setHeader("Content-Type", "text/plain");
  res.write(content);
  res.end();

  return { props: {} };
};

export default () => {};
