import { Metadata } from 'next';

import { IndexPage, preloadIndex } from '@src/pages/index/IndexPage';

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Indegser',
  };
}

export default async function Page() {
  preloadIndex();
  return <IndexPage />;
}
