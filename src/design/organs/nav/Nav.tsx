import Link from 'next/link';

import { IndexNav } from './IndexNav';
import { Logo } from './Logo';

import { PageContainer } from '@src/design/atoms/Container';

export const Nav = () => {
  return (
    <div className="sticky top-0 z-10 bg-backdrop backdrop-blur-md">
      <PageContainer>
        <nav className="grid auto-cols-max grid-flow-col items-center gap-x-8 py-3">
          <Link href="/" passHref>
            <div className="flex items-center text-sm font-semibold">
              <Logo />
              Indegser
            </div>
          </Link>
          {/* @ts-expect-error Async Server Component */}
          <IndexNav />
        </nav>
      </PageContainer>
    </div>
  );
};
