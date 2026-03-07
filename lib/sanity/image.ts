import createImageUrlBuilder from '@sanity/image-url';
import type { Image } from 'sanity';

export { getImageDimensions } from '@sanity/asset-utils';

type ImageWithOptionalUrl = Image & {
  asset?: {
    url?: string;
  };
};

const projectId = process.env.SANITY_STUDIO_PROJECT_ID;
const dataset = process.env.SANITY_STUDIO_DATASET;

const imageBuilder =
  projectId && dataset
    ? createImageUrlBuilder({
        projectId,
        dataset,
      })
    : null;

const createExternalImageBuilder = (sourceUrl: string) => {
  const chain = {
    width: () => chain,
    quality: () => chain,
    fit: () => chain,
    auto: () => chain,
    url: () => sourceUrl,
  };

  return chain as {
    width: Function;
    quality: Function;
    fit: Function;
    auto: Function;
    url: () => string;
  };
};

export const urlForImage = (source?: ImageWithOptionalUrl | null) => {
  const directUrl = source?.asset?.url;

  if (directUrl) {
    return createExternalImageBuilder(directUrl);
  }

  if (!source || !imageBuilder) {
    return createExternalImageBuilder('');
  }

  return imageBuilder.image(source);
};
