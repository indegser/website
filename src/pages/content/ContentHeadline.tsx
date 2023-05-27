import Balancer from 'react-wrap-balancer';

import { useJournalMetadata } from './ContentPage.hooks';

import { PageContent } from '@src/design/atoms/Container';
import { SEO } from '@src/design/atoms/SEO';
import { Time } from '@src/design/atoms/Time';

interface Props {
  id: string;
}

export const ContentHeadline = (props: Props) => {
  const { title, description, image, lastEditedTime } = useJournalMetadata(
    props.id
  );

  return (
    <section className="mb-4 pb-1 pt-4 sm:mb-2 sm:pt-2">
      <SEO title={title} description={description} image={image} />
      <PageContent>
        <div className="grid gap-x-3 pb-3 sm:pb-2">
          <div className="text-sm text-gray-700">
            <Time date={lastEditedTime} template="LLL" />
          </div>
        </div>
        <h1 className="my-0 text-4xl font-extrabold leading-tight sm:text-5xl sm:leading-tight">
          <Balancer>{title}</Balancer>
        </h1>
      </PageContent>
    </section>
  );
};
