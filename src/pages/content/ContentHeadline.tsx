import styled from '@emotion/styled';
import Balancer from 'react-wrap-balancer';

import { useJournalMetadata } from './ContentPage.hooks';

import { PageContent } from '@src/design/atoms/Container';
import { SEO } from '@src/design/atoms/SEO';
import { Time } from '@src/design/atoms/Time';
import { mq } from '@src/design/mediaQueries';
import { theme } from '@src/design/theme';

interface Props {
  id: string;
}

export const ContentHeadline = (props: Props) => {
  const { title, description, image, lastEditedTime } = useJournalMetadata(
    props.id
  );

  return (
    <Section>
      <SEO title={title} description={description} image={image} />
      <PageContent>
        <Metadata>
          <Property>
            <Time date={lastEditedTime} template="LLL" />
          </Property>
        </Metadata>
        <Balancer>
          <Title>{title}</Title>
        </Balancer>
      </PageContent>
    </Section>
  );
};

const Section = styled.section`
  padding: 50px 0 10px;
  margin-bottom: 40px;

  ${mq('sm')} {
    padding-top: 30px;
    margin-bottom: 20px;
  }
`;

const Metadata = styled.div`
  display: grid;
  grid-gap: 0 12px;
  padding-bottom: 12px;

  ${mq('sm')} {
    padding-bottom: 6px;
  }
`;

const Title = styled.h1`
  font-size: 45.29px;

  margin: 0;
  font-weight: 900;
  line-height: 1.25;
  color: ${theme.colors.body.computedValue};
  word-break: keep-all;

  ${mq('md')} {
    font-size: 38.25px;
  }
`;

const Property = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: ${theme.colors.gray11.computedValue};
`;
