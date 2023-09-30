import { defineField, defineType } from 'sanity';
import { Bookmark } from '../components/Bookmark';

const schema = [
  defineType({
    title: 'Bookmark',
    name: 'bookmark',
    type: 'document',
    components: {
      input: Bookmark,
    },
    fields: [
      defineField({
        title: 'Title',
        name: 'title',
        type: 'string',
        readOnly: true,
      }),
      defineField({
        title: 'Description',
        name: 'description',
        type: 'text',
        readOnly: true,
      }),
      defineField({
        title: 'Cover',
        name: 'cover',
        type: 'image',
        readOnly: true,
      }),
      defineField({
        title: 'URL',
        name: 'url',
        type: 'url',
      }),
    ],
  }),
];

export default schema;
