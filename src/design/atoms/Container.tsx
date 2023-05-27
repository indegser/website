import { PropsWithChildren } from 'react';

export const PageContainer = (props: PropsWithChildren) => {
  return <div className="mx-auto box-content max-w-5xl px-5" {...props} />;
};

export const PageContent = (props: PropsWithChildren) => {
  return <div className="mx-auto max-w-2xl" {...props} />;
};
