import { defineArrayMember, defineField } from 'sanity';

export const callout = defineArrayMember({
  name: 'callout',
  title: 'Callout',
  type: 'object' as const,
  fields: [
    defineField({
      name: 'tone',
      title: 'Tone',
      type: 'string',
      options: {
        list: [
          { title: 'Note', value: 'note' },
          { title: 'Question', value: 'question' },
          { title: 'Warning', value: 'warning' },
          { title: 'Takeaway', value: 'takeaway' },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array' as const,
      of: [
        defineArrayMember({
          type: 'block' as const,
          styles: [
            { title: 'Normal', value: 'normal' },
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
              { title: 'Code', value: 'code' },
            ],
          },
        }),
      ],
      validation: (rule) => rule.required().min(1),
    }),
  ],
});
