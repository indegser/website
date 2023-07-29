import { IndexPage, preloadIndex } from '@src/apps/index/IndexPage';

export const revalidate = 60;

export default function Page() {
  preloadIndex();
  return <IndexPage />;
}
