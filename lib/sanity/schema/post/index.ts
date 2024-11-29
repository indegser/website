import { defineField, defineType } from 'sanity';
import { postExcerpt } from './post-excerpt';

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
      name: 'slug',
      type: 'slug',
      options: {
        source: 'title',
        slugify: async (title: string) => {
          const { slug } = await fetch('/api/ai/slugify', {
            method: 'POST',
            headers: {
              'content-type': 'application/json',
            },
            body: JSON.stringify({ title }),
          }).then((res) => res.json());

          return slug;
        },
      },
      group: 'meta',
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      initialValue: 'Untitled',
      validation: (rule) => rule.required(),
      group: 'meta',
    }),
    postExcerpt,
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
