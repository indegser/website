#!/usr/bin/env node

import { readFile } from 'node:fs/promises';
import { createClient } from 'next-sanity';

const requiredFields = [
  'SANITY_STUDIO_PROJECT_ID',
  'SANITY_STUDIO_DATASET',
  'SANITY_TOKEN',
];

function usage() {
  console.error(
    'Usage: upload-post-draft.mjs <draft.json> [--write]\n\n' +
      'Default mode is dry-run. Pass --write to upsert a Sanity draft.',
  );
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function isObject(value) {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function validateDraft(draft) {
  assert(isObject(draft), 'Draft must be an object.');
  assert(draft._type === 'post', 'Draft _type must be "post".');
  assert(draft.title, 'Draft title is required.');
  assert(draft.excerpt, 'Draft excerpt is required.');
  assert(draft.contentKind, 'Draft contentKind is required.');
  assert(draft.slug?.current, 'Draft slug.current is required.');
  assert(Array.isArray(draft.body), 'Draft body must be an array.');
}

function draftIdFor(draft) {
  if (draft._id) {
    return draft._id.startsWith('drafts.') ? draft._id : `drafts.${draft._id}`;
  }

  const sourceId = draft.sourceMeta?.sourceId;
  if (sourceId) {
    return `drafts.post.${sourceId}`;
  }

  return `drafts.post.${draft.slug.current}`;
}

const args = process.argv.slice(2);
const file = args.find((arg) => !arg.startsWith('-'));
const shouldWrite = args.includes('--write');

if (!file) {
  usage();
  process.exit(1);
}

const draft = JSON.parse(await readFile(file, 'utf8'));
validateDraft(draft);

const documentId = draftIdFor(draft);
const payload = {
  ...draft,
  _id: documentId,
  _type: 'post',
};

if (!shouldWrite) {
  console.log(
    JSON.stringify(
      {
        mode: 'dry-run',
        documentId,
        title: payload.title,
        slug: payload.slug?.current,
        contentKind: payload.contentKind,
        bodyBlocks: payload.body.length,
      },
      null,
      2,
    ),
  );
  process.exit(0);
}

for (const name of requiredFields) {
  assert(process.env[name], `Missing ${name}.`);
}

const client = createClient({
  projectId: process.env.SANITY_STUDIO_PROJECT_ID,
  dataset: process.env.SANITY_STUDIO_DATASET,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-05-23',
  token: process.env.SANITY_TOKEN,
  useCdn: false,
});

let result;

try {
  result = await client.createOrReplace(payload);
} catch (error) {
  console.error(
    JSON.stringify(
      {
        mode: 'write',
        documentId,
        error: {
          code: error?.code,
          message: error?.message || 'Sanity write failed.',
        },
      },
      null,
      2,
    ),
  );
  process.exit(1);
}

console.log(
  JSON.stringify(
    {
      mode: 'write',
      documentId: result._id,
      updatedAt: result._updatedAt,
    },
    null,
    2,
  ),
);
