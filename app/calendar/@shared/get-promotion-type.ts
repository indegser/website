import { NewsType } from './type';

export const getPromotionType = (category: NewsType['category']) => {
  switch (category) {
    case 'BRAND_SALE':
      return '할인 예정';
    case 'NEW_BRAND':
      return '신규 입점';
    default:
      return '신상품 발매';
  }
};
