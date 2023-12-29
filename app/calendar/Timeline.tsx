import { amplitude } from '@/lib/amplitude';
import styled from '@emotion/styled';
import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

dayjs.extend(isoWeek);
const now = dayjs();

const timeline = new Array(10)
  .fill(true)
  .map((_, index) => index + 1)
  .map((add) => {
    const added = now.add(add, 'day');
    return {
      id: added.format('YYYYMMDD'),
      date: added.date(),
      month: added.month() + 1 + '월',
    };
  });

export const Timeline = () => {
  const searchParams = useSearchParams();
  const queryId = searchParams.get('id');

  const handleClick = (id: string) => {
    amplitude.track(`click_timeline`, { timelineId: id });
  };

  return (
    <Container>
      {timeline.map(({ id, date, month }) => {
        return (
          <Link
            key={id}
            href={{ pathname: '/calendar', query: { id } }}
            replace
            shallow
            onClick={() => handleClick(id)}
          >
            <Chip data-active={id === queryId}>
              <Day>{month}</Day>
              <Date>{date}</Date>
            </Chip>
          </Link>
        );
      })}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  overflow-x: scroll;
  scroll-snap-type: x mandatory;
  scroll-padding: 0 13px;
  padding: 10px 13px;
  gap: 3.33px;
  border-bottom: 1px solid #f4f4f4;
`;

const Day = styled.div`
  color: var(--scale-gray-400, #a0a0a0);
  font-size: 11px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const Date = styled.div`
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;

const Chip = styled.div`
  display: flex;
  width: 47px;
  padding: 10px 11px;
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
