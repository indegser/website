import Image from 'next/image';
import Link from 'next/link';
import { Balancer } from 'react-wrap-balancer';

import { PageContainer } from 'components/atoms/Container';
import { Time } from 'components/atoms/Time';
import { getLikedVideos } from 'lib/youtube';

export const Collections = async () => {
  const response = await getLikedVideos();

  return (
    <PageContainer>
      <div className="pt-8">
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-gray-100">
          Youtube
        </h1>
      </div>
      <div className="grid grid-cols-1 gap-8 py-8 sm:grid-cols-3">
        {response.data.items.map(({ id, snippet }) => {
          if (!snippet) return null;

          const { title, thumbnails, publishedAt } = snippet;
          const cover = thumbnails.maxres || thumbnails.standard;
          const href = `https://www.youtube.com/watch?v=${id}`;

          return (
            <section key={id} className="grid auto-rows-max gap-3">
              <Link href={href}>
                <div className="relative aspect-video">
                  <Image src={cover.url} alt={title} fill />
                </div>
              </Link>
              <div className="grid gap-2">
                <Link href={href}>
                  <div className="grid gap-1">
                    <div className="m-0 font-semibold leading-tight text-gray-900 dark:text-gray-400">
                      <Balancer>{title}</Balancer>
                    </div>
                    <div className="grid grid-flow-col auto-rows-max items-center gap-x-3">
                      <div className="text-xs leading-none text-gray-600 dark:text-gray-500">
                        <Time date={publishedAt} template="LL" />
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            </section>
          );
        })}
      </div>
    </PageContainer>
  );
};
