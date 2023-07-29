import { IndexPage, preloadIndex } from '@src/pages/index/IndexPage';

export const revalidate = 60;

export default function Page() {
  preloadIndex();
  return <IndexPage />;
}
