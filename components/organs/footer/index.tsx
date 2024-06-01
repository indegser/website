import { SnsList } from './sns-list';

import { PageContainer } from '@/components/atoms/container';

export const Footer = () => {
  return (
    <footer className="mt-8 pb-12 pt-4">
      <PageContainer>
        <div className="grid auto-cols-max items-center justify-center gap-2 sm:grid-flow-col sm:gap-5">
          <div className="text-sm font-medium text-muted-foreground">
            Indegser. Designer at Seoul, South Korea.
          </div>
          <SnsList />
        </div>
      </PageContainer>
    </footer>
  );
};
