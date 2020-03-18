import formatRelative from 'date-fns/formatRelative'
import format from 'date-fns/format'

export const dateFns = {
  formatRelative: (...args: Parameters<typeof formatRelative>) =>
    formatRelative(args[0], args[1]),
  formatBasic: (date: number) => format(date, 'MMM d, yyyy'),
}
