import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'category',
  title: 'Category',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    } as const),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    } as const),
  ],
});
