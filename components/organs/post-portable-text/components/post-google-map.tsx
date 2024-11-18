import { ReactGoogleMap } from '@/components/atoms/react-google-map';
import { GoogleMap } from '@/lib/sanity';
import { PortableTextComponentProps } from 'next-sanity';

interface Props extends PortableTextComponentProps<GoogleMap> {}

export function PostGoogleMap(props: Props) {
  return <ReactGoogleMap q={props.value.q} />;
}
