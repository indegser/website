import { GetServerSideProps } from 'next';

import { journalApi } from '@src/apis/journal';
import { ORIGIN } from '@src/types/constants';
import { JournalPageType } from '@src/types/notion';

const generateSitemap = (journals: JournalPageType[]) =>
  `
<?xml version="1.0" encoding="utf-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://www.indegser.com</loc>
  </url>
  ${journals
    .map(({ id }) => {
      return `
    <url>
        <loc>${`${ORIGIN}/content/${id}`}</loc>
    </url>
  `;
    })
    .join('')}
</urlset>
`.trim();

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const { results } = await journalApi.queryJournalDatabase({ page_size: 100 });

  res.setHeader('Content-Type', 'text/xml');
  res.write(generateSitemap(results));
  res.end();

  return { props: {} };
};

function SitemapPage() {}

export default SitemapPage;
