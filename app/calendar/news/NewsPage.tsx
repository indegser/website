'use client';

import styled from '@emotion/styled';
import { NewsContent } from './NewsContent';
import { NewsCover } from './NewsCover';
import { NewsProductList } from './NewsProductList';

export const NewsPage = () => {
  return (
    <Global>
      <NewsCover />
      <NewsContent />
      <NewsProductList />
    </Global>
  );
};

const Global = styled.div``;
