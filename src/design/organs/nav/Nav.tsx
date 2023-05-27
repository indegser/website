import Link from 'next/link';

import { Logo } from './Logo';

import { PageContainer } from '@src/design/atoms/Container';

export const Nav = () => {
  return (
    <div className="sticky top-0 z-10 bg-backdrop backdrop-blur-md">
      <PageContainer>
        <nav className="flex items-center justify-between py-3">
          <Link href="/" passHref>
            <div className="flex items-center pr-4 text-sm font-semibold">
              <Logo />
              Indegser
            </div>
          </Link>
        </nav>
      </PageContainer>
    </div>
  );
};
