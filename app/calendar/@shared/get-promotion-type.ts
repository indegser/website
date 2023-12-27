import { NewsType } from './type';

export const getPromotionType = (category: NewsType['category']) => {
  switch (category) {
    case 'BRAND_SALE':
      return '할인';
    case 'NEW_BRAND':
      return '입점';
    default:
      return '발매';
  }
};
