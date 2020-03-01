import formatRelative from 'date-fns/formatRelative'

export const dateFns = {
  formatRelative: (...args: Parameters<typeof formatRelative>) =>
    formatRelative(args[0], args[1]),
}
