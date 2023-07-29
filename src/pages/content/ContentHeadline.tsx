import { ContentBlur } from './ContentBlur';
import { ContentCover } from './ContentCover';

import { pageApi } from '@src/apis/content';
import { PageContent } from '@src/design/atoms/Container';
import { Balancer } from '@src/design/Balancer';

interface Props {
  id: string;
}

export const preloadPage = (id: string) => {
  void pageApi.getPage(id);
};

export const ContentHeadline = async (props: Props) => {
  const { cover, title, excerpt } = await pageApi.getPage(props.id);

  return (
    <PageContent>
      <div className="pt-8">
        <h1 className="my-0 text-center text-4xl font-bold leading-tight sm:text-5xl sm:leading-tight">
          <Balancer>{title}</Balancer>
        </h1>
      </div>
      <section className="relative -mx-5 my-8 aspect-video overflow-hidden">
        <ContentCover src={cover} alt={title} />
        <div className="relative grid h-full grid-rows-2">
          <div></div>
          <div className="relative">
            <ContentBlur />
            <div className="relative line-clamp-2 flex h-full items-end p-8 pb-4 text-xs text-gray-200/75 sm:pb-8">
              {excerpt}
            </div>
          </div>
        </div>
      </section>
    </PageContent>
  );
};
