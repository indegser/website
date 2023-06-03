import { pageApi } from '@src/apis/content';
import { PageContent } from '@src/design/atoms/Container';
import { Time } from '@src/design/atoms/Time';
import { Balancer } from '@src/design/Balancer';
import { notionUtils } from '@src/utils/notion';

interface Props {
  id: string;
}

export const preloadPage = (id: string) => {
  void pageApi.getPage(id);
};

export const ContentHeadline = async (props: Props) => {
  const page = await pageApi.getPage(props.id);

  return (
    <section className="mb-4 pb-1 pt-4 sm:mb-2 sm:pt-2">
      <PageContent>
        <div className="grid gap-x-3 pb-3 sm:pb-2">
          <div className="text-sm text-gray-700">
            <Time date={page.last_edited_time} template="LLL" />
          </div>
        </div>
        <h1 className="my-0 text-4xl font-extrabold leading-tight sm:text-5xl sm:leading-tight">
          <Balancer>{notionUtils.getTitle(page)}</Balancer>
        </h1>
      </PageContent>
    </section>
  );
};
