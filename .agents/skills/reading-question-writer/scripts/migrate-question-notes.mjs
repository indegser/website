#!/usr/bin/env node

import { createHash } from 'node:crypto';
import { mkdir, readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const sourceDir = path.resolve(process.argv[2] ?? '../question/reading-notes');
const outputDir = path.resolve(
  process.argv[3] ?? 'data/work/reading-question-drafts',
);

const migratedAt = '2026-06-20T00:00:00.000Z';

const overrides = {
  '2026-05-31_algorithmic-stablecoin-collateral.md': {
    title: '담보 매각이 스테이블코인의 지급능력을 지탱하는 방식',
    slug: 'algorithmic-stablecoin-collateral-sales',
    excerpt:
      '담보 매각은 지급능력을 새로 만들어내는 일이 아니라, 이미 보유한 담보를 즉시 상환 가능한 현금성 자산으로 바꾸는 과정이다.',
    whyConfusing:
      '“담보를 판다”는 표현은 자산을 줄이는 행동처럼 들리기 때문에, 왜 이것이 상환 능력에 도움이 되는지 헷갈리기 쉽다. 핵심은 총자산보다 유동성이다.',
  },
  '2026-05-31_bitcoin-ethereum-token-value.md': {
    title: '비트코인과 이더리움 토큰 가격이 커지는 이유',
    slug: 'bitcoin-ethereum-token-value',
    excerpt:
      '비트코인과 이더리움은 외부 담보에 대한 청구권이 아니므로, 가격은 담보 가치보다 네트워크 신뢰, 사용 수요, 희소성, 보유 수요가 함께 만든다.',
    whyConfusing:
      '담보형 토큰을 기준으로 보면 모든 토큰 가격이 준비자산 가치에서 나와야 할 것처럼 보인다. 하지만 비트코인과 이더리움은 토큰 보유자가 외부 자산을 청구하는 구조가 아니다.',
  },
  '2026-05-31_quantum-computing-blockchain-security.md': {
    title: '양자컴퓨팅이 블록체인 보안에 주는 실제 위협',
    slug: 'quantum-computing-blockchain-security',
    excerpt:
      '양자컴퓨터가 블록체인을 즉시 무너뜨리는 것은 아니지만, 충분히 강력해지면 공개키 서명 체계를 교체해야 하는 장기 위험이 된다.',
    whyConfusing:
      '블록체인은 여러 암호 기술을 함께 쓰기 때문에 “암호가 뚫린다”는 말이 해시, 서명, 지갑, 합의를 모두 같은 위험으로 보이게 만든다.',
  },
  '2026-05-31_stablecoin-usdc.md': {
    title: 'USDC가 그냥 달러 보유와 다른 점',
    slug: 'stablecoin-usdc',
    excerpt:
      'USDC는 달러보다 가치가 높은 자산이 아니라, 달러 가치를 블록체인에서 전송하고 스마트컨트랙트에 연결하기 위한 토큰이다.',
    whyConfusing:
      '가격만 보면 USDC와 달러는 거의 같은 역할을 하므로 차이가 없어 보인다. 하지만 차이는 가치 수준이 아니라 돈이 움직이는 인프라에 있다.',
  },
};

function stableKey(...parts) {
  return createHash('sha1').update(parts.join(':')).digest('hex').slice(0, 12);
}

function textBlock(text, options = {}) {
  return {
    _key: stableKey(options.seed ?? text, options.index ?? ''),
    _type: 'block',
    children: [
      {
        _key: stableKey('span', options.seed ?? text, options.index ?? ''),
        _type: 'span',
        marks: [],
        text,
      },
    ],
    markDefs: [],
    style: options.style ?? 'normal',
    ...(options.listItem
      ? { listItem: options.listItem, level: options.level ?? 1 }
      : {}),
  };
}

function splitParagraphs(text) {
  return text
    .trim()
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.replace(/\n/g, ' ').trim())
    .filter(Boolean);
}

