import styled from '@emotion/styled';
import { Launching } from './Launching';

export const Launchings = () => {
  const list = [1, 2, 3, 4, 5];
  return (
    <Container>
      <Title>발매 예정</Title>
      <List>
        {list.map((item) => {
          return <Launching key={item}>{item}</Launching>;
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
