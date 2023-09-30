import { useRef } from 'react';
import { ObjectInputProps, set } from 'sanity';
import useSWR from 'swr';

export const Bookmark = (props: ObjectInputProps) => {
  const { onChange, value, renderDefault } = props;
  const { url } = value;
  const urlRef = useRef(url);

  useSWR(
    url && urlRef.current !== url ? `bookmark-${url}` : null,
    () => fetch(`/api/og?url=${url}`).then((res) => res.json()),
    {
      onSuccess: (data) => {
        onChange(set(data));
        urlRef.current = url;
        console.log('UPDATE');
      },
    },
  );

  return <>{renderDefault(props)}</>;
};
