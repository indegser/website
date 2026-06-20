import { PageContainer } from '@/components/atoms/page-container';

export function DraftStatusBanner() {
  return (
    <PageContainer className="border-b border-amber-200 bg-amber-50 py-4 dark:border-amber-900 dark:bg-amber-950">
      <div className="mx-auto max-w-2xl">
        <p className="text-heading-14 text-amber-950 dark:text-amber-100">
          Draft
        </p>
        <p className="text-copy-13 text-amber-900 dark:text-amber-200">
          This post is a draft. It is directly viewable, hidden from lists, and
          marked noindex.
        </p>
      </div>
    </PageContainer>
  );
}
