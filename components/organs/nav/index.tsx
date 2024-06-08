import Link from 'next/link';

import { LogoIcon } from './logo-icon';

import { PageContainer } from '@/components/atoms/page-container';
import { Auth } from './auth';

export const Nav = () => {
  return (
    <div className="sticky top-0 z-10 border-b border-muted bg-background/90 backdrop-blur-sm">
      <PageContainer>
        <nav className="flex h-[50px] w-full items-center justify-between">
          <Link href="/" passHref>
            <div className="flex items-center text-sm font-semibold text-foreground !text-opacity-90">
              <LogoIcon />
              Indegser
            </div>
          </Link>
          <Auth />
        </nav>
      </PageContainer>
    </div>
  );
};
