import { IndexPage, preloadIndex } from 'components/layout/index/IndexPage';

export const revalidate = 60;

export default function Page() {
  preloadIndex();
  return <IndexPage />;
}
