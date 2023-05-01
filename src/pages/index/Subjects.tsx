import Link from 'next/link';

import { PageContent } from '@src/design/atoms/Container';
import { styled, theme } from '@src/design/theme/stitches.config';
import { JournalPageType } from '@src/types/notion';
import { getNotionTitle } from '@src/utils/notion';

interface Props {
  properties: JournalPageType['properties'];
}

export const Subjects = (props: Props) => {
  const {
    properties: { Subjects: subjects },
  } = props;

  if (subjects.rollup.type !== 'array') return null;

  const { array } = subjects.rollup;

  return (
    <PageContent>
      <Container>
        {array.map((item, index) => {
          if (item.type !== 'title') return null;
          const title = getNotionTitle(item);

          return (
            <Link
              key={index}
              href={{ pathname: '/', query: { subject: title } }}
            >
              <Tag>{title}</Tag>
            </Link>
          );
        })}
      </Container>
    </PageContent>
  );
};

const Container = styled('div', {
  display: 'flex',
  flexWrap: 'wrap',
  gap: 12,
  fontSize: 12,
  fontWeight: 500,
});

const Tag = styled('div', {
  padding: '4px 8px',
  background: theme.colors.gray3,
  borderRadius: 4,
});
