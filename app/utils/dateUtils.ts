import formatRelative from 'date-fns/formatRelative'
import { ko } from 'date-fns/locale'

export const dateFns = {
  formatRelative: (...args: Parameters<typeof formatRelative>) =>
    formatRelative(args[0], args[1], { locale: ko }),
}
