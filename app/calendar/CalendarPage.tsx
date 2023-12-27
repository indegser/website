'use client';

import { VisitTracker } from '@/components/atoms/visit-tracker';
import styled from '@emotion/styled';
import { Launchings } from './Launchings';
import { Timeline } from './Timeline';

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
