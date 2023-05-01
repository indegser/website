import { styled } from '@stitches/react';
import dayjs from 'dayjs';
import Link from 'next/link';
import { useMemo } from 'react';
import Balancer from 'react-wrap-balancer';

import { JournalCover } from './JournalCover';

import { Typography } from '@src/design/atoms/Typography';
import { JournalPageType } from '@src/types/notion';
import { getNotionFileUrl, getNotionTitle } from '@src/utils/notion';

import 'dayjs/locale/ko';

interface Props {
  page: JournalPageType;
}

export const Journal = (props: Props) => {
  const {
    page: { id, last_edited_time, properties },
  } = props;

  const formattedLastEditedTime = useMemo(() => {
    return dayjs(last_edited_time).locale('ko').format('YYYY년 MMMM D일');
  }, [last_edited_time]);

  const title = getNotionTitle(properties.Title);

  return (
    <Link href={`/journal/${id}`}>
      <Section>
        <JournalCover src={getNotionFileUrl(props.page.cover)} alt={title} />
        <Content>
          <Balancer>
            <Typography type="title">{title}</Typography>
          </Balancer>
          <Metadata>
            <Typography type="tag">{formattedLastEditedTime}</Typography>
          </Metadata>
        </Content>
      </Section>
    </Link>
  );
};

const Section = styled('section', {
  display: 'grid',
  gap: '8px',
  gridAutoRows: 'max-content',
});

const Content = styled('div', {
  gap: 4,
  display: 'grid',
});

const Metadata = styled('div', {
  display: 'grid',
  gridAutoFlow: 'column',
  gridAutoColumns: 'max-content',
  gridGap: '0 12px',
  alignItems: 'center',
  userSelect: 'none',
});
