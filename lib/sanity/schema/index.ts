import { defineField, defineType } from 'sanity';

const schema = [
  defineType({
    title: 'Prompt',
    name: 'prompt',
    type: 'document',
    fields: [
      defineField({
        title: 'Title',
        name: 'title',
        type: 'string',
      }),
      defineField({
        type: 'reference',
        name: 'series',
        title: 'Series',
        to: [{ type: 'prompt' }],
      }),
    ],
  }),
];

export default schema;
