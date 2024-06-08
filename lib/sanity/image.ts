import createImageUrlBuilder from '@sanity/image-url';
import type { Image } from 'sanity';

export { getImageDimensions } from '@sanity/asset-utils';

import { dataset, projectId } from './env';

const imageBuilder = createImageUrlBuilder({
  projectId: projectId || '',
  dataset: dataset || '',
});

export const urlForImage = (source: Image) => {
  return imageBuilder?.image(source);
};
