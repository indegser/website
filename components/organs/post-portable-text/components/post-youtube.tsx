import { ReactPlayer } from '@/components/atoms/react-player';
import { PortableTextTypeComponentProps } from 'next-sanity';

interface Props extends PortableTextTypeComponentProps<{ url: string }> {}

export function PostYoutube({ value }: Props) {
  return (
    <div className="my-4 py-1">
      <ReactPlayer
        url={value.url}
        style={{ aspectRatio: '640 / 360' }}
        width="100%"
        height="auto"
        controls
      />
    </div>
  );
}
