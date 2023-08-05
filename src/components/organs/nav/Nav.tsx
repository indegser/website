import Link from 'next/link';

import { Logo } from './Logo';

import { PageContainer } from '@src/components/atoms/Container';

export const Nav = () => {
  return (
    <div className="sticky top-0 z-10 bg-gray-100 !bg-opacity-90 backdrop-blur-md dark:bg-gray-900">
      <PageContainer>
        <nav className="grid auto-cols-max grid-flow-col items-center gap-x-8 py-3">
          <Link href="/" passHref>
            <div className="flex items-center text-sm font-semibold text-gray-900 !text-opacity-90 dark:text-gray-300">
              <Logo />
              Indegser
            </div>
          </Link>
        </nav>
      </PageContainer>
    </div>
  );
};
