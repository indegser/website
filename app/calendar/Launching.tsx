import styled from '@emotion/styled';
import Link from 'next/link';
import { NewsProduct } from './@shared/NewsProduct';
import { Waitings } from './@shared/Waitings';

export const Launching = () => {
  const id = '1';
  const items = [1, 2, 3];

  return (
    <Container>
      <Link href={`/calendar/news/${id}`}>
        <Cover>
          <Image src="https://img.29cm.co.kr/cms/202312/11eea068820e6b7683775b2a0e711839.jpg?width=2000&q=75" />
          <Content>
            <PromotionType>신상 발매</PromotionType>
            <BrandName>이스트우드</BrandName>
            <Waitings />
          </Content>
        </Cover>
      </Link>
      <div>
        <ProductList>
          {items.map((item) => {
            return <NewsProduct isMinimal key={item} />;
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
  padding-bottom: 12px;
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
