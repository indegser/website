import styled from '@emotion/styled';
import Link from 'next/link';
import { NewsProduct } from './@shared/NewsProduct';
import { Waitings } from './@shared/Waitings';
import { NewsType } from './@shared/type';

interface Props {
  item: NewsType;
}

export const Launching = ({ item }: Props) => {
  const cover = new URL(item.coverImageUrl);
  cover.searchParams.set('width', '600');

  return (
    <Container>
      <Link href={`/calendar/news/${item.id}`}>
        <Cover>
          <Image src={cover.href} />
          <Content>
            <PromotionType>신상 발매</PromotionType>
            <BrandName>{item.frontBrandNameKor}</BrandName>
            <WaitingsContainer>
              <Waitings />
            </WaitingsContainer>
          </Content>
        </Cover>
      </Link>
      <div>
        <ProductList>
          {item.products.map((product) => {
            return (
              <NewsProduct
                key={product.productId}
                isMinimal
                product={product}
                displayStartAt={item.displayStartAt}
              />
            );
          })}
        </ProductList>
      </div>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
`;

const Cover = styled.div`
  aspect-ratio: 335 / 380;
  padding: 12px 40px 20px 40px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  border-radius: 8px;
  overflow: hidden;
  position: relative;
  margin: 0 20px 15px 20px;
`;

const Content = styled.div``;

const PromotionType = styled.div`
  color: rgba(255, 255, 255, 0.8);

  text-align: center;

  font-size: 13px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;

const BrandName = styled.div`
  color: #fff;
  text-align: center;

  font-size: 28px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  padding-top: 6px;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  position: absolute;
  object-fit: cover;
  top: 0;
  left: 0;
  z-index: -1;
`;

const ProductList = styled.div`
  display: flex;
  width: 100vw;
  gap: 10px;
  overflow-x: scroll;
  scroll-snap-type: x mandatory;
  scroll-padding: 0 20px;
  padding: 0 20px;
`;

const WaitingsContainer = styled.div`
  padding-top: 12px;
  margin-top: 12px;
  border-top: 1px solid rgba(255, 255, 255, 0.21);
`;
