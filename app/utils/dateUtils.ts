import formatRelative from 'date-fns/formatRelative'
import format from 'date-fns/format'
import parseISO from 'date-fns/parseISO'

export const dateFns = {
  formatRelative: (a: string, b: any) => formatRelative(parseISO(a), b),
  formatBasic: (date: number) => format(date, 'MMM d, yyyy'),
}
