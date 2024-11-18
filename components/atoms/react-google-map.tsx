import { GoogleMap } from '@/lib/sanity';

export function ReactGoogleMap({ q }: GoogleMap) {
  return (
    <iframe
      title={q}
      style={{ border: 0, aspectRatio: '20 / 9', width: '100%' }}
      referrerPolicy="no-referrer-when-downgrade"
      src={`https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&q=${q}`}
      allowFullScreen
    ></iframe>
  );
}
