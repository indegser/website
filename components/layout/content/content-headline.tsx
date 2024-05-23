import { PageContainer } from '@/components/atoms/Container';
import { ContentBlur } from './content-blur';
import { ContentCover } from './content-cover';

import { notionApi } from '@/lib/notion/notion.api';
import { notionUtils } from '@/lib/utils/notion';
import { Balancer } from 'components/Balancer';

interface Props {
  id: string;
}

export const ContentHeadline = async (props: Props) => {
  const { cover, properties } = await notionApi.retrievePage(props.id);
  const title = notionUtils.getPlainText(properties.Title);
  const excerpt = notionUtils.getPlainText(properties.Description);
  const coverUrl = notionUtils.getNotionFileUrl(cover);

  return (
    <div>
      {cover ? (
        <section className="relative mb-8 aspect-[2/3] overflow-hidden md:aspect-video">
          <ContentCover src={coverUrl!} alt={title} />
          <div className="relative flex h-full items-end">
            <div className="relative h-1/3 w-full md:h-1/4">
              <ContentBlur />
              <PageContainer>
                <h1 className="my-0 mt-2 -skew-x-12 break-keep text-2xl font-black leading-none md:text-3xl">
                  <Balancer>
                    <span className="bg-white px-2 py-1 text-gray-950">
                      {title}
                    </span>
                  </Balancer>
                </h1>
                <div className="relative flex flex-col gap-4 pt-5">
                  <div className="relative line-clamp-2 flex h-full items-end text-sm text-gray-100 text-opacity-90 md:text-base">
                    {excerpt}
                  </div>
                </div>
              </PageContainer>
            </div>
          </div>
        </section>
      ) : null}
    </div>
  );
};
