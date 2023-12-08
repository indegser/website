import {
  IndexPage,
  preloadIndex,
} from '@/components/layout/database/index-page';

export const revalidate = 60;

export default function Page() {
  preloadIndex();
  return <IndexPage />;
}
