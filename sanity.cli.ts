import { defineCliConfig } from 'sanity/cli';
import { dataset, projectId } from './lib/sanity/env';

export default defineCliConfig({
  api: { projectId, dataset },
  studioHost: 'indegser',
  vite: {
    server: {
      proxy: {
        '/api': {
          target: 'http://localhost:3000',
          changeOrigin: true,
          secure: false,
        },
      },
    },
  },
});
