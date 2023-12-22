import styled from '@emotion/styled';
import { NewsProduct } from '../@shared/NewsProduct';
import { NewsType } from '../@shared/type';

interface Props {
  news: NewsType;
}

export const NewsProductList = ({ news }: Props) => {
  return (
    <Container>
      <Headline>
        <Text>발매 예정 상품</Text>
      </Headline>
      <Border />
      <div>
        {news.products.map((product) => {
          return (
            <NewsProduct
              key={product.productId}
              product={product}
              displayStartAt={news.displayStartAt}
            />
          );
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
