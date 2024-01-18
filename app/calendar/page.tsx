import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import { redirect } from 'next/navigation';
import { CalendarPage } from './CalendarPage';

dayjs.extend(utc);
dayjs.extend(timezone);

export default function Calendar({ searchParams }: { searchParams: any }) {
  if (!searchParams.id) {
    const now = dayjs().tz('Asia/Seoul');
    const tomorrow = now.add(1, 'day');
    const id = tomorrow.format('YYYYMMDD');
    return redirect(`/calendar?id=${id}`);
  }

  return <CalendarPage />;
}
