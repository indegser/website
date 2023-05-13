import { useQuery } from '@tanstack/react-query';

interface OpenGraphType {
  id: string;
  url: string;
  title: string;
  description: string;
  image_url: string;
}

const fetcher = (url: string) =>
  fetch(`/api/og?url=${encodeURIComponent(url)}`).then(
    (res) => res.json() as Promise<OpenGraphType>
  );

export const useBookmarkBlock = (url: string) => {
  const { data } = useQuery({
    queryKey: ['bookmark', url],
    queryFn: () => fetcher(url),
  });

  return { data };
};
