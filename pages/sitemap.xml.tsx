import { GetServerSideProps } from "next";

const content = `
<?xml version="1.0" encoding="utf-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://www.indegser.com/</loc>
  </url>
</urlset>
`.trim();

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  res.setHeader("Content-Type", "text/xml");
  res.write(content);
  res.end();

  return { props: {} };
};

function SitemapPage() {
  return null;
}

export default SitemapPage;
