import { visionTool } from '@sanity/vision';
import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';

import { codeInput } from '@sanity/code-input';
import { apiVersion, dataset, projectId } from './env';
import { schema } from './schema';

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  // Add and edit the content schema in the './sanity/schema' folder
  schema,
  plugins: [
    structureTool(),
    codeInput(),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
});
