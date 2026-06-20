#!/usr/bin/env node

import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const defaultSourceDir =
  '/Users/indegser/Github/onefiveeight/content/harmony/patterns';
const defaultOutputDir = 'data/work/harmony-drafts';

const sourceDir = process.argv[2] ?? defaultSourceDir;
const outputDir = process.argv[3] ?? defaultOutputDir;

const sourceFiles = [
  'approach-f-before-fm.ts',
  'tonicize-minor-two.ts',
  'minor-iv-six-to-tonic.ts',
  'chromatic-bass-slash-chords.ts',
  'sus-dominant-door.ts',
  'dominant-ninth-color.ts',
];

function keyFrom(parts) {
  const key = parts
    .filter(Boolean)
    .join('-')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 64);

  return key || 'item';
}

function keyedSpan(span, blockKey, index) {
  return {
    _key: keyFrom([blockKey, 'span', index + 1]),
    ...span,
  };
}

function keyedEvents(events, blockKey, side, barIndex) {
  return events.map((event, eventIndex) => ({
    _key: keyFrom([blockKey, side, 'bar', barIndex, 'event', eventIndex + 1]),
    ...event,
  }));
}

function keyedBars(bars, blockKey, side) {
  return bars.map((bar) => ({
    _key: keyFrom([blockKey, side, 'bar', bar.index]),
    ...bar,
    events: keyedEvents(bar.events, blockKey, side, bar.index),
  }));
}

function keyedBlock(block, index) {
  const blockKey = keyFrom(['b', index + 1, block._type, block.id]);

  if (block._type === 'paragraph') {
    return {
      _key: blockKey,
      _type: 'block',
      style: 'normal',
      markDefs: [],
      children: block.children.map((span, spanIndex) =>
        keyedSpan(span, blockKey, spanIndex),
      ),
    };
  }

  if (block._type === 'heading') {
    return {
      _key: blockKey,
      _type: 'block',
      style: `h${block.level}`,
      markDefs: [],
      children: block.children.map((span, spanIndex) =>
        keyedSpan(span, blockKey, spanIndex),
      ),
    };
  }

  if (block._type === 'progressionCompare') {
    return {
      _key: blockKey,
      ...block,
      before: {
        bars: keyedBars(block.before.bars, blockKey, 'before'),
      },
      after: {
        bars: keyedBars(block.after.bars, blockKey, 'after'),
      },
    };
  }

  if (block._type === 'voiceMotion') {
    return {
      _key: blockKey,
      ...block,
      motions: block.motions.map((motion, motionIndex) => ({
        _key: keyFrom([blockKey, 'motion', motionIndex + 1]),
        ...motion,
      })),
    };
  }

  return {
    _key: blockKey,
    ...block,
  };
}

function parsePattern(source, file) {
  const match = source.match(
    /export const \w+ = ([\s\S]*?) satisfies HarmonyPattern;/,
  );

  if (!match) {
    throw new Error(`Could not extract HarmonyPattern object from ${file}`);
  }

  return Function(`"use strict"; return (${match[1]});`)();
}

function toDraft(pattern, generatedAt) {
  return {
    _type: 'post',
    title: pattern.title,
    slug: { _type: 'slug', current: pattern.slug },
    excerpt: pattern.summary,
    contentKind: 'harmony-pattern',
    sourceMeta: {
      originSkill: 'reharmonization-pattern-writer',
      sourceProject: 'onefiveeight',
      sourceId: pattern.id,
      schemaVersion: pattern.schemaVersion,
      generatedAt,
      primaryKeyCenter: pattern.primaryKeyCenter,
      sourceTags: pattern.tags ?? [],
      sourceNotes: pattern.sourceNotes ?? [],
      glossaryTermIds: pattern.glossaryTermIds ?? [],
      duplicateKeys: pattern.duplicateKeys ?? [],
      relatedSourceIds: pattern.relatedPatternIds ?? [],
    },
    body: pattern.body.map(keyedBlock),
  };
}

await mkdir(outputDir, { recursive: true });

const generatedAt = new Date().toISOString();
const drafts = [];

for (const sourceFile of sourceFiles) {
  const sourcePath = path.join(sourceDir, sourceFile);
  const source = await readFile(sourcePath, 'utf8');
  const pattern = parsePattern(source, sourceFile);
  const draft = toDraft(pattern, generatedAt);
  const outputPath = path.join(outputDir, `${draft.slug.current}.json`);

  await writeFile(outputPath, `${JSON.stringify(draft, null, 2)}\n`);

  drafts.push({
    slug: draft.slug.current,
    title: draft.title,
    outputPath,
    bodyBlocks: draft.body.length,
  });
}

console.log(
  JSON.stringify({ generatedAt, count: drafts.length, drafts }, null, 2),
);
