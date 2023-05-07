import styled from '@emotion/styled';
import { PrismLight as Highlighter } from 'react-syntax-highlighter';
import tsx from 'react-syntax-highlighter/dist/cjs/languages/prism/tsx';

Highlighter.registerLanguage('typescript', tsx);

import { codeStyle } from './CodeBlock.style';

import { PageContent } from '@src/design/atoms/Container';
import { theme } from '@src/design/theme';
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
      <Container>
        <Language>{capitalize(language)}</Language>
        <Highlighter
          style={codeStyle}
          customStyle={{ overflowX: 'scroll' }}
          language={language}
        >
          {rich_text[0].plain_text}
        </Highlighter>
      </Container>
    </PageContent>
  );
};

const Container = styled.div`
  font-size: 80%;
  tab-size: 2;
  white-space: pre;
  padding: 12px 16px 24px 16px;
  background: ${theme.colors.gray3.computedValue};
  border-radius: 3px;
  & pre {
    &::-webkit-scrollbar {
      display: none;
    }
  }
`;

const Language = styled.div`
  color: ${theme.colors.gray10.computedValue};
  font-size: 80%;
  letter-spacing: 0;
`;
