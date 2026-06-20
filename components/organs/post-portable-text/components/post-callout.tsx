import { Callout } from '@/lib/sanity';
import { PortableText, PortableTextComponentProps } from 'next-sanity';

type PostCalloutProps = PortableTextComponentProps<Callout>;

const toneLabels: Record<Callout['tone'], string> = {
  note: '메모',
  question: '원래 질문',
  warning: '주의',
  takeaway: '핵심',
};

const toneClassNames: Record<Callout['tone'], string> = {
  note: 'border-gray-200 bg-gray-50 text-gray-900 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100',
  question:
    'border-blue-200 bg-blue-50 text-blue-950 dark:border-blue-900 dark:bg-blue-950 dark:text-blue-100',
  warning:
    'border-amber-200 bg-amber-50 text-amber-950 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-100',
  takeaway:
    'border-emerald-200 bg-emerald-50 text-emerald-950 dark:border-emerald-900 dark:bg-emerald-950 dark:text-emerald-100',
};

export function PostCallout({ value }: PostCalloutProps) {
  const tone = value.tone ?? 'note';

  return (
    <aside
      className={`my-6 rounded-md border p-4 ${toneClassNames[tone]}`}
      data-block-id={value._key}
    >
      <div className="text-heading-14 mb-3">
        {value.title || toneLabels[tone]}
      </div>
      <PortableText
        value={value.body ?? []}
        components={{
          list: {
            bullet: ({ children }) => (
              <ul className="mb-3 list-disc pl-5 last:mb-0">{children}</ul>
            ),
            number: ({ children }) => (
              <ol className="mb-3 list-decimal pl-5 last:mb-0">{children}</ol>
            ),
          },
          listItem: {
            bullet: ({ children }) => (
              <li className="text-copy-14 mb-1 break-keep">{children}</li>
            ),
            number: ({ children }) => (
              <li className="text-copy-14 mb-1 break-keep">{children}</li>
            ),
          },
          block: {
            normal: ({ children }) => (
              <p className="text-copy-14 mb-3 break-keep last:mb-0">
                {children}
              </p>
            ),
            blockquote: ({ children }) => (
              <blockquote className="text-copy-14 mb-3 border-l border-current pl-3 last:mb-0">
                {children}
              </blockquote>
            ),
          },
          marks: {
            code: ({ children }) => (
              <code className="rounded-sm bg-white/70 px-1 py-0.5 font-mono text-[0.85em] dark:bg-black/30">
                {children}
              </code>
            ),
          },
        }}
      />
    </aside>
  );
}
