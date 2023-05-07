import { theme } from '@src/design/theme';

export const codeStyle = {
  'code[class*="language-"]': {
    margin: 0,
    fontFamily: theme.fonts.mono,
    lineHeight: 1.5,
  },
  'pre[class*="language-"]': {
    margin: 0,
    fontFamily: theme.fonts.mono,
    lineHeight: 1.5,
  },
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
    color: theme.colors.gray9,
  },
  prolog: {
    color: theme.colors.gray5,
  },
  doctype: {
    color: theme.colors.gray5,
  },
  cdata: {
    color: theme.colors.gray5,
  },
  punctuation: {
    color: theme.colors.gray12,
  },
  namespace: {
    Opacity: '.7',
  },
  property: {
    color: theme.colors.blue10,
  },
  tag: {
    color: theme.colors.blue10,
  },
  boolean: {
    color: theme.colors.blue10,
  },
  number: {
    color: theme.colors.blue10,
  },
  constant: {
    color: theme.colors.blue10,
  },
  symbol: {
    color: theme.colors.blue10,
  },
  deleted: {
    color: theme.colors.blue10,
  },
  selector: {
    color: '#690',
  },
  'attr-name': {
    color: '#690',
  },
  string: {
    color: theme.colors.codeString,
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
    color: theme.colors.crimson9,
  },
  function: {
    color: theme.colors.purple11,
  },
  'class-name': {
    color: theme.colors.purple11,
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
