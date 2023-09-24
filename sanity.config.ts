import { defineConfig } from 'sanity';
import { deskTool } from 'sanity/desk';
import schema from './lib/sanity/schema';

const config = defineConfig({
  projectId: 'em8nd69q',
  dataset: 'production',
  title: 'CMS',
  basePath: '/cms',
  schema: {
    types: schema,
  },
  plugins: [deskTool()],
});

export default config;
