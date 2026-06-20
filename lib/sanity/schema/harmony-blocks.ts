import { defineArrayMember, defineField } from 'sanity';

const gridUnitOptions = [
  { title: 'Quarter', value: 'quarter' },
  { title: 'Eighth', value: 'eighth' },
  { title: 'Sixteenth', value: 'sixteenth' },
];

const meterField = defineField({
  name: 'meter',
  title: 'Meter',
  type: 'object' as const,
  fields: [
    defineField({
      name: 'beatsPerBar',
      title: 'Beats per bar',
      type: 'number',
      validation: (rule) => rule.required().integer().positive(),
    }),
    defineField({
      name: 'beatUnit',
      title: 'Beat unit',
      type: 'number',
      validation: (rule) => rule.required().integer().positive(),
    }),
  ],
});

const progressionField = (name: string, title: string) =>
  defineField({
    name,
    title,
    type: 'object' as const,
    fields: [
      defineField({
        name: 'bars',
        title: 'Bars',
        type: 'array' as const,
        of: [
          defineArrayMember({
            type: 'object' as const,
            fields: [
              defineField({
                name: 'index',
                title: 'Index',
                type: 'number',
                validation: (rule) => rule.required().integer().positive(),
              }),
              defineField({
                name: 'events',
                title: 'Events',
                type: 'array' as const,
                of: [
                  defineArrayMember({
                    type: 'object' as const,
                    fields: [
                      defineField({
                        name: 'chord',
                        title: 'Chord',
                        type: 'string',
                        validation: (rule) => rule.required(),
                      }),
                      defineField({
                        name: 'start',
                        title: 'Start',
                        type: 'number',
                        validation: (rule) => rule.required().integer().min(0),
                      }),
                      defineField({
                        name: 'duration',
                        title: 'Duration',
                        type: 'number',
                        validation: (rule) =>
                          rule.required().integer().positive(),
                      }),
                      defineField({
                        name: 'role',
                        title: 'Role',
                        type: 'string',
                      }),
                      defineField({
                        name: 'annotation',
                        title: 'Annotation',
                        type: 'string',
                      }),
                    ],
                  }),
                ],
                validation: (rule) => rule.required().min(1),
              }),
            ],
          }),
        ],
        validation: (rule) => rule.required().min(1),
      }),
    ],
  });

export const harmonyBlockMembers = [
  defineArrayMember({
    name: 'progressionCompare',
    title: 'Progression Compare',
    type: 'object' as const,
    fields: [
      defineField({
        name: 'id',
        title: 'ID',
        type: 'string',
        validation: (rule) => rule.required(),
      }),
      meterField,
      defineField({
        name: 'gridUnit',
        title: 'Grid unit',
        type: 'string',
        options: { list: gridUnitOptions },
        validation: (rule) => rule.required(),
      }),
      progressionField('before', 'Before'),
      progressionField('after', 'After'),
    ],
  }),
  defineArrayMember({
    name: 'voiceMotion',
    title: 'Voice Motion',
    type: 'object' as const,
    fields: [
      defineField({
        name: 'title',
        title: 'Title',
        type: 'string',
        validation: (rule) => rule.required(),
      }),
      defineField({
        name: 'motions',
        title: 'Motions',
        type: 'array' as const,
        of: [
          defineArrayMember({
            type: 'object' as const,
            fields: [
              defineField({
                name: 'label',
                title: 'Label',
                type: 'string',
                validation: (rule) => rule.required(),
              }),
              defineField({
                name: 'path',
                title: 'Path',
                type: 'array' as const,
                of: [defineArrayMember({ type: 'string' })],
                validation: (rule) => rule.required().min(1),
              }),
              defineField({
                name: 'explanation',
                title: 'Explanation',
                type: 'text',
                validation: (rule) => rule.required(),
              }),
            ],
          }),
        ],
        validation: (rule) => rule.required().min(1),
      }),
    ],
  }),
  defineArrayMember({
    name: 'usageNotes',
    title: 'Usage Notes',
    type: 'object' as const,
    fields: [
      defineField({
        name: 'items',
        title: 'Items',
        type: 'array' as const,
        of: [defineArrayMember({ type: 'string' })],
        validation: (rule) => rule.required().min(1),
      }),
    ],
  }),
  defineArrayMember({
    name: 'relatedTerms',
    title: 'Related Terms',
    type: 'object' as const,
    fields: [
      defineField({
        name: 'termIds',
        title: 'Term IDs',
        type: 'array' as const,
        of: [defineArrayMember({ type: 'string' })],
        validation: (rule) => rule.required().min(1),
      }),
    ],
  }),
];