function parseNote(markdown) {
  const title = markdown.match(/^# (.+)$/m)?.[1]?.trim() ?? 'Untitled';
  const metadata = {};
  const beforeSections = markdown.split(/^## /m)[0] ?? '';

  for (const line of beforeSections.split('\n')) {
    const match = line.match(/^([A-Za-z]+):\s*(.*)$/);
    if (match) {
      metadata[match[1].toLowerCase()] = match[2].trim();
    }
  }

  const sections = {};
  let currentHeading = null;
  let currentLines = [];

  for (const line of markdown.split('\n')) {
    const headingMatch = line.match(/^## (.+)$/);

    if (headingMatch) {
      if (currentHeading) {
        sections[currentHeading] = currentLines.join('\n').trim();
      }

      currentHeading = headingMatch[1].trim();
      currentLines = [];
      continue;
    }

    if (currentHeading) {
      currentLines.push(line);
    }
  }

  if (currentHeading) {
    sections[currentHeading] = currentLines.join('\n').trim();
  }

  return { title, metadata, sections };
}

function parseTags(tagLine = '') {
  return tagLine
    .split(/\s+/)
    .map((tag) => tag.trim())
    .filter(Boolean);
}

function parseBullets(text) {
  return text
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.startsWith('- '))
    .map((line) => line.slice(2).trim())
    .filter(Boolean);
}

function heading(text, seed) {
  return textBlock(text, { style: 'h2', seed: `${seed}:heading:${text}` });
}

function paragraphBlocks(paragraphs, seed) {
  return paragraphs.map((paragraph, index) =>
    textBlock(paragraph, { seed, index }),
  );
}

function bulletBlocks(items, seed) {
  return items.map((item, index) =>
    textBlock(item, { seed, index, listItem: 'bullet' }),
  );
}

function sourceIdFor(fileName) {
  return `question-reading-notes-${fileName
    .replace(/\.md$/, '')
    .replace(/_/g, '-')
    .replace(/[^a-zA-Z0-9-]/g, '-')}`;
}

function makeDraft(fileName, markdown) {
  const note = parseNote(markdown);
  const override = overrides[fileName] ?? {};
  const sourceId = sourceIdFor(fileName);
  const originalQuestion = splitParagraphs(
    note.sections['Original Question'] ?? '',
  );
  const summary = splitParagraphs(note.sections['Conversation Summary'] ?? '');
  const explanation = splitParagraphs(note.sections.Explanation ?? '');
  const keyTerms = parseBullets(note.sections['Key Terms'] ?? '');
  const becameClear = splitParagraphs(note.sections['What Became Clear'] ?? '');
  const openQuestions = parseBullets(note.sections['Open Questions'] ?? '');
  const directAnswer = summary.length > 0 ? summary : becameClear;

  return {
    _type: 'post',
    title: override.title ?? note.title,
    slug: {
      _type: 'slug',
      current:
        override.slug ??
        fileName.replace(/^\d{4}-\d{2}-\d{2}_/, '').replace(/\.md$/, ''),
    },
    excerpt: override.excerpt ?? directAnswer[0],
    contentKind: 'reading-question',
    sourceMeta: {
      originSkill: 'reading-question-writer',
      sourceProject: 'question',
      sourceId,
      schemaVersion: 1,
      generatedAt: migratedAt,
      sourceTags: parseTags(note.metadata.tags),
      sourceNotes: [
        `Migrated from /Users/indegser/Github/question/reading-notes/${fileName}`,
        note.metadata.source
          ? `Original source: ${note.metadata.source}`
          : 'Original source: Unknown',
        note.metadata.date ? `Original note date: ${note.metadata.date}` : '',
      ].filter(Boolean),
    },
    body: [
      {
        _key: stableKey(sourceId, 'original-question-callout'),
        _type: 'callout',
        tone: 'question',
        title: '원래 질문',
        body: paragraphBlocks(
          originalQuestion,
          `${sourceId}:original-question`,
        ),
      },
      ...paragraphBlocks(directAnswer, `${sourceId}:direct-answer`),
      heading('왜 헷갈렸는가', sourceId),
      ...paragraphBlocks(
        [override.whyConfusing].filter(Boolean),
        `${sourceId}:why`,
      ),
      heading('설명', sourceId),
      ...paragraphBlocks(explanation, `${sourceId}:explanation`),
      heading('핵심 용어', sourceId),
      ...bulletBlocks(keyTerms, `${sourceId}:key-terms`),
      heading('명확해진 점', sourceId),
      ...paragraphBlocks(becameClear, `${sourceId}:became-clear`),
      heading('남은 질문', sourceId),
      ...bulletBlocks(openQuestions, `${sourceId}:open-questions`),
    ],
  };
}

await mkdir(outputDir, { recursive: true });

const files = (await readdir(sourceDir))
  .filter((file) => /^\d{4}-\d{2}-\d{2}_.+\.md$/.test(file))
  .sort();

for (const file of files) {
  const markdown = await readFile(path.join(sourceDir, file), 'utf8');
  const draft = makeDraft(file, markdown);
  const target = path.join(outputDir, `${draft.slug.current}.json`);

  await writeFile(target, `${JSON.stringify(draft, null, 2)}\n`);
  console.log(target);
}
