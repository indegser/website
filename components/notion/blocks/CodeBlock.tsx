'use client';

import { useEffect, useState } from 'react';
import { PrismLight as Highlighter } from 'react-syntax-highlighter';
import tsx from 'react-syntax-highlighter/dist/cjs/languages/prism/tsx';

Highlighter.registerLanguage('typescript', tsx);

import { codeStyle } from './CodeBlock.style';

import { PageContent } from 'components/atoms/Container';
import { BlockType } from 'lib/supabase/notion.types';

interface Props {
  block: Extract<BlockType, { type: 'code' }>;
}

const capitalize = (str: string) => {
  return str.slice(0, 1).toUpperCase() + str.slice(1);
};

export const CodeBlock = ({ block }: Props) => {
  const [isReady, setIsReady] = useState(false);
  const { language, rich_text } = block.code;

  useEffect(() => {
    setIsReady(true);
  }, [setIsReady]);

  return (
    <PageContent>
      <div
        className="whitespace-pre rounded-sm bg-gray-50 px-4 pb-6 pt-3 font-mono text-sm"
        style={{ tabSize: 2 }}
      >
        <div className="mb-2 text-xs text-gray-500">{capitalize(language)}</div>
        {isReady && (
          <Highlighter
            style={codeStyle}
            useInlineStyles
            customStyle={{ overflowX: 'scroll', background: 'transparent' }}
            language={language}
          >
            {rich_text[0].plain_text}
          </Highlighter>
        )}
      </div>
    </PageContent>
  );
};
