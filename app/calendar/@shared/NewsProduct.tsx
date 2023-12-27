import styled from '@emotion/styled';
import dayjs from 'dayjs';
import Link from 'next/link';
import { NewsType } from './type';

interface Props {
  product: NewsType['products'][0];
  isMinimal?: boolean;
  displayStartAt: string;
}

export const NewsProduct = ({
  isMinimal = false,
  product,
  displayStartAt,
}: Props) => {
  const formatted = dayjs(displayStartAt)
    .add(9, 'hour')
    .format('MM/DD H시 발매');

  const cover = new URL(product.imageUrl);
  cover.searchParams.set('width', isMinimal ? '120' : '240');

  return (
    <Link
      href={`app29cm://web/https://product.29cm.co.kr/catalog/${product.productId}`}
    >
      <Container data-minimal={isMinimal}>
        <Cover data-minimal={isMinimal} src={cover.href} />
        <Content data-minimal={isMinimal}>
          <BrandName>{product.frontBrandNameKor}</BrandName>
          <Title>{product.name}</Title>
          <Price>{product.consumerPrice.toLocaleString()}</Price>
        </Content>
        {isMinimal ? null : <Teaser>{formatted}</Teaser>}
      </Container>
    </Link>
  );
};

const Container = styled.div`
  display: flex;
  gap: 16px;
  position: relative;
  padding: 10px 0;
  flex: 0 0 auto;
  scroll-snap-align: start;

  &[data-minimal='true'] {
    padding: 0;
    width: 265px;
  }
`;

const Cover = styled.img`
  aspect-ratio: 1 / 1;
  width: 100px;

  &[data-minimal='true'] {
    width: 60px;
    height: 60px;
    border-radius: 8px;
  }
`;

const BrandName = styled.div`
  overflow: hidden;
  color: var(--text-primary, var(--text-primary, #000));
  text-overflow: ellipsis;
  white-space: nowrap;

  /* text-xs-bold */

  font-size: 11px;
  font-style: normal;
  font-weight: 700;
  line-height: 136%; /* 14.96px */
`;

const Title = styled.div`
  overflow: hidden;
  color: var(--scale-gray-500, #5d5d5d);
  font-feature-settings:
    'clig' off,
    'liga' off;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 11px;
  font-style: normal;
  font-weight: 400;
  line-height: 14px; /* 127.273% */
`;

const Price = styled.div`
  overflow: hidden;
  color: var(--text-primary, var(--text-primary, #000));
  font-feature-settings:
    'clig' off,
    'liga' off;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 16px; /* 114.286% */
  padding-top: 8px;
`;

const Teaser = styled.div`
  overflow: hidden;
  color: #ff4800;
  text-overflow: ellipsis;
  font-size: 11px;
  font-style: normal;
  font-weight: 400;
  line-height: 136%; /* 14.96px */
  position: absolute;
  top: 13.5px;
  right: 3.5px;
`;

const Content = styled.div`
  padding: 22px 0;
  position: relative;
  overflow: hidden;

  &[data-minimal='true'] {
    padding: 5px 0;

    ${Price} {
      padding-top: 4px;
      font-size: 12px;
    }
  }
`;
