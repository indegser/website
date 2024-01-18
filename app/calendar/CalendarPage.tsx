'use client';

import { VisitTracker } from '@/components/atoms/visit-tracker';
import styled from '@emotion/styled';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import { Launchings } from './Launchings';
import { Timeline } from './Timeline';

dayjs.extend(utc);
dayjs.extend(timezone);

export const CalendarPage = () => {
  return (
    <Global>
      <VisitTracker params={[`visit_calendar_page`]} />
      <Timeline />
      <Launchings />
    </Global>
  );
};

const Global = styled.div``;
