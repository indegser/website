import { defineArrayMember, defineType } from 'sanity';
import { googleMap } from './google-map';
import linkPreview from './link-preview';
import { youtube } from './youtube';

export default defineType({
  title: 'Block Content',
  name: 'blockContent',
  type: 'array',
  of: [
    defineArrayMember({
      title: 'Block',
      type: 'block' as const,
      styles: [
        { title: 'Normal', value: 'normal' },
        { title: 'H1', value: 'h1' },
        { title: 'H2', value: 'h2' },
        { title: 'H3', value: 'h3' },
        { title: 'H4', value: 'h4' },
        { title: 'Quote', value: 'blockquote' },
      ],
      lists: [
        { title: 'Bullet', value: 'bullet' },
        { title: 'Number', value: 'number' },
      ],
      marks: {
        decorators: [
          { title: 'Strong', value: 'strong' },
          { title: 'Emphasis', value: 'em' },
          {
            title: 'Code',
            value: 'code',
          },
        ],
        annotations: [
          {
            title: 'URL',
            name: 'link',
            type: 'object',
            fields: [
              {
                title: 'URL',
                name: 'href',
                type: 'url',
              },
            ],
          },
        ],
      },
    }),
    defineArrayMember({
      type: 'image' as const,
      options: { hotspot: true },
      fields: [
        {
          name: 'caption',
          type: 'string',
        },
      ],
    }),
    defineArrayMember({
      type: linkPreview.name,
    }),
    defineArrayMember({
      type: youtube.name,
    }),
    defineArrayMember({
      type: googleMap.name,
    }),
    defineArrayMember({
      type: 'code',
    }),
  ],
});
