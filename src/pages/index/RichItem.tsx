import { styled } from '@stitches/react';
import dayjs from 'dayjs';
import Link from 'next/link';
import { useMemo } from 'react';
import Balancer from 'react-wrap-balancer';

import { RichItemThumbnail } from './RichItemThumbnail';

import { Typography } from '@src/design/atoms/Typography';
import { IndexConfigType } from '@src/types/indexes';
import { PageType, PropertyType } from '@src/types/notion';
import {
  getNotionFileUrl,
  getTitleFromPageProperties,
} from '@src/utils/notion';

import 'dayjs/locale/ko';

interface Props {
  page: PageType;
  config: IndexConfigType;
}

export const RichItem = ({ page, config }: Props) => {
  const { id, last_edited_time } = page;

  const formattedLastEditedTime = useMemo(() => {
    return dayjs(last_edited_time).locale('ko').format('YYYY년 MMMM D일');
  }, [last_edited_time]);

  const title = getTitleFromPageProperties(page);

  const href = config.urlProperty
    ? (page.properties[config.urlProperty] as PropertyType<'url'>).url
    : `/content/${id}`;

  return (
    <Link href={href}>
      <Section>
        <RichItemThumbnail src={getNotionFileUrl(page.cover)} alt={title} />
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
