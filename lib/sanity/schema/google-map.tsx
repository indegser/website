import { ReactGoogleMap } from '@/components/atoms/react-google-map';
import { PreviewProps, defineField, defineType } from 'sanity';

export const googleMap = defineType({
  name: 'google-map',
  type: 'object',
  title: 'Google Map',
  fields: [
    defineField({
      name: 'q',
      type: 'string',
      title: '검색어',
    }),
  ],
  preview: {
    select: { title: 'q' },
  },
  components: {
    preview: ({ title }: PreviewProps) => {
      return (
        <div>
          {title ? <ReactGoogleMap q={title.toString()} /> : null}
          <div className="p-2 text-xs">
            {title ? title.toString() : '장소를 입력하세요'}
          </div>
        </div>
      );
    },
  },
});
