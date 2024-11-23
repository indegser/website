import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  groups: [
    {
      name: 'content',
      title: 'Content',
      default: true,
    },
    {
      name: 'meta',
      title: 'Meta',
    },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      initialValue: 'Untitled',
      validation: (rule) => rule.required(),
      group: 'meta',
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'string',
      initialValue: '',
      group: 'meta',
    }),
    defineField({
      name: 'cover',
      title: 'Cover',
      type: 'image' as const,
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
        },
      ],
      group: 'meta',
    }),
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array' as const,
      of: [{ type: 'reference', to: { type: 'category' } }],
      group: 'meta',
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
      group: 'meta',
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'blockContent',
      group: 'content',
    }),
  ],

  preview: {
    select: {
      title: 'title',
      excerpt: 'excerpt',
      media: 'cover',
    },
    prepare(selection) {
      return { ...selection, subtitle: selection.excerpt };
    },
  },
});
