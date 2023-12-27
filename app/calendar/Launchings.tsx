import { VisitTracker } from '@/components/atoms/visit-tracker';
import styled from '@emotion/styled';
import { useSearchParams } from 'next/navigation';
import { NewsByDate } from './@shared/news_by_date';
import { NewsKeyType } from './@shared/type';
import { Launching } from './Launching';

interface Props {
  title?: string;
}

export const Launchings = ({ title = '이날의 소식' }: Props) => {
  const searchParams = useSearchParams();
  const queryId = searchParams.get('id');
  const data = NewsByDate[(queryId + 'T') as NewsKeyType];

  if (!data) return null;

  return (
    <Container>
      <VisitTracker
        key={queryId}
        params={[`view_timeline`, { timelineId: queryId }]}
      />
      <Title>{title}</Title>
      <List>
        {data.map((item, index) => {
          return (
            <Launching
              key={item.id}
              item={item}
              timelineId={queryId!}
              position={index + 1}
              maxPosition={data.length}
            />
          );
        })}
      </List>
    </Container>
  );
};

const Container = styled.div``;

const Title = styled.div`
  color: #000;
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  padding: 20px;
`;

const List = styled.div`
  display: grid;
  gap: 40px;
  padding-bottom: 40px;
`;
