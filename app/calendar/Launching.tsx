import { amplitude } from '@/lib/amplitude';
import styled from '@emotion/styled';
import { useInView } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import Balancer from 'react-wrap-balancer';
import { NewsCover } from './@shared/NewsCover';
import { NewsProduct } from './@shared/NewsProduct';
import { Waitings } from './@shared/Waitings';
import { getPromotionType } from './@shared/get-promotion-type';
import { NewsType } from './@shared/type';

interface Props {
  item: NewsType;
  isStandalone?: boolean;
  timelineId: string;
  position: number;
  maxPosition: number;
}

export const Launching = ({
  item,
  timelineId,
  position,
  maxPosition,
  isStandalone = false,
}: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const cover = new URL(item.coverImageUrl);
  cover.searchParams.set('width', '600');

  const isInView = useInView(ref, { amount: 'all' });

  useEffect(() => {
    if (isInView) {
      amplitude.track(`view_event`, {
        item,
        timelineId,
        position,
        maxPosition,
      });
    }
  }, [isInView, position, maxPosition, timelineId, item]);

  const handleClick = () => {
    amplitude.track('click_event', {
      item,
      timelineId,
      position,
      maxPosition,
    });
  };

  return (
    <Container ref={ref}>
      <Link href={`/calendar/news/${item.id}`} onClick={handleClick}>
        <Cover data-isstandalone={isStandalone}>
          <NewsCover imageUrl={cover.href} />
          <Content>
            <PromotionType>{`${getPromotionType(
              item.category,
            )} 예정`}</PromotionType>
            <BrandName>
              <Balancer>{item.frontBrandNameKor}</Balancer>
            </BrandName>
            <WaitingsContainer>
              <Waitings itemCount={item.products.length} />
            </WaitingsContainer>
          </Content>
        </Cover>
      </Link>
      <div>
        {isStandalone ? null : (
          <ProductList>
            {item.products.slice(0, 10).map((product) => {
              return (
                <NewsProduct
                  key={product.productId}
                  isMinimal
                  eventId={item.brandNewsId}
                  product={product}
                  displayStartAt={item.displayStartAt}
                />
              );
            })}
          </ProductList>
        )}
      </div>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  flex: 0 0 auto;
  scroll-snap-align: start;
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

  &[data-isstandalone='true'] {
    margin: 0;
    width: 100%;
  }
`;

const Content = styled.div`
  position: relative;
`;

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
  word-break: keep-all;
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
