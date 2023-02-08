import { GetServerSideProps } from 'next';

const content = `
User-agent: *
Disallow: /_next/static/
Sitemap: https://www.indegser.com/sitemap.xml
`.trim();

export const getServerSideProps: GetServerSideProps = async ({ res, req }) => {
  res.setHeader('Content-Type', 'text/plain');
  res.write(content);
  res.end();

  return { props: {} };
};

function RobotsTxtPage() {
  return null;
}

export default RobotsTxtPage;
