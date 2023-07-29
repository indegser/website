import { ContentBlur } from './ContentBlur';
import { ContentCover } from './ContentCover';

import { pageApi } from '@src/apis/content';
import { Time } from '@src/design/atoms/Time';
import { Balancer } from '@src/design/Balancer';
import { getNotionFileUrl, notionUtils } from '@src/utils/notion';

interface Props {
  id: string;
}

export const preloadPage = (id: string) => {
  void pageApi.getPage(id);
};

export const ContentHeadline = async (props: Props) => {
  const page = await pageApi.getPage(props.id);
  const cover = getNotionFileUrl(page.cover);
  const title = notionUtils.getTitle(page);

  return (
    <section className="relative mb-4 aspect-video overflow-hidden">
      <ContentCover src={cover} alt={title} />
      <div className="relative flex h-full flex-col">
        <div className="flex-auto"></div>
        <div className="relative flex-auto">
          <ContentBlur />
          <div className="relative flex h-full flex-col items-center justify-center px-4">
            <h1 className="my-0 text-center text-2xl font-bold leading-tight text-gray-50 sm:text-5xl sm:leading-tight">
              <Balancer>{title}</Balancer>
            </h1>
            <div className="grid gap-x-3 pb-3 sm:pb-2">
              <div className="text-sm text-gray-300">
                <Time date={page.last_edited_time} template="LLL" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
