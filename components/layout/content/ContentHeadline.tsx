import { ContentBlur } from './ContentBlur';
import { ContentCover } from './ContentCover';

import { Balancer } from 'components/Balancer';
import { PageContent } from 'components/atoms/Container';
import { pageApi } from 'lib/supabase/page.api';

interface Props {
  id: string;
}

export const preloadPage = (id: string) => {
  void pageApi.getPage(id);
};

export const ContentHeadline = async (props: Props) => {
  const { data } = await pageApi.getPage(props.id);
  const { cover, title, excerpt } = data!;

  return (
    <PageContent>
      <div className="pt-8">
        <h1 className="my-0 text-4xl font-black leading-tight text-gray-900 dark:text-gray-100 dark:text-opacity-70 sm:text-6xl sm:leading-none">
          <Balancer>{title}</Balancer>
        </h1>
      </div>
      {cover ? (
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
      ) : null}
    </PageContent>
  );
};
