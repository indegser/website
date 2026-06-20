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
      name: 'contentKind',
      title: 'Content Kind',
      type: 'string',
      options: {
        list: [
          { title: 'Essay', value: 'essay' },
          { title: 'Reading Question', value: 'reading-question' },
          { title: 'Harmony Pattern', value: 'harmony-pattern' },
        ],
      },
      group: 'meta',
    }),
    defineField({
      name: 'sourceMeta',
      title: 'Source Metadata',
      type: 'object' as const,
      group: 'meta',
      fields: [
        defineField({
          name: 'originSkill',
          title: 'Origin Skill',
          type: 'string',
        }),
        defineField({
          name: 'sourceProject',
          title: 'Source Project',
          type: 'string',
        }),
        defineField({
          name: 'sourceId',
          title: 'Source ID',
          type: 'string',
        }),
        defineField({
          name: 'sourceUrl',
          title: 'Source URL',
          type: 'url',
        }),
        defineField({
          name: 'schemaVersion',
          title: 'Schema Version',
          type: 'number',
        }),
        defineField({
          name: 'generatedAt',
          title: 'Generated At',
          type: 'datetime',
        }),
        defineField({
          name: 'primaryKeyCenter',
          title: 'Primary Key Center',
          type: 'string',
        }),
        defineField({
          name: 'sourceTags',
          title: 'Source Tags',
          type: 'array' as const,
          of: [{ type: 'string' }],
        }),
        defineField({
          name: 'sourceNotes',
          title: 'Source Notes',
          type: 'array' as const,
          of: [{ type: 'string' }],
        }),
        defineField({
          name: 'glossaryTermIds',
          title: 'Glossary Term IDs',
          type: 'array' as const,
          of: [{ type: 'string' }],
        }),
        defineField({
          name: 'duplicateKeys',
          title: 'Duplicate Keys',
          type: 'array' as const,
          of: [{ type: 'string' }],
        }),
        defineField({
          name: 'relatedSourceIds',
          title: 'Related Source IDs',
          type: 'array' as const,
          of: [{ type: 'string' }],
        }),
      ],
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
