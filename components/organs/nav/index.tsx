import Link from 'next/link';

import { LogoIcon } from './logo-icon';

import { PageContainer } from 'components/atoms/Container';

export const Nav = () => {
  return (
    <div className="sticky top-0 z-10 bg-background/90 backdrop-blur-sm">
      <PageContainer>
        <nav className="grid auto-cols-max grid-flow-col items-center gap-x-8 py-3">
          <Link href="/" passHref>
            <div className="flex items-center text-sm font-semibold text-foreground !text-opacity-90">
              <LogoIcon />
              Indegser
            </div>
          </Link>
        </nav>
      </PageContainer>
    </div>
  );
};
