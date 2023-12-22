import styled from '@emotion/styled';
import { Waitings } from '../@shared/Waitings';

export const NewsContent = () => {
  return (
    <div>
      <Container>
        <div>
          <Date>12월 14일 10시</Date>
          <Title>유메르 2023 F/W</Title>
          <Desc>
            유리와 다양한 소재를 사용한 핸드메이드 주얼리 포틀의 발매를 알려요.
            29CM에서 가장 먼저 만나볼 수 있어요
          </Desc>
        </div>
      </Container>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <WaitingsContainer>
          <Waitings type="dark" />
        </WaitingsContainer>
      </div>
    </div>
  );
};

const Container = styled.div`
  padding: 32px;
  padding-bottom: 24px;
`;

const Title = styled.div`
  color: #000;
  text-align: center;
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: 136%; /* 32.64px */
`;

const Date = styled.div`
  color: #000;
  text-align: center;
  font-size: 13px;
  font-style: normal;
  font-weight: 700;
  line-height: 140%;
`;

const Desc = styled.div`
  color: #000;
  margin-top: 18px;
  text-align: center;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 21px */
`;

const WaitingsContainer = styled.div`
  display: flex;
  padding: 6px 12px 6px 18px;
  justify-content: center;
  gap: 6px;
  border-radius: 30px;
  border: 1px solid #e4e4e4;
  margin-bottom: 20px;
`;
