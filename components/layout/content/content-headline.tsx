import { ContentBlur } from './content-blur';
import { ContentCover } from './content-cover';

import { Balancer } from 'components/Balancer';
import { pageApi } from 'lib/supabase/page.api';

interface Props {
  id: string;
}

export const ContentHeadline = async (props: Props) => {
  const { data } = await pageApi.getPage(props.id);
  const { cover, title, excerpt } = data!;

  return (
    <div>
      {cover ? (
        <section className="relative mb-8 aspect-[2/3] overflow-hidden md:aspect-video">
          <ContentCover src={cover} alt={title} />
          <div className="relative flex h-full items-end">
            <div className="relative h-1/3 w-full">
              <ContentBlur />
              <div className="relative flex flex-col gap-4 px-5 pt-5">
                <h1 className="my-0 break-keep text-2xl font-black leading-none">
                  <Balancer>
                    <span className="bg-white px-2 py-1 text-gray-950 mix-blend-lighten">
                      {title}
                    </span>
                  </Balancer>
                </h1>
                <div className="relative line-clamp-2 flex h-full items-end text-sm text-gray-100 text-opacity-90">
                  {excerpt}
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : null}
    </div>
  );
};
