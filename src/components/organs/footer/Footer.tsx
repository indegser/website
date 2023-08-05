import { Sns } from './Sns';

import { PageContainer } from '@src/components/atoms/Container';

export const Footer = () => {
  return (
    <footer className="mt-8 pb-12 pt-4">
      <PageContainer>
        <div className="grid auto-cols-max items-center justify-center gap-2 sm:grid-flow-col sm:gap-5">
          <div className="text-sm font-medium text-gray-500">
            Indegser. Designer at Seoul, South Korea.
          </div>
          <Sns />
        </div>
      </PageContainer>
    </footer>
  );
};
