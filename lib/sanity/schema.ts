import { type SchemaTypeDefinition } from 'sanity';

import blockContent from './schema/block-content';
import category from './schema/category';
import post from './schema/post';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [post, category, blockContent],
};
