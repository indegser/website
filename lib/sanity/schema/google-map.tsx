import { EarthGlobeIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

export const googleMap = defineType({
  name: 'googleMap',
  type: 'object',
  title: 'Google Map',
  icon: EarthGlobeIcon,
  fields: [
    defineField({
      name: 'q',
      type: 'string',
      title: '검색어',
    }),
  ],
  preview: {
    select: {
      title: 'q',
    },
  },
});
