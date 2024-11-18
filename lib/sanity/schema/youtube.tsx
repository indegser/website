import ReactPlayer from 'react-player';
import { PreviewProps, defineField, defineType } from 'sanity';

export const youtube = defineType({
  name: 'youtube',
  type: 'object',
  title: 'YouTube Embed',
  fields: [
    defineField({
      name: 'url',
      type: 'url',
      title: 'YouTube video URL',
    }),
  ],
  preview: {
    select: { title: 'url' },
  },
  components: {
    preview: ({ title }: PreviewProps) => {
      return (
        <div>
          {title ? (
            <ReactPlayer
              url={title.toString()}
              style={{ aspectRatio: '640 / 360' }}
              width="100%"
              height="100%"
            />
          ) : null}
          <div className="p-2 text-xs">
            {title ? title.toString() : '장소를 입력하세요'}
          </div>
        </div>
      );
    },
  },
});
