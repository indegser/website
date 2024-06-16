import { colors } from '@/components/theme';
import { Code } from '@/lib/sanity';
import { PortableTextComponentProps } from 'next-sanity';
import { PrismLight as Highlighter } from 'react-syntax-highlighter';
import tsx from 'react-syntax-highlighter/dist/cjs/languages/prism/tsx';

Highlighter.registerLanguage('typescript', tsx);

interface Props extends PortableTextComponentProps<Code> {}

export const PostCode = ({ value }: Props) => {
  const { language, code } = value;

  return (
    <div className="whitespace-pre rounded-sm bg-gray-50 px-4 pb-6 pt-3 font-mono text-sm">
      <Highlighter
        style={codeStyle}
        useInlineStyles
        customStyle={{ overflowX: 'scroll', background: 'transparent' }}
        language={language}
      >
        {code}
      </Highlighter>
    </div>
  );
};

export const codeStyle = {
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
