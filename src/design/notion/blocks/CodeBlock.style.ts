import { theme } from '@src/design/theme';

export const codeStyle = {
  'code[class*="language-"]': {
    margin: 0,
    fontFamily: theme.fonts.mono.computedValue,
    lineHeight: 1.5,
  },
  'pre[class*="language-"]': {
    margin: 0,
    fontFamily: theme.fonts.mono.computedValue,
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
    color: theme.colors.gray9.computedValue,
  },
  prolog: {
    color: theme.colors.gray5.computedValue,
  },
  doctype: {
    color: theme.colors.gray5.computedValue,
  },
  cdata: {
    color: theme.colors.gray5.computedValue,
  },
  punctuation: {
    color: theme.colors.gray12.computedValue,
  },
  namespace: {
    Opacity: '.7',
  },
  property: {
    color: theme.colors.blue10.computedValue,
  },
  tag: {
    color: theme.colors.blue10.computedValue,
  },
  boolean: {
    color: theme.colors.blue10.computedValue,
  },
  number: {
    color: theme.colors.blue10.computedValue,
  },
  constant: {
    color: theme.colors.blue10.computedValue,
  },
  symbol: {
    color: theme.colors.blue10.computedValue,
  },
  deleted: {
    color: theme.colors.blue10.computedValue,
  },
  selector: {
    color: '#690',
  },
  'attr-name': {
    color: '#690',
  },
  string: {
    color: theme.colors.codeString.computedValue,
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
    color: theme.colors.crimson9.computedValue,
  },
  function: {
    color: theme.colors.purple11.computedValue,
  },
  'class-name': {
    color: theme.colors.purple11.computedValue,
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
