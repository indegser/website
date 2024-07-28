import { toPlainText } from 'next-sanity';
import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'thread',
  title: 'Thread',
  type: 'document',
  fields: [
    defineField({
      name: 'category',
      type: 'reference',
      to: { type: 'category' },
    } as const),
    defineField({
      name: 'content',
      type: 'blockContent',
    } as const),
  ],
  preview: {
    select: {
      title: 'content',
    },
    prepare: (selection) => {
      const { title } = selection;
      const text = toPlainText(title);
      return {
        title: text.slice(0, 60),
      };
    },
  },
});
