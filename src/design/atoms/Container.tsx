import { HTMLProps } from 'react';

export const PageContainer = (props: HTMLProps<HTMLDivElement>) => {
  return <div className="mx-auto box-content max-w-5xl px-5" {...props} />;
};

export const PageContent = (props: HTMLProps<HTMLDivElement>) => {
  return <div className="mx-auto max-w-2xl" {...props} />;
};
