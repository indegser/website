import styled from '@emotion/styled';
import dayjs from 'dayjs';
import { useMemo } from 'react';
import Balancer from 'react-wrap-balancer';

import { useJournalMetadata } from './JournalPage.hooks';

import { PageContent } from '@src/design/atoms/Container';
import { SEO } from '@src/design/atoms/SEO';
import { mq } from '@src/design/theme/mediaQueries';
import { theme } from '@src/design/theme/stitches.config';

interface Props {
  id: string;
}

export const JournalHeadline = (props: Props) => {
  const { title, description, image, lastEditedTime } = useJournalMetadata(
    props.id
  );

  const formattedLastEditedTime = useMemo(() => {
    return dayjs(lastEditedTime).format('LLL');
  }, [lastEditedTime]);

  return (
    <Section>
      <SEO title={title} description={description} image={image} />
      <PageContent>
        <Metadata>
          <Property>{formattedLastEditedTime}</Property>
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
  margin: 0;
  font-weight: 800;
  font-size: 48px;
  letter-spacing: -0.025em;
  line-height: 1.15;
  color: #000;
  word-break: keep-all;

  ${mq('sm')} {
    font-size: 36px;
    letter-spacing: -0.015em;
  }
`;

const Property = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: ${theme.colors.gray11.computedValue};
`;
