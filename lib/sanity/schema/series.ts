import { defineField, defineType } from 'sanity';

export const seriesDocument = defineType({
  title: '시리즈',
  name: 'series',
  type: 'document',
  fields: [
    defineField({
      title: 'Title',
      name: 'title',
      type: 'string',
    }),
    defineField({
      title: 'Description',
      name: 'description',
      type: 'text',
    }),
  ],
});
