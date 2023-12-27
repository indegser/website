import dayjs from 'dayjs';
import { redirect } from 'next/navigation';
import { CalendarPage } from './CalendarPage';

export default function Calendar({ searchParams }: { searchParams: any }) {
  if (!searchParams.id) {
    const now = dayjs();
    const tomorrow = now.add(1, 'day');
    const id = tomorrow.format('YYYYMMDD');
    return redirect(`/calendar?id=${id}`);
  }

  return <CalendarPage />;
}
