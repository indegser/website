'use client';

import styled from '@emotion/styled';
import { Launchings } from './Launchings';
import { Timeline } from './Timeline';

export const CalendarPage = () => {
  return (
    <Global>
      <Headline>할인 예정 캘린더</Headline>
      <Timeline />
      <Launchings />
    </Global>
  );
};

const Global = styled.div``;

const Headline = styled.div`
  color: #000;
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  text-align: center;
  padding: 30px 0 20px 0;
`;
