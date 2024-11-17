import blockContent from './schema/block-content';
import category from './schema/category';
import linkPreview from './schema/link-preview';
import post from './schema/post';
import thread from './schema/thread';
import { youtube } from './schema/youtube';

export const schema = {
  types: [post, category, blockContent, linkPreview, thread, youtube],
};
