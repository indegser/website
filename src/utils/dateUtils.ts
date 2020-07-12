import formatRelative from "date-fns/formatRelative";
import format from "date-fns/format";

export const dateFns = {
  formatRelative: (a: number, b: any) => formatRelative(a, b),
  formatBasic: (date: number) => format(date, "MMM d, yyyy"),
};
