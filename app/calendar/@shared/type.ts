import { NewsByDate } from './news_by_date';
import { NewsById } from './news_by_id';

export type NewsKeyType = keyof typeof NewsByDate;
export type NewsType = (typeof NewsByDate)[NewsKeyType][0];
export type NewsIdType = keyof typeof NewsById;
