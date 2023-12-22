import styled from '@emotion/styled';
import { useSearchParams } from 'next/navigation';
import { NewsByDate } from './@shared/news_by_date';
import { NewsKeyType } from './@shared/type';
import { Launching } from './Launching';

export const Launchings = () => {
  const searchParams = useSearchParams();
  const queryId = searchParams.get('id');
  const data = NewsByDate[(queryId + 'T') as NewsKeyType];

  return (
    <Container>
      <Title>발매 예정</Title>
      <List>
        {data.map((item) => {
          return <Launching key={item.id} item={item} />;
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
