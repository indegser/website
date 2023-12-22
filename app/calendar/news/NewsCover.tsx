import styled from '@emotion/styled';
import dayjs from 'dayjs';
import { NewsType } from '../@shared/type';

interface Props {
  news: NewsType;
}

export const NewsCover = ({ news }: Props) => {
  const time = dayjs(news.displayStartAt);
  const date = time.get('date') + '일';
  const month = time.get('month') + 1 + '월';

  return (
    <Container>
      <img src={news.coverImageUrl} />
      <div style={{ height: '50%' }}></div>
      <MaskContainer>
        <Mask />
      </MaskContainer>
      <Mark>
        <Chip>
          <Day>{month}</Day>
          <Date>{date}</Date>
        </Chip>
        <DiffBadge>
          <BadgeText>내일</BadgeText>
        </DiffBadge>
      </Mark>
    </Container>
  );
};

const Container = styled.div`
  aspect-ratio: 375 / 380;
  position: relative;
  width: 100%;

  & img {
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: -1;
    top: 0;
    left: 0;
    object-fit: cover;
    object-position: center;
  }
`;

const MaskContainer = styled.div`
  bottom: 0;
  left: 0;
  right: 0;
  height: 50%;
  position: relative;
`;

const Mask = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  mask-image: linear-gradient(
    to bottom,
    transparent,
    rgba(0, 0, 0, 0.068) 3.3%,
    rgba(0, 0, 0, 0.145) 5.9%,
    rgba(0, 0, 0, 0.227) 8.1%,
    rgba(0, 0, 0, 0.313) 10.1%,
    rgba(0, 0, 0, 0.401) 12.1%,
    rgba(0, 0, 0, 0.49) 14.6%,
    rgba(0, 0, 0, 0.578) 17.7%,
    rgba(0, 0, 0, 0.661) 21.8%,
    rgba(0, 0, 0, 0.74) 27.1%,
    rgba(0, 0, 0, 0.812) 33.9%,
    rgba(0, 0, 0, 0.875) 42.4%,
    rgba(0, 0, 0, 0.927) 53%,
    rgba(0, 0, 0, 0.966) 66%,
    rgba(0, 0, 0, 0.991) 81.5%,
    rgba(0, 0, 0, 0.991) 100%
  );
  backdrop-filter: saturate(190%) blur(60px);
`;

const Mark = styled.div`
  display: flex;
  width: var(--scale-dimension-dimension-600, 48px);
  padding: 8px 12px;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  border-radius: 9px;
  background: #fff;
  position: absolute;
  bottom: 24px;
  left: 50%;
  transform: translate(-50%, 0);
`;

const Day = styled.div`
  color: var(--scale-gray-400, #a0a0a0);
  font-size: 11px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const Date = styled.div`
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;

const Chip = styled.div`
  display: flex;
  width: 47px;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  flex-shrink: 0;
  border-radius: 9px;
  scroll-snap-align: start;

  &[data-active='true'] {
    border-radius: 9px;
    background: #000;

    ${Date}, ${Day} {
      color: white;
    }
  }
`;

const DiffBadge = styled.div`
  display: flex;
  width: 30px;
  height: 30px;
  padding: 10px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
  border-radius: 999rem;
  position: absolute;
  top: -15px;
  right: -15px;
  background: #ff4800;
  word-break: keep-all;
`;

const BadgeText = styled.div`
  color: black;
  text-align: center;
  font-size: 10px;
  font-style: normal;
  font-weight: 700;
  line-height: 120%; /* 12px */
`;
