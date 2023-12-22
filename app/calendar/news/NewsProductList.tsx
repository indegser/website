import styled from '@emotion/styled';
import { NewsProduct } from '../@shared/NewsProduct';

export const NewsProductList = () => {
  const items = ['1', '2', '3'];

  return (
    <Container>
      <Headline>
        <Text>발매 예정 상품</Text>
      </Headline>
      <Border />
      <div>
        {items.map((item) => {
          return <NewsProduct key={item} />;
        })}
      </div>
    </Container>
  );
};

const Container = styled.div`
  padding: 0 20px;
`;

const Headline = styled.div`
  height: var(--scale-dimension-dimension-600, 48px);
  padding: 10px 0;
`;

const Text = styled.div`
  color: #000;

  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 140%; /* 22.4px */
`;

const Border = styled.div`
  height: 1px;
  background: #f4f4f4;
`;
