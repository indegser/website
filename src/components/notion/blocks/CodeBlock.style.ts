import { colors } from '@src/components/theme';

export const codeStyle = {
  // 'pre[class*="language-"]::-moz-selection': {
  //   textShadow: "none",
  //   background: "#b3d4fc",
  // },
  // 'pre[class*="language-"] ::-moz-selection': {
  //   textShadow: "none",
  //   background: "#b3d4fc",
  // },
  // 'code[class*="language-"]::-moz-selection': {
  //   textShadow: "none",
  //   background: "#b3d4fc",
  // },
  // 'code[class*="language-"] ::-moz-selection': {
  //   textShadow: "none",
  //   background: "#b3d4fc",
  // },
  // 'pre[class*="language-"]::selection': {
  //   textShadow: "none",
  //   background: "#b3d4fc",
  // },
  // 'pre[class*="language-"] ::selection': {
  //   textShadow: "none",
  //   background: "#b3d4fc",
  // },
  // 'code[class*="language-"]::selection': {
  //   textShadow: "none",
  //   background: "#b3d4fc",
  // },
  // 'code[class*="language-"] ::selection': {
  //   textShadow: "none",
  //   background: "#b3d4fc",
  // },
  // ':not(pre) > code[class*="language-"]': {
  //   background: "#f5f2f0",
  //   padding: ".1em",
  //   borderRadius: ".3em",
  //   whiteSpace: "normal",
  // },
  comment: {
    color: colors.gray[500],
  },
  prolog: {
    color: colors.gray[300],
  },
  doctype: {
    color: colors.gray[300],
  },
  cdata: {
    color: colors.gray[300],
  },
  punctuation: {
    color: colors.gray[900],
  },
  namespace: {
    Opacity: '.7',
  },
  property: {
    color: colors.blue['800'],
  },
  tag: {
    color: colors.blue['800'],
  },
  boolean: {
    color: colors.blue['800'],
  },
  number: {
    color: colors.blue['800'],
  },
  constant: {
    color: colors.blue['800'],
  },
  symbol: {
    color: colors.blue['800'],
  },
  deleted: {
    color: colors.blue['800'],
  },
  selector: {
    color: '#690',
  },
  'attr-name': {
    color: '#690',
  },
  string: {
    color: colors.green['900'],
  },
  char: {
    color: '#690',
  },
  builtin: {
    color: '#690',
  },
  inserted: {
    color: '#690',
  },
  operator: {
    color: '#9a6e3a',
  },
  entity: {
    color: '#9a6e3a',
    cursor: 'help',
  },
  url: {
    color: '#9a6e3a',
    background: 'hsla(0, 0%, 100%, .5)',
  },
  '.language-css .token.string': {
    color: '#9a6e3a',
    background: 'hsla(0, 0%, 100%, .5)',
  },
  '.style .token.string': {
    color: '#9a6e3a',
    background: 'hsla(0, 0%, 100%, .5)',
  },
  '.token': {
    color: '#9a6e3a',
    background: 'hsla(0, 0%, 100%, .5)',
  },
  atrule: {
    color: '#07a',
  },
  'attr-value': {
    color: '#07a',
  },
  keyword: {
    color: colors.red['600'],
  },
  function: {
    color: colors.purple['700'],
  },
  'class-name': {
    color: colors.purple['700'],
  },
  regex: {
    color: '#e90',
  },
  important: {
    color: '#e90',
    fontWeight: 'bold',
  },
  variable: {
    color: '#e90',
  },
  bold: {
    fontWeight: 'bold',
  },
  italic: {
    fontStyle: 'italic',
  },
};
