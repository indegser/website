'use client';

import { VisitTracker } from '@/components/atoms/visit-tracker';
import styled from '@emotion/styled';
import { Launchings } from './Launchings';
import { Timeline } from './Timeline';

export const CalendarPage = () => {
  // const result = Object.keys(NewsByDate).map((key: NewsKeyType) => {
  //   const list = NewsByDate[key];

  //   return {
  //     url: `https://content.29cm.co.kr/calendar?id=${key}`,
  //     brandNos: list.map((item) => ({
  //       id: item.frontBrandId,
  //       name: item.frontBrandNameKor,
  //     })),
  //   };
  // });

  return (
    <Global>
      <VisitTracker params={[`visit_calendar_page`]} />
      <Timeline />
      <Launchings />
    </Global>
  );
};

const Global = styled.div``;
