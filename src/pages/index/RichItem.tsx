import styled from '@emotion/styled';
import Link from 'next/link';
import Balancer from 'react-wrap-balancer';

import { Relation } from './Relation';
import { RichItemThumbnail } from './RichItemThumbnail';

import { Time } from '@src/design/atoms/Time';
import { Typography } from '@src/design/atoms/Typography';
import { IndexConfigType } from '@src/types/indexes';
import { PageType, PropertyType } from '@src/types/notion';
import { getNotionFileUrl, notionUtils } from '@src/utils/notion';

interface Props {
  page: PageType;
  config: IndexConfigType;
}

export const RichItem = ({ page, config }: Props) => {
  const { id, last_edited_time } = page;

  const title = notionUtils.getTitle(page);

  const href = config.urlProperty
    ? (page.properties[config.urlProperty] as PropertyType<'url'>).url
    : `/content/${id}`;

  return (
    <Link href={href}>
      <Section>
        <RichItemThumbnail src={getNotionFileUrl(page.cover)} alt={title} />
        <Content>
          <Relation page={page} config={config} />
          <Balancer>
            <Typography type="title">{title}</Typography>
          </Balancer>
          <Metadata>
            <Typography type="tag">
              <Time date={last_edited_time} template="LL" />
            </Typography>
          </Metadata>
        </Content>
      </Section>
    </Link>
  );
};

const Section = styled.section`
  display: grid;
  gap: 8px;
  grid-auto-rows: max-content;
`;

const Content = styled.div`
  gap: 6px;
  display: grid;
`;

const Metadata = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: max-content;
  gap: 0 12px;
  align-items: center;
  user-select: none;
`;
