import { visionTool } from '@sanity/vision';
import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';

import { codeInput } from '@sanity/code-input';
import { createPublishAction } from './lib/sanity/actions';
import { apiVersion, dataset, projectId } from './lib/sanity/env';
import { schema } from './lib/sanity/schema';

export default defineConfig({
  projectId,
  dataset,
  schema,
  document: {
    actions: (prev, context) => {
      return prev.map((originalAction) =>
        originalAction.action === 'publish' && context.schemaType == 'post'
          ? createPublishAction(originalAction, context)
          : originalAction,
      );
    },
  },
  plugins: [
    structureTool(),
    codeInput(),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
});
