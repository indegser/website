import styled from '@emotion/styled';
import dayjs from 'dayjs';
import Balancer from 'react-wrap-balancer';
import { Waitings } from '../@shared/Waitings';
import { NewsType } from '../@shared/type';

interface Props {
  news: NewsType;
}

export const NewsContent = ({ news }: Props) => {
  const formatted = dayjs(news.displayStartAt)
    .add(9, 'hour')
    .format('MM월 DD일 H시');

  return (
    <div>
      <Container>
        <div>
          <Date>{formatted}</Date>
          <Title>
            <Balancer>{news.title}</Balancer>
          </Title>
          <Desc>
            <Balancer>{news.description}</Balancer>
          </Desc>
        </div>
      </Container>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <WaitingsContainer>
          <Waitings type="dark" likeCount={news.frontBrandHeartCount} />
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
  word-break: keep-all;
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
  word-break: keep-all;
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
