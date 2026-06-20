#!/usr/bin/env node

import { readFile } from 'node:fs/promises';

const allowedCustomTypes = new Set([
  'block',
  'image',
  'linkPreview',
  'code',
  'youtube',
  'google-map',
  'callout',
  'progressionExample',
  'progressionCompare',
  'voiceMotion',
  'usageNotes',
  'relatedTerms',
]);

function fail(message) {
  console.error(message);
  process.exitCode = 1;
}

function isObject(value) {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function validateDraft(draft) {
  if (!isObject(draft)) fail('Draft must be an object.');
  if (draft._type !== 'post') fail('Draft _type must be "post".');
  if (!draft.title) fail('Draft title is required.');
  if (!draft.excerpt) fail('Draft excerpt is required.');
  if (!draft.contentKind) fail('Draft contentKind is required.');
  if (!draft.slug?.current) fail('Draft slug.current is required.');
  if (!Array.isArray(draft.body)) fail('Draft body must be an array.');

  for (const [index, block] of (draft.body ?? []).entries()) {
    if (!isObject(block)) {
      fail(`body[${index}] must be an object.`);
      continue;
    }

    if (!allowedCustomTypes.has(block._type)) {
      fail(`body[${index}] has unsupported _type "${block._type}".`);
    }

    if (block._type === 'block' && !Array.isArray(block.children)) {
      fail(`body[${index}] Portable Text block must have children.`);
    }

    if (block._type === 'callout') {
      if (!['note', 'question', 'warning', 'takeaway'].includes(block.tone)) {
        fail(`body[${index}] callout has unsupported tone "${block.tone}".`);
      }

      if (!Array.isArray(block.body) || block.body.length === 0) {
        fail(`body[${index}] callout body must be a non-empty array.`);
      }
    }
  }
}

const file = process.argv[2];

if (!file) {
  fail('Usage: validate-post-draft.mjs <draft.json>');
} else {
  const raw = await readFile(file, 'utf8');
  validateDraft(JSON.parse(raw));
}
