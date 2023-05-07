import styled from '@emotion/styled';

import { theme } from '@src/design/theme/stitches.config';
import { usePageQueries } from '@src/queries/usePageQueries';
import { IndexConfigType } from '@src/types/indexes';
import { PageType } from '@src/types/notion';
import { notionUtils } from '@src/utils/notion';

interface Props {
  page: PageType;
  config: IndexConfigType;
}

export const Relation = ({ page, config }: Props) => {
  const ids = notionUtils.getRelationOfPage(page, config);
  const results = usePageQueries(ids);

  if (results.length === 0) return null;

  return (
    <Container>
      {results.map((result) => {
        const { data } = result;
        if (!data) return '...';

        return <Chip key={data.id}>{notionUtils.getTitle(data)}</Chip>;
      })}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
`;

const Chip = styled.div`
  font-size: 11px;
  background: ${theme.colors.blue3.computedValue};
  padding: 5px 6px;
  border-radius: 4px;
`;
