import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'category',
  title: 'Category',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
    } as const),
    defineField({
      name: 'avatar',
      type: 'image',
    } as const),
  ],
});
