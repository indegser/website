import styled from '@emotion/styled';

interface Props {
  isMinimal?: boolean;
}

export const NewsProduct = ({ isMinimal = false }: Props) => {
  return (
    <Container data-minimal={isMinimal}>
      <Cover
        data-minimal={isMinimal}
        src="https://img.29cm.co.kr/item/202311/11ee79945954947983bcc57fbcbfdbfd.jpg?width=600"
      />
      <Content data-minimal={isMinimal}>
        <BrandName>유메르</BrandName>
        <Title>엘르 트리밍 퍼 재킷 (Camel beige)</Title>
        <Price>296200</Price>
      </Content>
      {isMinimal ? null : <Teaser>12/14 10시 발매</Teaser>}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  gap: 16px;
  position: relative;
  padding: 10px 0;
  scroll-snap-align: start;

  &[data-minimal='true'] {
    padding: 0;
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
  font-family: Pretendard;
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
  font-family: Campton;
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
  font-family: Campton;
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

  &[data-minimal='true'] {
    padding: 5px 0;

    ${Price} {
      padding-top: 4px;
      font-size: 12px;
    }
  }
`;
