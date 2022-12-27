import useSWR from "swr";

interface OpenGraphType {
  title: string;
  description: string;
  favicon: string | null;
  imageUrl: string;
}

const fetcher = (url: string) =>
  fetch(`/api/og?url=${encodeURIComponent(url)}`).then(
    (res) => res.json() as Promise<OpenGraphType>
  );

export const useEmbed = (url: string) => {
  const { data } = useSWR(url, fetcher);

  return { data };
};
