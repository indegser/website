import { useQuery } from "@tanstack/react-query";
import fetch from "unfetch";

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

export const useBookmarkBlock = (url: string) => {
  const { data } = useQuery({
    queryKey: ["bookmark", url],
    queryFn: () => fetcher(url),
  });

  return { data };
};
