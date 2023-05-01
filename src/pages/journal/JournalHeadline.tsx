import { styled } from '@stitches/react';
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
    return dayjs(lastEditedTime).locale('en').format('MMMM D, YYYY');
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

const Section = styled('section', {
  padding: '50px 0 10px',
  marginBottom: '40px',

  [mq('sm')]: {
    paddingTop: 30,
    marginBottom: 20,
  },
});

const Metadata = styled('div', {
  display: 'grid',
  gridAutoFlow: 'column',
  gridAutoColumns: 'max-content',
  gridGap: '0 12px',
  alignItems: 'center',
  paddingBottom: 12,
  userSelect: 'none',

  [mq('sm')]: {
    paddingBottom: 6,
  },
});

const Title = styled('h1', {
  margin: 0,
  fontWeight: 800,
  fontSize: 48,
  letterSpacing: `-0.025em`,
  lineHeight: 1.15,
  color: theme.colors.gray12,
  wordBreak: 'keep-all',

  [mq('sm')]: {
    fontSize: 36,
    letterSpacing: '-0.015em',
  },
});

const Property = styled('div', {
  fontSize: 14,
  fontWeight: 500,
  color: theme.colors.gray11,
});
