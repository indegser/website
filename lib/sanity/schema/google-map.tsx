import { MapPin } from 'lucide-react';
import { defineField, defineType } from 'sanity';

export const googleMap = defineType({
  name: 'google-map',
  type: 'object',
  title: 'Google Map',
  icon: MapPin,
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
