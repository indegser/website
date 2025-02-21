import type { SWRMutationConfiguration } from 'swr/mutation';
import useSWRMutation from 'swr/mutation';
import { PRODUCTION_URL } from '../../../constants';
import { linkPreviewSchema } from '../../types';

const fetchLinkPreview = async (url: string) => {
  const json = await fetch(
    `${PRODUCTION_URL}/api/link-preview?url=${encodeURIComponent(url)}`,
  ).then((res) => res.json());

  return linkPreviewSchema.parse(json);
};

const uploadImage = (imageUrl?: string) => {
  if (!imageUrl) return;
  return fetch(
    `${PRODUCTION_URL}/api/image-upload?url=${encodeURIComponent(imageUrl)}`,
  ).then((res) => res.json());
};

const mutate = async (_: unknown, { arg }: { arg: { url: string } }) => {
  const linkPreview = await fetchLinkPreview(arg.url);
  const imageAsset = await uploadImage(linkPreview.imageUrl);
  return {
    linkPreview,
    imageAsset,
  };
};

export const useLinkPreviewMutation = (
  options?: SWRMutationConfiguration<Awaited<ReturnType<typeof mutate>>, void>,
) => {
  return useSWRMutation('link-preview', mutate, options);
};
