import { GetServerSideProps } from "next";

const content = `
<?xml version="1.0" encoding="utf-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://indegser.com/</loc>
  </url>
  <url>
    <loc>https://indegser.com/indegser</loc>
  </url>
  <url>
    <loc>https://indegser.com/indegser/portfolio</loc>
  </url>
</urlset>
`.trim();

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  res.setHeader("Content-Type", "text/xml");
  res.write(content);
  res.end();

  return { props: {} };
};

export default () => {};
