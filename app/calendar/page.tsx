import { redirect } from 'next/navigation';
import { CalendarPage } from './CalendarPage';

export default function Calendar({ searchParams }: { searchParams: any }) {
  if (!searchParams.id) return redirect(`/calendar?id=20231223`);

  return <CalendarPage />;
}
