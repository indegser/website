import { cn } from '@/lib/utils';
import { HTMLProps } from 'react';

export const PageContainer = ({
  className,
  ...props
}: HTMLProps<HTMLDivElement>) => {
  return (
    <div
      className={cn(
        'mx-auto box-content max-w-5xl overflow-x-hidden px-5',
        className,
      )}
      {...props}
    />
  );
};

export const PageContent = (props: HTMLProps<HTMLDivElement>) => {
  return <div className="mx-auto max-w-2xl" {...props} />;
};
