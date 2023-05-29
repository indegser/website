'use client';

import { PrismLight as Highlighter } from 'react-syntax-highlighter';
import tsx from 'react-syntax-highlighter/dist/cjs/languages/prism/tsx';

Highlighter.registerLanguage('typescript', tsx);

import { codeStyle } from './CodeBlock.style';

import { PageContent } from '@src/design/atoms/Container';
import { BlockType } from '@src/types/notion';

interface Props {
  block: Extract<BlockType, { type: 'code' }>;
}

const capitalize = (str: string) => {
  return str.slice(0, 1).toUpperCase() + str.slice(1);
};

export const CodeBlock = ({ block }: Props) => {
  const { language, rich_text } = block.code;

  return (
    <PageContent>
      <div
        className="whitespace-pre rounded-sm bg-gray-50 px-4 pb-6 pt-3 font-mono text-sm"
        style={{ tabSize: 2 }}
      >
        <div className="text-xs text-gray-500">{capitalize(language)}</div>
        <Highlighter
          style={codeStyle}
          useInlineStyles={false}
          customStyle={{ overflowX: 'scroll' }}
          language={language}
        >
          {rich_text[0].plain_text}
        </Highlighter>
      </div>
    </PageContent>
  );
};
